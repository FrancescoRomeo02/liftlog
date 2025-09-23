import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="px-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <section className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="flex flex-col items-center text-center mt-20">
          <h2 className="text-4xl font-extrabold mb-6 leading-snug">
            <span className="text-purple-700 dark:text-purple-500">Track</span>{" "}
            your workouts. <br />
            Reach your{" "}
            <span className="text-purple-700 dark:text-purple-500">goals</span>.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
            LiftLog is the simplest way to log your training sessions, store
            personalized workout plans, and monitor your progress over time.
          </p>
          <div className="flex gap-4">
            <Link href="/workouts">
              <Button className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700">
                Get Started
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button
                variant="outline"
                className="border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-600 dark:hover:border-gray-400"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-10 mt-28">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Custom Workout Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create, edit, and save routines tailored to your training goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Record sets, reps, and weights to measure improvement over time.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Simple & Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Log workouts in seconds with a clean, distraction-free
                interface.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl font-bold mb-6">
            Start lifting smarter today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Sign up now and take control of your training journey.
          </p>
          <Link href="/login">
            <Button className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700">
              Create Your Free Account
            </Button>
          </Link>
        </section>

        <Footer />
      </section>
    </main>
  );
}
