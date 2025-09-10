import React from "react";
import { OrganisedTags } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/slices/sidebarSlice";

import {
  IssuerFilter,
  EmploymentFilter,
  IncomeFilter,
  FeesFilter,
  InterestRateFilter,
  ValueBackFilter,
  AgeFilter,
  CategoryFilter,
  FeatureFilter,
  CibilScoreFilter,
  NetworkFilter,
  CollaboratorFilter,
} from "@/components/discovery/InputFilters";
import { Button } from "../ui/button";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

interface SidebarFiltersProps {
  allFilters: OrganisedTags | null;
  isLoading: boolean;
  error: string | null;
}

export default function SidebarFilters({ allFilters, isLoading, error }: SidebarFiltersProps) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: any) => state.sidebar.isOpen);

  if (isLoading) {
    return <div>Loading Filters...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="grow">Filters</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto"
        >
          <RiArrowLeftDoubleFill className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 ">
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="issuer">Card Category:</Label>
            <CategoryFilter filter={allFilters?.category ?? []} />
          </div>
          <Separator /> */}
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="issuer">Card Features:</Label>
            <FeatureFilter filter={allFilters?.feature ?? []} />
          </div> */}
          <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="issuer">Card Issuer:</Label>
            <IssuerFilter filter={allFilters?.issuer ?? []} />
          </div>
          <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="issuer">Co-Brand:</Label>
            <CollaboratorFilter filter={allFilters?.collaborator ?? []} />
          </div>
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="employment">Employment Status:</Label>
            <EmploymentFilter filter={allFilters?.employment ?? []} />
          </div>
          <Separator /> */}
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="ifp">Age (Years):</Label>
            <AgeFilter filter={allFilters?.age ?? []} />
          </div>
          <Separator /> */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fees">
              <AccordionTrigger>Joining Fees (₹)</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 sm:w-60 w-40">
                  <FeesFilter filter={allFilters?.fees ?? []} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="income">
              <AccordionTrigger>
                Annual Income (for eligibility)
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 sm:w-60 w-40">
                  <IncomeFilter filter={allFilters?.income ?? []} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="interest">Interest Rate(per annum):</Label>
            <InterestRateFilter filter={allFilters?.interestRate ?? []} />
          </div>
          <Separator /> */}
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="mvb">Max Value Back:</Label>
            <ValueBackFilter filter={allFilters?.valueBack ?? []} />
          </div>
          <Separator /> */}
          {/* <div className="grid gap-3 sm:w-60 w-40">
            <Label htmlFor="cibil">Cibil Score:</Label>
            <CibilScoreFilter filter={allFilters?.cibilScore ?? []} />
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
