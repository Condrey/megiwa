import { getOrganizationMembersById } from "@/components/feature/organization/members/action";
import ListOfMembers from "@/components/feature/organization/members/list-of-members";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Users and management",
};
export default async function Page() {
  const { session } = await getServerSession();
  if (!session) unauthorized();
  const members = await getOrganizationMembersById(
    session.activeOrganizationId!,
  );

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfMembers
        initialData={members}
        organizationId={session.activeOrganizationId!}
      />
    </div>
  );
}
