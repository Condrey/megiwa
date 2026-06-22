"use server";

import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { commodityDataInclude } from "@/lib/types";
import { commoditySchema, CommoditySchema } from "@/lib/validation";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";
import { cache } from "react";

// All organization members can view all commodities
async function allCommodities() {
  const { session, user } = await getServerSession();
  if (!user) unauthorized();
  return await prisma.commodity.findMany({
    where: { organizationId: session.activeOrganizationId! },
    include: commodityDataInclude,
  });
}
export const getAllCommodities = cache(allCommodities);

// All organization members can view a unique commodity
async function commodityById(id: string | undefined) {
  if (!id) return null;

  const { session, user } = await getServerSession();
  if (!user) unauthorized();

  return await prisma.commodity.findUnique({
    where: { id, organizationId: session.activeOrganizationId! },
    include: commodityDataInclude,
  });
}
export const getAllCommodity = cache(commodityById);

// Adding and Editing commodities is reserved for all members but member role
export async function upsertCommodity(input: CommoditySchema) {
  const { id, name, commodityMetadata, company } = commoditySchema.parse(input);

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

  return await prisma.commodity.upsert({
    where: { id },
    create: {
      name,
      commodityMetadata,
      company: { connect: { id: company?.id } },
      organization: { connect: { id: session.activeOrganizationId! } },
    },
    update: {
      name,
      commodityMetadata,
      company: { connect: { id: company?.id } },
      organization: { connect: { id: session.activeOrganizationId! } },
    },
    include: commodityDataInclude,
  });
}
