"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Exercise } from "../columns";

export function EditExerciseDialog({
  exercise,
  onSaveAction,
}: {
  exercise: Exercise;
  onSaveAction: (updated: Exercise) => void;
}) {
  const [form, setForm] = React.useState(exercise);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-4 py-2">
            <div>
              <Label>Reps</Label>
              <Input
                type="number"
                name="reps"
                value={form.reps}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Sets</Label>
              <Input
                type="number"
                name="sets"
                value={form.sets}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Weight</Label>
              <Input
                type="number"
                name="weight"
                value={form.weight ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="py-2">
            <Label>Notes</Label>
            <Input
              name="notes"
              value={form.notes ?? ""}
              onChange={handleChange}
              placeholder="Notes..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onSaveAction({ ...exercise, ...form });
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
