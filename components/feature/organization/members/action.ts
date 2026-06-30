"use server";

import { auth, MemberData } from "@/lib/auth";
import { DEFAULT_PASSWORD } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { memberDataInclude } from "@/lib/types";
import { signUpSchema, SignUpSchema } from "@/lib/validation";
import { headers } from "next/headers";
import { cache } from "react";

export const getMemberByMemberId = cache(async (memberId: string) => {
  return await prisma.member.findUnique({
    where: {
      id: memberId,
    },
    include: memberDataInclude,
  });
});

export const getOrganizationMembersBySlug = cache(
  async (organizationSlug: string): Promise<MemberData[]> => {
    const data = await auth.api.listMembers({
      query: { organizationSlug },
      headers: await headers(),
    });
    return data.members;
  },
);

export const getOrganizationMembersById = cache(
  async (organizationId: string): Promise<MemberData[]> => {
    const data = await auth.api.listMembers({
      query: { organizationId },
      headers: await headers(),
    });
    return data.members;
  },
);

export async function addMember({
  input,
  organizationId,
}: {
  input: SignUpSchema;
  organizationId: string;
}) {
  const { email, name } = signUpSchema.parse(input);
  return await auth.api
    .signUpEmail({
      body: {
        email,
        password: DEFAULT_PASSWORD,
        name,
      },
      headers: await headers(),
    })
    .then(
      async (data) =>
        await auth.api.addMember({
          body: {
            userId: data.user.id,
            role: "member",
            organizationId: organizationId,
          },
          headers: await headers(),
        }),
    );
}
