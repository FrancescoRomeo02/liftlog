import { Suspense } from "react";
import VerifyEmailContent from "@/components/VerifyEmailContent";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg border bg-card backdrop-blur p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 rounded-md bg-muted w-1/2"></div>
          <div className="h-4 rounded-md bg-muted w-3/4"></div>
          <div className="h-4 rounded-md bg-muted w-1/2"></div>
          <div className="flex gap-3 pt-4">
            <div className="h-10 w-24 rounded-md bg-muted"></div>
            <div className="h-10 w-32 rounded-md bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
