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
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default ProductList;

export const ProductListSkeleton = () => {
  return <Loader />;
};
