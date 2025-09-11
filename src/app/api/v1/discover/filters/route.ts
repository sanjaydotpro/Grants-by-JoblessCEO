import { NextResponse } from "next/server";
import { capitalizeFirstLetter, snakeCase } from "@/lib/helper/miscFunctions";
import { eq, isNotNull } from "drizzle-orm";
import { grants, institutions } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

const fetchAllFilters = async () => {
  const institutionsData = await db
    .select({
      id: institutions.id,
      name: institutions.name,
    })
    .from(institutions);

  // Get unique grant amounts for filtering
  const grantsData = await db
    .select({
      grantAmount: grants.grantAmount,
    })
    .from(grants)
    .where(isNotNull(grants.grantAmount));

  // Extract unique amounts and sort them
  const uniqueAmounts = [...new Set(grantsData.map(g => g.grantAmount).filter(Boolean))]
    .sort((a, b) => (a || 0) - (b || 0));

  return {
    institution: institutionsData.map((institution) => ({
      value: snakeCase(institution.name ?? ""),
      label: institution.name ?? "",
      id: institution.id,
      filter: "institution",
    })),
    grantAmount: [
      {
        value: "0,10000",
        label: "Under $10,000",
        id: 101,
        filter: "grantAmount",
        prefix: "$",
        suffix: "",
      },
      {
        value: "10000,50000",
        label: "$10,000 - $50,000",
        id: 102,
        filter: "grantAmount",
        prefix: "$",
        suffix: "",
      },
      {
        value: "50000,100000",
        label: "$50,000 - $100,000",
        id: 103,
        filter: "grantAmount",
        prefix: "$",
        suffix: "",
      },
      {
        value: "100000,500000",
        label: "$100,000 - $500,000",
        id: 104,
        filter: "grantAmount",
        prefix: "$",
        suffix: "",
      },
      {
        value: "500000,999999999",
        label: "Over $500,000",
        id: 105,
        filter: "grantAmount",
        prefix: "$",
        suffix: "",
      },
    ],
    search: [
      {
        value: "query",
        label: "Search",
        id: 901,
        filter: "search",
        prefix: "",
        suffix: "",
      },
    ],
  };
};

export async function GET() {
  // Skip database operations during build to prevent native binding issues
  // Only skip during actual build phase, not during development or production runtime
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({
      institution: [],
      grantAmount: [],
    });
  }
  
  try {
    const data = await fetchAllFilters();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Unable to fetch filters at this time. Please try again later." },
      { status: 500 }
    );
  }
}
