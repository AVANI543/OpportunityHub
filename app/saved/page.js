
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import opportunities from "../../data/opportunities";
import { useOpportunities } from "../../context/OpportunityContext";

export default function SavedPage() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const router = useRouter();

  const { savedOpportunities, toggleSave } = useOpportunities();

  useEffect(() => {
    const user = sessionStorage.getItem("opportunityHubUser");

    if (!user) {
      router.replace("/login");
    } else {
      setIsCheckingLogin(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("opportunityHubUser");
    router.replace("/login");
  };

  const savedItems = opportunities.filter((item) =>
    savedOpportunities.includes(item.id)
  );

  if (isCheckingLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-indigo-600">
          Loading OpportunityHub...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* Navbar */}
      <nav className="flex flex-wrap items-center justify-between gap-4 bg-white px-8 py-5 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          OpportunityHub.
        </Link>

        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="text-slate-600 hover:text-indigo-600">
            Home
          </Link>

          <Link href="/explore" className="text-slate-600 hover:text-indigo-600">
            Explore
          </Link>

          <Link href="/dashboard" className="text-slate-600 hover:text-indigo-600">
            Dashboard
          </Link>

          <Link href="/saved" className="font-medium text-indigo-600">
            Saved
          </Link>

          <Link href="/applications" className="text-slate-600 hover:text-indigo-600">
            My Applications
          </Link>

          <Link href="/profile" className="text-slate-600 hover:text-indigo-600">
            My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Heading */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold">
          Saved Opportunities
        </h2>

        <p className="mt-2 text-slate-500">
          All your bookmarked opportunities in one place.
        </p>

        <p className="mt-4 font-semibold text-indigo-600">
          {savedItems.length}{" "}
          {savedItems.length === 1 ? "Opportunity" : "Opportunities"} Saved
        </p>
      </section>

      {/* Saved Opportunity Cards */}
      <section className="px-8 pb-16">
        {savedItems.length === 0 ? (
          <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">♡</div>

            <h3 className="mt-4 text-xl font-bold">
              No Saved Opportunities Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Explore opportunities and bookmark the ones you like!
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Explore Opportunities
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}
                  >
                    {item.category}
                  </span>

                  <button
                    onClick={() => toggleSave(item.id)}
                    aria-label="Remove bookmark"
                    className="text-xl text-indigo-600 hover:text-slate-400"
                  >
                    ♥
                  </button>
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.organization}
                </p>

                <div className="mt-5 flex justify-between text-sm text-slate-500">
                  <span>{item.type}</span>
                  <span>Deadline: {item.deadline}</span>
                </div>

                <Link
                  href={`/opportunity/${item.id}`}
                  className="mt-6 block w-full rounded-lg border border-indigo-600 py-2 text-center font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
