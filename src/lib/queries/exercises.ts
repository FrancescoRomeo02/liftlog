import { createClient } from "@/utils/supabase/server";
import type { Database } from "../database.types";

type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
type ExerciseInsert = Database["public"]["Tables"]["exercises"]["Insert"];
type ExerciseUpdate = Database["public"]["Tables"]["exercises"]["Update"];

export class exercisesQuery {
  // Get exercises
  static async getAllExercises(): Promise<Exercise[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .order("muscle_group", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get single exercise
  static async getExercise(exerciseId: string): Promise<Exercise | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("id", exerciseId)
      .single();

    if (error) throw error;
    return data;
  }

  // Get exercises by name
  static async getExerciseByName(name: string): Promise<Exercise | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .ilike("name", `%${name}%`)
      .order("muscle_group", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  }

  // Create exercise
  static async insertExercise(exercise: ExerciseInsert): Promise<Exercise> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .insert(exercise)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update exercise
  static async updateExercise(
    exerciseId: string,
    updates: ExerciseUpdate,
  ): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercise_plans")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", exerciseId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete exercise
  static async deleteExercise(exerciseId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("exercise_plans")
      .delete()
      .eq("id", exerciseId);

    if (error) throw error;
  }
}
