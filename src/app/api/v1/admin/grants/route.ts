import { NextRequest, NextResponse } from "next/server";
import { db, useRealDatabase } from "@/drizzle/db";
import { grants, institutions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Force the application to use the real PostgreSQL database
useRealDatabase();

// GET - Fetch all grants with institution details
export async function GET() {
  try {
    let allGrants;
    
    if (typeof db.select !== 'function') {
      // Using mock database
      const grantsData = await (db as any).grants.findMany();
      const institutionsData = await (db as any).institutions.findMany();
      
      // Manually join data
      allGrants = grantsData.map((grant: any) => {
        const institution = institutionsData.find((inst: any) => inst.id === grant.institution_id);
        return {
          id: grant.id,
          name: grant.name,
          institutionId: grant.institution_id,
          institutionName: institution?.name || null,
          grantAmount: grant.grant_amount,
          website: grant.website,
          description: grant.description,
          createdAt: grant.created_at,
          updatedAt: grant.updated_at
        };
      });
    } else {
      // Using real database
      allGrants = await db
        .select({
          id: grants.id,
          name: grants.name,
          institutionId: grants.institutionId,
          institutionName: institutions.name,
          grantAmount: grants.grantAmount,
          website: grants.website,
          description: grants.description,
          createdAt: grants.createdAt,
          updatedAt: grants.updatedAt
        })
        .from(grants)
        .leftJoin(institutions, eq(grants.institutionId, institutions.id))
        .orderBy(grants.createdAt);
    }
    
    return NextResponse.json(allGrants);
  } catch (error) {
    console.error("Error fetching grants:", error);
    return NextResponse.json(
      { error: "Failed to fetch grants" },
      { status: 500 }
    );
  }
}

// POST - Create new grant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, institutionId, grantAmount, website, description } = body;

    if (!name || !institutionId) {
      return NextResponse.json(
        { error: "Grant name and institution ID are required" },
        { status: 400 }
      );
    }

    // Verify institution exists
    const institution = await db
      .select()
      .from(institutions)
      .where(eq(institutions.id, institutionId))
      .limit(1);

    if (institution.length === 0) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    const newGrant = await db
      .insert(grants)
      .values({
        name,
        institutionId,
        grantAmount: grantAmount ? parseFloat(grantAmount) : null,
        website,
        description,
        updatedAt: new Date()
      })
      .returning();

    return NextResponse.json(newGrant[0], { status: 201 });
  } catch (error) {
    console.error("Error creating grant:", error);
    return NextResponse.json(
      { error: "Failed to create grant" },
      { status: 500 }
    );
  }
}

// PUT - Update grant
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, institutionId, grantAmount, website, description } = body;

    if (!id || !name || !institutionId) {
      return NextResponse.json(
        { error: "Grant ID, name, and institution ID are required" },
        { status: 400 }
      );
    }

    // Verify institution exists
    const institution = await db
      .select()
      .from(institutions)
      .where(eq(institutions.id, institutionId))
      .limit(1);

    if (institution.length === 0) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    const updatedGrant = await db
      .update(grants)
      .set({
        name,
        institutionId,
        grantAmount: grantAmount ? parseFloat(grantAmount) : null,
        website,
        description,
        updatedAt: new Date()
      })
      .where(eq(grants.id, id))
      .returning();

    if (updatedGrant.length === 0) {
      return NextResponse.json(
        { error: "Grant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedGrant[0]);
  } catch (error) {
    console.error("Error updating grant:", error);
    return NextResponse.json(
      { error: "Failed to update grant" },
      { status: 500 }
    );
  }
}

// DELETE - Delete grant
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Grant ID is required" },
        { status: 400 }
      );
    }

    const deletedGrant = await db
      .delete(grants)
      .where(eq(grants.id, id))
      .returning();

    if (deletedGrant.length === 0) {
      return NextResponse.json(
        { error: "Grant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Grant deleted successfully" });
  } catch (error) {
    console.error("Error deleting grant:", error);
    return NextResponse.json(
      { error: "Failed to delete grant" },
      { status: 500 }
    );
  }
}