
export default function Applications() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-600">
        My Applications
      </h1>

      <p className="mt-3 text-slate-600">
        Keep track of all your opportunity applications in one place.
      </p>

      <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          No applications yet!
        </h2>

        <p className="mt-2 text-slate-500">
          Opportunities you decide to apply for will appear here.
        </p>
      </div>
    </main>
  );
}
