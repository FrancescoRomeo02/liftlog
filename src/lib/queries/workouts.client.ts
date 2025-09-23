import { createClient } from "@/utils/supabase/client";
import type { Database } from "../database.types";

type Workout = Database["public"]["Tables"]["workout_plans"]["Row"];
type WorkoutInsert = Database["public"]["Tables"]["workout_plans"]["Insert"];
type WorkoutUpdate = Database["public"]["Tables"]["workout_plans"]["Update"];

export class WorkoutsQueryClient {
  // Get user's workouts
  static async getUserWorkouts(userId: string): Promise<Workout[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("workout_plans")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get single workout
  static async getWorkout(workoutId: string): Promise<Workout | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("workout_plans")
      .select("*")
      .eq("id", workoutId)
      .single();

    if (error) throw error;
    return data;
  }

  // Create workout
  static async createWorkout(workout: WorkoutInsert): Promise<Workout> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("workout_plans")
      .insert(workout)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update workout
  static async updateWorkout(
    workoutId: string,
    updates: WorkoutUpdate,
  ): Promise<Workout> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("workout_plans")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", workoutId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete workout
  static async deleteWorkout(workoutId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("workout_plans")
      .delete()
      .eq("id", workoutId);

    if (error) throw error;
  }
}
