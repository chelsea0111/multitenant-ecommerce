"use client";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

import CategoriesSidebar from "./categories-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
interface Props {
  disabled?: boolean;
  // data: CustomCategory[];
}

const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showLibraryButton, setShowLibraryButton] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  React.useEffect(() => {
    setShowLibraryButton(!!session.data?.user);
  }, [session.data?.user]);
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <CategoriesSidebar
          open={isSidebarOpen}
          // data={data}
          onOpenChange={setSidebarOpen}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products..."
          disabled={disabled}
        />
      </div>
      {/* Add categories view all button */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => {
          setSidebarOpen(true);
        }}
      >
        <ListFilterIcon />
      </Button>

      {showLibraryButton && (
        <Button variant="elevated" asChild>
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            My Courses
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
