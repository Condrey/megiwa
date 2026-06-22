"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { CompanyData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import ButtonAddEditCompany from "./button-add-edit-company";

export const useCompaniesColumns: ColumnDef<CompanyData>[] = [
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
      <DataTableColumnHeader column={column} title="Company" />
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
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell({ row }) {
      const { contact, email, owner } = row.original;
      return (
        <div>
          <div>{owner}</div>
          <div className="text-xs text-muted-foreground">{contact}</div>
          <div className="text-xs text-muted-foreground">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell({ row }) {
      const { location } = row.original;

      return <div>{location}</div>;
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
          <ButtonAddEditCompany size={"icon-sm"} company={row.original}>
            <Edit2Icon />
          </ButtonAddEditCompany>
        </>
      );
    },
  },
];
