import { NextRequest, NextResponse } from "next/server";
import { WorkoutExercisesQuery } from "@/lib/queries/workoutExercises";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 },
      );
    }
    const workoutExercises =
      await WorkoutExercisesQuery.getUserWorkoutExercise(id);

    return NextResponse.json(workoutExercises);
  } catch (err) {
    console.error("Error fetching workout exercise:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 },
      );
    }

    const updates = await req.json();

    const data = await WorkoutExercisesQuery.updateWorkoutExercise(id, updates);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error updating workout exercise:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 },
      );
    }

    await WorkoutExercisesQuery.deleteWorkoutExercise(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting workout exercise:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
