
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import opportunities from "../../../data/opportunities";
import { useOpportunities } from "../../../context/OpportunityContext";

export default function OpportunityDetails() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-lg font-semibold text-indigo-600">
            Loading OpportunityHub...
          </p>
        </div>
      }
    >
      <OpportunityDetailsContent />
    </Suspense>
  );
}

function OpportunityDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const {
    savedOpportunities,
    applications,
    toggleSave,
    updateApplication,
  } = useOpportunities();

  // Check login before allowing access
  useEffect(() => {
    const user = sessionStorage.getItem("opportunityHubUser");

    if (!user) {
      router.replace("/login");
    } else {
      setIsCheckingLogin(false);
    }
  }, [router]);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("opportunityHubUser");
    router.replace("/login");
  };

  const opportunity = opportunities.find(
    (item) => item.id === id
  );

  // Wait until login check is complete
  if (isCheckingLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-indigo-600">
          Loading OpportunityHub...
        </p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Opportunity Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          Sorry, we couldn't find the opportunity you're looking for.
        </p>

        <Link
          href="/explore"
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Back to Explore
        </Link>
      </main>
    );
  }

  const isSaved = savedOpportunities.includes(opportunity.id);

  const application = applications.find(
    (item) => item.id === opportunity.id
  );

  const isAdded = Boolean(application);

  const statusOptions = [
    "Planning to Apply",
    "Applied",
    "Selected",
    "Not Selected",
  ];

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

          <Link href="/applications" className="text-slate-600 hover:text-indigo-600">
            My Applications
          </Link>

          <Link href="/saved" className="text-slate-600 hover:text-indigo-600">
            Saved
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

      {/* Back Navigation */}
      <div className="px-8 pt-8">
        <Link
          href="/explore"
          className="font-medium text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Explore
        </Link>
      </div>

      {/* Opportunity Details */}
      <section className="mx-auto max-w-4xl px-8 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">

          {/* Category and Bookmark */}
          <div className="flex items-center justify-between">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${opportunity.color}`}>
              {opportunity.category}
            </span>

            <button
              onClick={() => toggleSave(opportunity.id)}
              aria-label={isSaved ? "Remove bookmark" : "Save opportunity"}
              className={`text-3xl ${
                isSaved ? "text-indigo-600" : "text-slate-400"
              } hover:text-indigo-600`}
            >
              {isSaved ? "♥" : "♡"}
            </button>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">
            {opportunity.title}
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            {opportunity.organization}
          </p>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              About this Opportunity
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {opportunity.description}
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid gap-5 rounded-xl bg-slate-50 p-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-slate-500">
                Application Deadline
              </p>
              <p className="mt-1 font-semibold">
                {opportunity.deadline}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Opportunity Type
              </p>
              <p className="mt-1 font-semibold">
                {opportunity.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Duration
              </p>
              <p className="mt-1 font-semibold">
                {opportunity.duration}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Category
              </p>
              <p className="mt-1 font-semibold">
                {opportunity.category}
              </p>
            </div>

          </div>

          {/* Eligibility */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Eligibility
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Application Tracker */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-bold">
              Application Tracker
            </h2>

            {isAdded ? (
              <div className="mt-4">
                <p className="mb-3 text-sm text-green-700">
                  This opportunity is already in your tracker.
                </p>

                <label className="mb-2 block text-sm font-semibold">
                  Update Application Status
                </label>

                <select
                  value={application.status}
                  onChange={(e) =>
                    updateApplication(opportunity.id, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 outline-none focus:border-indigo-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <button
                onClick={() =>
                  updateApplication(opportunity.id, "Planning to Apply")
                }
                className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Add to Tracker
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
