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
      name: "core press",
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
    <main className="px-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <section className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={exData} />
        </div>
        <Footer />
      </section>
    </main>
  );
}
