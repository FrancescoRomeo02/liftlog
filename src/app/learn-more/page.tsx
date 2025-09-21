import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function InfoPage() {
  return (
    <main className="px-10">
      <section className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="flex flex-col items-center text-center mt-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
            <span className="text-purple-700">Track</span> your workouts. <br />
            Reach your <span className="text-purple-700">goals</span>.
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mb-8">
            LiftLog is the simplest way to log your training sessions, store
            personalized workout plans, and monitor your progress over time.
          </p>
        </section>

        {/* About Training */}
        <section className="grid md:grid-cols-2 gap-10 mt-20">
          <div className="p-8 bg-white rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">Why Track Workouts?</h3>
            <p className="text-gray-600 leading-relaxed">
              Keeping a training log helps you understand what works and where
              you need to improve. Recording sets, reps, and weights gives you a
              clear picture of your progress, prevents plateaus, and reduces the
              risk of overtraining.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">Smart Training Plans</h3>
            <p className="text-gray-600 leading-relaxed">
              A structured plan transforms random workouts into a focused
              program. Whether your goal is strength, hypertrophy, or endurance,
              having routines ready saves time and ensures consistency.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-10">
            Benefits of Using LiftLog
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow text-center">
              <h4 className="text-xl font-semibold mb-3">Consistency</h4>
              <p className="text-gray-600">
                Stay motivated with a clear record of your past sessions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow text-center">
              <h4 className="text-xl font-semibold mb-3">Progress</h4>
              <p className="text-gray-600">
                Visualize improvements in strength and endurance week by week.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow text-center">
              <h4 className="text-xl font-semibold mb-3">Efficiency</h4>
              <p className="text-gray-600">
                Plan ahead and focus on training instead of remembering sets.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-28">
          <h2 className="text-3xl font-bold mb-6">
            Build a stronger version of yourself
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start organizing your workouts today and experience the difference
            of structured training.
          </p>
          <button className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-purple-800 transition">
            Get Started Free
          </button>
        </section>

        {/* Footer */}
        <Footer />
      </section>
    </main>
  );
}
