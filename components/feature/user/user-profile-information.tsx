import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { User } from "@/lib/auth";
import { format } from "date-fns";
import { CalendarDaysIcon, ShieldIcon, UserIcon } from "lucide-react";

interface UserProfileInformationProps {
  user: User;
}

export function UserProfileInformation({ user }: UserProfileInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="size-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Your account details and current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="size-32 sm:size-24"
            />
            {user.role && (
              <Badge>
                <ShieldIcon className="size-3" />
                {user.role}
              </Badge>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <CalendarDaysIcon className="size-4" />
                User Since
              </div>
              <p className="font-medium">
                {format(user.createdAt, "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
