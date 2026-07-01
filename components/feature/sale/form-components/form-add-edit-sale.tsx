/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { ButtonGroupSeparator } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
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
import FieldNumberInput from "../../field-number-input";
import FieldTotalAmount from "../../field-total-amount";
import { useUpsertSaleMutation } from "../mutation";
import FieldBalance from "./field-balance";
import FieldBuyer from "./field-buyer";
import TableSaleItems from "./table-sale-items";

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
          saleType: item.saleType || "BASE",
        })) || [],
      payment: undefined!,
      balance: sale?.balance,
    },
  });
  const salesItems = useWatch({ control: form.control, name: "saleItems" });
  const totalAmount =
    salesItems?.reduce((sum, item) => sum + (item.amount ?? 0), 0) ?? 0;
  const previousPayments = sale?.payments?.reduce(
    (amm, tot) => amm + tot.amount,
    0,
  );

  const errors = getZodErrors(form.formState.errors);
  const { mutate, isPending } = useUpsertSaleMutation();

  function submitForm(data: SaleSchema) {
    if (!errors.length) {
      mutate(data, {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          form.setValue("payment", undefined!);
        },
      });
    }
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
              <Card>
                <CardContent className="flex gap-4 items-center flex-row w-full">
                  <div className="flex items-center gap-3 *:flex-1 flex-1 max-w-4xl">
                    <FieldBuyer form={form} />
                    <FieldNumberInput
                      form={form}
                      name="payment"
                      title="Payment amount"
                      placeholder="amount being paid"
                    />
                  </div>
                  <ButtonGroupSeparator />
                  <FieldTotalAmount
                    form={form}
                    name="totalAmount"
                    totalAmount={totalAmount}
                  />
                  <FieldBalance
                    form={form}
                    previousPayments={previousPayments}
                  />
                  <LoadingButton
                    loading={isPending}
                    size={"lg"}
                    type="submit"
                    disabled={!!errors.length}
                    className="w-full max-w-[16rem]"
                  >
                    Submit sale
                  </LoadingButton>
                </CardContent>
              </Card>
              <TableSaleItems form={form} className="flex flex-col flex-1" />
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
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
