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
import EditWorkout from "@/components/editWorkout";
import { useRouter } from "next/navigation";

function SkeletonCard() {
  return (
    <Card className="overflow-hidden border bg-muted/30 relative">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40"></div>
      <CardHeader className="relative">
        <CardTitle className="h-6 w-3/4 rounded bg-muted"></CardTitle>
        <CardDescription className="h-4 w-full rounded mt-2 bg-muted"></CardDescription>
        <CardAction className="h-4 w-1/4 rounded mt-2 bg-muted"></CardAction>
      </CardHeader>
      <CardContent className="mt-4 flex gap-2">
        <div className="h-8 w-20 rounded bg-muted"></div>
        <div className="h-8 w-20 rounded bg-muted"></div>
      </CardContent>
    </Card>
  );
}

export default function WorkoutsPage({ userId }: { userId: string }) {
  const { workouts, loading, error, refetch } = useWorkouts(userId);
  const { user, loading: userLoading } = useUser(userId);
  const router = useRouter();

  if (loading) {
    return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center col-span-full py-10">
        <p className="text-red-500 font-medium">Error: {error}</p>
        <Button onClick={refetch} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!workouts.length) {
    return (
      <p className="text-center col-span-full py-10 text-muted-foreground">
        No workouts found.
      </p>
    );
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {workouts.map((w) => (
        <Card key={w.id} className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>{w.name}</CardTitle>
            {w.notes && <CardDescription>{w.notes}</CardDescription>}
            <CardAction className="italic font-light text-xs">
              {userLoading ? "Loading..." : user?.user_name || "Unknown User"}
            </CardAction>
          </CardHeader>
          <CardContent className="mt-4 flex flex-wrap gap-4">
            <Button
              size="sm"
              variant="default"
              onClick={() => router.push(`/workouts/${w.id}`)}
            >
              View
            </Button>
            <EditWorkout
              id={w.id}
              name={w.name}
              notes={w.notes ?? ""}
              userId={userId}
              onWorkoutUpdatedAction={() => refetch()}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
