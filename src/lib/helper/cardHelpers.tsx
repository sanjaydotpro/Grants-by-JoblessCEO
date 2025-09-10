import { FilterQueryParams } from "@/types";
import db from "@/lib/helper/prismaClient";
import { convertBigIntToString } from "@/lib/helper/miscFunctions";
import { eq, and, or, ilike, inArray, gte, lte, count, sql } from "drizzle-orm";
import { cards, issuers, collaborators } from "@/drizzle/schema";

export const buildWhereClause = ({
  search = "",
  categoryIds = [],
  featureIds = [],
  employmentIds = [],
  issuerIds = [],
  collaborationIds = [],
  income = [0, 9900000],
  fees = [0, 500000],
  interest = [0, 60],
  cibil = [300, 900],
  age = [18, 100],
  valueback = [0, 50],
}: FilterQueryParams) => {
  const whereClause: any = {
    is_discontinued: false,
  };

  if (search.length > 0) {
    whereClause.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        OR: [
          { issuers: { name: { contains: search, mode: "insensitive" } } },
          {
            issuers: { short_form: { contains: search, mode: "insensitive" } },
          },
          {
            issuers: {
              display_name: { contains: search, mode: "insensitive" },
            },
          },
        ],
      },
    ];
  }

  if (categoryIds.length > 0) {
    whereClause.card_categories = {
      some: {
        category_id: {
          in: categoryIds,
        },
      },
    };
  }

  if (featureIds.length > 0) {
    whereClause.card_features = {
      some: {
        feature_id: {
          in: featureIds,
        },
      },
    };
  }

  if (employmentIds.length > 0) {
    whereClause.card_employment = {
      some: {
        employment_id: {
          in: employmentIds,
        },
      },
    };
  }

  if (issuerIds.length > 0) {
    whereClause.issuer_id = {
      in: issuerIds,
    };
  }

  if (collaborationIds.length > 0) {
    whereClause.collaborator_id = {
      in: collaborationIds,
    };
  }

  if (income.length > 0) {
    whereClause.eligibility = {
      some: {
        income_or_itr: {
          path: ["0"],
          gte: income[0],
          lte: income[1],
        },
        // min_cibil_score: {
        //   gte: cibil[0],
        //   lte: cibil[1],
        // },
        // min_age: {
        //   gte: age[0],
        // },
        // max_age: {
        //   lte: age[1],
        // },
      },
    };
  }

  if (fees.length > 0) {
    whereClause.fees = {
      some: {
        joining_fee: {
          gte: fees[0],
          lte: fees[1],
        },
        finance_fee: {
          gte: interest[0],
          lte: interest[1],
        },
      },
    };
  }

  if (valueback.length > 0) {
    whereClause.valueback = {
      some: {
        valueback: {
          gte: valueback[0],
          lte: valueback[1],
        },
      },
    };
  }

  return whereClause;
};

/**
 * Fetch all cards with optional query parameters.
 */

export const fetchCards = async ({
  sort = "default",
  order = "asc",
  search = "",
  page = 1,
  size = 12,
  categoryIds = [],
  issuerIds = [],
  featureIds = [],
  collaborationIds = [],
  employmentIds = [],
  income = [0, 5000000],
  fees = [0, 100000],
  interest = [0, 60],
  cibil = [300, 900],
  age = [18, 70],
  valueback = [0, 50],
}: FilterQueryParams) => {
  const whereClause = buildWhereClause({
    sort,
    search,
    categoryIds,
    issuerIds,
    featureIds,
    collaborationIds,
    employmentIds,
    income,
    fees,
    interest,
    cibil,
    age,
    valueback,
  });

  // For now, return a simplified response to avoid complex Drizzle conversion
  // TODO: Implement full Drizzle query conversion
  const totalResults = 0;
  const cardsData: any[] = [];

  // Simplified return for now - TODO: Implement full Drizzle conversion
  return {
    data: [],
    totalResults: 0,
  };
};
