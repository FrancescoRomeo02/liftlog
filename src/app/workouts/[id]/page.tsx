"use client";

import { use } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import AddExercise from "@/components/AddExercisePlan";
import { usePlanExercises } from "@/lib/hooks/usePlanExercises";

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = use(params);
  const {
    planExercises,
    updatePlanExercise,
    deletePlanExercise,
    loading,
    error,
    refetch,
  } = usePlanExercises(id);

  const mappedData = planExercises.map((item) => ({
    id: item.id,
    name: item.exercises?.name,
    muscle_group: item.exercises?.muscle_group,
    sets: item.sets,
    reps: item.reps,
    weight: item.weight ?? 0,
    notes: item.notes ?? "",
  }));

  const columns = getColumns({
    onUpdateAction: updatePlanExercise,
    onDeleteAction: deletePlanExercise,
  });

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Your <span className="bg-clip-text text-primary">Exercises</span>
          </h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable columns={columns} data={mappedData} />
          )}
        </div>

        <AddExercise workoutId={id} refetchAction={refetch} />
      </section>

      <Footer />
    </main>
  );
}
