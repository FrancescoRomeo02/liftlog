"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { useState, useTransition } from "react";
import { signup, login } from "@/action/auth";
import { useRouter } from "next/navigation";

function signInWithProvider(providerName: string) {
  alert(`Accessing with ${providerName} is not supported at this time`);
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = isLogin ? await login(formData) : await signup(formData);
      const email = result.user?.email;
      if (result.status === "success") {
        if (!isLogin) {
          router.push(
            `/auth/confirm_page?email=${encodeURIComponent(email ? email : "")}`,
          );
        } else {
          router.push("/private");
        }
      } else {
        router.push(`/error?message=${encodeURIComponent(result?.status)}`);
      }
    });
  }

  return (
    <form
      className="max-w-md mx-auto mt-24 p-8 bg-gradient-to-br from-purple-50 to-white shadow-lg rounded-3xl overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="mt-2 text-gray-600">
          {isLogin
            ? "Login using email/password or one of the providers below"
            : "Sign up and start tracking your workouts right away"}
        </p>
      </div>

      <section className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-purple-700 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-purple-800 transition"
        >
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </section>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-purple-700 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>

      {/* Provider Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => signInWithProvider("google")}
          className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
        </button>

        <button
          type="button"
          onClick={() => signInWithProvider("github")}
          className="p-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
        >
          <FaGithub className="text-2xl" />
        </button>

        <button
          type="button"
          onClick={() => signInWithProvider("apple")}
          className="p-3 bg-black text-white rounded-lg shadow hover:bg-gray-900 transition"
        >
          <FaApple className="text-2xl" />
        </button>
      </div>

      <div className="mt-8 text-xs text-gray-500 text-center">
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
    </form>
  );
}
