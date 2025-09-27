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
import Link from "next/link";
import { CalendarCheck, TrendingUp, Timer } from "lucide-react";
import Image from "next/image";

export default function InfoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <section className="flex-1 px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Hero */}

        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
              <span className="text-primary">Track</span> your workouts. <br />
              Reach your <span className="text-primary">goals</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 mb-8">
              LiftLog is the simplest way to log your training sessions, store
              personalized workout plans, and monitor your progress over time.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="/workouts">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-80 md:h-[400px] lg:h-[500px]">
            <Image
              src="/hero-gym.png"
              alt="Person lifting weights illustration"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </section>

        {/* About Training */}
        <section className="grid md:grid-cols-2 gap-10 mb-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Track Workouts?</CardTitle>
              <CardDescription className="leading-relaxed text-muted-foreground">
                Keeping a training log helps you understand what works and where
                you need to improve. Recording sets, reps, and weights gives you
                a clear picture of your progress, prevents plateaus, and reduces
                the risk of overtraining.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Smart Training Plans</CardTitle>
              <CardDescription className="leading-relaxed text-muted-foreground">
                A structured plan transforms random workouts into a focused
                program. Whether your goal is strength, hypertrophy, or
                endurance, having routines ready saves time and ensures
                consistency.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits of Using LiftLog
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CalendarCheck className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Consistency
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Stay motivated with a clear record of your past sessions.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Progress
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Visualize improvements in strength and endurance week by week.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Timer className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Efficiency
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Plan ahead and focus on training instead of remembering sets.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Build a stronger version of yourself
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Start organizing your workouts today and experience the difference
            of structured training.
          </p>
          <Link href="/login">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </section>
      </section>

      <Footer />
    </main>
  );
}
