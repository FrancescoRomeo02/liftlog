"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { muscleGroups } from "@/lib/muscleGroups";
import { useExercises } from "@/lib/hooks/useExercises";
import { useWorkoutExercises } from "@/lib/hooks/useWorkoutExercises";

export default function AddExercise({
  workoutId,
  refetchAction,
}: {
  workoutId: string;
  refetchAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createExercise } = useExercises();
  const { createWorkoutExercise } = useWorkoutExercises(workoutId);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    // flow:
    // 1. create exercise row (if not preset)
    // 2. create workoute exercise row using exercise id

    try {
      // 1. create exercise row
      const exerciseItem = {
        name: formData.get("name") as string,
        muscle_group: formData.get("muscle_group") as string,
      };
      const newExercise = await createExercise(exerciseItem);
      if (!newExercise) {
        throw new Error("Failed to create exercise");
      }

      // 2. create workoute exercise row
      const num_reps = parseFloat(formData.get("reps") as string);
      const num_sets = parseFloat(formData.get("sets") as string);
      const num_weight = parseFloat(formData.get("weight") as string);
      const workouteExerciseItem = {
        exercise_id: newExercise.id,
        workout_id: workoutId,
        reps: num_reps as number,
        sets: num_sets as number,
        weight: num_weight as number,
        notes: formData.get("notes") as string,
      };
      const newWorkouteExercise =
        await createWorkoutExercise(workouteExerciseItem);
      if (!newWorkouteExercise) {
        throw new Error("Failed to create workoute exercise");
      }
      await refetchAction();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-2 px-6 mb-8 mt-8">Add a new exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Add a new exercise</DialogTitle>
            <DialogDescription>
              Fill in the details of your new exercise.
            </DialogDescription>
          </DialogHeader>

          {/* MUSCLE GROUP SELECT */}
          <div className="grid gap-3">
            <Label htmlFor="muscle_group">Muscle Group</Label>
            <Select name="muscle_group" required>
              <SelectTrigger>
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(muscleGroups).map(([group, muscles]) => (
                  <SelectGroup key={group}>
                    <SelectLabel>{group}</SelectLabel>
                    {muscles.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* NAME */}
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Bench Press" required />
          </div>

          {/* SETS & REPS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="sets">Sets</Label>
              <Input id="sets" name="sets" type="number" min="1" required />
            </div>
            <div>
              <Label htmlFor="reps">Reps</Label>
              <Input id="reps" name="reps" type="number" min="1" required />
            </div>
          </div>

          {/* WEIGHT */}
          <div className="grid gap-3">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" min="0" />
          </div>

          {/* NOTES */}
          <div className="grid gap-3">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Optional notes..." />
          </div>

          {/* FOOTER */}
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Save exercise"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
