"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
        return;
      }

      if (session) {
        // autenticazione ok -> manda alla dashboard
        router.replace("/dashboard");
      } else {
        // nessuna sessione -> torna al login
        router.replace("/login");
      }
    };

    handleSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600">Completing sign in...</p>
    </div>
  );
}
