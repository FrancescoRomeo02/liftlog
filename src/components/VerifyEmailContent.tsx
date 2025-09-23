"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleOpenMail = () => {
    window.location.href = "mailto:";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-6">
      <Card className="w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur">
        <CardContent className="p-8 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-purple-700">
              Check your email
            </h1>
            <p className="text-slate-400 leading-relaxed">
              We have sent you an email with a verification link. Check your
              inbox and click the link to activate your account.{" "}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-black/5 border border-white/10 rounded-lg px-4 py-3">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Email sent to</p>
              <p className="font-semibold text-purple-700">
                {email ?? "indirizzo@esempio.com"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleOpenMail} className="shadow-md">
              Open email
            </Button>
            <Button
              variant="outline"
              onClick={() => (location.href = "/login")}
            >
              Already checked
            </Button>
          </div>

          <p className="text-sm text-slate-400">
            Not receiving the email? Check your spam folder or try resend. The
            link expires after 24 hours.
          </p>
          <footer className="text-xs text-slate-500">
            Need help?{" "}
            <span className="underline cursor-pointer">Contact support</span>.
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmailContent;
