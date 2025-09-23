"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { usersQuery } from "@/lib/queries/profiles";

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
    redirect("/error");
  }

  if (data?.user) {
    await usersQuery.insertUser({
      email: data.user.email!,
      user_name:
        data.user.user_metadata?.username || data.user.email!.split("@")[0],
    });
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
    redirect("/");
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
