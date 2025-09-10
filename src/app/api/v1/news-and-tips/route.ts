import { NextResponse } from "next/server";
import { capitalizeFirstLetter, snakeCase } from "@/lib/helper/miscFunctions";
import { eq, desc } from "drizzle-orm";
import { newsUpdates } from "@/drizzle/schema";
import db from "@/lib/helper/prismaClient";

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
