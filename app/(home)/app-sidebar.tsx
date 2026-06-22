"use client";

import { ActiveUserOrganization } from "@/components/feature/organization/active-user-organizaton";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { UserDropdown } from "@/components/user-dropdown";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import {
  NavLink,
  NavLinkGroup,
  organizationNavLinkGroup,
  roleBasedNavLinks,
  SUPER_ADMIN_USER,
} from "@/lib/constants";
import { useSession } from "@/lib/session-provider";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Loader2Icon, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { unauthorized, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open: isOpen } = useSidebar();
  const { user, session } = useSession();

  if (!user || !session) unauthorized();
  const query = useQuery({
    queryKey: ["navLinks", "user", user.id],
    queryFn: async () =>
      await roleBasedNavLinks({
        organizationId: session?.activeOrganizationId ?? undefined,
        userId: session?.userId,
      }),
  });
  const { data: navLinks, status, error } = query;
  return (
    <Sidebar className="not-only:bg-primary" collapsible="icon" {...props}>
      <SidebarHeader className=" pb-6">
        <SidebarMenu className="">
          <SidebarMenuItem>
            <ActiveUserOrganization />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={cn(isOpen && "px-0")}>
        <>
          {user.role === SUPER_ADMIN_USER && (
            <SidebarGroup className={cn(isOpen && "px-0")}>
              <SidebarGroupLabel>Super Admin only </SidebarGroupLabel>
              <SidebarMenu>
                <ParentMenuItem item={organizationNavLinkGroup} index={0} />
              </SidebarMenu>
            </SidebarGroup>
          )}
        </>

        {status === "error" ? (
          <ErrorContainer errorMessage={error.message} query={query} />
        ) : status === "pending" ? (
          <div role="alert" className="space-y-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="w-full h-16" />
            ))}
          </div>
        ) : !navLinks ? (
          <EmptyContainer
            title="Empty nav links"
            description="You do not have any nav links items for your role"
          ></EmptyContainer>
        ) : (
          <SidebarGroup className={cn(isOpen && "px-0")}>
            <SidebarGroupLabel>Navigation Menu </SidebarGroupLabel>
            <SidebarMenu>
              {navLinks.map((item, index) => (
                <ParentMenuItem key={item.href} item={item} index={index} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function ParentMenuItem({
  item,
  index,
}: {
  item: NavLinkGroup;
  index: number;
}) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { open: isOpen, isMobile, setOpen } = useSidebar();

  const ItemIcon = item.icon!;
  const isActive = item.children.some((i) => pathname.startsWith(i.href));
  const noDropDown = index === 0 || !item.children.length;
  const { getNavigationLinkWithPathnameWithoutUpdate } =
    useCustomSearchParams();
  const [openCollapsible, setOpenCollapsible] = useState(isActive);

  const url = noDropDown
    ? getNavigationLinkWithPathnameWithoutUpdate(item.href)
    : "#";
  const iconClassName = cn(
    " [&_svg]:size-5.5   group-hover/parent-link:text-sidebar-accent-foreground",
    !isOpen && "ms-1",
  );

  return (
    <>
      <Collapsible
        key={item.title}
        defaultOpen={openCollapsible}
        onOpenChange={setOpenCollapsible}
        className="group/collapsible"
        asChild
      >
        <SidebarMenuItem className={cn(openCollapsible && " ")}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={isActive}
              size={"lg"}
              onClick={() =>
                startTransition(() => {
                  if (noDropDown) {
                    setOpenMobile(false);
                  } else {
                    // to un-collapse sidebar upon clicking a button
                    if (!isMobile && !isOpen) {
                      setOpen(true);
                    }
                  }
                })
              }
              className={cn("group/parent-link")}
              asChild
            >
              <Link href={url}>
                {item.icon && (
                  <>
                    {isPending ? (
                      <Spinner className={iconClassName} />
                    ) : (
                      <ItemIcon className={iconClassName} />
                    )}
                  </>
                )}
                <span
                  className={cn("line-clamp-1 text-ellipsis wrap-break-word")}
                >
                  {item.title}
                </span>
                {!noDropDown ? (
                  <ChevronRight
                    className={
                      "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    }
                  />
                ) : (
                  <MoveUpRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                )}
              </Link>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {item.children?.length ? (
            <CollapsibleContent className={cn(" *:space-y-2 ")}>
              <SidebarMenuSub className="block ">
                {item.children.map((i) => (
                  <MenuItem parentLink={item.href} item={i} key={i.href} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          ) : (
            <></>
          )}
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}

function MenuItem({ item, parentLink }: { item: NavLink; parentLink: string }) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const isActive = pathname.startsWith(item.href) && pathname !== "/";

  const { getNavigationLinkWithPathnameWithoutUpdate } =
    useCustomSearchParams();
  const url = getNavigationLinkWithPathnameWithoutUpdate(item.href);
  return (
    <SidebarMenuSubItem key={item.title} className="">
      <SidebarMenuSubButton
        title={item.description}
        onClick={() =>
          startTransition(() => {
            setOpenMobile(false);
          })
        }
        asChild
        isActive={isActive}
      >
        <Link href={url} className="h-fit py-1 flex gap-2">
          {isPending && <Loader2Icon className="animate-spin size-4" />}
          {item.title}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
