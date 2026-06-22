import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { CommodityData } from "@/lib/types";
import { cn, getColorsFromText, getNameInitials } from "@/lib/utils";
import { CommodityMetadataSchema } from "@/lib/validation";
import { CheckIcon } from "lucide-react";
import { flattenCommodityMetadata } from "./utils";

interface Props {
  commodity: CommodityData | undefined;
  isChecked: boolean;
  avatarSize?: string;
  className?: string;
}
export function CommandItemCommodity({
  commodity,
  isChecked,
  avatarSize = "45px",
  className,
}: Props) {
  if (!commodity) {
    return null;
  }
  const { name, commodityMetadata, company } = commodity;
  const { color2: BG_GRADIENT } = getColorsFromText(name);

  return (
    <Item className={cn("w-full", className)}>
      <ItemMedia>
        <Avatar
          style={
            {
              "--avatar-size": avatarSize,
              "--bg-gradient": BG_GRADIENT,
            } as React.CSSProperties
          }
          className="size-(--avatar-size)"
        >
          <AvatarImage src={undefined} alt="user profile" />
          <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-xl font-bold text-shadow-xs">
            {getNameInitials(name)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="text-xs line-clamp-1">
          {company.name}
        </ItemDescription>
        <ItemDescription className="line-clamp-1 text-xs">
          {flattenCommodityMetadata(
            commodityMetadata as CommodityMetadataSchema,
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        {isChecked && <CheckIcon className="text-success" />}
      </ItemActions>
    </Item>
  );
}

export function ChosenCommodityCommandItem({
  commodity,
}: {
  commodity: CommodityData | undefined;
}) {
  if (!commodity) return null;
  const { name } = commodity;
  return (
    <div className="flex max-w-md justify-between gap-2 items-center">
      <p className="line-clamp-1 text-ellipsis">
        {name},{" "}
        <span className="text-xs text-muted-foreground">
          {commodity.company.name}
        </span>
      </p>
    </div>
  );
}
