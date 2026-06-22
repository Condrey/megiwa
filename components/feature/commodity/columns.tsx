"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { goodQuantities } from "@/lib/enums";
import { CommodityData } from "@/lib/types";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { CommodityMetadataSchema } from "@/lib/validation";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import DropDownMenuCommodity from "./drop-down-menu-commodity";
import { flattenCommodityMetadata } from "./utils";

export const useCommoditiesColumns: ColumnDef<CommodityData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commodity" />
    ),
    cell({ row }) {
      const { commodityMetadata, name, company } = row.original;
      return (
        <div>
          <div>{name}</div>
          <div>{company.name}</div>
          <div className="text-xs text-muted-foreground">
            {flattenCommodityMetadata(
              commodityMetadata as CommodityMetadataSchema,
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "company.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell({ row }) {
      const {
        company: { name, location },
      } = row.original;
      return (
        <div>
          <div>{name}</div>
          <div className="text-xs text-muted-foreground">{location}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "sellingPrices",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selling Prices" />
    ),
    cell({ row }) {
      const {
        sellingPrices,
        id: commodityId,
        _count: { sellingPrices: numberOfPrices },
      } = row.original;
      if (!numberOfPrices) return <div>No selling prices set yet.</div>;
      const currentSellingPrices = sellingPrices.filter(
        (sp) => sp.isCurrentPrice,
      );
      if (!currentSellingPrices.length)
        return <div>No current selling prices set yet.</div>;
      return (
        <div>
          <HoverCard>
            <HoverCardTrigger className="underline text-primary">
              {`(${formatNumber(numberOfPrices)}) See the price${numberOfPrices === 1 ? "" : "s"}`}
            </HoverCardTrigger>
            <HoverCardContent className="w-full max-w-4xl">
              {currentSellingPrices.slice(0, 3).map((sellingPrice) => {
                const {
                  id,
                  baseAmount,
                  currency,
                  effectiveDateAt,
                  goodQty,
                  promotionAmount,
                  specialBaseAmount,
                  specialWholesaleAmount,
                  wholesaleAmount,
                  otherGoodQty,
                  isCurrentPrice,
                } = sellingPrice;
                const unit = otherGoodQty ?? goodQuantities[goodQty].singular;
                return (
                  <Item key={id}>
                    <ItemContent>
                      <ItemTitle>
                        Price per {unit}{" "}
                        {isCurrentPrice && (
                          <Badge variant={"secondary"}>Current</Badge>
                        )}
                      </ItemTitle>
                      <ItemDescription>
                        Effective from {formatDate(effectiveDateAt, "PPP")}
                      </ItemDescription>
                    </ItemContent>
                    <ItemContent>
                      <ul className="list-inside list-disc">
                        <li className='before:content-["Retail:_"] '>
                          {formatCurrency(baseAmount, currency)}{" "}
                          <span className="text-muted-foreground">
                            per {unit}
                          </span>
                        </li>
                        <li className='before:content-["Wholesale:_"]'>
                          {formatCurrency(wholesaleAmount, currency)}{" "}
                          <span className="text-muted-foreground">
                            per {unit}
                          </span>
                        </li>
                        {promotionAmount && (
                          <li className='before:content-["Promotion:_"]'>
                            {formatCurrency(promotionAmount, currency)}{" "}
                            <span className="text-muted-foreground">
                              per {unit}
                            </span>
                          </li>
                        )}
                        {specialBaseAmount && (
                          <li className='before:content-["Special_Retail:_"]'>
                            {formatCurrency(specialBaseAmount, currency)}{" "}
                            <span className="text-muted-foreground">
                              per {unit}
                            </span>
                          </li>
                        )}
                        {specialWholesaleAmount && (
                          <li className='before:content-["Special_Wholesale:_"]'>
                            {formatCurrency(specialWholesaleAmount, currency)}{" "}
                            <span className="text-muted-foreground">
                              per {unit}
                            </span>
                          </li>
                        )}
                      </ul>
                    </ItemContent>
                  </Item>
                );
              })}
              <div className="max-w-fit w-full mx-auto">
                {numberOfPrices > 3 && (
                  <Link
                    href={`/commodities/${commodityId}`}
                    className={cn(buttonVariants())}
                  >
                    View all Prices
                  </Link>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell({ row }) {
      return (
        <DropDownMenuCommodity commodity={row.original}>
          <MoreHorizontalIcon />
        </DropDownMenuCommodity>
      );
    },
  },
];
