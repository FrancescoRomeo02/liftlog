"use client";

import { useState, useEffect } from "react";
import { useWorkoutExercises } from "@/lib/hooks/useWorkoutExercises";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TimerControls from "@/components/workout/TimerControls";
import ExerciseList from "@/components/workout/ExerciseList";
import WorkoutEndDialog from "@/components/workout/WorkoutEndDialog";
import { useRouter } from "next/navigation";

interface StartWorkoutPageProps {
  params: { id: string };
}

export default function StartWorkoutPage({ params }: StartWorkoutPageProps) {
  const { id } = params;
  const { workoutExercises, loading, error } = useWorkoutExercises(id);
  const router = useRouter();

  // Stato workout
  const [seconds, setSeconds] = useState<number>(() => {
    const saved = localStorage.getItem(`workout-${id}-time`);
    return saved ? Number(saved) : 0;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [workoutEnded, setWorkoutEnded] = useState(false);

  const [checked, setChecked] = useState<{ [id: string]: boolean }>(() => {
    const saved = localStorage.getItem(`workout-${id}-checked`);
    return saved ? JSON.parse(saved) : {};
  });

  // Timer con Date.now()
  useEffect(() => {
    if (isPaused || workoutEnded) return;
    const startTime = Date.now() - seconds * 1000;
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, workoutEnded, seconds]);

  // Persistenza
  useEffect(() => {
    localStorage.setItem(`workout-${id}-time`, String(seconds));
  }, [seconds, id]);

  useEffect(() => {
    localStorage.setItem(`workout-${id}-checked`, JSON.stringify(checked));
  }, [checked, id]);

  // Fine workout automatica
  useEffect(() => {
    if (
      workoutExercises.length > 0 &&
      workoutExercises.every((ex) => checked[ex.id])
    ) {
      setIsPaused(true);
      setWorkoutEnded(true);
    }
  }, [checked, workoutExercises]);

  // Handler
  const handleCheck = (exerciseId: string) => {
    setChecked((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const handlePause = () => setIsPaused((p) => !p);
  const handleEnd = () => {
    setIsPaused(true);
    setWorkoutEnded(true);
  };
  const handleGoBack = () => router.back();
  const handleRestart = () => {
    setSeconds(0);
    setChecked({});
    setIsPaused(false);
    setWorkoutEnded(false);
    localStorage.removeItem(`workout-${id}-time`);
    localStorage.removeItem(`workout-${id}-checked`);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-start px-4 py-8 max-w-2xl mx-auto w-full">
        <TimerControls
          seconds={seconds}
          isPaused={isPaused}
          workoutEnded={workoutEnded}
          onPauseAction={handlePause}
          onEndAction={handleEnd}
        />

        <ExerciseList
          workoutExercises={workoutExercises}
          loading={loading}
          error={error}
          checked={checked}
          onCheckAction={handleCheck}
          workoutEnded={workoutEnded}
        />
      </section>

      <WorkoutEndDialog
        open={workoutEnded}
        seconds={seconds}
        onGoBack={handleGoBack}
        onRestart={handleRestart}
      />

      <Footer />
    </main>
  );
}
