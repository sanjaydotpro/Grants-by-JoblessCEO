import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscoverySkeleton() {
  return (
    <div
      className="container mx-auto min-h-fit px-4 sm:px-8 md:px-16 xl:px-24 mt-8"
      id="discover"
    >
      <div className="flex flex-row gap-2 min-h-fit my-5">
        <div className="justify-center w-full" id="cardSection">
          <div className="flex flex-col md:flex-row mb-6 justify-between">
            <div className="searchCards flex items-center gap-3 relative md:w-1/2 w-full md:mb-0 mb-4">
              <Skeleton className="h-[42px] w-full" />
              <Skeleton className="h-[42px] w-[100px]" />
            </div>
            <div className="sortView w-full md:w-auto mt-4 md:mt-2">
              <Skeleton className="h-[36px] w-[220px]" />
            </div>
          </div>
          <Skeleton className="h-[45px] w-full mb-4" />
          <div className="cardsListWrapper flex w-full justify-center">
            <div className="cardsList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-4 gap-y-7 mx-2 items-center">
              {[...Array(12)].map((_, index) => (
                <div className="w-full rounded-lg p-2" key={index}>
                  <Skeleton className="h-[169px] w-full sm:w-[266px]" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full sm:w-[250px] mt-2" />
                    <Skeleton className="h-8 w-full sm:w-[200px]" />
                    <Skeleton className="h-16 w-full sm:w-[266px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full col-span-full m-4 mb-10">
            <Skeleton className="h-[40px] w-[300px] mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
