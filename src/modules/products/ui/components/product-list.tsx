"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import { useProductFilters } from "../../hooks/use-product-filters";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}
const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
  const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          tenantSlug,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastpage) => {
            return lastpage.docs.length > 0 ? lastpage.nextPage : undefined;
          },
        }
      )
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No products</p>
      </div>
    );
  }
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((prod) => (
            // <div key={prod.id} className="border rounded-md bg-white p-4">
            //   <h2 className="text-xl font-medium">{prod.name}</h2>
            //   <h2>${prod.price}</h2>
            // </div>
            <ProductCard
              key={prod.id}
              id={prod.id}
              name={prod.name}
              imageUrl={prod.image?.url}
              tenantSlug={prod.tenant?.slug}
              tenantImageUrl={prod.tenant?.image?.url}
              reviewRating={prod.reviewRating}
              reviewCount={prod.reviewCount}
              price={prod.price}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="elevated"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductList;

export const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
