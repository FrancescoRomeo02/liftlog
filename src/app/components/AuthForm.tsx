type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>

      <form className="flex flex-col gap-4">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </>
        )}

        {isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>
      </form>

      {isLogin && (
        <div className="text-center mt-4">
          <button className="text-sm text-purple-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      )}
    </div>
  );
}
