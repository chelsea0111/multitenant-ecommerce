import { ChekcoutView } from "@/modules/checkout/ui/views/checkout-view";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <ChekcoutView tenantSlug={slug} />;
};

export default Page;
