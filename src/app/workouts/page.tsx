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
          <AddNewWorkout userId={data.user.id} />
        </section>

        {/* Workout Cards */}
        <WorkoutList userId={data.user.id} />

        <Footer />
      </section>
    </main>
  );
}
