import { NextRequest, NextResponse } from "next/server";
import { WorkoutsQuery } from "@/lib/queries/workouts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const workouts = await WorkoutsQuery.getUserWorkouts(userId);
    return NextResponse.json(workouts);
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
