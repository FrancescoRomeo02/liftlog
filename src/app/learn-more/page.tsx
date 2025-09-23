import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InfoPage() {
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
        </section>

        {/* About Training */}
        <section className="grid md:grid-cols-2 gap-10 mt-20">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl">Why Track Workouts?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Keeping a training log helps you understand what works and where
                you need to improve. Recording sets, reps, and weights gives you
                a clear picture of your progress, prevents plateaus, and reduces
                the risk of overtraining.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl">Smart Training Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A structured plan transforms random workouts into a focused
                program. Whether your goal is strength, hypertrophy, or
                endurance, having routines ready saves time and ensures
                consistency.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Benefits */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-10">
            Benefits of Using LiftLog
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-900 text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-3">
                  Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Stay motivated with a clear record of your past sessions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-3">
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Visualize improvements in strength and endurance week by week.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-3">
                  Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Plan ahead and focus on training instead of remembering sets.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl font-bold mb-6">
            Build a stronger version of yourself
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Start organizing your workouts today and experience the difference
            of structured training.
          </p>
          <Button className="bg-purple-700 dark:bg-purple-600 hover:bg-purple-800 dark:hover:bg-purple-700 py-3 px-8">
            Get Started Free
          </Button>
        </section>

        <Footer />
      </section>
    </main>
  );
}
