import { NextRequest, NextResponse } from "next/server";
import { db, useRealDatabase } from "@/drizzle/db";
import { newsUpdates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Force the application to use the real PostgreSQL database
useRealDatabase();

// GET - Fetch all news updates
export async function GET() {
  try {
    const allNews = await db
      .select()
      .from(newsUpdates)
      .orderBy(newsUpdates.createdAt);
    
    return NextResponse.json(allNews);
  } catch (error) {
    console.error("Error fetching news updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch news updates" },
      { status: 500 }
    );
  }
}

// POST - Create new news update
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, type = "news" } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (!['news', 'tips'].includes(type)) {
      return NextResponse.json(
        { error: "Type must be either 'news' or 'tips'" },
        { status: 400 }
      );
    }

    const newNewsUpdate = await db
      .insert(newsUpdates)
      .values({
        content,
        type
      })
      .returning();

    return NextResponse.json(newNewsUpdate[0], { status: 201 });
  } catch (error) {
    console.error("Error creating news update:", error);
    return NextResponse.json(
      { error: "Failed to create news update" },
      { status: 500 }
    );
  }
}

// PUT - Update news update
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content, type } = body;

    if (!id || !content) {
      return NextResponse.json(
        { error: "ID and content are required" },
        { status: 400 }
      );
    }

    if (type && !['news', 'tips'].includes(type)) {
      return NextResponse.json(
        { error: "Type must be either 'news' or 'tips'" },
        { status: 400 }
      );
    }

    const updatedNewsUpdate = await db
      .update(newsUpdates)
      .set({
        content,
        ...(type && { type })
      })
      .where(eq(newsUpdates.id, id))
      .returning();

    if (updatedNewsUpdate.length === 0) {
      return NextResponse.json(
        { error: "News update not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNewsUpdate[0]);
  } catch (error) {
    console.error("Error updating news update:", error);
    return NextResponse.json(
      { error: "Failed to update news update" },
      { status: 500 }
    );
  }
}

// DELETE - Delete news update
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "News update ID is required" },
        { status: 400 }
      );
    }

    const deletedNewsUpdate = await db
      .delete(newsUpdates)
      .where(eq(newsUpdates.id, id))
      .returning();

    if (deletedNewsUpdate.length === 0) {
      return NextResponse.json(
        { error: "News update not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "News update deleted successfully" });
  } catch (error) {
    console.error("Error deleting news update:", error);
    return NextResponse.json(
      { error: "Failed to delete news update" },
      { status: 500 }
    );
  }
}