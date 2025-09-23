"use client";

import { useState, useEffect } from "react";
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

        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`,
          );
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
      setError(null);
    }
  }, [userId]);

  const refetch = async () => {
    if (!userId) return;

    try {
      setError(null);
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!userId) return;

    try {
      setError(null);
      const response = await fetch(`/api/users/${userId}`, {
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

      const updatedUser = await response.json();
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { user, loading, error, refetch, updateUser };
}
