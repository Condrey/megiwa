"use server";

import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { saleDataInclude } from "@/lib/types";
import { saleSchema, SaleSchema } from "@/lib/validation";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { cache } from "react";

async function allSales() {
  const { session } = await getServerSession();
  if (!session) unauthorized();

  return await prisma.sale.findMany({
    where: { organizationId: session.activeOrganizationId! },
    include: saleDataInclude,
  });
}
export const getAllSales = cache(allSales);

// Everyone can make a sale
// but
// only admins and owner can edit sale
export async function upsertSale(input: SaleSchema) {
  const { session, user } = await getServerSession();
  if (!session) unauthorized();

  const { id, saleItems, buyerId, totalAmount, payment } =
    saleSchema.parse(input);
  const balance = totalAmount - payment;

  if (!id) {
    return await prisma.sale.create({
      data: {
        buyerId,
        totalAmount,
        saleItems: {
          createMany: {
            data: saleItems.map((item) => ({
              amount: item.quantity * item.unitPrice,
              currency: item.currency,
              goodQty: item.goodQty,
              quantity: item.quantity,
              otherGoodQty: item.otherGoodQty,
              commodityId: item.commodity.id!,
              unitPrice: item.unitPrice,
              saleType: item.saleType,
            })),
            skipDuplicates: true,
          },
        },
        payments: {
          create: {
            amount: payment,
            buyerId,
            userId: session.userId,
          },
        },
        balance,
        soldById: session.userId,
        organizationId: session.activeOrganizationId!,
      },
      include: saleDataInclude,
    });
  } else {
    const { role } = await auth.api.getActiveMemberRole({
      headers: await headers(),
    });
    if (role === "member")
      throw new Error("You do not have the right permissions to edit a sale");
    return await prisma.sale.update({
      where: { id },
      data: {
        buyerId,
        totalAmount,
        saleItems: {
          deleteMany: {},
          createMany: {
            data: saleItems.map((item) => ({
              amount: item.quantity * item.unitPrice,
              currency: item.currency,
              goodQty: item.goodQty,
              quantity: item.quantity,
              otherGoodQty: item.otherGoodQty,
              commodityId: item.commodity.id!,
              unitPrice: item.unitPrice,
              saleType: item.saleType,
            })),
            skipDuplicates: true,
          },
        },
        payments: {
          create: {
            amount: payment,
            buyerId,
            userId: session.userId,
          },
        },
        balance,
        soldById: session.userId,
        organizationId: session.activeOrganizationId!,
      },
      include: saleDataInclude,
    });
  }
}
