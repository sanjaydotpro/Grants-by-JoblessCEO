import { NextRequest, NextResponse } from "next/server";
import { db, useRealDatabase } from "@/drizzle/db";
import { institutions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Force the application to use the real PostgreSQL database
useRealDatabase();

// GET - Fetch all institutions
export async function GET() {
  try {
    let allInstitutions;
    
    // Check if using mock database
     if (typeof db.select !== 'function') {
       // Using mock database
       allInstitutions = await (db as any).institutions.findMany();
     } else {
      // Using real database
      allInstitutions = await db
        .select()
        .from(institutions)
        .orderBy(institutions.createdAt);
    }
    
    return NextResponse.json(allInstitutions);
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}

// POST - Create new institution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, website } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Institution name is required" },
        { status: 400 }
      );
    }

    let newInstitution;
    
    if (typeof db.select !== 'function') {
      // Using mock database
      newInstitution = await (db as any).institutions.create({
        values: {
          name,
          website,
          updatedAt: new Date()
        }
      });
      newInstitution = [newInstitution]; // Wrap in array to match drizzle format
    } else {
      // Using real database
      newInstitution = await db
        .insert(institutions)
        .values({
          name,
          website,
          updatedAt: new Date()
        })
        .returning();
    }

    return NextResponse.json(newInstitution[0], { status: 201 });
  } catch (error) {
    console.error("Error creating institution:", error);
    return NextResponse.json(
      { error: "Failed to create institution" },
      { status: 500 }
    );
  }
}

// PUT - Update institution
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, website } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: "Institution ID and name are required" },
        { status: 400 }
      );
    }

    const updatedInstitution = await db
      .update(institutions)
      .set({
        name,
        website,
        updatedAt: new Date()
      })
      .where(eq(institutions.id, id))
      .returning();

    if (updatedInstitution.length === 0) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedInstitution[0]);
  } catch (error) {
    console.error("Error updating institution:", error);
    return NextResponse.json(
      { error: "Failed to update institution" },
      { status: 500 }
    );
  }
}

// DELETE - Delete institution
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Institution ID is required" },
        { status: 400 }
      );
    }

    const deletedInstitution = await db
      .delete(institutions)
      .where(eq(institutions.id, id))
      .returning();

    if (deletedInstitution.length === 0) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Institution deleted successfully" });
  } catch (error) {
    console.error("Error deleting institution:", error);
    return NextResponse.json(
      { error: "Failed to delete institution" },
      { status: 500 }
    );
  }
}