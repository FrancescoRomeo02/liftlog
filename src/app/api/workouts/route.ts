import { NextRequest, NextResponse } from "next/server";
import { WorkoutsQuery } from "@/lib/queries/workouts";

export async function POST(request: NextRequest) {
  try {
    const workoutData = await request.json();

    if (!workoutData.user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    if (!workoutData.name) {
      return NextResponse.json(
        { error: "Workout name is required" },
        { status: 400 },
      );
    }

    const newWorkout = await WorkoutsQuery.createWorkout(workoutData);
    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workoutId = searchParams.get("id");

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required" },
        { status: 400 },
      );
    }

    const workout = await WorkoutsQuery.getWorkout(workoutId);

    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error("Error fetching workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workoutId = searchParams.get("id");
    const updates = await request.json();

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required" },
        { status: 400 },
      );
    }

    const updatedWorkout = await WorkoutsQuery.updateWorkout(
      workoutId,
      updates,
    );
    return NextResponse.json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workoutId = searchParams.get("id");

    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required" },
        { status: 400 },
      );
    }

    await WorkoutsQuery.deleteWorkout(workoutId);
    return NextResponse.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
