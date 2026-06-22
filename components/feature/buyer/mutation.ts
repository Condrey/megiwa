"use client";

import { useSession } from "@/lib/session-provider";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertBuyer } from "./action";

export function useUpsertBuyerMutation() {
  const queryClient = useQueryClient();
  const { session } = useSession();

  return useMutation({
    mutationFn: upsertBuyer,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "buyers",
        "organization",
        session?.activeOrganizationId,
      ];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.invalidateQueries({ queryKey });

      toast.success("success", {
        description: !variables.id ? "Buyer added" : "Buyer updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate buyer");
    },
  });
}
