"use client";

import { useSession } from "@/lib/session-provider";
import { SaleData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllSales } from "./action";

export const useSalesQuery = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["sales", "organization", session?.activeOrganizationId],
    queryFn: getAllSales,
  });
};

export const useSalesWithInitialDataQuery = (initialData: SaleData[]) => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["sales", "organization", session?.activeOrganizationId],
    queryFn: getAllSales,
    initialData,
  });
};
