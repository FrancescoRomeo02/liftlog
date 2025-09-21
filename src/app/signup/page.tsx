import AuthForm from "../components/AuthForm";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm type="signup" />
    </main>
  );
}
