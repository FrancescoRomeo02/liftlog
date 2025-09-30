"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from "@/lib/database.types";

type WorkoutExercise = Database["public"]["Tables"]["workout_exercises"]["Row"];
type WorkoutExerciseEnriched = WorkoutExercise & {
  exercises: {
    id: string;
    name: string;
    muscle_group: string;
  };
};
type ExerciseListProps = {
  workoutExercises: WorkoutExerciseEnriched[];
  loading: boolean;
  error: string | null;
  checked: { [id: string]: boolean };
  onCheckAction: (id: string) => void;
  workoutEnded: boolean;
};

export default function ExerciseList({
  workoutExercises,
  loading,
  error,
  checked,
  onCheckAction,
  workoutEnded,
}: ExerciseListProps) {
  if (loading) return <p>Caricamento...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (workoutExercises.length === 0) return <p>Nessun esercizio trovato.</p>;

  const completed = workoutExercises.filter((ex) => checked[ex.id]).length;
  return (
    <div className="w-full bg-card rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Esercizi da fare</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {completed}/{workoutExercises.length} completati
      </p>
      <ul className="space-y-4">
        {workoutExercises.map((ex) => (
          <li
            key={ex.id}
            className={`flex items-center gap-4 p-3 rounded-lg border bg-background text-foreground ${
              checked[ex.id] ? "bg-background/50 line-through opacity-60" : ""
            }`}
          >
            <Checkbox
              checked={!!checked[ex.id]}
              onCheckedChange={() => onCheckAction(ex.id)}
              id={`exercise-${ex.id}`}
              disabled={workoutEnded}
            />
            <label
              htmlFor={`exercise-${ex.id}`}
              className="flex-1 cursor-pointer"
            >
              <span className="font-medium">{ex.exercises?.name}</span>
              {ex.sets && ex.reps && ex.weight && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({ex.sets}x{ex.reps} {ex.weight}kg)
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
