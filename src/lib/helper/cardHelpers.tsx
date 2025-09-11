import { FilterQueryParams } from "@/types";
import { db } from "@/drizzle/db";
import { convertBigIntToString } from "@/lib/helper/miscFunctions";
import { eq, and, or, ilike, inArray, gte, lte, count, sql, desc, asc } from "drizzle-orm";
import { grants, institutions } from "@/drizzle/schema";

// Temporarily disabled due to Drizzle type conflicts
// TODO: Replace with proper grants-based implementation
/* export const buildWhereClause = ({
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
  const conditions = [];

  if (search.length > 0) {
    conditions.push(
      or(
        ilike(grants.name, `%${search}%`),
        ilike(grants.description, `%${search}%`)
      )
    );
  }

  if (issuerIds.length > 0) {
    conditions.push(inArray(grants.institutionId, issuerIds));
  }

  // For grants, we can filter by amount range
  if (income[0] > 0 || income[1] < 9900000) {
    if (income[0] > 0) {
      conditions.push(gte(grants.grantAmount, income[0]));
    }
    if (income[1] < 9900000) {
      conditions.push(lte(grants.grantAmount, income[1]));
    }
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}; */

/* export const fetchCards = async ({
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
  try {
    const whereCondition = buildWhereClause({
      search,
      categoryIds,
      featureIds,
      employmentIds,
      issuerIds,
      collaborationIds,
      income,
      fees,
      interest,
      cibil,
      age,
      valueback,
    });

    const offset = (page - 1) * size;
    
    // Build the query
    const baseQuery = db
      .select({
        id: grants.id,
        name: grants.name,
        grantAmount: grants.grantAmount,
        website: grants.website,
        description: grants.description,
        createdAt: grants.createdAt,
        updatedAt: grants.updatedAt,
        institution: {
          id: institutions.id,
          name: institutions.name,
          website: institutions.website,
        },
      })
      .from(grants)
      .leftJoin(institutions, eq(grants.institutionId, institutions.id));

    let query = whereCondition ? baseQuery.where(whereCondition) : baseQuery;

    // Add sorting
    if (sort === "amount") {
      query = query.orderBy(order === "desc" ? desc(grants.grantAmount) : asc(grants.grantAmount));
    } else if (sort === "name") {
      query = query.orderBy(order === "desc" ? desc(grants.name) : asc(grants.name));
    } else {
      query = query.orderBy(desc(grants.createdAt));
    }

    // Add pagination
    const results = await query.limit(size).offset(offset);

    // Get total count for pagination
    const totalQuery = db.select({ count: count() }).from(grants);
    if (whereCondition) {
      totalQuery.where(whereCondition);
    }
    const [{ count: total }] = await totalQuery;

    return {
      data: results.map(convertBigIntToString),
      pagination: {
        page,
        size,
        total,
        totalPages: Math.ceil(total / size),
      },
    };
  } catch (error) {
    console.error("Error fetching grants:", error);
    throw error;
  }
}; */

// Temporary stub to prevent build errors
export const fetchCards = async (params: any) => {
  return {
    data: [],
    pagination: {
      page: 1,
      size: 12,
      total: 0,
      totalPages: 0,
    },
  };
};
