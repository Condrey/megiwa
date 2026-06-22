"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { SaleData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Edit2Icon, VerifiedIcon } from "lucide-react";
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
      <DataTableColumnHeader column={column} title="Sale By Buyer" />
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
      } = row.original;
      return (
        <div>
          <div>{`${formatNumber(count)} sale item${count === 1 ? "" : "s"}`}</div>
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
