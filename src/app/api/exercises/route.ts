import { NextRequest, NextResponse } from "next/server";
import { exercisesQuery } from "@/lib/queries/exercises";

export async function POST(request: NextRequest) {
  console.log("POST request received");
  try {
    const exerciseData = await request.json();
    console.log("Exercise data:", exerciseData);

    if (!exerciseData.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!exerciseData.muscle_group) {
      return NextResponse.json(
        { error: "Muscle group is required" },
        { status: 400 },
      );
    }

    const newExercise = await exercisesQuery.insertExercise(exerciseData);
    return NextResponse.json(newExercise, { status: 201 });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const exerciseId = searchParams.get("id");
    const name = searchParams.get("name");

    if (exerciseId) {
      const exercise = await exercisesQuery.getExercise(exerciseId);
      if (!exercise) {
        return NextResponse.json(
          { error: "Exercise not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(exercise);
    }

    if (name) {
      const exercise = await exercisesQuery.getExerciseByName(name);
      if (!exercise) {
        return NextResponse.json(
          { error: "Exercise not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(exercise);
    }

    // se non ci sono parametri → restituisci tutti
    const all = await exercisesQuery.getAllExercises();
    return NextResponse.json(all);
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
