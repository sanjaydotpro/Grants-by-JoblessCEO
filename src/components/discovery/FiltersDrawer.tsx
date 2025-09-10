import React from "react";
import { OrganisedTags } from "@/types";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { TbAlertTriangleFilled, TbFilter } from "react-icons/tb";
import { Button } from "@/components/ui/button";
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
	CollaboratorFilter,
} from "@/components/discovery/InputFilters";
import { Separator } from "@/components/ui/separator";

interface FiltersDrawerProps {
	allFilters: OrganisedTags | null;
	isLoading: boolean;
	error: string | null;
}

function FiltersDrawer({ allFilters, isLoading, error }: FiltersDrawerProps) {
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="loader">Loading</div>
			</div>
		);
	}
	if (error) {
		return <div>Error fetching filters, please refresh the page!</div>;
	}

	return (
		<Drawer>
			<DrawerTrigger>
				<div className="allFiltersToggle flex gap-2 h-[42px] text-md cursor-pointer bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 px-4 py-2 rounded-md">
					<TbFilter className="h-6 w-6" />
					Filters
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<div className="shadow-xl dark:bg-slate-950 mt-3 ">
					<DrawerHeader>
						<DrawerTitle>
							<div className="text-left text-xl font-bold">
								Extended Filters
							</div>
						</DrawerTitle>
						<DrawerDescription>
							<div className="flex text-left text-md">
								<TbAlertTriangleFilled className="h-4 w-4 mr-2" />
								Few combinations may not return any results.
							</div>
						</DrawerDescription>
					</DrawerHeader>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-3 p-2 mx-auto">
					<div className="grid gap-3">
						<IssuerFilter filter={allFilters?.issuer ?? []} />
					</div>
					<div className="grid gap-3">
						<CollaboratorFilter filter={allFilters?.collaborator ?? []} />
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-3 p-2 mx-auto w-4/5">
					<Separator className="my-2" />

					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="income">Annual Income (for eligibility):</label>
						<IncomeFilter filter={allFilters?.income ?? []} />
					</div>
					<div className="flex flex-col gap-2 w-full mt-4">
						<label htmlFor="fees">Joining Fees (₹):</label>
						<FeesFilter filter={allFilters?.fees ?? []} />
					</div>

					{/* <div className="flex flex-col gap-2">
            <label htmlFor="interestRate">Interest Rate:</label>
            <InterestRateFilter filter={allFilters?.interestRate ?? []} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="valueBack">Value Back:</label>
            <ValueBackFilter filter={allFilters?.valueBack ?? []} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="age">Age:</label>
            <AgeFilter filter={allFilters?.age ?? []} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cibilScore">Cibil Score:</label>
            <CibilScoreFilter filter={allFilters?.cibilScore ?? []} />
          </div> */}
				</div>
				<DrawerFooter>
					<p className="text-center text-sm text-slate-500 antialiased mt-6">
						Copyright © {new Date().getFullYear()} CaveFinance. All rights
						reserved.
					</p>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default FiltersDrawer;
