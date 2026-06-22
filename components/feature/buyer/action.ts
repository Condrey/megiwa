"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { buyerSchema, BuyerSchema } from "@/lib/validation";
import { unauthorized } from "next/navigation";
import { cache } from "react";

async function allBuyers() {
  const { session } = await getServerSession();
  if (!session) unauthorized();
  return await prisma.buyer.findMany({
    where: { organizationId: session.activeOrganizationId! },
    orderBy: { name: "asc" },
  });
}
export const getAllBuyers = cache(allBuyers);

export async function upsertBuyer(input: BuyerSchema) {
  const { session } = await getServerSession();
  if (!session) unauthorized();

  const { id, name, contact, email } = buyerSchema.parse(input);
  return await prisma.buyer.upsert({
    where: { id },
    create: {
      name,
      contact,
      email,
      organizationId: session.activeOrganizationId!,
    },
    update: {
      name,
      contact,
      email,
      organizationId: session.activeOrganizationId!,
    },
  });
}
