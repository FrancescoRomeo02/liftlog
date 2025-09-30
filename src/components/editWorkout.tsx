"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWorkouts } from "@/lib/hooks/useWorkouts";

export default function EditWorkout({
  name,
  notes,
  id,
  userId,
  onWorkoutUpdatedAction,
}: {
  name: string;
  notes: string;
  id: string;
  userId: string;
  onWorkoutUpdatedAction?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState(name);
  const [workoutNotes, setWorkoutNotes] = useState(notes);

  const { updateWorkout, deleteWorkout, loading } = useWorkouts(userId);

  async function handleSave() {
    try {
      await updateWorkout(id, {
        name: workoutName,
        notes: workoutNotes,
      });
      setOpen(false);
      if (onWorkoutUpdatedAction) {
        await onWorkoutUpdatedAction();
      }
    } catch (error) {
      console.error("❌ Error con hook:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteWorkout(id);
      setOpen(false);
      if (onWorkoutUpdatedAction) {
        await onWorkoutUpdatedAction();
      }
    } catch (error) {
      console.error("❌ Error con hook:", error);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="secondary">
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit your workout</h4>
            <p className="text-muted-foreground text-sm">
              Edit your workout information.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                className="col-span-2 whitespace-pre-wrap break-words"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-between">
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete Workout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
