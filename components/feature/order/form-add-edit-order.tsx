/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import FieldTotalAmount from "@/components/feature/field-total-amount";
import { OrderData } from "@/lib/types";
import {
  CommodityMetadataSchema,
  CompanySchema,
  orderSchema,
  OrderSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormFooter } from "../../ui/form";
import LoadingButton from "../../ui/loading-button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import FieldCompany from "../field-company";
import FieldOrderItems from "./field-order-items";
import { useUpsertOrderMutation } from "./mutation";

interface Props {
  order?: OrderData;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditOrder({ order, open, setOpen }: Props) {
  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    values: {
      id: order?.id || "",
      orderedById: order?.orderedById || "",
      totalAmount: order?.totalAmount!,
      company: order?.company as CompanySchema,
      orderItems:
        order?.orderItems.map((item) => ({
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
  const orderItems = useWatch({
    control: form.control,
    name: "orderItems",
  });
  const totalAmount =
    orderItems?.reduce((sum, item) => sum + (item.amount ?? 0), 0) ?? 0;

  const { mutate, isPending } = useUpsertOrderMutation();
  function submitForm(data: OrderSchema) {
    mutate(data, { onSuccess: () => setOpen(false) });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="top">
        <div className="h-svh overflow-y-auto w-full  px-4 flex flex-col">
          <SheetHeader className="px-0">
            <SheetTitle>
              {order ? "Update order" : "Create a new order"}
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-4 max-w-9xl mx-auto w-full items-stretch"
            >
              <div className="flex gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FieldCompany form={form} name="company" />
                <FieldTotalAmount
                  form={form}
                  name="totalAmount"
                  totalAmount={totalAmount}
                />
              </div>
              <FieldOrderItems form={form} className="flex flex-col flex-1" />
              <FormFooter>
                <LoadingButton loading={isPending} type="submit">
                  Submit order
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
