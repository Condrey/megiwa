"use client";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertOrganization } from "./action";

const queryKey: QueryKey = ["list-of-organizations"];

export function useUpsertOrganizationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertOrganization,
    async onSuccess(data, variables) {
      const queryKey2 = ["organization", "slug", variables.slug];

      await Promise.all([
        await queryClient.cancelQueries({ queryKey }),
        await queryClient.cancelQueries({ queryKey: queryKey2 }),
      ]);

      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });

      toast.success("success", {
        description: !variables.id
          ? "Organization added"
          : "Organization updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to update organization");
    },
  });
}
