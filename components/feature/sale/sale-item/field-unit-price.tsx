import { NumberInput } from "@/components/number-input/number-input";
import ErrorContainer from "@/components/query-container/error-container";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { goodQuantities } from "@/lib/enums";
import { GoodQty } from "@/lib/generated/prisma/enums";
import { SaleItemSchema } from "@/lib/validation";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonAddEditSellingPrice from "../../sellingPrice/button-add-edit-sellingPrice";
import { useCurrentSellingPricesQuery } from "../../sellingPrice/query";
import { FieldPriceTag } from "./field-price-tag";

interface Props {
  form: UseFormReturn<SaleItemSchema>;
}
export function FieldUnitPrice({ form }: Props) {
  const commodityId = form.watch("commodity.id");
  const goodQty = form.watch("goodQty") || GoodQty.PIECE;

  const query = useCurrentSellingPricesQuery({ commodityId, goodQty });
  const { data: currentSellingPrice, status } = query;

  useEffect(() => {
    const price = currentSellingPrice?.baseAmount;
    form.setValue("unitPrice", price || 0);
  }, [currentSellingPrice?.baseAmount, form]);
  if (status === "error") {
    return (
      <ErrorContainer
        query={query}
        errorMessage="Failed to load selling prices"
        className="min-h-0 gap-0.5 p-0.5"
      />
    );
  }
  if (status === "pending") {
    return (
      <div className="gap-3 flex flex-col md:flex-row w-full">
        <Skeleton className="h-9 w-5/12" />
        <Skeleton className="h-9 w-6/12" />
      </div>
    );
  }
  if (!commodityId) {
    return <span className="">Commodity not selected</span>;
  }
  if (!currentSellingPrice) {
    return (
      <ButtonAddEditSellingPrice
        type="button"
        commodity={form.watch("commodity")}
      >
        Add Selling Price per {goodQuantities[goodQty].singular}
      </ButtonAddEditSellingPrice>
    );
  }

  return (
    <>
      <FormField
        control={form.control}
        name={"unitPrice"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <NumberInput placeholder="unit price" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FieldPriceTag form={form} currentSellingPrice={currentSellingPrice} />
    </>
  );
}
