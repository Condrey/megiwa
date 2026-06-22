"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UserAvatar } from "@/components/user-avatar";
import { ActiveOrganization } from "@/lib/auth";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const useMembersColumns: ColumnDef<ActiveOrganization["members"][0]>[] =
  [
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
        const {
          user: { name, email, image },
        } = row.original;
        return (
          <div className="flex gap-2">
            <UserAvatar image={image} name={name} />

            <div className="">
              <div>{name}</div>
              <div>{email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined since" />
      ),
      cell({ row }) {
        return <div>{formatDate(row.original.createdAt, "PPP")}</div>;
      },
    },
    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell({ row }) {
        return <></>;
      },
    },
  ];
