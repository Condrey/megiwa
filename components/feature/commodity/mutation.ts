"use client";

import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertCommodity } from "./action";

const queryKey: QueryKey = ["commodities"];

export function useUpsertCommodityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertCommodity,
    async onSuccess(data, variables) {
      await Promise.all([await queryClient.cancelQueries({ queryKey })]);
      queryClient.invalidateQueries({ queryKey });

      toast.success("success", {
        description: !variables.id ? "Commodity added" : "Commodity updated",
      });
    },
    onError(error) {
      console.error(error.message, "is error name");
      if (error instanceof PrismaClientValidationError) {
        // handle Prisma validation errors specifically
        toast.error(error.message);
      }
      toast.error("Failed to manipulate commodity");
    },
  });
}
