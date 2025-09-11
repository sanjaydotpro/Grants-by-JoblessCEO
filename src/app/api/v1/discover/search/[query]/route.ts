import {
  convertBigIntToString,
  validateSingleUUID,
} from "@/lib/helper/miscFunctions";
import { or, ilike, eq } from "drizzle-orm";
import { grants, institutions } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

/**
 * Fetch grants matching the search query.
 * @param {string} [query] - search query for grants.
 */

const fetchMatchingResults = async (query: string) => {
  const grantsData = await db
    .select({
      id: grants.id,
      name: grants.name,
      description: grants.description,
      grantAmount: grants.grantAmount,
      institutionName: institutions.name,
    })
    .from(grants)
    .leftJoin(institutions, eq(grants.institutionId, institutions.id))
    .where(
      or(
        ilike(grants.name, `%${query}%`),
        ilike(grants.description, `%${query}%`),
        ilike(institutions.name, `%${query}%`)
      )
    );

  grantsData.forEach(convertBigIntToString);

  //If 0 results are returned from database, return empty "grants" array
  if (grantsData.length === 0) {
    return {
      grants: [],
      totalResults: 0,
    };
  }

  //Format the db results in the desired format
  const formattedGrants = grantsData.map((grant) => ({
    id: grant.id,
    name: grant.name,
    description: grant.description,
    grantAmount: grant.grantAmount,
    institutionName: grant.institutionName,
  }));

  return {
    grants: formattedGrants,
    totalResults: formattedGrants.length,
  };
};

//create a get route with a query parameter of "query"
export async function GET(
  req: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  try {
    //Fetch the slug from the url
    const { query } = await params;

    //Fetch the grants data from db
    const grants = await fetchMatchingResults(query);

    if (grants.grants === null) {
      return Response.json({ error: "No results found." }, { status: 400 });
    }
    return Response.json(grants, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Error fetching grants, please try again later." },
      { status: 500 }
    );
  }
}
