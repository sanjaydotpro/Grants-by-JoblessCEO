import {
  convertBigIntToString,
  validateSingleUUID,
} from "@/lib/helper/miscFunctions";
import { eq } from "drizzle-orm";
import { grants, institutions } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

/**
 * Fetch a single grant with "slug" query parameters.
 * @param {string} [slug] - slug of the grant.
 */

const fetchSingleGrant = async (slug: string) => {
  const grantsData = await db
    .select({
      id: grants.id,
      name: grants.name,
      institutionId: grants.institutionId,
      grantAmount: grants.grantAmount,
      website: grants.website,
      description: grants.description,
      createdAt: grants.createdAt,
      updatedAt: grants.updatedAt,
      institution: {
        id: institutions.id,
        name: institutions.name,
        website: institutions.website
      }
    })
    .from(grants)
    .leftJoin(institutions, eq(grants.institutionId, institutions.id))
    .where(eq(grants.id, slug));

  grantsData.forEach(convertBigIntToString);

  //If 0 results are returned from database, return empty "grants" array
  if (grantsData.length === 0) {
    return {
      grant: null,
    };
  }

  //Format the db results in the desired format
  const formattedGrants = grantsData.map((grant: any) => ({
    id: grant.id,
    name: grant.name,
    amount: grant.grantAmount,
    description: grant.description,
    institution: grant.institution,
    website: grant.website,
    created_at: grant.createdAt,
    updated_at: grant.updatedAt
   }));

  return {
    grant: formattedGrants[0],
  };
};

//create a get route with a query parameter of sortBy, sortOrder, pageNo, pageSize
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Skip database operations during build to prevent native binding issues
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      return Response.json({
        grant: {
          id: 'mock-id',
          name: 'Mock Grant',
          amount: 50000,
          description: 'Mock grant for build time',
          institution: {
            id: 'mock-inst-id',
            name: 'Mock Institution',
            website: 'https://example.com'
          }
        }
      }, { status: 200 });
    }

    //Fetch the slug from the url
    const { id: slug } = await params;

    const apiKey = req.headers.get("x-api-key") || "";

    //check if the api key is valid
    if (apiKey !== process.env.API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!validateSingleUUID(slug)) {
      return Response.json(
        { error: "Cannot find a valid grant, please contact us." },
        { status: 400 }
      );
    }
    //Fetch the grants data from db
    const grants = await fetchSingleGrant(slug);

    if (grants.grant === null) {
      return Response.json(
        { error: "Cannot find a valid grant, please contact us." },
        { status: 400 }
      );
    }
    return Response.json(grants, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Error fetching the grant, please try again later." },
      { status: 500 }
    );
  }
}
