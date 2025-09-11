import { NextRequest, NextResponse } from "next/server";
import { db, useRealDatabase } from "@/drizzle/db";
import { institutions, grants, newsUpdates } from "@/drizzle/schema";

useRealDatabase();

export async function DELETE(request: NextRequest) {
  try {
    // Delete all data in the correct order (grants first due to foreign key constraints)
    await db.delete(grants);
    await db.delete(institutions);
    await db.delete(newsUpdates);

    return NextResponse.json({
      success: true,
      message: "All data cleared successfully"
    });
  } catch (error) {
    console.error('Clear data error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to clear data" },
      { status: 500 }
    );
  }
}