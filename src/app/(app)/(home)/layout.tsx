import React from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import Navbar from "./navbar";
import Footer from "./footer";
import SearchFilters from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
  data: CustomCategory[];
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate subcategories
    pagination: false,
    where: { parent: { exists: false } },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      ...(sub as Category),
      subcategories: undefined,
    })),
  }));

  // console.log("formattedData", formattedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
