import React, { Suspense } from "react";

import Navbar from "@/modules/home/ui/components/navbar";
import Footer from "@/modules/home/ui/components/footer";
import {
  SearchFilterSkeleton,
  SearchFilters,
} from "@/modules/home/ui/components/search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  children: React.ReactNode;
  data: CategoriesGetManyOutput;
}

const Layout = async ({ children }: Props) => {
  // the server component will prefetch categories before going into client component
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* parse data into SearchFilters*/}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
