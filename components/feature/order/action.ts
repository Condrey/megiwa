"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { orderDataInclude } from "@/lib/types";
import { orderSchema, OrderSchema } from "@/lib/validation";
import { unauthorized } from "next/navigation";
import { cache } from "react";

async function allOrders() {
  const { session } = await getServerSession();
  if (!session) unauthorized();
  return await prisma.order.findMany({
    where: { organizationId: session.activeOrganizationId! },
    include: orderDataInclude,
  });
}
export const getAllOrders = cache(allOrders);

export async function upsertOrder(input: OrderSchema) {
  const { id, company, orderItems, totalAmount } = orderSchema.parse(input);

  const { session, user } = await getServerSession();
  if (!user) unauthorized();

  return await prisma.order.upsert({
    where: { id },
    create: {
      companyId: company.id!,
      totalAmount,
      orderItems: {
        createMany: {
          data: orderItems.map((item) => ({
            amount: item.amount,
            currency: item.currency,
            goodQty: item.goodQty,
            quantity: item.quantity,
            otherGoodQty: item.otherGoodQty,
            commodityId: item.commodity.id!,
          })),
          skipDuplicates: true,
        },
      },
      orderedById: user.id,
      organizationId: session.activeOrganizationId!,
    },
    update: {
      companyId: company.id!,
      totalAmount,
      orderItems: {
        set: [],
        createMany: {
          data: orderItems.map((item) => ({
            amount: item.amount,
            currency: item.currency,
            goodQty: item.goodQty,
            quantity: item.quantity,
            otherGoodQty: item.otherGoodQty,
            commodityId: item.commodity.id!,
          })),
          skipDuplicates: true,
        },
      },
      orderedById: user.id,
      organizationId: session.activeOrganizationId!,
    },
    include: orderDataInclude,
  });
}
