
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import opportunities from "../../data/opportunities";
import { useOpportunities } from "../../context/OpportunityContext";

export default function Applications() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const router = useRouter();

  const {
    applications,
    updateApplication,
    removeApplication,
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

  // Get opportunity details for tracked applications
  const trackedApplications = applications
    .map((application) => {
      const opportunity = opportunities.find(
        (item) => item.id === application.id
      );

      return opportunity
        ? { ...opportunity, status: application.status }
        : null;
    })
    .filter(Boolean);

  const statusOptions = [
    "Planning to Apply",
    "Applied",
    "Selected",
    "Not Selected",
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Planning to Apply":
        return "bg-yellow-100 text-yellow-700";
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Selected":
        return "bg-green-100 text-green-700";
      case "Not Selected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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

          <Link href="/applications" className="font-medium text-indigo-600">
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

      {/* Page Heading */}
      <section className="px-8 py-12">
        <h1 className="text-3xl font-bold text-indigo-600">
          My Applications
        </h1>

        <p className="mt-3 text-slate-600">
          Keep track of all your opportunity applications in one place.
        </p>
      </section>

      {/* Application Statistics */}
      <section className="grid grid-cols-2 gap-4 px-8 md:grid-cols-4">
        {statusOptions.map((status) => {
          const count = trackedApplications.filter(
            (item) => item.status === status
          ).length;

          return (
            <div
              key={status}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{status}</p>
              <h2 className="mt-2 text-3xl font-bold text-indigo-600">
                {count}
              </h2>
            </div>
          );
        })}
      </section>

      {/* Tracked Applications */}
      <section className="px-8 py-10">
        <h2 className="mb-6 text-2xl font-bold">
          Tracked Opportunities
        </h2>

        {trackedApplications.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl text-indigo-400">📋</div>

            <h3 className="mt-4 text-xl font-semibold">
              No applications yet!
            </h3>

            <p className="mt-2 text-slate-500">
              Add opportunities to your tracker and manage your progress here.
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
            {trackedApplications.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}
                  >
                    {item.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.organization}
                </p>

                <div className="mt-5 flex justify-between text-sm text-slate-500">
                  <span>{item.type}</span>
                  <span>Deadline: {item.deadline}</span>
                </div>

                {/* View Details */}
                <Link
                  href={`/opportunity/${item.id}`}
                  className="mt-5 block w-full rounded-lg border border-indigo-600 py-2 text-center font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  View Details
                </Link>

                {/* Update Status */}
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold">
                    Update Application Status
                  </label>

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateApplication(item.id, e.target.value)
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

                {/* Remove Application */}
                <button
                  onClick={() => removeApplication(item.id)}
                  className="mt-4 w-full rounded-lg border border-red-200 py-2 font-semibold text-red-500 hover:bg-red-50"
                >
                  Remove from Tracker
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
