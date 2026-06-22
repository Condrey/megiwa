import codingInFlowLogo from "@/assets/logo.webp";
import { ModeToggle } from "@/components/mode-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { UserDropdown } from "@/components/user-dropdown";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";
import { organization } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function Navbar() {
  const [data, session] = await Promise.all([
    await auth.api.getFullOrganization({ headers: await headers() }),
    await getServerSession(),
  ]);

  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {!data ? (
            <Image
              src={codingInFlowLogo}
              alt="Coding in Flow logo"
              width={32}
              height={32}
              className="border-muted rounded-full border"
            />
          ) : data.logo ? (
            <Image
              src={data.logo}
              alt="logo"
              width={32}
              height={32}
              className="border-muted rounded-full border"
            />
          ) : (
            <UserAvatar name={data.name} image={data.logo} />
          )}
          {data?.name || organization}
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
