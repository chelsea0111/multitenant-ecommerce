import ProductList, {
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { subcategory } = await params;

  const queryClient = getQueryClient();
  // prefetch
  void queryClient.fetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
