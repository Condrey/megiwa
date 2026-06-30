import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { MemberData } from "@/lib/types";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  ShieldIcon,
  UserIcon,
  VerifiedIcon,
} from "lucide-react";

interface MemberProfileInformationProps {
  member: MemberData;
}

export function MemberProfileInformation({
  member,
}: MemberProfileInformationProps) {
  const { user, role, createdAt } = member;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="size-5" />
          Profile Information
        </CardTitle>
        <CardDescription>Account details and current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="size-32 sm:size-24"
            />
            {role && (
              <Badge>
                <ShieldIcon className="size-3" />
                {role}
              </Badge>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">
                {!user.emailVerified && (
                  <VerifiedIcon className="fill-green-500 inline text-white" />
                )}
                {user.name}
              </h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <CalendarDaysIcon className="size-4" />
                Member Since
              </div>
              <p className="font-medium">{format(createdAt, "MMMM d, yyyy")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
