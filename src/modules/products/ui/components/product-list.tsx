"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";

interface Props {
  category?: string;
}
const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category })
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((prod) => (
        <div key={prod.id} className="border rounded-md bg-white p-4">
          <h2 className="text-xl font-medium">{prod.name}</h2>
          <h2>${prod.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

export const ProductListSkeleton = () => {
  return <Loader />;
};
