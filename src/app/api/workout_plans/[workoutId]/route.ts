import { NextRequest, NextResponse } from "next/server";
import { WorkoutsQuery } from "@/lib/queries/workouts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> },
) {
  try {
    const { workoutId } = await params;

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required" },
        { status: 400 },
      );
    }

    const workouts = await WorkoutsQuery.getUserWorkouts(workoutId);
    return NextResponse.json(workouts);
  } catch (error) {
    console.error("Error fetching user workout's exercises:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
