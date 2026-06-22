import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Organization } from "better-auth/plugins";
import { formatDate } from "date-fns";
import { Edit2Icon, HistoryIcon, TextCursorInputIcon } from "lucide-react";
import ButtonAddEditOrganization from "./button-add-edit-organization";

interface Props {
  organization: Organization;
  className?: string;
}

export default function SlugOrganizationDetails({
  organization,
  className,
}: Props) {
  const { name, slug, createdAt, logo, metadata } = organization;
  return (
    <Card className={className}>
      <CardHeader className="">
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <TextCursorInputIcon className="inline mr-1 size-4" />
          slug: <span className="text-card-foreground select-all">{slug}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-muted-foreground text-xs">
          <HistoryIcon className="size-3.5 inline mr-1 " />
          {formatDate(createdAt, "PPPpp")}
        </span>

        <CardAction>
          <ButtonAddEditOrganization organization={organization} className="">
            <Edit2Icon /> Update
          </ButtonAddEditOrganization>
        </CardAction>
      </CardContent>
    </Card>
  );
}
