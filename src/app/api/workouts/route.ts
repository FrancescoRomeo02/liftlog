import { NextRequest, NextResponse } from "next/server";
import { WorkoutsQuery } from "@/lib/queries/workouts";

export async function POST(request: NextRequest) {
  try {
    if (!request) {
      return NextResponse.json(
        { error: "Workout ID is required (post)" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const planExercise = await WorkoutsQuery.createWorkout(data);
    return NextResponse.json(planExercise);
  } catch (error) {
    console.error("Error creating user plan's exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
