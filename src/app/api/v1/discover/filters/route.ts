import { NextResponse } from "next/server";
import { capitalizeFirstLetter, snakeCase } from "@/lib/helper/miscFunctions";
import { eq } from "drizzle-orm";
import { categories, issuers, features, employment, collaborators, networks } from "@/drizzle/schema";
import db from "@/lib/helper/prismaClient";

const fetchAllFilters = async () => {
  const categoryData = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories);

  const issuersData = await db
    .select({
      id: issuers.id,
      name: issuers.name,
      short_form: issuers.shortForm,
      display_name: issuers.displayName,
    })
    .from(issuers)
    .where(eq(issuers.isAvailable, true));

  const featuresData = await db
    .select({
      id: features.id,
      feature_category: features.featureCategory,
    })
    .from(features);

  const employmentData = await db
    .select({
      id: employment.id,
      name: employment.name,
    })
    .from(employment);

  const collaboratorData = await db
    .select({
      id: collaborators.id,
      name: collaborators.name,
    })
    .from(collaborators);

  const networkData = await db
    .select({
      id: networks.id,
      name: networks.name,
    })
    .from(networks);

  return {
    category: categoryData.map((category) => ({
      value: snakeCase(category.name),
      label: capitalizeFirstLetter(category.name),
      id: category.id,
      filter: "category",
    })),
    issuer: issuersData.map((issuer) => ({
      value: snakeCase(issuer.name),
      label: issuer.display_name,
      id: issuer.id,
      filter: "issuer",
    })),
    feature: featuresData.map((feature) => ({
      value: snakeCase(feature.feature_category ?? ""),
      label: feature.feature_category ?? "",
      id: feature.id,
      filter: "feature",
    })),
    employment: employmentData.map((employment) => ({
      value: snakeCase(employment.name ?? ""),
      label: employment.name,
      id: employment.id,
      filter: "employment",
    })),
    collaborator: collaboratorData.map((collaborator) => ({
      value: snakeCase(collaborator.name ?? ""),
      label: collaborator.name,
      id: collaborator.id,
      filter: "collaborator",
    })),
    network: networkData.map((network) => ({
      value: snakeCase(network.name ?? ""),
      label: network.name,
      id: network.id,
      filter: "network",
    })),
    income: [
      {
        value: "0,50",
        label: "Income",
        id: 301,
        filter: "income",
        prefix: "₹",
        suffix: "L",
      },
    ],
    fees: [
      {
        value: "0,90000",
        label: "Fees",
        id: 401,
        filter: "fees",
        prefix: "₹",
        suffix: "",
      },
    ],
    valueBack: [
      {
        value: "1,50",
        label: "ValueBack",
        id: 501,
        filter: "valueBack",
        prefix: "",
        suffix: "%",
      },
    ],
    interestRate: [
      {
        value: "1,50",
        label: "Interest Rate",
        id: 601,
        filter: "interestRate",
        prefix: "",
        suffix: "%",
      },
    ],
    age: [
      {
        value: "18,70",
        label: "Age",
        id: 701,
        filter: "age",
        prefix: "",
        suffix: "",
      },
    ],
    cibilScore: [
      {
        value: "300,900",
        label: "CIBIL Score",
        id: 801,
        filter: "cibilScore",
        prefix: "",
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
    forex: [
      {
        value: "0,5",
        label: "Forex",
        id: 1001,
        filter: "forex",
        prefix: "",
        suffix: "%",
      },
    ],
  };
};

export async function GET() {
  try {
    const filters = await fetchAllFilters();
    return NextResponse.json(filters, { status: 200 });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Error fetching filters" },
      { status: 500 }
    );
  }
}
