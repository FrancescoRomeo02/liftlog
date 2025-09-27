import { columns, Exercise } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

async function GetData({}): Promise<Exercise[]> {
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
    <main className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Your <span className="bg-clip-text text-primary">Exercises</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Review and manage your exercise routines. Track sets, reps, and
            notes for better consistency.
          </p>
        </div>

        {/* Table container */}
        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
          <DataTable columns={columns} data={exData} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
