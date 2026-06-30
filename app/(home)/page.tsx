import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "",
};

export default async function Page() {
  const { user } = await getServerSession();

  if (!user) unauthorized();

  return <></>;
}
