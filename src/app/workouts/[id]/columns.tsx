"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Exercise = {
  id: string;
  //  chest, back, shoulders, arms (biceps and triceps), legs (quads, hamstrings, glutes, calves), and the core (abdominals and obliques)
  muscle_group: "chest" | "back" | "arms" | "lesg" | "core";
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
  },
  {
    accessorKey: "name",
    header: "Name",
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
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
