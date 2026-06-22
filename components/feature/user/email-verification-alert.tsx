import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import Link from "next/link";

export function EmailVerificationAlert() {
  return (
    <Alert variant={"warning"} className="max-w-9xl mx-auto">
      <MailIcon />
      <AlertTitle>Un-verified email address</AlertTitle>
      <AlertDescription>
        Please verify your email address to access all features.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" asChild>
          <Link href="/verify-email">Verify Email</Link>
        </Button>
      </AlertAction>
    </Alert>
  );
}
