import { NextRequest, NextResponse } from "next/server";
import { WorkoutsQuery } from "@/lib/queries/workouts";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ workoutId: string }> },
) {
  try {
    const { workoutId } = await context.params;
    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required (get)" },
        { status: 400 },
      );
    }

    const plans = await WorkoutsQuery.getUserWorkouts(workoutId);
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching user plan's exercises:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ workoutId: string }> },
) {
  try {
    const { workoutId } = await context.params;

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required (delete)" },
        { status: 400 },
      );
    }

    await WorkoutsQuery.deleteWorkout(workoutId);
    return NextResponse.json(true);
  } catch (error) {
    console.error("Error deleting user plan's exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ workoutId: string }> },
) {
  try {
    const { workoutId } = await context.params;

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required (put)" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const planExercise = await WorkoutsQuery.updateWorkout(workoutId, data);
    return NextResponse.json(planExercise);
  } catch (error) {
    console.error("Error updating user plan's exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
