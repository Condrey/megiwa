/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { Form, FormFooter } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SaleData } from "@/lib/types";
import { getZodErrors } from "@/lib/utils";
import {
  CommodityMetadataSchema,
  saleSchema,
  SaleSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import FieldTotalAmount from "../field-total-amount";
import FieldBuyer from "./field-buyer";
import FieldSaleItems from "./field-sale-items";
import { useUpsertSaleMutation } from "./mutation";

interface Props {
  sale?: SaleData;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditSale({ sale, open, setOpen }: Props) {
  const form = useForm<SaleSchema>({
    resolver: zodResolver(saleSchema),
    values: {
      id: sale?.id || "",
      soldById: sale?.soldById || "",
      totalAmount: sale?.totalAmount!,
      buyerId: sale?.buyerId || "",
      saleItems:
        sale?.saleItems.map((item) => ({
          ...item,
          commodity: {
            ...item.commodity,
            commodityMetadata: item.commodity
              .commodityMetadata as CommodityMetadataSchema,
          },
          otherGoodQty: item.otherGoodQty!,
        })) || [],
    },
  });
  const salesItems = useWatch({ control: form.control, name: "saleItems" });
  const totalAmount =
    salesItems?.reduce((sum, item) => sum + (item.amount ?? 0), 0) ?? 0;

  const errors = getZodErrors(form.formState.errors, "H");
  const { mutate, isPending } = useUpsertSaleMutation();
  function submitForm(data: SaleSchema) {
    mutate(data, { onSuccess: () => setOpen(false) });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="top">
        <div className="h-svh overflow-y-auto w-full px-4 flex flex-col">
          <SheetHeader className="px-0">
            <SheetTitle>
              {sale ? "Update sale" : "Create a new sale"}
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-4 max-w-9xl mx-auto w-full items-stretch"
            >
              <div className="flex gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FieldBuyer form={form} />
                <FieldTotalAmount
                  form={form}
                  name="totalAmount"
                  totalAmount={totalAmount}
                />
              </div>
              <FieldSaleItems form={form} className="flex flex-col flex-1" />
              {!!errors.length && (
                <div>
                  {
                    <ul>
                      {errors.map(({ field, message }, index) => (
                        <li key={index}>
                          <span className="font-bold">{field}: </span>
                          {message}
                        </li>
                      ))}
                    </ul>
                  }{" "}
                </div>
              )}
              <FormFooter>
                <LoadingButton loading={isPending} type="submit">
                  Submit sale
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
