import { columns, Exercise } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

async function GetData({}): Promise<Exercise[]> {
  // structure : Muscle Group; Name; Reps; Sets; Weight; Notes
  return [
    {
      id: "1",
      muscle_group: "chest",
      name: "Bench Press",
      reps: 8,
      sets: 3,
      weight: 100,
      notes: "Warm up with 3 sets of 10 reps at 60% of max",
    },
    {
      id: "2",
      muscle_group: "back",
      name: "Pull Ups",
      reps: 10,
      sets: 3,
      weight: 100,
      notes: "Warm up with 3 sets of 10 reps at 60% of max",
    },
    {
      id: "3",
      muscle_group: "core",
      name: "Core Press",
      reps: 12,
      sets: 3,
      weight: 80,
      notes: "Warm up with 3 sets of 10 reps at 60% of max",
    },
  ];
}

export default async function DemoPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const exData = await GetData({ userId: data.user.id });

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              Exercises
            </span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Review and manage your exercise routines. Track sets, reps, and
            notes for better consistency.
          </p>
        </div>

        {/* Table container */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl overflow-hidden">
          <DataTable columns={columns} data={exData} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
