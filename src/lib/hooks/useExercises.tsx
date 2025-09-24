"use client";
// TODO: sistemare le api e crearne di nuove
import { useState, useEffect, useCallback } from "react";
import type { Database } from "@/lib/database.types";

type Exercise = Database["public"]["Tables"]["workout_plans"]["Row"];
type ExerciseInsert = Database["public"]["Tables"]["workout_plans"]["Insert"];
type ExerciseUpdate = Database["public"]["Tables"]["workout_plans"]["Update"];

export function useExercises(userId: string) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = useCallback(async () => {
    if (!userId) {
      setExercises([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/exercises/user/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      setExercises([...data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createExercise = async (exerciseData: ExerciseInsert) => {
    try {
      setError(null);
      const response = await fetch("/api/exercises", {
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
      setExercises((prev) => [newExercise, ...prev]);
      return newExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateExercise = async (
    exerciseId: string,
    updates: ExerciseUpdate,
  ) => {
    try {
      setError(null);
      const response = await fetch(`/api/exercises?id=${exerciseId}`, {
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
      setExercises((prev) =>
        prev.map((e) => (e.id === exerciseId ? updatedExercise : e)),
      );
      return updatedExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteExercise = async (exerciseId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/exercises?id=${exerciseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getExercise = async (workoutId: string): Promise<Exercise | null> => {
    try {
      const response = await fetch(`/api/workouts?id=${workoutId}`);

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
    fetchExercises();
  }, [fetchExercises]);

  return {
    exercises,
    loading,
    error,
    refetch: fetchExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    getExercise,
  };
}
