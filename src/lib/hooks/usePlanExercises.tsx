"use client";
// TODO: sistemare le api e crearne di nuove
import { useState, useEffect, useCallback } from "react";
import type { Database } from "@/lib/database.types";

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
  };
};

export function usePlanExercises(planId: string) {
  const [planExercises, setPlanExercises] = useState<PlanExerciseEnriched[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanExercises = useCallback(async () => {
    if (!planId) {
      setPlanExercises([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/plan_exercises/${planId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data: PlanExerciseEnriched[] = await response.json();
      console.log("Response (2):", data);
      setPlanExercises(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setPlanExercises([]);
    } finally {
      setLoading(false);
    }
  }, [planId]);

  const createPlanExercise = async (exerciseData: PlanExerciseInsert) => {
    try {
      setError(null);
      const response = await fetch(`/api/plan_exercises/${planId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const newExercise = await response.json();
      setPlanExercises((prev) => [newExercise, ...prev]);
      return newExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updatePlanExercise = async (
    exerciseId: string,
    updates: PlanExerciseUpdate,
  ) => {
    try {
      setError(null);
      const response = await fetch(`/api/plan_exercises?id=${exerciseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const updatedExercise = await response.json();
      setPlanExercises((prev) =>
        prev.map((e) => (e.id === exerciseId ? updatedExercise : e)),
      );
      return updatedExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deletePlanExercise = async (exerciseId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/plan_exercises?id=${exerciseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      setPlanExercises((prev) => prev.filter((e) => e.id !== exerciseId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getPlanExercise = async (
    planId: string,
  ): Promise<PlanExercise | null> => {
    try {
      const response = await fetch(`/api/plan_exercises/${planId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchPlanExercises();
  }, [fetchPlanExercises]);

  return {
    planExercises,
    loading,
    error,
    refetch: fetchPlanExercises,
    createPlanExercise,
    updatePlanExercise,
    deletePlanExercise,
    getPlanExercise,
  };
}
