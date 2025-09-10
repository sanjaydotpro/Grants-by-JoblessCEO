"use client";

import React, { useEffect, useState } from "react";
import NewsTips from "./NewsTips";
import Image from "next/image";
import { allCategories } from "@/data/inputs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  TbBulbFilled,
  TbGridDots,
  TbLayoutGrid,
  TbList,
  TbNews,
  TbCaretUpDownFilled,
  TbTags,
  TbFilter,
  TbGitCompare,
  TbFilterOff,
  TbCoinEuroFilled,
  TbX,
  TbAlertTriangleFilled,
  TbSearch,
  TbCaretUp,
  TbCaretDown,
  TbCaretUpFilled,
  TbCaretDownFilled,
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Tags from "./Tags";
import useTagOperations from "@/store/slices/tagOperations";
import { Separator } from "@/components/ui/separator";
import SidebarFilters from "./FiltersSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TbFilterPlus } from "react-icons/tb";
import { SingleCardGridView } from "./SingleCardGridView";
import useCompareCardsOperations from "@/store/slices/compareCardsOperations";

import useMediaQuery from "@/hooks/use-media-query";
import FiltersDrawer from "./FiltersDrawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Categories from "./Categories";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { OrganisedTags } from "@/types";

interface CardsProps {
  initialFilters: OrganisedTags | null;
  filtersError: string | null;
}

function Cards({ initialFilters, filtersError }: CardsProps) {
  const { activeFilters, handleFilterAdd, handleFilterRemoval } =
    useTagOperations();

  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: any) => state.sidebar.isOpen);

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeComparisions, handleResetClick } = useCompareCardsOperations();
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("default");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams?.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const totalPages = Math.ceil(numberOfResults / resultsPerPage);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    if (page !== 1) {
      const newUrl = `/discover/credit-cards?page=${page}`;
      router.push(newUrl);
    } else {
      const newUrl = `/discover/credit-cards`;
      router.push(newUrl);
    }
  };

  //handle search filter, add search term to the activeFilters
  const handleSearchFilter = (searchTerm: string) => {
    handleFilterRemoval({ filter: "search" });

    if (searchTerm.length > 0) {
      handleFilterAdd({
        filter: "search",
        id: 901,
        label: `Search: ${searchTerm}`,
        value: searchTerm,
      });
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 min-h-fit my-5">
        <div className="justify-center w-full" id="cardSection">
          <div className="flex flex-col md:flex-row mb-6 justify-between">
            <div className="searchCards flex items-center gap-3 relative md:w-1/2 w-full md:mb-0 mb-4">
              <div className="searchBar gap-1 relative h-[42px] w-full">
                {/* Search Icon */}
                <TbSearch className="h-6 w-6 mt-2 absolute left-3 text-slate-600 dark:text-slate-400" />

                <Input
                  placeholder="Search for a card"
                  defaultValue={activeFilters.search?.[0]?.value || ""}
                  className="pl-14 pr-10 text-md h-full"
                  onChange={(e) => {
                    const value = e.target.value;
                    clearTimeout((window as any).searchTimeout);
                    (window as any).searchTimeout = setTimeout(() => {
                      handleSearchFilter(value);
                    }, 500);
                  }}
                />
                {activeFilters.search?.[0]?.value && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => {
                      handleSearchFilter("");
                      (
                        document.querySelector(
                          'input[placeholder="Search for a card"]'
                        ) as HTMLInputElement
                      ).value = "";
                    }}
                  >
                    <TbX className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </button>
                )}
              </div>
              {isDesktop ? (
                <Button
                  className="allFiltersToggle flex items-center gap-2 h-[42px] text-md"
                  onClick={() => dispatch(toggleSidebar())}
                  variant="secondary"
                >
                  <TbFilter className="h-6 w-6" />
                  Filters
                </Button>
              ) : (
                <div className="xl:hidden">
                  <FiltersDrawer
                    allFilters={initialFilters}
                    isLoading={false}
                    error={filtersError}
                  />
                </div>
              )}
            </div>
            <div className="sortView w-full md:w-auto mt-4 md:mt-2">
              <div className="flex items-center space-x-4 h-6 justify-between">
                <Select onValueChange={setSortOption}>
                  <SelectTrigger className="w-full md:w-[220px] border-none text-slate-600 dark:text-slate-400">
                    <SelectValue
                      placeholder="Sort by (asc) "
                      className="border-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="border-none">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="joiningFee">Joining Fee</SelectItem>
                    <SelectItem value="renewalFee">Renewal Fee</SelectItem>
                    <SelectItem value="forexFee">Foreign Markup Fee</SelectItem>
                  </SelectContent>
                </Select>
                {/* TODO: More Card View Options */}
                {/* <Separator orientation="vertical" />
                <div className="layoutChange flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                  <button
                    className="icon-wrap chart text-slate-100"
                    aria-label="Layout view"
                    disabled
                  >
                    <TbLayoutGrid className="h-6 w-6 ml-1" strokeWidth={1.5} />
                  </button>
                  <button
                    className="icon-wrap table hover:text-slate-500"
                    aria-label="List view"
                  >
                    <TbList className="h-6 w-6 ml-1" strokeWidth={1.5} />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <Categories />
          <div className="w-full mb-4 mt-4">
            {Object.keys(activeFilters).length !== 0 && <Tags />}
          </div>
          <div className="cardsListWrapper flex w-full justify-center ">
            <div
              className={`${
                isSidebarOpen
                  ? "extendedFilters hidden xl:flex w-1/4 sticky overflow-y-auto overflow-x-hidden z-10 bg-background top-5 max-h-[95vh] "
                  : "hidden"
              }`}
            >
              <SidebarFilters
                allFilters={initialFilters}
                isLoading={false}
                error={filtersError}
              />
            </div>
            <div
              className={`cardsList grid ${
                isSidebarOpen
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-min w-3/4"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full"
              } gap-4 gap-y-7 mx-2 items-center`}
            >
              {/* get all the cards in grid view */}
              <SingleCardGridView
                key={`card-list-${currentPage}-${sortOption}`}
                pageNo={currentPage}
                activeFilters={activeFilters}
                resultsPerPage={resultsPerPage}
                setNumberOfResults={setNumberOfResults}
                sortOption={sortOption}
              />

              {/* Bottom Compare Floating Bar */}
              {activeComparisions.length > 1 && (
                <div className="floatingButtonCompare fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-35 rounded-full flex justify-between shadow-lg py-2 px-4 bg-linear-to-r from-orange-300 to-red-400">
                  {/* Add a button to close this bar */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex items-center gap-2 cursor-pointer mr-3 text-black opacity-60 hover:opacity-100"
                          onClick={() => handleResetClick()}
                        >
                          <TbX className="h-5 w-5 mr-2" strokeWidth={4} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear All</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outlineNone"
                          className="startComparision rounded-3xl text-black dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-none h-10"
                        >
                          <TbGitCompare className="h-4 w-4 mr-2 font-extrabold" />
                          <span>Compare</span>
                          {activeComparisions.length > 0 && (
                            <span className="compareCounter bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">
                              {activeComparisions.length}
                            </span>
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to Compare</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {/* Pagination */}
              <div className="w-full col-span-full m-4 mb-10">
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationPrevious
                          onClick={(e) => handlePageChange(currentPage - 1)}
                        />
                      )}
                      {totalPages <= 3 && (
                        <>
                          {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                              <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={(e) => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                        </>
                      )}
                      {totalPages > 3 && (
                        <>
                          {currentPage > 2 && (
                            <PaginationItem>
                              <PaginationLink
                                onClick={(e) => handlePageChange(1)}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                          )}
                          {currentPage > 3 && <span>...</span>}
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationLink
                                onClick={(e) =>
                                  handlePageChange(currentPage - 1)
                                }
                              >
                                {currentPage - 1}
                              </PaginationLink>
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              isActive={true}
                              onClick={(e) => e.preventDefault()}
                            >
                              {currentPage}
                            </PaginationLink>
                          </PaginationItem>
                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationLink
                                onClick={(e) =>
                                  handlePageChange(currentPage + 1)
                                }
                              >
                                {currentPage + 1}
                              </PaginationLink>
                            </PaginationItem>
                          )}
                          {currentPage < totalPages - 2 && <span>...</span>}
                          {currentPage < totalPages - 1 && (
                            <PaginationItem>
                              <PaginationLink
                                onClick={(e) => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          )}
                        </>
                      )}
                      {currentPage < totalPages && (
                        <PaginationNext
                          onClick={(e) => handlePageChange(currentPage + 1)}
                        />
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
