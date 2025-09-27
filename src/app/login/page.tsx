"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { useState, useTransition } from "react";
import { signup, login } from "@/action/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

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
          router.push("/workouts");
        }
      } else {
        router.push(`/error?message=${encodeURIComponent(result?.status)}`);
      }
    });
  }

  return (
    <Card className="max-w-md mx-auto mt-24 shadow-lg rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-extrabold">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Login using email/password or one of the providers below"
            : "Sign up and start tracking your workouts right away"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          )}

          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <Button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2"
          >
            {pending && <Loader2 className="animate-spin h-4 w-4" />}
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => signInWithProvider("google")}
          >
            <FcGoogle className="text-xl" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => signInWithProvider("github")}
          >
            <FaGithub className="text-xl" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => signInWithProvider("apple")}
          >
            <FaApple className="text-xl" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-center text-muted-foreground">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
