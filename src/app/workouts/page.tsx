import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkoutList from "@/components/WorkoutList";
import AddNewWorkout from "@/components/AddNewWorkout";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight mb-4">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              {data.user.user_metadata.username}
            </span>
            !
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are your personalized workout plans. Track your progress and
            stay consistent!
          </p>
          <div className="mt-8">
            <AddNewWorkout userId={data.user.id} />
          </div>
        </div>

        {/* Workout List */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Your Workouts
          </h3>
          <WorkoutList userId={data.user.id} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
