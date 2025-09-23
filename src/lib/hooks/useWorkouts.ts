"use client";

import { useState, useEffect, useCallback } from "react";
import { WorkoutsQueryClient } from "@/lib/queries/workouts.client";
import type { Database } from "@/lib/database.types";

type Workout = Database["public"]["Tables"]["workout_plans"]["Row"];

export function useWorkouts(userId: string) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await WorkoutsQueryClient.getUserWorkouts(userId);
      setWorkouts(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchWorkouts();
    }
  }, [userId, fetchWorkouts]);

  return { workouts, loading, error, refetch: fetchWorkouts };
}
