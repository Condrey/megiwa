import { getOrganizationBySlug } from "@/components/feature/organization/action";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);

  const organization = await getOrganizationBySlug(slug);
  if (!organization)
    return {
      title: "404-Organization not found",
    };
  return {
    title: organization.name,
  };
}

export default async function Page({ params }: Props) {
  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);

  const organization = await getOrganizationBySlug(slug);
  if (!organization) notFound();
  return <PageClient initialData={organization} slug={slug} />;
}
