import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export function useActiveUserOrganizationQuery(userId: string) {
  return useQuery({
    queryKey: ["active-organization", "user", userId],
    queryFn: async () => {
      const { data: activeOrganization } = authClient.useActiveOrganization();
      return activeOrganization;
    },
  });
}
