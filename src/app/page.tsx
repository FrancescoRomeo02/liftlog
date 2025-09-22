import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
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
                Get Started
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

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-10 mt-28">
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-3">Custom Workout Plans</h3>
            <p className="text-gray-600">
              Create, edit, and save routines tailored to your training goals.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-gray-600">
              Record sets, reps, and weights to measure improvement over time.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-3">Simple & Fast</h3>
            <p className="text-gray-600">
              Log workouts in seconds with a clean, distraction-free interface.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl font-bold mb-6">
            Start lifting smarter today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up now and take control of your training journey.
          </p>
          <Link href="/login">
            <button className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-purple-800 transition">
              Create Your Free Account
            </button>
          </Link>
        </section>

        <Footer />
      </section>
    </main>
  );
}
