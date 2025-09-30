"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type TimerControlsProps = {
  seconds: number;
  isPaused: boolean;
  workoutEnded: boolean;
  onPauseAction: () => void;
  onEndAction: () => void;
};

function formatTime(s: number) {
  const min = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

export default function TimerControls({
  seconds,
  isPaused,
  workoutEnded,
  onPauseAction,
  onEndAction,
}: TimerControlsProps) {
  // Stato per blink
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isPaused) {
      const interval = setInterval(() => {
        setVisible((v) => !v);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setVisible(true);
    }
  }, [isPaused]);

  return (
    <div className="w-full flex flex-col items-center mb-8">
      <div
        className={`text-4xl font-bold mb-2 text-foreground font-mono ${isPaused ? "text-muted-foreground" : ""}`}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        {formatTime(seconds)}
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onPauseAction}
          disabled={workoutEnded}
        >
          {isPaused ? "Riprendi" : "Pausa"}
        </Button>
        <Button
          variant="destructive"
          onClick={onEndAction}
          disabled={workoutEnded}
        >
          Termina
        </Button>
      </div>
    </div>
  );
}
