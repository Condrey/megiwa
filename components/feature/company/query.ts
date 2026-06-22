"use client";

import { useSession } from "@/lib/session-provider";
import { CompanyData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "./action";

export const useCompaniesQuery = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["companies", "organization", session?.activeOrganizationId],
    queryFn: getAllCompanies,
  });
};

export const useCompaniesWithInitialDataQuery = (
  initialData: CompanyData[],
) => {
  const { session } = useSession();
  return useQuery({
    queryKey: ["companies", "organization", session?.activeOrganizationId],
    queryFn: getAllCompanies,
    initialData,
  });
};
