"use client";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import { Organization } from "@/lib/generated/prisma/client";
import { formatDate } from "date-fns";
import { Building2Icon, HistoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function OrganizationContainer({
  organization: { name, slug, createdAt, updatedAt, logo },
}: {
  organization: Organization;
}) {
  const isUpdate = updatedAt.toString() !== createdAt.toString();
  const { getNavigationLinkWithPathnameWithoutUpdate } =
    useCustomSearchParams();
  const url = getNavigationLinkWithPathnameWithoutUpdate(
    `/organizations/${slug}`,
  );
  return (
    <Item variant={"muted"} asChild>
      <Link href={url}>
        <ItemMedia>
          {!logo ? (
            <Building2Icon className="size-32" strokeWidth={0.5} />
          ) : (
            <Image height={500} width={500} alt="logo" src={logo} />
          )}
        </ItemMedia>
        <ItemHeader>
          <ItemTitle>{name}</ItemTitle>
        </ItemHeader>
        <ItemContent>
          <ItemDescription>Slug: {slug}</ItemDescription>
        </ItemContent>
        <ItemFooter className="text-xs flex-col items-start text-muted-foreground">
          <span>
            <HistoryIcon className="inline mr-1 size-3.5" />
            {formatDate(createdAt, "PPPppp")}
          </span>
          {isUpdate && <span>{formatDate(updatedAt, "PPPppp")}</span>}
        </ItemFooter>
      </Link>
    </Item>
  );
}
