import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkoutList from "@/components/WorkoutList";

import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // Placeholder: in futuro potresti fetchare le schede workout dall’API o dal DB
  const workouts = [
    {
      id: 1,
      title: "Full Body Strength",
      description: "3x/week, focus on compound lifts",
    },
    {
      id: 2,
      title: "Upper Body Hypertrophy",
      description: "4x/week, higher volume for arms & chest",
    },
    {
      id: 3,
      title: "Leg Day Focus",
      description: "2x/week, quad & hamstring emphasis",
    },
    {
      id: 4,
      title: "Cardio & Conditioning",
      description: "3x/week, mix of HIIT and steady-state cardio",
    },
  ];

  return (
    <main className="px-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <section className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="flex flex-col items-center text-center mt-20">
          <h2 className="text-4xl font-extrabold mb-6 leading-snug">
            Welcome back,{" "}
            <span className="text-purple-700 dark:text-purple-500">
              {data.user.user_metadata.username}
            </span>
            !
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
            Here are your personalized workout plans. Track your progress and
            stay consistent!
          </p>
          <Button className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700 py-2 px-6 mb-8">
            Create New Workout
          </Button>
        </section>

        {/* Workout Cards */}
        <WorkoutList userId={data.user.id} />

        <Footer />
      </section>
    </main>
  );
}
