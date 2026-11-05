
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import opportunities from "../../data/opportunities";
import { useOpportunities } from "../../context/OpportunityContext";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const router = useRouter();

  const {
    savedOpportunities,
    applications,
    toggleSave,
    updateApplication,
  } = useOpportunities();

  const categories = [
    "All",
    "Internship",
    "Hackathon",
    "Scholarship",
    "Workshop",
  ];

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const searchValue = params.get("search") || "";
    const categoryValue = params.get("category") || "All";

    setSearch(searchValue);

    if (categories.includes(categoryValue)) {
      setSelectedCategory(categoryValue);
    } else {
      setSelectedCategory("All");
    }
  }, []);

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch = (
      `${item.title} ${item.organization} ${item.category}`
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    window.history.replaceState(null, "", "/explore");
  };

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

          <Link
            href="/explore"
            className="font-medium text-indigo-600"
          >
            Explore
          </Link>

          <Link
            href="/dashboard"
            className="text-slate-600 hover:text-indigo-600"
          >
            Dashboard
          </Link>

          <Link
            href="/applications"
            className="text-slate-600 hover:text-indigo-600"
          >
            My Applications
          </Link>

          <Link
            href="/saved"
            className="text-slate-600 hover:text-indigo-600"
          >
            Saved
          </Link>

          <Link
            href="/profile"
            className="text-slate-600 hover:text-indigo-600"
          >
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
          Explore Opportunities
        </h1>

        <p className="mt-3 text-slate-600">
          Discover internships, hackathons, scholarships and workshops.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Find opportunities that match your interests and goals.
        </p>
      </section>

      {/* Search Bar */}
      <section className="px-8">
        <input
          type="text"
          placeholder="Search by title, organization or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none focus:border-indigo-500"
        />
      </section>

      {/* Category Filters */}
      <section className="px-8 py-8">
        <h2 className="mb-4 text-lg font-semibold">
          Filter by Category
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-indigo-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={clearFilters}
          className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          Clear Filters
        </button>
      </section>

      {/* Opportunity Count */}
      <section className="px-8 pb-4">
        <p className="text-sm text-slate-500">
          Showing {filteredOpportunities.length} opportunities
        </p>
      </section>

      {/* Opportunity Cards */}
      <section className="px-8 pb-16">
        {filteredOpportunities.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No opportunities found!
            </h2>

            <p className="mt-2 text-slate-500">
              Try a different search or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredOpportunities.map((item) => {
              const isSaved = savedOpportunities.includes(item.id);

              const isAdded = applications.some(
                (application) => application.id === item.id
              );

              return (
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
                      aria-label={
                        isSaved ? "Remove bookmark" : "Save opportunity"
                      }
                      className={`text-2xl ${
                        isSaved ? "text-indigo-600" : "text-slate-400"
                      } hover:text-indigo-600`}
                    >
                      {isSaved ? "♥" : "♡"}
                    </button>
                  </div>

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.organization}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-slate-500">
                    <span>{item.type}</span>
                    <span>Deadline: {item.deadline}</span>
                  </div>

                  <Link
                    href={`/opportunity/${item.id}`}
                    className="mt-6 block w-full rounded-lg border border-indigo-600 py-3 text-center font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      updateApplication(item.id, "Planning to Apply")
                    }
                    disabled={isAdded}
                    className={`mt-3 w-full rounded-lg py-3 font-semibold transition ${
                      isAdded
                        ? "cursor-not-allowed bg-green-100 text-green-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {isAdded ? "✓ Added to Tracker" : "Add to Tracker"}
                  </button>
                </div>
              );
            })}
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
