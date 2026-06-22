import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CloudOffIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="grow flex items-center justify-center px-4 text-center">
      <Empty>
        <EmptyMedia>
          <CloudOffIcon
            className="size-32 fill-primary/50 text-primary"
            strokeWidth={0.5}
          />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found </EmptyTitle>
          <EmptyDescription>
            The resource you are looking for does not exist, or it has been
            relocated.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant={"secondary"} asChild>
            <Link href={"/"}>Go back home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
