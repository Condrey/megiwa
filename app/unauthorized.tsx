import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="grow flex items-center justify-center px-4 text-center">
      <Empty>
        <EmptyMedia>
          <LockKeyholeIcon
            className="size-32 fill-destructive/50 text-destructive"
            strokeWidth={0.5}
          />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>401 - Unauthorized </EmptyTitle>
          <EmptyDescription>Please sign in to continue...</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant={"secondary"} asChild>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
