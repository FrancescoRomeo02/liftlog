"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { WorkoutsQuery } from "@/lib/queries/workouts";
import type { Database } from "@/lib/database.types";

type WorkoutInsert = Database["public"]["Tables"]["workout_plans"]["Insert"];
type WorkoutUpdate = Database["public"]["Tables"]["workout_plans"]["Update"];

export async function createWorkout(formData: FormData) {
  const workoutData: WorkoutInsert = {
    user_id: formData.get("user_id") as string,
    name: formData.get("name") as string,
    notes: (formData.get("notes") as string) || null,
  };

  try {
    const workout = await WorkoutsQuery.createWorkout(workoutData);
    revalidatePath("/workouts");
    redirect(`/workouts/${workout.id}`);
  } catch (error) {
    console.error("Error creating workout:", error);
    throw error;
  }
}

export async function updateWorkout(workoutId: string, formData: FormData) {
  const updates: WorkoutUpdate = {
    name: formData.get("name") as string,
    notes: (formData.get("notes") as string) || null,
  };

  try {
    await WorkoutsQuery.updateWorkout(workoutId, updates);
    revalidatePath("/workouts");
    revalidatePath(`/workouts/${workoutId}`);
  } catch (error) {
    console.error("Error updating workout:", error);
    throw error;
  }
}

export async function deleteWorkout(workoutId: string) {
  try {
    await WorkoutsQuery.deleteWorkout(workoutId);
    revalidatePath("/workouts");
    redirect("/workouts");
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error;
  }
}
