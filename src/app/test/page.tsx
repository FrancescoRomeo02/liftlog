import { createClient } from "@/utils/supabase/server";
import WorkoutsList from "@/components/WorkoutList";

export default async function WorkoutsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>Not logged in</p>;

  return <WorkoutsList userId={user.id} />;
}
