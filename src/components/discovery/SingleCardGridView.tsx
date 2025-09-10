"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Card, Category, Currency } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import Lottie from "lottie-react";
import fuelIcon from "@/components/ui/lottie-icons/fuel.json";
import airplaneIcon from "@/components/ui/lottie-icons/airplane.json";
import cashbackIcon from "@/components/ui/lottie-icons/cashback.json";
import freeIcon from "@/components/ui/lottie-icons/freeCard.json";
import currencyIcon from "@/components/ui/lottie-icons/currencyExchange.json";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPopover from "@/components/ui/custom-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  TbCoins,
  TbGasStation,
  TbHelpCircleFilled,
  TbPlaneDeparture,
  TbSquareRoundedNumber0,
  TbTicket,
  TbGiftFilled,
  TbInfoCircle,
  TbPercentage,
  TbCaretUp,
  TbCaretDown,
  TbHeart,
  TbHeartFilled,
  TbCurrencyEuro,
  TbArrowRightBar,
} from "react-icons/tb";
import useCompareCardsOperations from "@/store/slices/compareCardsOperations";
import { allCategories } from "@/data/inputs";
import useMediaQuery from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { getAllCards } from "@/app/services/discover/getAllCards";
import { GetCardsResponse, OrganisedTags, SingleTag } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

export function SingleCardGridView({
  pageNo = 1,
  resultsPerPage = 12,
  activeFilters,
  setNumberOfResults,
  sortOption,
}: {
  pageNo?: number;
  resultsPerPage?: number;
  activeFilters: OrganisedTags;
  setNumberOfResults: (number: number) => void;
  sortOption: string;
}) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const { activeComparisions, handleCardToggle } = useCompareCardsOperations();

  const [cards, setCards] = React.useState<GetCardsResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const transformFilters = (filters: OrganisedTags) => {
    const transformed: { [key: string]: string[] | number[] } = {};
    for (const [key, value] of Object.entries(filters)) {
      const isNumericFilter = [
        "income",
        "fees",
        "age",
        "interestRate",
        "valueBack",
        "cibilScore",
        "search",
      ].includes(key);
      transformed[key] = value.map((tag: SingleTag) =>
        String(isNumericFilter ? tag.value : tag.id)
      );
    }
    return transformed;
  };

  React.useEffect(() => {
    async function fetchCards() {
      setIsLoading(true);
      try {
        const transformedFilters = transformFilters(activeFilters);
        const result = await getAllCards({
          page: pageNo,
          size: resultsPerPage,
          sort: sortOption !== "default" ? sortOption : undefined,
          order: "asc",
          ...transformedFilters,
        });
        setCards(result);
        setNumberOfResults(result.totalResults);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }
    fetchCards();
  }, [pageNo, resultsPerPage, activeFilters, setNumberOfResults, sortOption]);

  if (isLoading) {
    return (
      <>
        {[...Array(resultsPerPage)].map((_, index) => (
          <div className="w-full rounded-lg p-2" key={index}>
            <Skeleton className="h-[169px] w-full sm:w-[266px]" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-full sm:w-[250px] mt-2" />
              <Skeleton className="h-8 w-full sm:w-[200px]" />
              <Skeleton className="h-16 w-full sm:w-[266px]" />
            </div>
          </div>
        ))}
      </>
    );
  }
  if (error) {
    return (
      <div>
        Error fetching cards, please refresh the page! Error: {error.message}
      </div>
    );
  }
  if (cards && cards.totalResults === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full col-span-3">
        <svg
          className="mb-6"
          height="256"
          viewBox="0 0 48 48"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <linearGradient
            id="linear-gradient"
            gradientUnits="userSpaceOnUse"
            x1="23.99"
            x2="23.99"
            y1="41"
            y2="7"
          >
            <stop offset="0" stopColor="#d3e6f5" />
            <stop offset="1" stopColor="#f0f7fc" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            gradientUnits="userSpaceOnUse"
            x1="42"
            x2="42"
            y1="16.96"
            y2="9"
          >
            <stop offset="0" stopColor="#fe9661" />
            <stop offset="1" stopColor="#ffb369" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-3"
            x1="6"
            x2="6"
            y1="39"
            y2="31.04"
          />
          <linearGradient
            id="linear-gradient-4"
            gradientUnits="userSpaceOnUse"
            x1="24"
            x2="24"
            y1="47"
            y2="41"
          >
            <stop offset="0" stopColor="#54a5ff" />
            <stop offset="1" stopColor="#8ad3fe" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-5"
            x1="20"
            x2="28"
            y1="7"
            y2="7"
          />
          <g id="Tag">
            <path
              d="m36 15v26h-24c0-28.22-.11-26.23.24-26.65l6-7a1 1 0 0 1 .76-.35h10a1 1 0 0 1 .76.35c6.52 7.65 6.24 7.13 6.24 7.65z"
              fill="url(#linear-gradient)"
            />
            <path
              d="m44.71 13.67a8.79 8.79 0 0 0 -1.82 2.74 1 1 0 0 1 -1.78 0 8.75 8.75 0 0 0 -1.82-2.74 1 1 0 0 1 0-1.42 8.79 8.79 0 0 0 1.82-2.74 1 1 0 0 1 1.78 0 8.75 8.75 0 0 0 1.82 2.74 1 1 0 0 1 0 1.42z"
              fill="url(#linear-gradient-2)"
            />
            <path
              d="m8.71 35.71a8.79 8.79 0 0 0 -1.82 2.74 1 1 0 0 1 -1.78 0 8.75 8.75 0 0 0 -1.82-2.74 1 1 0 0 1 0-1.42 8.79 8.79 0 0 0 1.82-2.74 1 1 0 0 1 1.78 0 8.75 8.75 0 0 0 1.82 2.74 1 1 0 0 1 0 1.42z"
              fill="url(#linear-gradient-3)"
            />
            <circle cx="24" cy="12" fill="#f0f7fc" r="3" />
            <path
              d="m12 41h24a0 0 0 0 1 0 0v4a2 2 0 0 1 -2 2h-20a2 2 0 0 1 -2-2v-4a0 0 0 0 1 0 0z"
              fill="url(#linear-gradient-4)"
            />
            <path
              d="m22 7c0 2.29 1.06 4 2 4a.93.93 0 0 0 .49-.15 1 1 0 0 1 1 1.73c-2.44 1.42-5.49-.95-5.49-5.58 0-3.36 1.76-6 4-6s4 2.64 4 6h-2c0-2.29-1.06-4-2-4s-2 1.71-2 4z"
              fill="url(#linear-gradient-5)"
            />
            <g fill="#b4cde1">
              <path d="m19 23.41 1.29 1.3a1 1 0 0 0 .71.29 1 1 0 0 0 .71-1.71l-1.3-1.29 1.3-1.29a1 1 0 0 0 -1.42-1.42l-1.29 1.3-1.29-1.3a1 1 0 0 0 -1.42 1.42l1.3 1.29-1.3 1.29a1 1 0 0 0 .71 1.71c.55 0 .69-.27 2-1.59z" />
              <path d="m30.41 22 1.3-1.29a1 1 0 0 0 -1.42-1.42l-1.29 1.3-1.29-1.3a1 1 0 0 0 -1.42 1.42l1.3 1.29-1.3 1.29a1 1 0 0 0 1.42 1.42l1.29-1.3 1.29 1.3a1 1 0 0 0 1.42-1.42z" />
              <path d="m17.45 30.17a1 1 0 0 0 .55 1.83.94.94 0 0 0 .55-.17 9.83 9.83 0 0 1 10.9 0 1 1 0 1 0 1.1-1.66 11.75 11.75 0 0 0 -13.1 0z" />
            </g>
          </g>
        </svg>
        <div className="text-center text-gray-500">
          <h3 className="text-2xl font-bold mb-2">No Results Found!</h3>
          <p className="text-base">
            Try adjusting your search or filtering criteria.
          </p>
        </div>
      </div>
    );
  }

  // Helper function to get the currency symbol
  const getCurrencySymbol = (currency: Currency | Currency[]): string => {
    if (Array.isArray(currency)) {
      return currency.length > 0 ? currency[0].symbol : "₹";
    }
    return currency.symbol;
  };

  return cards
    ? cards.data.map((card) => (
        <div
          className="singleGridCard bg-white dark:bg-slate-900 rounded-lg border-slate-100 dark:border-slate-800 border-2 p-2 flex flex-col h-full"
          key={card.id}
        >
          <div className="relative shrink-0">
            <Image
              src={`/images/credit-cards/${card.image}`}
              alt={card.name}
              width={500}
              height={317}
              loading="lazy"
              className="rounded-lg"
            />
            <div className="down-to-top absolute inset-0 rounded-lg border-2 border-slate-200 dark:border-slate-800"></div>
            <div className="top-to-down absolute top-0 left-0 right-0 bg-linear-to-b from-black/20 via-gray-900/10 to-transparent p-3 rounded-t-lg"></div>

            {card.collaborator && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute top-0 left-0 p-2">
                      <Badge variant="collaborator">
                        {String(card.collaborator.name)}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Co-Branded Card</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* TODO: Favorites feature */}
            {/* <div className="absolute top-0 right-0 p-2">
          <button
            className={`rounded-full p-2 ${
              isFavorite ? "bg-red-500" : "bg-gray-200"
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <TbHeartFilled className="text-white" />
            ) : (
              <TbHeart className="text-black" />
            )}
          </button>
        </div> */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-gray-900 to-transparent border-slate-900 p-3 rounded-b-lg">
              <div className="cardSubTitle flex justify-between text-white">
                <div className="flex flex-col">
                  {card.categories.map((category: Category) => (
                    <div
                      className="flex items-center mt-1"
                      key={`${category.id}`}
                    >
                      {allCategories.map((iconCategory: SingleTag) => {
                        if (iconCategory.label === category.name) {
                          return (
                            <React.Fragment
                              key={`${iconCategory.id}-${iconCategory.label}`}
                            >
                              {iconCategory.IconName ? (
                                <iconCategory.IconName className="text-gray-300 mr-2" />
                              ) : (
                                <TbInfoCircle className="text-gray-300 mr-2" />
                              )}
                            </React.Fragment>
                          );
                        }
                        return null;
                      })}
                      <h2 className="text-sm sm:text-md font-normal capitalize">
                        {category.name}
                      </h2>
                    </div>
                  ))}
                </div>
                <div className="flex items-end space-x-2 mb-1">
                  <Link
                    href={card.official_website}
                    target="_blank"
                    className="text-sm underline decoration-dotted"
                  >
                    Apply Now {">"}
                  </Link>
                </div>
                {/* <div
                  className={`compareBox flex items-end space-x-2 mb-1 ${
                    activeComparisions.length >= 4 &&
                    !activeComparisions.includes(card)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Checkbox
                    className="border-white"
                    value={card.id}
                    checked={activeComparisions.includes(card)}
                    onCheckedChange={() => handleCardToggle(card)}
                    disabled={
                      activeComparisions.length >= 4 &&
                      !activeComparisions.includes(card)
                    }
                  />
                  <label
                    htmlFor="terms2"
                    className={`text-sm font-normal leading-none ${
                      activeComparisions.length >= 4 &&
                      !activeComparisions.includes(card)
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (
                        !(
                          activeComparisions.length >= 4 &&
                          !activeComparisions.includes(card)
                        )
                      ) {
                        handleCardToggle(card);
                      }
                    }}
                  >
                    Compare
                  </label>
                </div> */}
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col grow">
            <div className="specialities flex items-left space-x-2">
              {card.speciality.map((feature, index) => (
                <React.Fragment key={`${card.id}-${feature}-${index}`}>
                  {feature === "fuel" && (
                    <CustomPopover
                      animationData={fuelIcon}
                      icon={<TbGasStation className="text-blue-500 mr-2" />}
                      description="No fuel surcharge on fuel transactions."
                    />
                  )}
                  {feature === "forex" && (
                    <CustomPopover
                      animationData={currencyIcon}
                      icon={<TbCurrencyEuro className="text-gray-400 mr-2" />}
                      description="No currency conversion charges on international transactions."
                    />
                  )}
                  {feature === "free" && (
                    <CustomPopover
                      animationData={freeIcon}
                      icon={
                        <TbSquareRoundedNumber0 className="text-gray-400 mr-2" />
                      }
                      description="No joining or renewal fee, lifetime free card."
                    />
                  )}
                  {feature === "priorityPass" && (
                    <CustomPopover
                      animationData={airplaneIcon}
                      icon={<TbPlaneDeparture className="text-gray-400 mr-2" />}
                      description="Offers priority pass used for airport lounge access."
                    />
                  )}
                  {feature === "cashback" && (
                    <CustomPopover
                      animationData={cashbackIcon}
                      icon={<TbCoins className="text-gray-400 mr-2" />}
                      description="Offers maximum value back in its category."
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="cardName flex justify-between items-center mt-2">
              <h3 className="text-md font-bold dark:text-white text-slate-700">
                {card.name}
              </h3>
              {/* TODO: More Info */}
              {/* <button
                className="text-slate-700 dark:text-white"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? <TbCaretUp /> : <TbCaretDown />}
              </button> */}
            </div>
            {showMoreInfo && (
              <div className="moreCardInfo mt-3 dark:bg-slate-800 bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm dark:text-slate-300 text-slate-600">
                    Renewal Fees :
                  </div>
                  <div className="flex items-center text-sm dark:text-white text-black font-bold">
                    {getCurrencySymbol(card.currency)}
                    {card.fees?.renewal_fee ?? 0}{" "}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm dark:text-slate-300 text-slate-600">
                    Interest Rate :
                  </div>
                  <div className="flex items-center text-sm dark:text-white text-black font-bold">
                    {card.fees?.finance_fee ?? 0} % APR
                    <Popover>
                      <PopoverTrigger>
                        <TbInfoCircle className="text-slate-300 ml-2 h-5 w-5" />
                      </PopoverTrigger>
                      <PopoverContent className="w-70">
                        <div className="flex flex-col">
                          <div className="space-y-2">
                            <h4 className="flex font-medium leading-none">
                              <TbPercentage className="text-red-500 mr-2 h-5 w-5" />
                              Annual Percentage Rate (APR){" "}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Yearly interest rate which is levied<br></br>
                              if the repayment is not done in time.
                            </p>
                          </div>
                          <div className="referencePoints flex flex-col space-y-2 text-sm dark:text-white text-black font-bold mb-2 mt-4">
                            <div>
                              0-20% APR:
                              <span className="text-green-500 ml-2">Good</span>
                            </div>
                            <div>
                              20-30% APR:
                              <span className="text-yellow-500 ml-2">
                                Average
                              </span>
                            </div>
                            <div>
                              30-60% APR:{" "}
                              <span className="text-red-500 ml-2">Poor</span>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-auto">
              <div className="mt-3 dark:bg-slate-800 bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm dark:text-slate-300 text-slate-600">
                    Joining Fees
                  </div>
                  <div className="text-sm dark:text-slate-300 text-slate-600">
                    {/* Max Valueback */}
                    Renewal Fee
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 font-bold">
                  {/* JoiningFee */}
                  <div className="flex items-center text-sm dark:text-white text-black font-bold">
                    {getCurrencySymbol(card.currency)}
                    {card.fees?.joining_fee ?? 0} {/* TODO: ADD THIS FEATURE */}
                    {/* <Popover>
                    <PopoverTrigger>
                      <TbGiftFilled className="text-red-500 ml-2 h-5 w-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-70">
                      <div className="flex items-center text-sm dark:text-white text-black font-bold">
                        <TbGiftFilled className="text-red-500 mr-2 h-5 w-5" />
                        Issuer(Bank) may waive-off <br></br>this fee for a few
                        customers.
                      </div>
                      <div className="flex items-center text-sm dark:text-white text-black font-bold mt-2">
                        <TbGiftFilled className="text-green-500 mr-2 h-5 w-5" />
                        Welcome benefits on this card <br></br>might cover the
                        joining fee.
                      </div>
                    </PopoverContent>
                  </Popover> */}
                  </div>
                  {/* Renewal Fees */}
                  <div className="flex items-center text-sm dark:text-white text-black font-bold">
                    {getCurrencySymbol(card.currency)}
                    {card.fees?.renewal_fee ?? 0}{" "}
                  </div>

                  {/* TODO: Max ValueBack (Replace renewal fees with this) */}
                  {/* <div className="flex items-center text-sm dark:text-white text-black">
                  <Popover>
                    <PopoverTrigger>
                      <span className="underline decoration-dotted text-sm dark:text-white text-black">
                        7.6%
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-70">
                      <a
                        href={`/discover/credit-card/${card.name}?section=mvb`}
                        className="flex items-center text-sm dark:text-white text-black font-bold"
                      >
                        See how{" "}
                        <TbHelpCircleFilled className="text-slate-300 ml-2 h-5 w-5" />
                      </a>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger>
                      <TbInfoCircle className="text-slate-300 ml-2 h-5 w-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-70">
                      <div className="flex flex-col">
                        <div className="space-y-2">
                          <h4 className="flex font-medium leading-none">
                            <TbPercentage className="text-red-500 mr-2 h-5 w-5" />
                            Maximum ValueBack (MVB){" "}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Maximum valueback that can be earned<br></br>
                            on this card. <br></br>
                            <br></br>
                            e.g. 10% MVB would mean that you could <br></br>
                            earn ₹10 by spending ₹100 on this card.
                          </p>
                        </div>
                        <div className="referencePoints flex flex-col space-y-2 text-sm dark:text-white text-black font-bold mb-2 mt-4">
                          <div>
                            {">"} 7% MVB:
                            <span className="text-green-500 ml-2">Good</span>
                          </div>
                          <div>
                            2-7% MVB:
                            <span className="text-yellow-500 ml-2">
                              Average
                            </span>
                          </div>
                          <div>
                            0-2% MVB:{" "}
                            <span className="text-red-500 ml-2">Poor</span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    : null;
}
