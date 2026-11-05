
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import opportunities from "../../data/opportunities";
import { useOpportunities } from "../../context/OpportunityContext";

export default function Dashboard() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [today, setToday] = useState(null);
  const router = useRouter();

  const { savedOpportunities, applications } = useOpportunities();

  // Check login before allowing access
  useEffect(() => {
    const user = sessionStorage.getItem("opportunityHubUser");

    if (!user) {
      router.replace("/login");
    } else {
      setIsCheckingLogin(false);
    }
  }, [router]);

  // Get today's date after the component loads
  useEffect(() => {
    const currentDate = new Date();

    const formattedDate = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, "0"),
      String(currentDate.getDate()).padStart(2, "0"),
    ].join("-");

    setToday(formattedDate);
  }, []);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("opportunityHubUser");
    router.replace("/login");
  };

  // Calculate dashboard statistics
  const totalSaved = savedOpportunities.length;
  const totalApplications = applications.length;

  const selectedApplications = applications.filter(
    (item) => item.status === "Selected"
  ).length;

  // Find upcoming deadlines
  const upcomingDeadlines = today
    ? opportunities
        .filter((item) => {
          const isTracked = applications.some(
            (application) => application.id === item.id
          );

          return item.deadlineDate >= today && isTracked;
        })
        .sort((a, b) =>
          a.deadlineDate.localeCompare(b.deadlineDate)
        )
    : [];

  // Get recently tracked applications
  const recentApplications = applications
    .slice(-4)
    .reverse()
    .map((application) => {
      const opportunity = opportunities.find(
        (item) => item.id === application.id
      );

      return opportunity
        ? { ...opportunity, status: application.status }
        : null;
    })
    .filter(Boolean);

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
  if (isCheckingLogin || !today) {
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

          <Link href="/dashboard" className="font-medium text-indigo-600">
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

      {/* Dashboard Heading */}
      <section className="px-8 py-10">
        <h1 className="text-3xl font-bold">
          My Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Keep an eye on your opportunities and application progress.
        </p>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Saved
          </p>
          <h2 className="mt-3 text-3xl font-bold text-indigo-600">
            {totalSaved}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Bookmarked opportunities
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Applications Tracked
          </p>
          <h2 className="mt-3 text-3xl font-bold text-blue-600">
            {totalApplications}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Total tracked opportunities
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Selected
          </p>
          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {selectedApplications}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Successful applications
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Upcoming Deadlines
          </p>
          <h2 className="mt-3 text-3xl font-bold text-orange-500">
            {upcomingDeadlines.length}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tracked opportunities still open
          </p>
        </div>

      </section>

      {/* Upcoming Deadlines */}
      <section className="px-8 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Upcoming Deadlines
          </h2>

          <Link
            href="/explore"
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Explore More →
          </Link>
        </div>

        {upcomingDeadlines.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-semibold">
              No upcoming deadlines!
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Add opportunities to your tracker to monitor their deadlines.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}>
                  {item.category}
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.organization}
                </p>

                <p className="mt-4 text-sm font-semibold text-orange-600">
                  Deadline: {item.deadline}
                </p>

                <Link
                  href={`/opportunity/${item.id}`}
                  className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Applications */}
      <section className="px-8 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Applications
          </h2>

          <Link
            href="/applications"
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All →
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-semibold">
              No applications to display!
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your tracked opportunities will appear here.
            </p>

            <Link
              href="/explore"
              className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
            >
              Explore Opportunities
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Opportunity</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="p-4 font-semibold">
                      {item.title}
                    </td>

                    <td className="p-4 text-slate-500">
                      {item.organization}
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <Link
                        href={`/opportunity/${item.id}`}
                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
