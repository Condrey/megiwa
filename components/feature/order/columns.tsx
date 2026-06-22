"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { OrderData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Edit2Icon, VerifiedIcon } from "lucide-react";
import ButtonAddEditOrder from "./button-add-edit-order";

export const useOrdersColumns: ColumnDef<OrderData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "company.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order from company" />
    ),
    cell({ row }) {
      const { company, totalAmount } = row.original;
      return (
        <div>
          <div>{company.name}</div>
          <div>{formatCurrency(totalAmount)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.orderItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Items" />
    ),
    cell({ row }) {
      const { _count } = row.original;
      const count = _count.orderItems;
      return (
        <div>
          <div>{`${formatNumber(count)} order item${count === 1 ? "" : "s"}`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "orderedBy.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered By" />
    ),
    cell({ row }) {
      const { orderedBy } = row.original;
      if (!orderedBy) return "N/A";
      const { name, contact, email, role, image, emailVerified } = orderedBy;
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
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order date" />
    ),
    cell({ row }) {
      const { orderDate, updatedAt } = row.original;
      const isUpdated = updatedAt.toDateString() !== orderDate.toDateString();
      return (
        <div>
          <div>{formatDate(orderDate, "PPP")}</div>
          {isUpdated && (
            <div className="text-xs text-muted-foreground">
              {formatDate(orderDate, "PPP")} (updated)
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
          <ButtonAddEditOrder size={"icon-sm"} order={row.original}>
            <Edit2Icon />
          </ButtonAddEditOrder>
        </>
      );
    },
  },
];
