import { createClient } from "@/utils/supabase/client";
import type { Database } from "../database.types";

type User = Database["public"]["Tables"]["users"]["Row"];
type userInsert = Database["public"]["Tables"]["users"]["Insert"];
type userUpdate = Database["public"]["Tables"]["users"]["Update"];

export class usersQueryClient {
  static async getUser(userId: string): Promise<User | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUser(userId: string, updates: userUpdate): Promise<User> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async insertUser(user: userInsert): Promise<User | null> {
    const supabase = createClient();
    const { data: existingUsers, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .limit(1);

    if (error) throw error;

    // If user already exists, return the existing user
    if (existingUsers && existingUsers.length > 0) {
      return existingUsers[0];
    }

    // User doesn't exist, create a new one
    const { data, error: insertError } = await supabase
      .from("users")
      .insert({
        email: user.email,
        user_name: user.user_name,
      })
      .select()
      .single();

    if (insertError) throw insertError;
    return data;
  }
}
