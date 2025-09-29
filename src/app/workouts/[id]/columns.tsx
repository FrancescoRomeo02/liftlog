"use client";
import { muscleGroups } from "@/lib/muscleGroups";
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
  muscle_group: string;
  name: string;
  reps: number;
  sets: number;
  weight?: number;
  notes?: string;
};
type ColumnsProps = {
  onUpdateAction: (id: string, updates: Partial<Exercise>) => void;
  onDeleteAction: (id: string) => void;
};
const macroColors: Record<string, string> = {
  Chest: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300",
  Back: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
  Arms: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300",
  Legs: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
  Core: "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300",
  Shoulders:
    "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300", // esempio aggiunto
};
export const colors: Record<string, string> = Object.entries(
  muscleGroups,
).reduce(
  (acc, [macro, subs]) => {
    subs.forEach(({ value }) => {
      acc[value] = macroColors[macro];
    });
    return acc;
  },
  {} as Record<string, string>,
);
export function getColumns({
  onUpdateAction,
  onDeleteAction,
}: ColumnsProps): ColumnDef<Exercise>[] {
  return [
    {
      accessorKey: "muscle_group",
      header: "Muscle Group",
      cell: ({ row }) => {
        const group = row.getValue("muscle_group") as Exercise["muscle_group"];
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
    { accessorKey: "name", header: "Exercise" },
    { accessorKey: "reps", header: "Reps" },
    { accessorKey: "sets", header: "Sets" },
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
              {/*<EditExerciseDialog
                exercise={exercise}
                onSaveAction={(updated) => onUpdateAction(exercise.id, updated)}
              />*/}
              <DeleteExerciseDialog
                exercise={exercise}
                onConfirmAction={(id) => onDeleteAction(id)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
