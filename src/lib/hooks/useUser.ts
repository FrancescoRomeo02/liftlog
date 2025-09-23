"use client";

import { useState, useEffect } from "react";
import { usersQueryClient } from "@/lib/queries/profiles.client";
import type { Database } from "@/lib/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const userData = await usersQueryClient.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const refetch = async () => {
    try {
      setError(null);
      const userData = await usersQueryClient.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return { user, loading, error, refetch };
}
