/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserAvatar } from "@/components/user-avatar";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import { ActiveOrganization } from "@/lib/auth";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { ArrowUpRightIcon, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import ButtonRemoveMember from "./button-remove-member";
import ButtonUpdateMemberRole from "./button-update-member-role";

export const useMembersColumns = (
  organizationSlug: string,
): ColumnDef<ActiveOrganization["members"][0]>[] => [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member" />
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
            <div className="text-muted-foreground text-xs">{email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" className="w-32" />
    ),
    cell({ row }) {
      const { role, id, organizationId } = row.original;
      return (
        <ButtonUpdateMemberRole
          organizationSlug={organizationSlug}
          memberId={id}
          organizationId={organizationId}
          variant={"ghost"}
          className="group/role flex gap-1 items-center w-32"
        >
          <div className="underline decoration-dotted underline-offset-2">
            {role}
          </div>
          <div className="group-hover/role:text-green-500  ">
            <EditIcon className="size-4 inline" />{" "}
            <span className="hidden group-hover/role:inline">Edit</span>
          </div>
        </ButtonUpdateMemberRole>
      );
    },
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
      const { id } = row.original;
      const [isPending, startTransition] = useTransition();
      const { getNavigationLinkWithPathnameWithoutUpdate } =
        useCustomSearchParams();
      const url = getNavigationLinkWithPathnameWithoutUpdate(`/users/${id}`);
      return (
        <div className="space-x-3">
          <ButtonRemoveMember member={row.original} variant={"destructive"}>
            <TrashIcon />
            Remove
          </ButtonRemoveMember>
          <Button onClick={() => startTransition(() => {})} asChild>
            <Link href={url}>
              View {isPending ? <Spinner /> : <ArrowUpRightIcon />}
            </Link>
          </Button>
        </div>
      );
    },
  },
];
