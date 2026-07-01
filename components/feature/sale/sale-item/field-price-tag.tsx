import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allSaleTypes, goodQuantities } from "@/lib/enums";
import { SaleType, SellingPrice } from "@/lib/generated/prisma/client";
import { cn, formatCurrency } from "@/lib/utils";
import { SaleItemSchema } from "@/lib/validation";
import { formatDate } from "date-fns";
import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonAddEditSellingPrice from "../../sellingPrice/button-add-edit-sellingPrice";

interface Props {
  form: UseFormReturn<SaleItemSchema>;
  currentSellingPrice: SellingPrice;
}
export function FieldPriceTag({ form, currentSellingPrice }: Props) {
  const commodity = form.watch("commodity");
  const {
    baseAmount,
    currency,
    goodQty,
    otherGoodQty,
    effectiveDateAt,
    promotionAmount,
    specialBaseAmount,
    specialWholesaleAmount,
    wholesaleAmount,
  } = currentSellingPrice;
  const unit = otherGoodQty ?? goodQuantities[goodQty].singular;

  const priceTags: Record<
    SaleType,
    { title: string; price: number | null; abbreviation: string }
  > = {
    WHOLESALE: {
      price: wholesaleAmount,
      title: "Wholesale",
      abbreviation: "Wholesale",
    },
    SPECIAL_WHOLESALE: {
      price: specialWholesaleAmount,
      title: "Special Wholesale",
      abbreviation: "Sp.Wholesale",
    },
    BASE: {
      price: baseAmount,
      title: "Retail",
      abbreviation: "Retail",
    },
    SPECIAL_BASE: {
      price: specialBaseAmount,
      title: "Special Retail",
      abbreviation: "Sp.Retail",
    },
    PROMOTION: {
      price: promotionAmount,
      title: "Promotions",
      abbreviation: "Promotion",
    },
  };
  return (
    <FormField
      control={form.control}
      name="saleType"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue placeholder="price type" className="w-full">
                  {priceTags[field.value].abbreviation}
                </SelectValue>
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>{"Allowed price types"}</SelectLabel>
                <ItemGroup className="divide-y gap-0 w-full ">
                  {allSaleTypes.map((saleType) => {
                    const { price, title } = priceTags[saleType];
                    return (
                      <Fragment key={saleType}>
                        <Item className="p-0.5 gap-0  w-full " asChild>
                          <SelectItem
                            value={saleType}
                            className="items-stretch w-full "
                          >
                            <div
                              className={cn(
                                " flex-col w-full items-stretch flex-1 flex ",
                                !!price && "mb-2",
                              )}
                            >
                              <ItemHeader className="justify-between flex flex-row w-full">
                                <ItemTitle>{title}</ItemTitle>
                                <ItemDescription className="text-xs">
                                  {formatDate(effectiveDateAt, "PP")}
                                </ItemDescription>
                              </ItemHeader>
                              <ItemContent>
                                <ItemDescription className="">
                                  (
                                  <span>
                                    {formatCurrency(price || 0, currency)} per{" "}
                                    {unit}
                                  </span>
                                  )
                                </ItemDescription>
                              </ItemContent>
                            </div>
                          </SelectItem>
                        </Item>
                        {!price && (
                          <ButtonAddEditSellingPrice
                            commodity={commodity}
                            sellingPrice={currentSellingPrice}
                            className="mb-2"
                          >
                            Add {title} price
                          </ButtonAddEditSellingPrice>
                        )}
                      </Fragment>
                    );
                  })}
                </ItemGroup>
                <ButtonAddEditSellingPrice
                  commodity={commodity}
                  className="mb-2 w-full"
                  variant={"secondary"}
                >
                  update all prices
                </ButtonAddEditSellingPrice>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
