"use client";

import { useState } from "react";
import opportunities from "../data/opportunities";


export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">
          OpportunityHub.
        </h1>

        <div className="hidden gap-8 md:flex">
          <a href="/" className="font-medium text-indigo-600">Home</a>
          <a href="/explore" className="text-slate-600 hover:text-indigo-600">
          Explore
          </a>
          
          <a href="/applications" className="text-slate-600 hover:text-indigo-600">
          My Applications
          </a>
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

        <div className="mx-auto mt-8 flex max-w-xl gap-2 rounded-xl bg-white p-2 shadow-md">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none"
          />
          <button className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
            Search
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 py-6">
        <h3 className="mb-5 text-xl font-bold">Explore Categories</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {["Internships", "Hackathons", "Scholarships", "Workshops"].map(
            (category) => (
              <div
                key={category}
                className="cursor-pointer rounded-xl bg-white p-6 text-center font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {category}
              </div>
            )
          )}
        </div>
      </section>

      {/* Opportunity Listings */}
      <section className="px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Featured Opportunities</h3>
            <p className="mt-1 text-sm text-slate-500">
              Explore opportunities picked for students.
            </p>
          </div>

          <button className="font-semibold text-indigo-600">
            View All →
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {opportunities
          .filter((item) =>
            `${item.title} ${item.organization} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
        )
        .map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}>
                  {item.category}
                </span>

                <button className="text-xl text-slate-400 hover:text-indigo-600">
                  ♡
                </button>
              </div>

              <h4 className="text-xl font-bold">{item.title}</h4>

              <p className="mt-1 text-sm text-slate-500">
                {item.organization}
              </p>

              <div className="mt-5 flex justify-between text-sm text-slate-500">
                <span>{item.type}</span>
                <span>Deadline: {item.deadline}</span>
              </div>

              <button className="mt-6 w-full rounded-lg border border-indigo-600 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
