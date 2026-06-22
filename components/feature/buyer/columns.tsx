"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { BuyerData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Edit2Icon } from "lucide-react";
import ButtonAddEditBuyer from "./button-add-edit-buyer";

export const useBuyersColumns: ColumnDef<BuyerData>[] = [
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
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell({ row }) {
      const { name } = row.original;
      return (
        <div>
          <div>{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell({ row }) {
      const { contact } = row.original;
      return (
        <div>
          <div>{contact}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell({ row }) {
      const { email } = row.original;
      return (
        <div>
          <div>{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created on" />
    ),
    cell({ row }) {
      const { createdAt, updatedAt } = row.original;
      const isUpdated = updatedAt.toDateString() !== createdAt.toDateString();
      return (
        <div>
          <div>{formatDate(createdAt, "PPP")}</div>
          {isUpdated && (
            <div className="text-xs text-muted-foreground">
              {formatDate(createdAt, "PPP")} (updated)
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
          <ButtonAddEditBuyer size={"icon-sm"} buyer={row.original}>
            <Edit2Icon />
          </ButtonAddEditBuyer>
        </>
      );
    },
  },
];
