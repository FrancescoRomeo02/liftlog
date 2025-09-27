import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkoutList from "@/components/WorkoutList";
import AddNewWorkout from "@/components/AddNewWorkout";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const username = user.user_metadata?.username ?? user.email;

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight mb-4">
            Welcome back, <span className="text-primary">{username}</span>!
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Here are your personalized workout plans. Track your progress and
            stay consistent!
          </p>
          <div className="mt-8">
            <AddNewWorkout userId={user.id} />
          </div>
        </div>

        {/* Workout List */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Your Workouts</h3>
          <WorkoutList userId={user.id} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
