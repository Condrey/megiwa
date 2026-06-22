import ButtonAcceptDenyInvitation from "@/components/feature/organization/invitaions/button-accept-deny-invitation";
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
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MailOpenIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const getInvitationById = cache(
  async (id: string) =>
    await prisma.invitation.findUnique({
      where: { id },
      include: { organization: { select: { name: true } }, user: true },
    }),
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: encodedId } = await params;
  const id = decodeURIComponent(encodedId);

  const invitation = await getInvitationById(id);
  if (!invitation)
    return {
      title: "Broken url",
    };
  return {
    title: `${invitation.organization.name} | Accept invitation`,
  };
}

export default async function Page({ params }: Props) {
  const { id: encodedId } = await params;
  const id = decodeURIComponent(encodedId);

  const [invitation, authSession] = await Promise.all([
    await getInvitationById(id),
    await auth.api.getSession({ headers: await headers() }),
  ]);

  if (!invitation) notFound();
  if (!authSession?.user)
    redirect(
      `/sign-up?redirect=${encodeURIComponent("/invitation/accept-invitation/" + id)}&email=${encodeURIComponent(invitation.email)}`,
    );
  const {
    organization: { name },
    user,
  } = invitation;
  return (
    <div className="flex flex-col items-center gap-16 h-svh p-3 justify-center">
      <Empty className="max-w-md bg-muted w-full">
        <EmptyMedia>
          <MailOpenIcon
            className="size-32 text-green-500 fill-green-500/50"
            strokeWidth={0.5}
          />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Invitation to join {name}</EmptyTitle>
          <EmptyDescription>
            {user.name} has invited you to collaborate on {name}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ButtonGroup className="w-full *:flex-1">
            <ButtonAcceptDenyInvitation
              decision="deny"
              invitationId={id}
              variant="destructive"
            >
              Decline
            </ButtonAcceptDenyInvitation>
            <ButtonAcceptDenyInvitation
              decision="accept"
              invitationId={id}
              variant="default"
            >
              Accept
            </ButtonAcceptDenyInvitation>
          </ButtonGroup>
        </EmptyContent>
      </Empty>
      <div className="">
        <span className="text-muted-foreground">
          Can not get a hold of the invitation?{" "}
        </span>
        <Button variant={"link"} asChild>
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
