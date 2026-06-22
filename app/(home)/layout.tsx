import { EmailVerificationAlert } from "@/components/feature/user/email-verification-alert";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/get-session";
import SessionProvider from "@/lib/session-provider";
import { cookies } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import { Navbar } from "./navbar";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;

  const defaultOpen = sidebarState === "true";

  if (!session) unauthorized();
  if (!session.session?.activeOrganizationId) forbidden();

  return (
    <SessionProvider value={session}>
      <div className="[--header-height:cal(--spacing(14))]">
        <SidebarProvider defaultOpen={defaultOpen} className="">
          <AppSidebar />
          <SidebarInset className="">
            <div>
              <header>
                <Navbar />
              </header>
              <main className="p-4 space-y-6">
                {!session.user?.emailVerified && <EmailVerificationAlert />}
                {children}
              </main>
              <footer></footer>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </SessionProvider>
  );
}
