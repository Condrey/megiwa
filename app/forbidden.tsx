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
import { UserRoundKeyIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ForbiddenPage() {
  const pathname = usePathname();
  return (
    <main className="grow flex items-center justify-center px-4 text-center">
      <Empty>
        <EmptyMedia>
          <UserRoundKeyIcon
            className="size-32 fill-primary/50 text-primary"
            strokeWidth={0.5}
          />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>403 - Forbidden </EmptyTitle>
          <EmptyDescription>
            You do not have the right permissions to access this resource.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ButtonGroup>
            <Button variant={"secondary"} asChild>
              <Link href={`/sign-in?redirect=${pathname}`}>Sign in</Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href={"/"}>Go back home</Link>
            </Button>
          </ButtonGroup>
        </EmptyContent>
      </Empty>
    </main>
  );
}
