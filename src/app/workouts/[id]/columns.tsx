"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { EditExerciseDialog } from "./actions/EditExerciseDialog";
import { DeleteExerciseDialog } from "./actions/DeleteExerciseDialog";

export type Exercise = {
  id: string;
  muscle_group: "chest" | "back" | "arms" | "legs" | "core";
  name: string;
  reps: number;
  sets: number;
  weight?: number;
  notes?: string;
};

export const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "muscle_group",
    header: "Muscle Group",
    cell: ({ row }) => {
      const group = row.getValue("muscle_group") as Exercise["muscle_group"];
      const colors: Record<Exercise["muscle_group"], string> = {
        chest: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300",
        back: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
        arms: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300",
        legs: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
        core: "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300",
      };
      return (
        <Badge
          variant="secondary"
          className={`${colors[group]} capitalize font-medium`}
        >
          {group}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Exercise",
  },
  {
    accessorKey: "reps",
    header: "Reps",
  },
  {
    accessorKey: "sets",
    header: "Sets",
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => {
      const weight = row.getValue("weight") as number | undefined;
      return weight ? `${weight} kg` : "—";
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | undefined;
      return (
        <span className="text-sm italic text-muted-foreground">
          {notes || "—"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const exercise = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditExerciseDialog
              exercise={exercise}
              onSave={(updated) => console.log("Saved", updated)}
            />
            <DeleteExerciseDialog
              exercise={exercise}
              onConfirm={(id) => console.log("Deleted", id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
