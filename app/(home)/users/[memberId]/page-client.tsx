"use client";

import { MemberProfileInformation } from "@/components/feature/organization/members/member-profile-information";
import { useGetMemberDetailsByIdQuery } from "@/components/feature/organization/members/query";
import ErrorContainer from "@/components/query-container/error-container";
import { MemberData } from "@/lib/types";
import { notFound } from "next/navigation";

interface Props {
  memberId: string;
  initialData: MemberData;
}

export default function PageClient({ memberId, initialData }: Props) {
  const query = useGetMemberDetailsByIdQuery({ memberId, initialData });
  const { status, error, data: member } = query;
  if (status === "error") {
    return <ErrorContainer errorMessage={error.message} query={query} />;
  }
  if (!member) notFound();
  return (
    <div className="flex flex-col mx-auto max-w-9xl gap-4 xl:flex-row ">
      <MemberProfileInformation member={member} />
      {/* <pre>{JSON.stringify(member, null, 2)}</pre> */}
    </div>
  );
}
