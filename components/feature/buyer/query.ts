"use client";

import { useSession } from "@/lib/session-provider";
import { BuyerData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllBuyers } from "./action";

export const useBuyersQuery = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["buyers", "organization", session?.activeOrganizationId],
    queryFn: getAllBuyers,
  });
};

export const useBuyersWithInitialDataQuery = (initialData: BuyerData[]) => {
  const { session } = useSession();

  return useQuery({
    queryKey: ["buyers", "organization", session?.activeOrganizationId],
    queryFn: getAllBuyers,
    initialData,
  });
};
