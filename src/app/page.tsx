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
    <main className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="text-primary">Track</span> your workouts. <br />
            Reach your <span className="text-primary">goals</span>.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
            LiftLog is the simplest way to log your training sessions, store
            personalized workout plans, and monitor your progress over time.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/workouts">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/learn-more">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 mt-24">
          <Card>
            <CardHeader>
              <CardTitle>Custom Workout Plans</CardTitle>
              <CardDescription>
                Create, edit, and save routines tailored to your training goals.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Record sets, reps, and weights to measure improvement over time.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simple & Fast</CardTitle>
              <CardDescription>
                Log workouts in seconds with a clean, distraction-free
                interface.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start lifting smarter today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up now and take control of your training journey.
          </p>
          <Link href="/login">
            <Button size="lg">Create Your Free Account</Button>
          </Link>
        </section>
      </section>

      <Footer />
    </main>
  );
}
