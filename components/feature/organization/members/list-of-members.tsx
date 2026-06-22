"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";
import { ActiveOrganization } from "@/lib/auth";
import { useMembersColumns } from "./columns";

interface Props {
  initialData: ActiveOrganization["members"];
  organizationSlug: string;
}

export default function ListOfMembers({
  initialData,
  organizationSlug,
}: Props) {
  // const query = useQuery({
  //     queryKey:['members','organization',organizationSlug],
  //     queryFn:
  // })
  const members = initialData;
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
    <DataTable data={members} columns={useMembersColumns} className="w-full" />
  );
}
