import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

// Esempio uso: eliminare qualsiasi record, bypassare RLS
export async function deleteUserData(userId: string) {
  const supabase = createAdminClient();
  // Questo bypassa Row Level Security
  return supabase.from("profiles").delete().eq("id", userId);
}
