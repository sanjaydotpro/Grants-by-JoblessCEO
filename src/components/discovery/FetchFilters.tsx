import { getAllFilters } from "@/app/services/discover/getAllFilters";

export async function FetchFilters() {
  try {
    const allFilters = await getAllFilters();
    return { allFilters, error: null };
  } catch (err) {
    console.error("FetchFilters: Error fetching filters", err);
    return {
      allFilters: null,
      error: "Error fetching filters. Please try again later.",
    };
  }
}
