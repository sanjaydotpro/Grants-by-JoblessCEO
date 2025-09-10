import {
  convertBigIntToString,
  validateSingleUUID,
} from "@/lib/helper/miscFunctions";
import { or, ilike, eq } from "drizzle-orm";
import { cards, issuers } from "@/drizzle/schema";
import db from "@/lib/helper/prismaClient";

/**
 * Fetch a single card with "slug" query parameters.
 * @param {string} [query] - slug of the card.
 */

const fetchMatchingResults = async (query: string) => {
  const cardsData = await db
    .select({
      id: cards.id,
      name: cards.name,
      image_link: cards.imageLink,
    })
    .from(cards)
    .leftJoin(issuers, eq(cards.issuerId, issuers.id))
    .where(
      or(
        ilike(cards.name, `%${query}%`),
        ilike(issuers.name, `%${query}%`),
        ilike(issuers.description, `%${query}%`)
      )
    );

  cardsData.forEach(convertBigIntToString);

  //If 0 results are returned from database, return empty "cards" array
  if (cardsData.length === 0) {
    return {
      cards: [],
      totalResults: 0,
    };
  }

  //Format the db results in the desired format
  const formattedCards = cardsData.map((card) => ({
    id: card.id,
    name: card.name,
    image: card.image_link,
  }));

  return {
    cards: formattedCards,
    totalResults: formattedCards.length,
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

    //Fetch the cards data from db
    const cards = await fetchMatchingResults(query);

    if (cards.cards === null) {
      return Response.json({ error: "No results found." }, { status: 400 });
    }
    return Response.json(cards, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Error fetching the card, please try again later." },
      { status: 500 }
    );
  }
}
