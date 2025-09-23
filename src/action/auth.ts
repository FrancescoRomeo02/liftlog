"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    // can be two type:
    // not confirmed email or invalid data --> need to show this info
    redirect("/error/" + error);
  }

  // check if user has an instance into user_profiles table

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", data?.user.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert({
      email: data?.user.email,
      user_name: data?.user.user_metadata?.username,
    });
    if (insertError) {
      return {
        status: insertError.message,
        user: null,
      };
    }
  }

  return {
    status: "success",
    user: data?.user,
  };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const username = formData.get("username") as string;

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    redirect("/error");
  }

  return {
    status: "success",
    user: data,
  };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    redirect("/error");
  }

  return {
    status: "success",
    user: null,
  };
}
