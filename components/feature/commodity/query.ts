"use client";

import { useSession } from "@/lib/session-provider";
import { CommodityData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllCommodities, getAllCommodity } from "./action";

export const useCommoditiesQuery = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["commodities", "organization", session?.activeOrganizationId],
    queryFn: getAllCommodities,
  });
};

export const useCommoditiesWithInitialDataQuery = (
  initialData: CommodityData[],
) => {
  const { session } = useSession();

  return useQuery({
    queryKey: ["commodities", "organization", session?.activeOrganizationId],
    queryFn: getAllCommodities,
    initialData,
  });
};

export const useCommodityQuery = (id: string) => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["commodity", "organization", session?.activeOrganizationId],
    queryFn: async () => await getAllCommodity(id),
  });
};

export const useCommodityWithInitialDataQuery = ({
  id,
  initialData,
}: {
  initialData: CommodityData;
  id: string | undefined;
}) => {
  const { session } = useSession();

  return useQuery({
    queryKey: ["commodity", "organization", session?.activeOrganizationId],
    queryFn: async () => await getAllCommodity(id),
    initialData,
  });
};
