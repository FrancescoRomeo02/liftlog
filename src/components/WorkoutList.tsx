"use client";

import { useWorkouts } from "@/lib/hooks/useWorkouts";
import { useUser } from "@/lib/hooks/useUser";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WorkoutsPage({ userId }: { userId: string }) {
  const { workouts, loading, error, refetch } = useWorkouts(userId);
  const { user, loading: userLoading } = useUser(userId);

  // Skeleton array di 5 elementi
  const skeletons = Array.from({ length: 5 });

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {loading ? (
        skeletons.map((_, i) => (
          <Card key={i} className="bg-gray-200 dark:bg-gray-800 animate-pulse">
            <CardHeader>
              <CardTitle className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></CardDescription>
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : error ? (
        <div className="text-center col-span-full">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <Button
            onClick={refetch}
            className="mt-2 bg-purple-700 dark:bg-purple-600"
          >
            Retry
          </Button>
        </div>
      ) : workouts.length === 0 ? (
        <p className="text-center col-span-full text-gray-600 dark:text-gray-400">
          No workouts found.
        </p>
      ) : (
        workouts.map((w) => (
          <Card key={w.id} className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>{w.name}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {w.notes}
              </CardDescription>
              <CardAction>
                {userLoading ? "Loading..." : user?.user_name || "Unknown User"}
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700"
                >
                  View
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
}
