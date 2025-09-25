import { NextRequest, NextResponse } from "next/server";
import { waitlist } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function POST(request: NextRequest) {
  // Skip database operations during build to prevent native binding issues
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ message: "Build phase - database operations skipped" }, { status: 200 });
  }

  try {
    const body = await request.json();
    const { name, email, mobile, details } = body;

    // Validate required fields
    if (!name || !email || !mobile || !details) {
      return NextResponse.json(
        { error: "All fields are required: name, email, mobile, details" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert into waitlist table
    const result = await db
      .insert(waitlist)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        details: details.trim(),
      })
      .returning({
        id: waitlist.id,
        name: waitlist.name,
        email: waitlist.email,
        createdAt: waitlist.createdAt,
      });

    return NextResponse.json(
      {
        message: "Successfully added to waitlist",
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    
    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: "Email already exists in waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Skip database operations during build to prevent native binding issues
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // Get all waitlist entries (for admin purposes)
    const entries = await db
      .select({
        id: waitlist.id,
        name: waitlist.name,
        email: waitlist.email,
        mobile: waitlist.mobile,
        details: waitlist.details,
        createdAt: waitlist.createdAt,
      })
      .from(waitlist)
      .orderBy(waitlist.createdAt);

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}