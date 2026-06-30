"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user-avatar";
import { goodQuantities } from "@/lib/enums";
import { SaleData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Edit2Icon, Edit3Icon, PrinterIcon, VerifiedIcon } from "lucide-react";
import ButtonAddEditSale from "./button-add-edit-sale";

export const useSalesColumns: ColumnDef<SaleData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "buyer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell({ row }) {
      const { totalAmount, buyer } = row.original;
      return (
        <div>
          <div>{buyer.name}</div>
          <div>{formatCurrency(totalAmount)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.saleItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Items" />
    ),
    cell({ row }) {
      const {
        _count: { saleItems: count },
        saleItems,
        totalAmount,
      } = row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <div className="underline decoration-dotted hover:text-primary underline-offset-2">
              {`${formatNumber(count)} sale item${count === 1 ? "" : "s"}`}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-sm font-mono space-y-4">
            <ul>
              {saleItems.map(
                ({
                  amount,
                  id,
                  commodity,
                  currency,
                  goodQty,
                  quantity,

                  otherGoodQty,
                }) => {
                  const { singular, plural } = goodQuantities[goodQty];
                  const unit =
                    otherGoodQty ?? (quantity === 1 ? singular : plural);
                  return (
                    <li key={id} className="flex items-center">
                      <span>
                        {formatNumber(quantity)}
                        {unit}
                        <span className="text-muted-foreground mx-1">x</span>
                        {commodity.name}
                      </span>
                      <hr className="flex-1" />
                      <span>{formatCurrency(amount, currency, false)}</span>
                    </li>
                  );
                },
              )}
            </ul>
            <hr className="decoration-double my-1" />
            <div className="flex justify-between items-center ">
              <span className="text-muted-foreground">Total amount:</span>{" "}
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-end items-center">
              <ButtonAddEditSale sale={row.original}>
                <Edit3Icon /> Update
              </ButtonAddEditSale>
              <Button>
                <PrinterIcon /> Print
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "payments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payments" />
    ),
    cell({ row }) {
      const { payments, totalAmount } = row.original;
      const totalPayments = payments.reduce((amm, tot) => amm + tot.amount, 0);
      const hasBalance = totalAmount > totalPayments;
      if (!payments.length)
        return (
          <span className="italic text-destructive">No payments made</span>
        );

      return (
        <div className="flex gap-3">
          {hasBalance ? (
            <div>
              <div>
                <span className="text-muted-foreground text-xs italic mr-2">
                  Paid
                </span>
                {formatCurrency(totalAmount)}
              </div>
              <div>
                <span className="text-muted-foreground text-xs italic mr-2">
                  Bal of
                </span>
                {formatCurrency(totalAmount - totalPayments)}
              </div>
            </div>
          ) : (
            <div>
              <Badge>Fully paid</Badge>
              {totalPayments > totalAmount && (
                <span>{`+ ${formatCurrency(totalPayments - totalAmount)}`}</span>
              )}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "soldBy.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold By" />
    ),
    cell({ row }) {
      const { soldBy } = row.original;
      if (!soldBy) return "N/A";
      const { name, contact, email, role, image, emailVerified } = soldBy;
      return (
        <div className="flex gap-3">
          <UserAvatar image={image} name={name} className="size-12" />
          <div>
            <div>
              {emailVerified && <VerifiedIcon className="size-4 mr-1" />}
              {name}
            </div>
            <div>
              <Badge variant={"outline"}>{role}</Badge>
              {contact ?? email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "saleDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale date" />
    ),
    cell({ row }) {
      const { updatedAt, soldAt } = row.original;
      const isUpdated = updatedAt.toDateString() !== soldAt.toDateString();
      return (
        <div>
          <div>{formatDate(soldAt, "PPP")}</div>
          {isUpdated && (
            <div className="text-xs text-muted-foreground">
              {formatDate(soldAt, "PPP")} (updated)
            </div>
          )}
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
        <>
          <ButtonAddEditSale size={"icon-sm"} sale={row.original}>
            <Edit2Icon />
          </ButtonAddEditSale>
        </>
      );
    },
  },
];
