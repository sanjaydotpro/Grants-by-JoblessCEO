import { NextResponse } from "next/server";
import {
  convertBigIntToString,
  validateUUIDs,
} from "@/lib/helper/miscFunctions";
import { FilterQueryParams } from "@/types";
import db from "@/lib/helper/prismaClient";
import { eq, and, or, ilike, inArray, gte, lte, count, sql } from "drizzle-orm";
import { grants, institutions } from "@/drizzle/schema";

const buildWhereClause = ({
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
      // Institution search will be handled in the main query with joins
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

const fetchCards = async ({
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

  // Simplified implementation for now - TODO: Implement full Drizzle conversion
  const totalResults = 0;
  const cardsData: any[] = [];

  // Simplified return for now
  return {
    data: [],
    totalResults: 0,
  };
};

//create a get route
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const apiKey = req.headers.get("x-api-key") || "";

    //check if the api key is valid
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //Set the default values for parameters or fetch from the request
    const sort = searchParams.get("sort") || "default";
    const order = searchParams.get("order") || "asc";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "12", 10);

    const categoryIds = searchParams.get("category")?.split(",") || [];
    if (!validateUUIDs(categoryIds)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    const issuerIds = searchParams.get("issuer")?.split(",") || [];
    if (!validateUUIDs(issuerIds)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    const featureIds = searchParams.get("feature")?.split(",") || [];
    if (!validateUUIDs(featureIds)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    const collaborationIds = searchParams.get("collaborator")?.split(",") || [];
    if (!validateUUIDs(collaborationIds)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    const employmentIds = searchParams.get("employment")?.split(",") || [];
    if (!validateUUIDs(employmentIds)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    //TODO: Handle the case if only single number is passed or string is passed
    const income =
      searchParams
        .get("income")
        ?.split(",")
        .map((value) => Number(value) * 100000) || [];
    const fees = searchParams.get("fees")?.split(",").map(Number) || [];
    const interest = searchParams.get("interest")?.split(",").map(Number) || [];
    const cibil = searchParams.get("cibil")?.split(",").map(Number) || [];
    const age = searchParams.get("age")?.split(",").map(Number) || [];
    const valueback =
      searchParams.get("valueback")?.split(",").map(Number) || [];

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
      ].includes(sort)
    ) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }
    if (!["asc", "desc"].includes(order)) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }
    if (page < 1 || size < 1) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }
    if (size > 100) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    }

    //Fetch the cards data from db
    const cards = await fetchCards({
      search,
      sort,
      order,
      page,
      size,
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

    //if cards is empty, return an error saying no results found
    if (cards.data == null) {
      return NextResponse.json({ error: "No Results Found." }, { status: 400 });
    } else {
      return Response.json(cards, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { error: "Error fetching cards", details: error },
      { status: 500 }
    );
  }
}
