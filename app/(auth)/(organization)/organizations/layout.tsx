import { Navbar } from "@/app/(home)/navbar";
import { SUPER_ADMIN_USER } from "@/lib/constants";
import { getServerSession } from "@/lib/get-session";
import { forbidden } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getServerSession();
  if (user?.role !== SUPER_ADMIN_USER) forbidden();
  return (
    <div className="">
      <Navbar />
      <main className="p-4 space-y-6">{children}</main>
    </div>
  );
}
