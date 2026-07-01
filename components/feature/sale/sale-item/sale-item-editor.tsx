/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { NumberInput } from "@/components/number-input/number-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { TableCell, TableRow } from "@/components/ui/table";
import { GoodQty, SaleType } from "@/lib/generated/prisma/enums";
import { getZodErrors } from "@/lib/utils";
import {
  CommodityMetadataSchema,
  CommoditySchema,
  saleItemSchema,
  SaleItemSchema,
  SaleSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import FieldCommodity from "../../field-commodity";
import FieldUnit from "../../field-unit";
import { FieldAmount } from "./field-amount";
import { FieldUnitPrice } from "./field-unit-price";

interface Props {
  saleItem?: SaleItemSchema;
  index: number;
  form: UseFormReturn<SaleSchema>;
  closeEditView: (close: boolean) => void;
}
export default function SaleItemEditor({
  index,
  form,
  saleItem,
  closeEditView,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { append: addSaleItem, update: updateSaleItem } = useFieldArray({
    control: form.control,
    name: "saleItems",
  });

  const form2 = useForm<SaleItemSchema>({
    resolver: zodResolver(saleItemSchema),
    values: {
      id: saleItem?.id || "",
      amount: saleItem?.amount!,
      quantity: saleItem?.quantity!,
      goodQty: saleItem?.goodQty || GoodQty.PIECE,
      currency: saleItem?.currency || "UGX",
      commodity: {
        ...saleItem?.commodity,
        name: saleItem?.commodity.name || "",
        commodityMetadata: saleItem?.commodity
          .commodityMetadata as CommodityMetadataSchema,
      } as CommoditySchema,
      unitPrice: saleItem?.unitPrice!,
      saleType: saleItem?.saleType || SaleType.BASE,
      otherGoodQty: saleItem?.otherGoodQty,
    },
  });
  const watchedGoodQty = form2.watch("goodQty");
  const errors = getZodErrors(form2.formState.errors);

  function submitForm(data: SaleItemSchema) {
    startTransition(() => {
      if (saleItem) {
        updateSaleItem(index, data);
        closeEditView(true);
      } else {
        addSaleItem(data);
      }
    });
    form2.reset();
    form.clearErrors("saleItems");
  }

  return (
    <>
      <Form {...form2}>
        <TableRow className="*:border-r *:last:border-r-0 ">
          <TableCell className="text-muted-foreground w-12">
            {String(index + 1).padStart(2, "0")}
          </TableCell>
          <TableCell className="w-24">
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
          <TableCell className="w-56 space-y-2">
            <FieldUnit form={form2} name="goodQty" />

            {watchedGoodQty === "OTHER" && (
              <FormField
                control={form2.control}
                name={"otherGoodQty"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="custom qty"
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </TableCell>
          <TableCell className="min-w-3xs">
            <FieldCommodity
              form={form2}
              name="commodity"
              company={form2.getValues("commodity.company")}
            />
          </TableCell>
          <TableCell className="flex  *:flex-1 gap-2">
            <FieldUnitPrice form={form2} />
          </TableCell>
          <TableCell>
            <FieldAmount form={form2} />
          </TableCell>
          <TableCell>
            <div className="gap-3 flex  items-center">
              <LoadingButton
                type="button"
                loading={isPending}
                variant={"secondary"}
                onClick={form2.handleSubmit(submitForm)}
              >
                {saleItem ? (
                  <>
                    <SaveIcon className="inline" /> save
                  </>
                ) : (
                  <>
                    <PlusIcon className="inline" /> Add
                  </>
                )}
              </LoadingButton>
              {saleItem && (
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => closeEditView(true)}
                >
                  <XIcon className="inline" /> Cancel
                </Button>
              )}
            </div>
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
    </>
  );
}
