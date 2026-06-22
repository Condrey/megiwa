"use client";

import { GoodQty } from "@/lib/generated/prisma/enums";
import { useQuery } from "@tanstack/react-query";
import { getAllSellingPrices, getCurrentSellingPrice } from "./action";

export const useSellingPricesQuery = (commodityId: string) =>
  useQuery({
    queryKey: ["sellingPrices", commodityId],
    queryFn: async () => await getAllSellingPrices(commodityId),
  });

export const useCurrentSellingPricesQuery = ({
  commodityId,
  goodQty,
}: {
  commodityId: string | undefined;
  goodQty: GoodQty;
}) =>
  useQuery({
    queryKey: ["sellingPrices", commodityId, goodQty],
    queryFn: async () => await getCurrentSellingPrice({ commodityId, goodQty }),
  });
