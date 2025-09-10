"use server";

import { searchCardsResponse } from "@/types/index";

export async function searchCards(query: string): Promise<searchCardsResponse> {
  if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
    throw new Error("API configuration is missing");
  }

  const url = new URL(
    `${process.env.API_BASE_URL}/${
      process.env.API_VERSION
    }/discover/search/${encodeURIComponent(query)}`
  );

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    return data as searchCardsResponse;
  } catch (error) {
    throw new Error(
      "Unable to search cards at this time. Please try again later."
    );
  }
}
