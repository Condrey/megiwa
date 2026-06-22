"use client";

import { useSession } from "@/lib/session-provider";
import { SaleData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertSale } from "./action";

export function useUpsertSaleMutation() {
  const queryClient = useQueryClient();
  const { session } = useSession();

  return useMutation({
    mutationFn: upsertSale,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "sales",
        "organization",
        session?.activeOrganizationId,
      ];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.setQueryData<SaleData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });

      toast.success("success", {
        description: !variables.id ? "Sale added" : "Sale updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate sale");
    },
  });
}
