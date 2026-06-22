/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SellingPrice } from "@/lib/generated/prisma/client";
import { GoodQty } from "@/lib/generated/prisma/enums";
import { CommodityData } from "@/lib/types";
import { sellingPriceSchema, SellingPriceSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RecentOrderPricesSection from "./recent-order-prices-section";
import SellingPriceSection from "./selling-price-section";

interface Props {
  commodity: CommodityData;
  sellingPrice?: SellingPrice;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditSellingPrice({
  sellingPrice,
  open,
  setOpen,
  commodity,
}: Props) {
  const [today] = useState<Date>(new Date());

  const form = useForm<SellingPriceSchema>({
    resolver: zodResolver(sellingPriceSchema),
    values: {
      id: sellingPrice?.id || "",
      currency: sellingPrice?.currency || "UGX",
      goodQty: sellingPrice?.goodQty || GoodQty.PIECE,
      baseAmount: sellingPrice?.baseAmount!,
      specialBaseAmount: sellingPrice?.specialBaseAmount,
      wholesaleAmount: sellingPrice?.wholesaleAmount!,
      isCurrentPrice: sellingPrice?.isCurrentPrice || true,
      specialWholesaleAmount: sellingPrice?.specialWholesaleAmount,
      promotionAmount: sellingPrice?.promotionAmount,
      otherGoodQty: sellingPrice?.otherGoodQty,
      commodityId: sellingPrice?.commodityId || commodity.id,
      effectiveDateAt: sellingPrice?.effectiveDateAt || today,
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom">
        <div className="h-svh px-4">
          <SheetHeader>
            <SheetTitle>
              {sellingPrice
                ? "Update selling price"
                : "Create a new selling price"}
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <div className="flex w-full h-full   max-w-9xl mx-auto gap-3">
              <SellingPriceSection
                form={form}
                sellingPrice={sellingPrice}
                setOpen={setOpen}
                className="max-w-5xl mx-auto flex-2"
              />
              <RecentOrderPricesSection
                commodity={commodity}
                className="flex flex-col flex-1 bg-muted/50 max-w-md self-stretch"
              />
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
