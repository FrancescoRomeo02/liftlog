"use client";

import { useState, useEffect, useCallback } from "react";
import type { Database } from "@/lib/database.types";

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
  };
};

export function useWorkoutExercises(workoutId: string) {
  const [workoutExercises, setWorkoutExercises] = useState<
    WorkoutExerciseEnriched[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkoutExercises = useCallback(async () => {
    if (!workoutId) {
      setWorkoutExercises([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/workouts/workout/${workoutId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data: WorkoutExerciseEnriched[] = await response.json();
      console.log("Response (2):", data);
      setWorkoutExercises(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWorkoutExercises([]);
    } finally {
      setLoading(false);
    }
  }, [workoutId]);

  const createWorkoutExercise = async (exerciseData: WorkoutExerciseInsert) => {
    try {
      setError(null);
      const response = await fetch(`/api/workouts/workout/${workoutId}`, {
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
      setWorkoutExercises((prev) => [newExercise, ...prev]);
      return newExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateWorkoutExercise = async (
    exerciseId: string,
    updates: WorkoutExerciseUpdate,
  ) => {
    try {
      setError(null);
      const response = await fetch(`/api/workout_exercises?id=${exerciseId}`, {
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
      setWorkoutExercises((prev) =>
        prev.map((e) => (e.id === exerciseId ? updatedExercise : e)),
      );
      return updatedExercise;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteWorkoutExercise = async (exerciseId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/workout_exercises?id=${exerciseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      setWorkoutExercises((prev) => prev.filter((e) => e.id !== exerciseId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getWorkoutExercise = async (
    exerciseId: string,
  ): Promise<WorkoutExercise | null> => {
    try {
      const response = await fetch(`/api/workout_exercises?id=${exerciseId}`);

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
    fetchWorkoutExercises();
  }, [fetchWorkoutExercises]);

  return {
    workoutExercises,
    loading,
    error,
    refetch: fetchWorkoutExercises,
    createWorkoutExercise,
    updateWorkoutExercise,
    deleteWorkoutExercise,
    getWorkoutExercise,
  };
}
