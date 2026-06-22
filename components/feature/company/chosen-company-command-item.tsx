import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { CompanyData } from "@/lib/types";
import { cn, getColorsFromText, getNameInitials } from "@/lib/utils";
import { CheckIcon, DotIcon } from "lucide-react";

interface Props {
  company: CompanyData | undefined;
  isChecked: boolean;
  avatarSize?: string;
  className?: string;
}
export function CommandItemCompany({
  company,
  isChecked,
  avatarSize = "45px",
  className,
}: Props) {
  if (!company) {
    return null;
  }
  const { contact, email, name } = company;
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
          <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-xl font-bold">
            {getNameInitials(name)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>
          <span>{contact}</span>
          {email && (
            <>
              <DotIcon />
              {email}
            </>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        {isChecked && <CheckIcon className="text-success" />}
      </ItemActions>
    </Item>
  );
}

export function ChosenCompanyCommandItem({
  company,
}: {
  company: CompanyData | undefined;
}) {
  if (!company) return null;
  const { contact, name } = company;
  return (
    <div className="flex max-w-md justify-between gap-2 items-center">
      <p className="line-clamp-1 text-ellipsis">{name}</p>
      <span className="text-muted-foreground text-xs">
        {obscureText({ text: contact || "" })}
      </span>
    </div>
  );
}

const obscureText = ({
  text,
  endLen = 3,
  startLen = 2,
}: {
  text: string;
  startLen?: number;
  endLen?: number;
}) => {
  const textLen = text.length;
  if (startLen >= textLen) {
    return `'${text}`;
  }
  const start = text.substring(0, startLen!);
  const middleLen = text.substring(startLen!, textLen).length;
  const middle = Array.from({ length: middleLen }, () => {})
    .map(() => "*")
    .join("");
  const end = text.substring(textLen - endLen);
  return start + middle + end;
};
