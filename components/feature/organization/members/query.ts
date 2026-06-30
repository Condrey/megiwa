"use client";

import { MemberData } from "@/lib/auth";
import { useSession } from "@/lib/session-provider";
import { MemberData as PrismaMemberData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  getMemberByMemberId,
  getOrganizationMembersById,
  getOrganizationMembersBySlug,
} from "./action";

export const useOrganizationMembersQuery = ({
  organizationSlug,
  organizationId,
  initialData,
}: {
  organizationSlug?: string;
  organizationId: string;
  initialData: MemberData[];
}) => {
  const query = useQuery({
    queryKey: ["members", "organization", organizationSlug || organizationId],
    initialData,
    queryFn: async () =>
      await (organizationSlug
        ? getOrganizationMembersBySlug(organizationSlug)
        : getOrganizationMembersById(organizationId)),
  });
  return query;
};

export const useGetMemberDetailsByIdQuery = ({
  memberId,
  initialData,
}: {
  memberId: string;
  initialData: PrismaMemberData;
}) => {
  const { session } = useSession();
  const query = useQuery({
    queryKey: [
      "organization",
      session?.activeOrganizationId,
      "memberId",
      memberId,
    ],
    queryFn: async () => await getMemberByMemberId(memberId),
    initialData,
  });
  return query;
};
