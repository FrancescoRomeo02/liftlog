import { createClient } from "@/utils/supabase/server";
import type { Database } from "../database.types";

type WorkoutExercise = Database["public"]["Tables"]["workout_exercises"]["Row"];
type WorkoutExerciseInsert =
  Database["public"]["Tables"]["workout_exercises"]["Insert"];
type WorkoutExerciseUpdate =
  Database["public"]["Tables"]["workout_exercises"]["Update"];

type WorkoutExerciseEnriched = WorkoutExercise & {
  exercises: {
    id: string;
    name: string;
    muscle_group: string;
  } | null; // meglio nullable per sicurezza
};

export class WorkoutExercisesQuery {
  // Get user's workout's exercises
  static async getUserWorkoutExercise(
    workoutId: string,
  ): Promise<WorkoutExerciseEnriched[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workout_exercises")
      .select(
        `
        *,
        exercises (
          id,
          name,
          muscle_group
        )
      `,
      )
      .eq("workout_id", workoutId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createWorkoutExercise(
    workoutId: string,
    data: WorkoutExerciseInsert,
  ): Promise<WorkoutExercise> {
    const supabase = await createClient();
    const { data: workoutExercise, error } = await supabase
      .from("workout_exercises")
      .insert(data)
      .select();

    if (error) throw error;
    return workoutExercise[0];
  }

  static async updateWorkoutExercise(
    id: string,
    data: WorkoutExerciseUpdate,
  ): Promise<WorkoutExercise> {
    const supabase = await createClient();
    const { data: workoutExercise, error } = await supabase
      .from("workout_exercises")
      .update(data)
      .eq("id", id)
      .select();

    if (error) throw error;
    return workoutExercise[0];
  }

  static async deleteWorkoutExercise(id: string): Promise<void> {
    console.log("Deleting workout exercise:", id);
    const supabase = await createClient();
    const { error } = await supabase
      .from("workout_exercises")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
}
