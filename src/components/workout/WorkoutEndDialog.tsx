"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type WorkoutEndDialogProps = {
  open: boolean;
  seconds: number;
  onGoBack: () => void;
  onRestart: () => void;
};

function formatTime(s: number) {
  const min = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

export default function WorkoutEndDialog({
  open,
  seconds,
  onGoBack,
  onRestart,
}: WorkoutEndDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allenamento terminato!</DialogTitle>
        </DialogHeader>
        <div className="my-4 text-center">
          <p>Complimenti, hai completato tutti gli esercizi 🎉</p>
          <p>
            Tempo totale:{" "}
            <span className="font-bold">{formatTime(seconds)}</span>
          </p>
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={onRestart} variant="outline">
            Ricomincia
          </Button>
          <Button onClick={onGoBack}>Torna indietro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
