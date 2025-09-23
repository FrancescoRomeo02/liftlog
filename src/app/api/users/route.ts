import { NextRequest, NextResponse } from "next/server";
import { usersQuery } from "@/lib/queries/profiles";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    if (!userData.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const newUser = await usersQuery.insertUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
