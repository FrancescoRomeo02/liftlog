import { createClient } from "@/utils/supabase/server";
import type { Database } from "../database.types";

type Workout = Database["public"]["Tables"]["workouts"]["Row"];
type WorkoutInsert = Database["public"]["Tables"]["workouts"]["Insert"];
type WorkoutUpdate = Database["public"]["Tables"]["workouts"]["Update"];

export class WorkoutsQuery {
  // Get user's workouts
  static async getUserWorkouts(userId: string): Promise<Workout[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get single workout
  static async getWorkout(workoutId: string): Promise<Workout | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", workoutId)
      .single();

    if (error) throw error;
    return data;
  }

  // Create workout
  static async createWorkout(workout: WorkoutInsert): Promise<Workout> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workouts")
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
  ): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workouts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", workoutId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete workout
  static async deleteWorkout(workoutId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workoutId);

    if (error) throw error;
  }
}
