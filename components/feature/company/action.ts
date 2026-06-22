"use server";

import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { companySchema, CompanySchema } from "@/lib/validation";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";
import { cache } from "react";

async function allCompanies() {
  const { session } = await getServerSession();
  if (!session) unauthorized();
  return await prisma.company.findMany({
    where: { organizationId: session.activeOrganizationId! },
  });
}
export const getAllCompanies = cache(allCompanies);

export async function upsertCompany(input: CompanySchema) {
  const { id, name, contact, email, location, owner } =
    companySchema.parse(input);

  const [loggedInSession, activeUser] = await Promise.all([
    await getServerSession(),
    await auth.api.getActiveMember({
      headers: await headers(),
    }),
  ]);
  const { user, session } = loggedInSession;
  const { role } = activeUser;

  if (!user) unauthorized();
  if (role === "member") forbidden();

  return await prisma.company.upsert({
    where: { id },
    create: {
      name,
      contact,
      email,
      location,
      owner,
      organizationId: session.activeOrganizationId!,
    },
    update: {
      name,
      contact,
      email,
      location,
      owner,
      organizationId: session.activeOrganizationId!,
    },
  });
}
