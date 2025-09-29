import { NextRequest, NextResponse } from "next/server";
import { PlanExercisesQuery } from "@/lib/queries/planExercises";

export async function GET(
  request: NextRequest,
  { params }: { params: { planId: string } },
) {
  try {
    const { planId } = params;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required (get)" },
        { status: 400 },
      );
    }

    const plans = await PlanExercisesQuery.getUserPlanExercise(planId);
    return NextResponse.json(plans);
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
  { params }: { params: { planId: string } },
) {
  try {
    const { planId } = await params;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required (post)" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const planExercise = await PlanExercisesQuery.createPlanExercise(
      planId,
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
