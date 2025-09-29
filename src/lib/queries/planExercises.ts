import { createClient } from "@/utils/supabase/server";
import type { Database } from "../database.types";

type PlanExercise = Database["public"]["Tables"]["plan_exercises"]["Row"];
type PlanExerciseInsert =
  Database["public"]["Tables"]["plan_exercises"]["Insert"];
type PlanExerciseUpdate =
  Database["public"]["Tables"]["plan_exercises"]["Update"];

type PlanExerciseEnriched = PlanExercise & {
  exercises: {
    id: string;
    name: string;
    muscle_group: string;
  } | null; // meglio nullable per sicurezza
};

export class PlanExercisesQuery {
  // Get user's workout's exercises
  static async getUserPlanExercise(
    planId: string,
  ): Promise<PlanExerciseEnriched[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("plan_exercises")
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
      .eq("plan_id", planId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createPlanExercise(
    planId: string,
    data: PlanExerciseInsert,
  ): Promise<PlanExercise> {
    const supabase = await createClient();
    const { data: planExercise, error } = await supabase
      .from("plan_exercises")
      .insert(data)
      .select();

    if (error) throw error;
    return planExercise[0];
  }

  static async updatePlanExercise(
    id: string,
    data: PlanExerciseUpdate,
  ): Promise<PlanExercise> {
    const supabase = await createClient();
    const { data: planExercise, error } = await supabase
      .from("plan_exercises")
      .update(data)
      .eq("id", id)
      .select();

    if (error) throw error;
    return planExercise[0];
  }

  static async deletePlanExercise(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("plan_exercises")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
