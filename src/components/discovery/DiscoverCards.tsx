import React from "react";
import Cards from "@/components/discovery/Cards";
import { FetchFilters } from "@/components/discovery/FetchFilters";

export default async function DiscoverCards() {
  const { allFilters, error } = await FetchFilters();

  return (
    <div
      className="container mx-auto min-h-fit px-4 sm:px-8 md:px-16 xl:px-24 mt-8"
      id="discover"
    >
      <Cards initialFilters={allFilters} filtersError={error} />
    </div>
  );
}
