"use server";

import { OrganisedTags } from "@/types/index";

export async function getAllFilters(): Promise<OrganisedTags> {
  if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
    throw new Error("API configuration is missing");
  }

  const url = new URL(
    `${process.env.API_BASE_URL}/${process.env.API_VERSION}/discover/filters`
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
      throw new Error("Failed to fetch filters data");
    }

    const data = await response.json();
    return data as OrganisedTags;
  } catch (error) {
    throw new Error(
      "Unable to fetch filters at this time. Please try again later."
    );
  }
}
