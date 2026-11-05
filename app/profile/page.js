
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [email, setEmail] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    college: "",
    course: "",
    year: "",
    interests: "",
  });

  const [message, setMessage] = useState("");

  // Check login and load profile information
  useEffect(() => {
    const user = sessionStorage.getItem("opportunityHubUser");

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user);

    try {
      const savedProfile = localStorage.getItem("opportunityHubProfile");

      if (savedProfile) {
        setProfile({
          name: "",
          college: "",
          course: "",
          year: "",
          interests: "",
          ...JSON.parse(savedProfile),
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }

    setIsCheckingLogin(false);
  }, [router]);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("opportunityHubUser");
    router.replace("/login");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // Save profile
  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "opportunityHubProfile",
      JSON.stringify(profile)
    );

    setMessage("Your profile has been saved successfully!");
  };

  // Reset profile
  const handleReset = () => {
    const emptyProfile = {
      name: "",
      college: "",
      course: "",
      year: "",
      interests: "",
    };

    setProfile(emptyProfile);
    localStorage.removeItem("opportunityHubProfile");
    setMessage("Your profile has been reset.");
  };

  // Loading screen
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

          <Link href="/applications" className="text-slate-600 hover:text-indigo-600">
            My Applications
          </Link>

          <Link href="/saved" className="text-slate-600 hover:text-indigo-600">
            Saved
          </Link>

          <Link href="/profile" className="font-medium text-indigo-600">
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
      <section className="px-8 py-10">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your student information and personal interests.
        </p>
      </section>

      {/* Profile Content */}
      <section className="mx-auto max-w-3xl px-6 pb-16">

        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">

          {/* Profile Header */}
          <div className="mb-8 flex items-center gap-5 border-b border-slate-100 pb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "S"}
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {profile.name || "Student Profile"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {email}
              </p>

              <p className="mt-1 text-sm font-medium text-indigo-600">
                OpportunityHub Member
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave}>

            <h2 className="mb-6 text-xl font-bold">
              Personal Information
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 p-3 text-slate-500 outline-none"
                />
              </div>

              {/* College */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  College Name
                </label>

                <input
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  placeholder="Enter your college"
                  className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Course / Branch
                </label>

                <input
                  type="text"
                  name="course"
                  value={profile.course}
                  onChange={handleChange}
                  placeholder="e.g. Information Science"
                  className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Year */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Current Year
                </label>

                <select
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 outline-none focus:border-indigo-500"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Areas of Interest
                </label>

                <input
                  type="text"
                  name="interests"
                  value={profile.interests}
                  onChange={handleChange}
                  placeholder="e.g. Coding, Design, AI"
                  className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>

            {/* Success Message */}
            {message && (
              <p className="mt-6 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                {message}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Save Profile
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Reset Profile
              </button>

            </div>

          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-8 py-8 text-center text-sm text-white">
        © 2026 OpportunityHub. Built for students, by students.
      </footer>

    </main>
  );
}
