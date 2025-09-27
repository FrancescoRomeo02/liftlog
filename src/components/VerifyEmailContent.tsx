"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const handleOpenMail = () => {
    window.location.href = "mailto:";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/40 p-4">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Check your email
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          <p className="leading-relaxed text-muted-foreground">
            We’ve sent you an email with a verification link. Please check your
            inbox and click the link to activate your account.
          </p>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Email sent to</p>
              <p className="font-semibold">{email ?? "example@email.com"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleOpenMail} className="shadow-sm">
              Open email
            </Button>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Already checked
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Not receiving the email? Check your spam folder or try resending it.
            The link expires after 24 hours.
          </p>

          <footer className="text-xs text-center text-muted-foreground">
            Need help?{" "}
            <a
              href="/support"
              className="text-primary hover:underline font-medium"
            >
              Contact support
            </a>
            .
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmailContent;
