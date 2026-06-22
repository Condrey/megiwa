"use client";

import { SellingPrice } from "@/lib/generated/prisma/client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertSellingPrice } from "./action";

const queryKey: QueryKey = ["sellingPrices"];
const queryKey2: QueryKey = ["commodities"];
const queryKey3: QueryKey = ["sellingPrices"];

export function useUpsertSellingPriceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertSellingPrice,
    async onSuccess(data, variables) {
      await Promise.all([
        await queryClient.cancelQueries({ queryKey }),
        await queryClient.cancelQueries({ queryKey: queryKey2 }),
        await queryClient.cancelQueries({ queryKey: queryKey3 }),
      ]);
      queryClient.setQueryData<SellingPrice[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      toast.success("success", {
        description: !variables.id
          ? "Selling price added"
          : "Selling price updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate selling price");
    },
  });
}
