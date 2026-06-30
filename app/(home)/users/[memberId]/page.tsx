import { getMemberByMemberId } from "@/components/feature/organization/members/action";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ memberId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { memberId: encodedMemberId } = await params;
  const memberId = decodeURIComponent(encodedMemberId);

  const member = await getMemberByMemberId(memberId);
  if (!member)
    return {
      title: "404-Member not found",
    };
  return {
    title: member.user.name,
  };
}

export default async function Page({ params }: Props) {
  const { memberId: encodedMemberId } = await params;
  const memberId = decodeURIComponent(encodedMemberId);

  const member = await getMemberByMemberId(memberId);
  if (!member) notFound();
  return <PageClient initialData={member} memberId={memberId} />;
}
