"use client";

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
import { useWorkouts } from "@/lib/hooks/useWorkouts";
import { useState } from "react";

export default function AddNewWorkout({ userId }: { userId: string }) {
  const { createWorkout, loading } = useWorkouts(userId);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createWorkout({
        name: formData.get("name") as string,
        notes: formData.get("description") as string,
        user_id: userId,
      });
      setOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Error creating workout:", error);
      // Qui potresti gestire l'errore con un toast o altro
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700 py-2 px-6 mb-8">
          Create New Workout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new workout</DialogTitle>
            <DialogDescription>
              Fill in the details of your new workout.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue="Legs day" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                defaultValue="A new workout"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Save workout"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
