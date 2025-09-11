import { NextResponse } from "next/server";
import { capitalizeFirstLetter, snakeCase } from "@/lib/helper/miscFunctions";
import { eq, desc } from "drizzle-orm";
import { newsUpdates } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

const fetchAllNewsAndTips = async () => {
  const newsData = await db
    .select({
      content: newsUpdates.content,
      type: newsUpdates.type,
    })
    .from(newsUpdates)
    .where(eq(newsUpdates.type, "news"))
    .orderBy(desc(newsUpdates.createdAt))
    .limit(4);

  const tipsData = await db
    .select({
      content: newsUpdates.content,
      type: newsUpdates.type,
    })
    .from(newsUpdates)
    .where(eq(newsUpdates.type, "tips"))
    .orderBy(desc(newsUpdates.createdAt))
    .limit(4);

  const combinedData = [...newsData, ...tipsData];

  return {
    notification: combinedData.map((news) => ({
      value: news.content,
      type: news.type,
    })),
  };
};

export async function GET() {
  // Skip database operations during build to prevent native binding issues
  // Only skip during actual build phase, not during development or production runtime
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([], { status: 200 });
  }
  
  try {
    const newsAndTips = await fetchAllNewsAndTips();
    return NextResponse.json(newsAndTips["notification"], { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Error fetching news and tips" },
      { status: 500 }
    );
  }
}
