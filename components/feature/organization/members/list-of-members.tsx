"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { Button } from "@/components/ui/button";
import { ActiveOrganization } from "@/lib/auth";
import { MailIcon, PlusIcon } from "lucide-react";
import ButtonInviteMember from "../invitations/button-invite-member";
import ButtonAddMember from "./button-add-member";
import { useMembersColumns } from "./columns";
import { useOrganizationMembersQuery } from "./query";

interface Props {
  initialData: ActiveOrganization["members"];
  organizationSlug?: string;
  organizationId: string;
}

export default function ListOfMembers({
  initialData,
  organizationSlug,
  organizationId,
}: Props) {
  const query = useOrganizationMembersQuery({
    organizationSlug,
    organizationId,
    initialData,
  });
  const columns = useMembersColumns(organizationSlug || organizationId!);
  const { data: members, status } = query;
  if (status === "error") {
    return (
      <ErrorContainer errorMessage="Failed to fetch members " query={query} />
    );
  }
  if (!members.length) {
    return (
      <EmptyContainer
        title="No members"
        description="There are no members for this organization"
      >
        <Button>Add Member</Button>
      </EmptyContainer>
    );
  }
  return (
    <DataTable
      data={members}
      columns={columns}
      filterColumn={{ id: "user_name", label: "member name" }}
      className="w-full"
    >
      <ButtonInviteMember size={"sm"} variant={"secondary"}>
        <MailIcon /> Member
      </ButtonInviteMember>
      <ButtonAddMember size={"sm"} variant={"secondary"}>
        <PlusIcon /> Member
      </ButtonAddMember>
    </DataTable>
  );
}
