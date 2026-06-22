"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
  const pathname = usePathname();

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
          <EmptyDescription>
            Please sign in or register to continue...
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ButtonGroup>
            <Button variant={"secondary"} asChild>
              <Link href={`/sign-in?redirect=${pathname}`}>Sign in</Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href={`/sign-up?redirect=${pathname}`}>Register</Link>
            </Button>
          </ButtonGroup>
        </EmptyContent>
      </Empty>
    </main>
  );
}
