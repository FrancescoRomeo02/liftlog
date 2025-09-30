import { NextRequest, NextResponse } from "next/server";
import { WorkoutExercisesQuery } from "@/lib/queries/workoutExercises";

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

    const workout =
      await WorkoutExercisesQuery.getUserWorkoutExercise(workoutId);
    return NextResponse.json(workout);
  } catch (error) {
    console.error("Error fetching user plan's exercises:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ workoutId: string }> },
) {
  try {
    const { workoutId } = await context.params;

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required (post)" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const planExercise = await WorkoutExercisesQuery.createWorkoutExercise(
      workoutId,
      data,
    );
    return NextResponse.json(planExercise);
  } catch (error) {
    console.error("Error creating user plan's exercise:", error);
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

    const planExercise =
      await WorkoutExercisesQuery.deleteWorkoutExercise(workoutId);
    return NextResponse.json(planExercise);
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
    const planExercise = await WorkoutExercisesQuery.updateWorkoutExercise(
      workoutId,
      data,
    );
    return NextResponse.json(planExercise);
  } catch (error) {
    console.error("Error updating user plan's exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
