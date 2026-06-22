"use client";

import { useSession } from "@/lib/session-provider";
import { OrderData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "./action";

export const useOrdersQuery = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["orders", "organization", session?.activeOrganizationId],
    queryFn: getAllOrders,
  });
};

export const useOrdersWithInitialDataQuery = (initialData: OrderData[]) => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["orders", "organization", session?.activeOrganizationId],
    queryFn: getAllOrders,
    initialData,
  });
};
