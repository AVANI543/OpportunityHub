
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo login: only the email is stored, never the password.
    sessionStorage.setItem("opportunityHubUser", email);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <Link href="/" className="text-2xl font-bold text-indigo-700 mb-10">
            OpportunityHub.
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Log in to discover and manage your opportunities.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-indigo-600 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            New to OpportunityHub? Explore opportunities without logging in.
          </p>

          <Link
            href="/"
            className="text-center text-indigo-600 font-semibold mt-2 hover:underline"
          >
            Back to Home
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex bg-indigo-700 text-white p-12 flex-col justify-center items-center text-center">
          <div className="text-6xl mb-6">🚀</div>

          <h2 className="text-3xl font-bold mb-4">
            Your Next Opportunity Starts Here
          </h2>

          <p className="text-indigo-100 leading-relaxed">
            Discover internships, hackathons, scholarships and workshops.
            Keep everything organized and never miss an opportunity.
          </p>

          <div className="mt-10 bg-white/10 rounded-2xl p-6 w-full">
            <p className="text-lg font-semibold">
              Discover. Save. Apply. Grow.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
