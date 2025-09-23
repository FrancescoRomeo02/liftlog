import { Suspense } from "react";
import VerifyEmailContent from "@/components/VerifyEmailContent";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-6">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
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
