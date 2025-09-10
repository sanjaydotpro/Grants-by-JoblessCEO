import {
  convertBigIntToString,
  validateSingleUUID,
} from "@/lib/helper/miscFunctions";
import { eq } from "drizzle-orm";
import { cards, issuers, collaborators } from "@/drizzle/schema";
import db from "@/lib/helper/prismaClient";

/**
 * Fetch a single card with "slug" query parameters.
 * @param {string} [slug] - slug of the card.
 */

const fetchSingleCard = async (slug: string) => {
  const cardsData = await db
    .select({
      id: cards.id,
      name: cards.name,
      nativeCurrencyId: cards.nativeCurrencyId,
      imageLink: cards.imageLink,
      issuerId: cards.issuerId,
      collaboratorId: cards.collaboratorId,
      officialLink: cards.officialLink,
      isDiscontinued: cards.isDiscontinued,
      createdAt: cards.createdAt,
      updatedAt: cards.updatedAt,
      issuer: {
        id: issuers.id,
        name: issuers.name,
        description: issuers.description
      },
      collaborator: {
        id: collaborators.id,
        name: collaborators.name
      }
    })
    .from(cards)
    .leftJoin(issuers, eq(cards.issuerId, issuers.id))
    .leftJoin(collaborators, eq(cards.collaboratorId, collaborators.id))
    .where(eq(cards.id, slug));

  cardsData.forEach(convertBigIntToString);

  //If 0 results are returned from database, return empty "cards" array
  if (cardsData.length === 0) {
    return {
      card: null,
    };
  }

  //Format the db results in the desired format
  const formattedCards = cardsData.map((card) => ({
    id: card.id,
    name: card.name,
    image: card.imageLink,
    currency: null, // TODO: Need to add currency join
    issuer: card.issuer,
    categories: [], // TODO: Need to add categories join
    features: [], // TODO: Need to add features join
    fees: null, // TODO: Need to add fees join
    eligibility: null, // TODO: Need to add eligibility join
    collaborator: card.collaborator,
    official_website: card.officialLink,
   }));

  return {
    card: formattedCards[0],
  };
};

//create a get route with a query parameter of sortBy, sortOrder, pageNo, pageSize
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    //Fetch the slug from the url
    const { id: slug } = await params;

    const apiKey = req.headers.get("x-api-key") || "";

    //check if the api key is valid
    if (apiKey !== process.env.API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!validateSingleUUID(slug)) {
      return Response.json(
        { error: "Cannot find a valid card, please contact us." },
        { status: 400 }
      );
    }
    //Fetch the cards data from db
    const cards = await fetchSingleCard(slug);

    if (cards.card === null) {
      return Response.json(
        { error: "Cannot find a valid card, please contact us." },
        { status: 400 }
      );
    }
    return Response.json(cards, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Error fetching the card, please try again later." },
      { status: 500 }
    );
  }
}
