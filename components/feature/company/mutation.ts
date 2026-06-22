"use client";

import { useSession } from "@/lib/session-provider";
import { CompanyData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertCompany } from "./action";

export function useUpsertCompanyMutation() {
  const queryClient = useQueryClient();
  const { session } = useSession();

  return useMutation({
    mutationFn: upsertCompany,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "companies",
        "organization",
        session?.activeOrganizationId,
      ];
      const queryKey2: QueryKey = [
        "commodities",
        "organization",
        session?.activeOrganizationId,
      ];

      await Promise.all([
        queryClient.cancelQueries({ queryKey }),
        queryClient.cancelQueries({ queryKey: queryKey2 }),
      ]);

      queryClient.setQueryData<CompanyData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });

      queryClient.invalidateQueries({ queryKey: queryKey2 });

      toast.success("success", {
        description: !variables.id ? "Company added" : "Company updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate company");
    },
  });
}
