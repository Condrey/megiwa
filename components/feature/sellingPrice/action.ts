"use server";

import { GoodQty } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { sellingPriceSchema, SellingPriceSchema } from "@/lib/validation";
import { cache } from "react";

async function allSellingPrices(commodityId: string) {
  return await prisma.sellingPrice.findMany({ where: { commodityId } });
}
export const getAllSellingPrices = cache(allSellingPrices);

async function currentSellingPrice({
  commodityId,
  goodQty,
}: {
  commodityId: string | undefined;
  goodQty: GoodQty;
}) {
  if (!commodityId) {
    return null;
  }
  return await prisma.sellingPrice.findFirst({
    where: { commodityId, isCurrentPrice: true, goodQty },
  });
}
export const getCurrentSellingPrice = cache(currentSellingPrice);

export async function upsertSellingPrice(input: SellingPriceSchema) {
  const {
    id,
    baseAmount,
    commodityId,
    currency,
    goodQty,
    wholesaleAmount,
    promotionAmount,
    specialBaseAmount,
    specialWholesaleAmount,
    otherGoodQty,
  } = sellingPriceSchema.parse(input);
  // apply auth

  return await prisma.sellingPrice.upsert({
    where: { id },
    create: {
      baseAmount,
      currency,
      goodQty,
      wholesaleAmount,
      promotionAmount,
      specialBaseAmount,
      specialWholesaleAmount,
      effectiveDateAt: new Date(),
      commodityId,
      otherGoodQty,
    },
    update: {
      baseAmount,
      currency,
      goodQty,
      wholesaleAmount,
      promotionAmount,
      specialBaseAmount,
      specialWholesaleAmount,
      effectiveDateAt: new Date(),
      commodityId,
      otherGoodQty,
    },
  });
}
