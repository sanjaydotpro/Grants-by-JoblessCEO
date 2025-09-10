"use server";

import {
  GetCardsResponse,
  FilterQueryParams,
  Card,
  Currency,
  Issuer,
  Category,
  Feature,
  Collaborator,
  Fees,
  Eligibility,
} from "@/types";
import { fetchCards } from "@/lib/helper/cardHelpers";
import { validateUUIDs } from "@/lib/helper/miscFunctions";

export async function getAllCards({
  page,
  sort,
  order,
  size,
  search,
  category,
  issuer,
  feature,
  collaborator,
  employment,
  income,
  fees,
  interestRate,
  cibilScore,
  age,
  valueBack,
}: {
  page: number | string;
  size: number | string;
  sort?: string;
  order?: string;
  search?: string;
  category?: string | string[];
  issuer?: string | string[];
  feature?: string | string[];
  collaborator?: string | string[];
  employment?: string | string[];
  income?: string | string[];
  fees?: string | string[];
  interestRate?: string | string[];
  cibilScore?: string | string[];
  age?: string | string[];
  valueBack?: string | string[];
}): Promise<GetCardsResponse> {
  try {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(size) || 12;
    const sortBy = sort || "default";
    const orderBy = order || "asc";
    const searchQuery = search ? search[0] : "";

    const categoryIds = Array.isArray(category)
      ? category
      : category?.split(",") || [];

    const issuerIds = Array.isArray(issuer) ? issuer : issuer?.split(",") || [];
    const featureIds = Array.isArray(feature)
      ? feature
      : feature?.split(",") || [];
    const collaborationIds = Array.isArray(collaborator)
      ? collaborator
      : collaborator?.split(",") || [];

    const employmentIds = Array.isArray(employment)
      ? employment
      : employment?.split(",") || [];

    if (
      !validateUUIDs(categoryIds) ||
      !validateUUIDs(issuerIds) ||
      !validateUUIDs(featureIds) ||
      !validateUUIDs(collaborationIds) ||
      !validateUUIDs(employmentIds)
    ) {
      throw new Error("Invalid UUID format in filters");
    }

    const processRange = (value?: string | string[]): number[] => {
      if (Array.isArray(value)) {
        return value.flatMap((v) => v.split(",").map(Number));
      } else if (typeof value === "string") {
        return value.split(",").map(Number);
      }
      return [];
    };

    const incomeRange = processRange(income).map((value) => value * 100000);
    const feesRange = processRange(fees);
    const interestRange = processRange(interestRate);
    const cibilRange = processRange(cibilScore);
    const ageRange = processRange(age);
    const valueBackRange = processRange(valueBack);
    if (
      ![
        "default",
        "best",
        "popularity",
        "joiningFee",
        "renewalFee",
        "fuelWaiver",
        "valueBack",
        "launchDate",
        "approvalDifficulty",
        "forexFee",
      ].includes(sortBy)
    ) {
      throw new Error("Invalid sort parameter");
    }

    if (!["asc", "desc"].includes(orderBy)) {
      throw new Error("Invalid order parameter");
    }

    if (pageNumber < 1 || pageSize < 1 || pageSize > 100) {
      throw new Error("Invalid page or size parameter");
    }

    const fetchedCards = await fetchCards({
      sort: sortBy,
      order: orderBy,
      search: searchQuery,
      page: pageNumber,
      size: pageSize,
      categoryIds,
      issuerIds,
      featureIds,
      collaborationIds,
      employmentIds,
      income: incomeRange,
      fees: feesRange,
      interest: interestRange,
      cibil: cibilRange,
      age: ageRange,
      valueback: valueBackRange,
    });

    // Since fetchCards returns empty data for now, return empty array
    // TODO: Implement proper card formatting when Drizzle queries are complete
    const formattedCards: Card[] = fetchedCards.data.length > 0 ? fetchedCards.data.map((card: any) => ({
      id: card.id,
      name: card.name,
      image: card.image || "",
      currency: (Array.isArray(card.currency)
        ? card.currency[0]
        : card.currency) as Currency,
      issuer: (Array.isArray(card.issuer)
        ? card.issuer[0]
        : card.issuer) as Issuer,
      categories: (card.categories || []).map(
        (category: any): Category => ({
          id: category?.id || "",
          name: category?.name || "",
          description: category?.description || "",
        })
      ),
      features: (card.features || []).map(
        (feature: any): Feature => ({
          feature_id: feature?.feature_id || "",
          feature_name: feature?.feature_name || "",
          feature_category: feature?.feature_category || "",
          feature_description: feature?.feature_description || "",
          offer_type: feature?.offer_type || "",
          detailed_info: Array.isArray(feature?.detailed_info)
            ? feature.detailed_info.map(String)
            : null,
        })
      ),
      fees: card.fees as unknown as Fees | undefined,
      eligibility: card.eligibility as unknown as Eligibility | undefined,
      collaborator: card.collaborator as unknown as Collaborator | null,
      official_website: card.official_website || "",
      speciality: card.speciality,
    })) : [];

    //if cards is empty, return an error saying no results found
    if (fetchedCards.data == null) {
      return {
        data: [],
        totalResults: 0,
      };
    } else {
      return {
        data: formattedCards,
        totalResults: fetchedCards.totalResults,
      };
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error(
      "Unable to fetch cards at this time. Please try again later."
    );
  }
}
