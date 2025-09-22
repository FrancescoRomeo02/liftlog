import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="px-10">
      <section className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="flex flex-col items-center text-center mt-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
            <span className="text-purple-700">Track</span> your workouts. <br />{" "}
            Reach your <span className="text-purple-700">goals</span>.
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mb-8">
            LiftLog is the simplest way to log your training sessions, store
            personalized workout plans, and monitor your progress over time.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-orange-800 transition">
                Get Started {data.user.user_metadata.username}
              </button>
            </Link>
            <Link
              href="/learn-more"
              className="border border-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:border-gray-600 transition"
            >
              Learn More
            </Link>
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}
