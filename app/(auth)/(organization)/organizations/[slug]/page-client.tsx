"use client";

import { getOrganizationBySlug } from "@/components/feature/organization/action";
import ListOfMembers from "@/components/feature/organization/members/list-of-members";
import SendButton from "@/components/feature/organization/members/send-button";
import SlugOrganizationDetails from "@/components/feature/organization/slug-organization-details";
import ErrorContainer from "@/components/query-container/error-container";
import { ActiveOrganization } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface Props {
  slug: string;
  initialData: ActiveOrganization;
}

export default function PageClient({ slug, initialData }: Props) {
  const query = useQuery({
    queryKey: ["organization", "slug", slug],
    queryFn: async () => getOrganizationBySlug(slug),
    initialData,
  });
  const { status, error, data: organization } = query;
  if (status === "error") {
    return <ErrorContainer errorMessage={error.message} query={query} />;
  }
  if (!organization) notFound();
  return (
    <div className="flex flex-col mx-auto max-w-9xl gap-4 xl:flex-row ">
      <SlugOrganizationDetails
        organization={organization}
        className="max-h-fit md:max-w-sm w-full"
      />
      <SendButton />
      <ListOfMembers
        initialData={organization.members}
        organizationSlug={organization.slug}
      />
    </div>
  );
}
