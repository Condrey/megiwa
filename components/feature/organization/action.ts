"use server";

import { auth } from "@/lib/auth";
import { SUPER_ADMIN_USER } from "@/lib/constants";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { OrganizationSchema, organizationSchema } from "@/lib/validation";
import {} from "better-auth/plugins";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";
import { cache } from "react";

export const getAllOrganizations = cache(async () => {
  try {
    const { user } = await getServerSession();
    if (!user) return unauthorized();
    if (user.role === SUPER_ADMIN_USER) {
      return await prisma.organization.findMany();
    }
    return forbidden();
  } catch {
    throw new Error("Could not fetch organizations.");
  }
});

export const getOrganizationBySlug = cache(async (slug: string) => {
  return await auth.api.getFullOrganization({
    query: {
      organizationSlug: slug,
    },
    headers: await headers(),
  });
});

export async function upsertOrganization(organization: OrganizationSchema) {
  const { name, slug, logo, metadata, id } =
    organizationSchema.parse(organization);
  const nextHeaders = await headers();
  // To edit the organization
  if (!id) {
    // throw Error(JSON.stringify({ id, name, len: id?.length }));
    // Check if the slug is taken
    await auth.api.checkOrganizationSlug({
      body: {
        slug,
      },
    });
    return await auth.api.createOrganization({
      body: {
        name,
        slug,
        logo,
        // metadata
      },
      headers: nextHeaders,
    });
  }
  // To create a new organization
  else {
    return await auth.api.updateOrganization({
      body: {
        data: {
          name,
          slug,
          logo,
          // metadata
        },
        organizationId: id,
      },
      headers: nextHeaders,
    });
  }
}
