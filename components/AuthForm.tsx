"use client";
import supabase from "../lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { redirect } from "next/navigation";

type AuthFormProps = {
  type: "login" | "signup";
};

async function signInWithProvider(provider: "google" | "github" | "apple") {
  if (provider === "google" || provider === "apple") {
    alert(
      `${provider.charAt(0).toUpperCase() + provider.slice(1)} login not configured yet`,
    );
    return;
  }

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    console.error(error);
  } else {
    return redirect(data.url);
  }
}

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-gradient-to-br from-purple-50 to-white shadow-lg rounded-3xl overflow-hidden">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="mt-2 text-gray-600">
          {isLogin
            ? "Login using one of the providers below"
            : "Sign up and start tracking your workouts right away"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => signInWithProvider("google")}
          className="flex items-center justify-center w-full bg-white border border-gray-200 text-gray-800 font-medium py-3 pl-12 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-3xl" />
          <span className="w-full text-center">Continue with Google</span>
        </button>

        <button
          onClick={() => signInWithProvider("github")}
          className="flex items-center justify-center gap-3 w-full bg-gray-800 text-white font-medium py-3 pl-12 rounded-lg shadow-sm hover:bg-gray-900 transition"
        >
          <FaGithub className="text-3xl" />
          <span className="w-full text-center">Continue with GitHub</span>
        </button>

        <button
          onClick={() => signInWithProvider("apple")}
          className="flex items-center justify-center gap-3 w-full bg-black text-white font-medium py-3 pl-12 rounded-lg shadow-sm hover:bg-gray-900 transition"
        >
          <FaApple className="text-3xl" />
          <span className="w-full text-center">Continue with Apple</span>
        </button>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-purple-700 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-700 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
