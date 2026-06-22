import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "./auth";

export const getServerSession = cache(async () => {
  console.log("getServerSession");
  const sessionValue = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessionValue) return { user: null, session: null };
  return { user: sessionValue.user, session: sessionValue.session };
});
