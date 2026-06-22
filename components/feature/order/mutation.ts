"use client";

import { useSession } from "@/lib/session-provider";
import { OrderData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertOrder } from "./action";

export function useUpsertOrderMutation() {
  const queryClient = useQueryClient();
  const { session } = useSession();

  return useMutation({
    mutationFn: upsertOrder,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "orders",
        "organization",
        session?.activeOrganizationId,
      ];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.setQueryData<OrderData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });

      toast.success("success", {
        description: !variables.id ? "Order added" : "Order updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate order");
    },
  });
}
