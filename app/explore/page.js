
export default function Explore() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-600">
        Explore Opportunities
      </h1>

      <p className="mt-3 text-slate-600">
        Discover internships, hackathons, scholarships and workshops.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {["Internships", "Hackathons", "Scholarships", "Workshops"].map(
          (category) => (
            <div
              key={category}
              className="rounded-xl bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Explore available {category.toLowerCase()}.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
