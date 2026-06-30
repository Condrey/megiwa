"use client";

import { authClient } from "@/lib/auth-client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addMember } from "./action";

export function useUpdateMemberRoleMutation(organizationSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      role,
      memberId,
      organizationId,
    }: {
      role: string;
      memberId: string;
      organizationId: string;
    }) => {
      const { error, data } = await authClient.organization.updateMemberRole({
        memberId,
        role,
        organizationId,
      });
      if (error) throw new Error(error.message, { cause: error.status });
      return data;
    },
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["members", "organization", organizationSlug];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.invalidateQueries({ queryKey });

      toast("success", {
        description: `New role is now ${data.role}`,
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to update member role", {
        description: error.message,
      });
    },
  });
}

export function useAddMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMember,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "members",
        "organization",
        variables.organizationId,
      ];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.invalidateQueries({ queryKey });

      toast("success", {
        description: `Member added successfully.`,
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add member.", {
        description: error.message,
      });
    },
  });
}

export function useRemoveMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      organizationId,
      memberIdOrEmail,
    }: {
      memberIdOrEmail: string;
      organizationId: string;
    }) => {
      const { data, error } = await authClient.organization.removeMember({
        memberIdOrEmail,
        organizationId,
      });
      if (error) throw Error(error.message, { cause: error.code });
      return data;
    },
    async onSuccess(data, variables) {
      const queryKey: QueryKey = [
        "members",
        "organization",
        variables.organizationId,
      ];

      await Promise.all([await queryClient.cancelQueries({ queryKey })]);

      queryClient.invalidateQueries({ queryKey });

      toast("success", {
        description: `Member removed successfully.`,
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to remove member.", {
        description: error.message,
      });
    },
  });
}
