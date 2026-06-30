import {
  Building2Icon,
  CoinsIcon,
  FileTextIcon,
  HandCoinsIcon,
  HouseIcon,
  LucideIcon,
  ShapesIcon,
  UserKeyIcon,
  Users2Icon,
} from "lucide-react";
import { authClient } from "./auth-client";

export const MOBILE_MAX_ITEMS = 10;
export const SUPER_ADMIN_USER = "super-admin";
export const DEFAULT_PASSWORD = "defaultPassword123!";
export type NavLink = { title: string; href: string; description: string };
export type NavLinkGroup = {
  title: string;
  href: string;
  showOnMediumScreen: boolean;
  description: string;
  children: NavLink[];
  icon?: LucideIcon;
};

export const userManagementNavLinkGroup: NavLinkGroup = {
  title: "Users & Mg't",
  href: "/users",
  description: "View all",
  icon: Users2Icon,
  children: [
    {
      title: "All users and managers",
      href: "/users",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};
export const homeNavLinkGroup: NavLinkGroup = {
  title: "Home",
  href: "/",
  description: "View all",
  icon: HouseIcon,
  children: [],
  showOnMediumScreen: true,
};
export const organizationNavLinkGroup: NavLinkGroup = {
  title: "Organizations",
  href: "/organizations",
  description: "View all",
  icon: UserKeyIcon,
  showOnMediumScreen: true,
  children: [],
};
export const commoditiesNavLinkGroup: NavLinkGroup = {
  title: "Commodities",
  href: "/commodities",
  description: "View all",
  icon: ShapesIcon,
  children: [
    {
      title: "All Commodities",
      href: "/commodities",
      description: "",
    },
    {
      title: "Out of stock",
      href: "/commodities/out-of-stock",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};
export const companiesNavLinkGroup: NavLinkGroup = {
  title: "Companies",
  href: "/companies",
  description: "View all",
  icon: Building2Icon,
  children: [
    {
      title: "All Companies",
      href: "/companies",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};
export const ordersNavLinkGroup: NavLinkGroup = {
  title: "Orders",
  href: "/orders",
  description: "View all",
  icon: FileTextIcon,
  children: [
    {
      title: "All Orders",
      href: "/orders",
      description: "",
    },
    {
      title: "Pending Payments",
      href: "/orders/pending-payments",
      description: "",
    },
    {
      title: "My Suppliers",
      href: "/orders/suppliers",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};
export const salesNavLinkGroup: NavLinkGroup = {
  title: "Sales",
  href: "/sales",
  description: "View all",
  icon: CoinsIcon,
  children: [
    {
      title: "All Sales",
      href: "/sales",
      description: "",
    },
    {
      title: "Projections",
      href: "/sales/projections",
      description: "",
    },
    {
      title: "Invoices",
      href: "/sales/invoices",
      description: "",
    },
    {
      title: "Delivery Notes",
      href: "/sales/delivery-notes",
      description: "",
    },
    {
      title: "Debts",
      href: "/sales/debts",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};
export const buyersNavLinkGroup: NavLinkGroup = {
  title: "Buyers",
  href: "/buyers",
  description: "View all",
  icon: HandCoinsIcon,
  children: [
    {
      title: "All Buyers",
      href: "/buyers",
      description: "",
    },
  ],
  showOnMediumScreen: true,
};

export const roleBasedNavLinks = async ({
  organizationId,
  userId,
}: {
  userId: string;
  organizationId: string | undefined;
}): Promise<NavLinkGroup[] | null> => {
  const { data, error } = await authClient.organization.getActiveMemberRole({
    query: { organizationId, userId },
  });
  if (error) throw new Error(error.message || "Error fetching NavLinks");
  switch (data.role) {
    case "owner":
      return [
        homeNavLinkGroup,
        salesNavLinkGroup,
        ordersNavLinkGroup,
        commoditiesNavLinkGroup,
        companiesNavLinkGroup,
        buyersNavLinkGroup,
        userManagementNavLinkGroup,
      ];
    case "admin":
      return [
        homeNavLinkGroup,
        salesNavLinkGroup,
        ordersNavLinkGroup,
        commoditiesNavLinkGroup,
        companiesNavLinkGroup,
        buyersNavLinkGroup,
        userManagementNavLinkGroup,
      ];
    default:
      return [
        homeNavLinkGroup,
        salesNavLinkGroup,
        ordersNavLinkGroup,
        commoditiesNavLinkGroup,
        companiesNavLinkGroup,
        buyersNavLinkGroup,
        userManagementNavLinkGroup,
      ];
  }
};
