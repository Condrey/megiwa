/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import FieldCommodity from "@/components/feature/field-commodity";
import FieldUnit from "@/components/feature/field-unit";
import { NumberInput } from "@/components/number-input/number-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { TableCell, TableRow } from "@/components/ui/table";
import { GoodQty } from "@/lib/generated/prisma/enums";
import { getZodErrors } from "@/lib/utils";
import {
  CommodityMetadataSchema,
  CommoditySchema,
  orderItemSchema,
  OrderItemSchema,
  OrderSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon, PlusIcon, ZapIcon } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

interface Props {
  orderItem?: OrderItemSchema;
  index: number;
  form: UseFormReturn<OrderSchema>;
  closeEditView: (close: boolean) => void;
}
export default function FormAddEditOrderItem({
  index,
  form,
  orderItem,
  closeEditView,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { append: addOrderItem, update: updateOrderItem } = useFieldArray({
    control: form.control,
    name: "orderItems",
  });
  const form2 = useForm<OrderItemSchema>({
    resolver: zodResolver(orderItemSchema),
    values: {
      id: orderItem?.id || "",
      amount: orderItem?.amount!,
      quantity: orderItem?.quantity!,
      goodQty: orderItem?.goodQty || GoodQty.PIECE,
      currency: orderItem?.currency || "UGX",
      commodity: {
        ...orderItem?.commodity,
        name: orderItem?.commodity.name || "",
        commodityMetadata: orderItem?.commodity
          .commodityMetadata as CommodityMetadataSchema,
      } as CommoditySchema,
    },
  });
  const errors = getZodErrors(form2.formState.errors);

  function submitForm(data: OrderItemSchema) {
    startTransition(() => {
      if (orderItem) {
        updateOrderItem(index, data);
        closeEditView(true);
      } else {
        addOrderItem(data);
      }
    });
    form2.reset();
  }

  return (
    <Form {...form2}>
      <TableRow className="*:border-r *:last:border-r-0">
        <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
        <TableCell>
          <FormField
            control={form2.control}
            name={"quantity"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumberInput placeholder="qty" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <FieldUnit form={form2} name="goodQty" />
        </TableCell>
        <TableCell className="min-w-3xs">
          <FieldCommodity
            form={form2}
            name="commodity"
            company={form2.getValues("commodity.company")}
          />
        </TableCell>
        <TableCell className="text-muted-foreground">
          <ZapIcon className="inline fill-muted-foreground" />
          Auto
        </TableCell>
        <TableCell>
          <FormField
            control={form2.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumberInput placeholder="amount" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <LoadingButton
            type="button"
            loading={isPending}
            variant={"secondary"}
            onClick={form2.handleSubmit(submitForm)}
          >
            {orderItem ? (
              <>
                <Edit2Icon className="inline" /> Edit
              </>
            ) : (
              <>
                <PlusIcon className="inline" /> Add
              </>
            )}
          </LoadingButton>
        </TableCell>
      </TableRow>
      {/* displaying the errors  */}
      {!!errors.length && (
        <TableRow>
          <TableCell colSpan={7} className="space-y-1">
            <div className="flex justify-between items-center gap-4 max-w-xl">
              <h2 className="underline text-destructive">
                Errors in entered fields
              </h2>
              <Button
                type="button"
                onClick={() => form2.clearErrors()}
                variant={"destructive"}
              >
                Clear errors
              </Button>
            </div>
            <h4 className="text-muted-foreground  font-serif">
              Please fix the following errors, and continue
            </h4>
            <ul className="list-decimal list-inside space-y-0.5">
              {errors.map(({ field, message }) => (
                <li key={field}>
                  <strong className="capitalize">{field}:</strong> {message}
                </li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      )}
    </Form>
  );
}
