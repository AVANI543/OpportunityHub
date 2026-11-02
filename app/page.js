
"use client";

import { useState } from "react";
import Link from "next/link";
import opportunities from "../data/opportunities";
import { useOpportunities } from "../context/OpportunityContext";

export default function Home() {
  const [search, setSearch] = useState("");

  const {
    savedOpportunities,
    applications,
    toggleSave,
    updateApplication,
  } = useOpportunities();

  const filteredOpportunities = opportunities.filter((item) =>
    `${item.title} ${item.organization} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const categories = [
    "Internships",
    "Hackathons",
    "Scholarships",
    "Workshops",
  ];

  const categoryValues = {
    Internships: "Internship",
    Hackathons: "Hackathon",
    Scholarships: "Scholarship",
    Workshops: "Workshop",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          OpportunityHub.
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/" className="font-medium text-indigo-600">
            Home
          </Link>

          <Link href="/explore" className="text-slate-600 hover:text-indigo-600">
            Explore
          </Link>

          <Link href="/applications" className="text-slate-600 hover:text-indigo-600">
            My Applications
          </Link>

          <Link href="/saved" className="text-slate-600 hover:text-indigo-600">
            Saved
          </Link>
        </div>

        <button className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700">
          My Profile
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-16 text-center">
        <p className="mb-3 font-semibold text-indigo-600">
          YOUR NEXT OPPORTUNITY STARTS HERE
        </p>

        <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Discover Opportunities.
          <span className="text-indigo-600"> Track Your Growth.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-500">
          Find internships, hackathons, scholarships and workshops
          all in one place. Never miss an opportunity again!
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/explore?search=${encodeURIComponent(search)}`;
          }}
          className="mx-auto mt-8 flex max-w-xl gap-2 rounded-xl bg-white p-2 shadow-md"
        >
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* Categories */}
      <section className="px-8 py-6">
        <h3 className="mb-5 text-xl font-bold">
          Explore Categories
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/explore?category=${encodeURIComponent(categoryValues[category])}`}
              className="rounded-xl bg-white p-6 text-center font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Opportunity Listings */}
      <section className="px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Featured Opportunities
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Explore opportunities picked for students.
            </p>
          </div>

          <Link
            href="/explore"
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredOpportunities.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm md:col-span-2">
              <h3 className="text-lg font-semibold">
                No opportunities found!
              </h3>

              <p className="mt-2 text-slate-500">
                Try searching with a different keyword.
              </p>
            </div>
          ) : (
            filteredOpportunities.map((item) => {
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

                    {/* Bookmark Button */}
                    <button
                      onClick={() => toggleSave(item.id)}
                      aria-label={
                        isSaved ? "Remove bookmark" : "Save opportunity"
                      }
                      className={`text-xl ${
                        isSaved
                          ? "text-indigo-600"
                          : "text-slate-400"
                      } hover:text-indigo-600`}
                    >
                      {isSaved ? "♥" : "♡"}
                    </button>
                  </div>

                  <h4 className="text-xl font-bold">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.organization}
                  </p>

                  <div className="mt-5 flex justify-between text-sm text-slate-500">
                    <span>{item.type}</span>
                    <span>Deadline: {item.deadline}</span>
                  </div>

                  {/* Add to Tracker */}
                  <button
                    onClick={() =>
                      updateApplication(item.id, "Planning to Apply")
                    }
                    disabled={isAdded}
                    className={`mt-6 w-full rounded-lg py-2 font-semibold transition ${
                      isAdded
                        ? "cursor-not-allowed bg-green-100 text-green-700"
                        : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    {isAdded ? "✓ Added to Tracker" : "Add to Tracker"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
