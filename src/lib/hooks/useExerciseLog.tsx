"use client";
// TODO: sistemare le api e crearne di nuove
import { useState, useEffect, useCallback } from "react";
import type { Database } from "@/lib/database.types";

type ExerciseLog = Database["public"]["Tables"]["exercise_logs"]["Row"];
type ExerciseLogInsert =
  Database["public"]["Tables"]["exercise_logs"]["Insert"];
type ExerciseLogUpdate =
  Database["public"]["Tables"]["exercise_logs"]["Update"];

export function usePlanExercise(planId: string) {
  const [planExercises, setPlanExercises] = useState<ExerciseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExerciseLog = useCallback(async () => {
    if (!planId) {
      setPlanExercises([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/exercise_log/${planId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      setPlanExercises([...data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setPlanExercises([]);
    } finally {
      setLoading(false);
    }
  }, [planId]);

  const createExerciseLog = async (exerciseData: ExerciseLogInsert) => {
    try {
      setError(null);
      const response = await fetch("/api/exercise_log", {
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

  const updateExerciseLog = async (
    exerciseId: string,
    updates: ExerciseLogUpdate,
  ) => {
    try {
      setError(null);
      const response = await fetch(`/api/exercise_log?id=${exerciseId}`, {
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

  const deleteExerciseLog = async (exerciseId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/exercise_log?id=${exerciseId}`, {
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

  const getExerciseLog = async (
    workoutId: string,
  ): Promise<ExerciseLog | null> => {
    try {
      const response = await fetch(`/api/exercise_log?id=${workoutId}`);

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
    fetchExerciseLog();
  }, [fetchExerciseLog]);

  return {
    planExercises,
    loading,
    error,
    refetch: fetchExerciseLog,
    createExerciseLog,
    updateExerciseLog,
    deleteExerciseLog,
    getExerciseLog,
  };
}
