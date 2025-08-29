"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const roles = ["student", "teacher", "admin", "staff"];

  // Student config (dynamic from API in future)
  const [studentConfig] = useState({
    rollPlaceholder: "Roll Number",
    dropdown: {
      label: "Class",
      options: [
        "1st","2nd","3rd","4th","5th","6th",
        "7th","8th","9th","10th","11th","12th",
      ],
    },
  });

  // Other roles config (teacher, admin, staff)
  const [rolePlaceholders] = useState({
    teacher: "Teacher ID",
    admin: "Admin ID",
    staff: "Staff ID",
  });

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    classOrCourse: "",
    password: "",
  });

  // Dummy login check
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple dummy auth: sab ke liye password = "12345"
    if (formData.password !== "12345") {
      alert("Invalid credentials!");
      return;
    }

    // Redirect based on role
    router.push(`/${role}-dashboard`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Top Heading */}
      <h1 className="text-3xl md:text-6xl tracking-wide font-bold mb-8 text-gray-800 text-center">
        Welcome to <span className="text-blue-600">Marsh</span> Edu Portal
      </h1>

      {/* Main Container */}
      <div className="flex w-full max-w-5xl bg-blue-100 rounded-3xl shadow-xl overflow-hidden">
        {/* Left Section with Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center p-6">
          <img
            src="/images/collegelogin.jpg"
            className="max-h-80 object-contain"
            alt="College Login"
          />
        </div>

        {/* Right Section with Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="bg-white text-gray-500 p-8 rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[100%] lg:w-full mx-auto">
            {/* Tabs for Roles */}
            <div className="flex flex-wrap justify-center gap-2 border-b mb-6 lg:flex-nowrap">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setFormData({ id: "", classOrCourse: "", password: "" }); // reset fields
                  }}
                  className={`px-3 py-2 text-sm sm:text-base font-semibold transition ${
                    role === r
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Login Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 text-center mb-6">
              Login as {role}
            </h2>

            {/* Login Form */}
            <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
              {role === "student" ? (
                <>
                  {/* Roll / Enrollment Input */}
                  <input
                    type="text"
                    placeholder={studentConfig.rollPlaceholder}
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />

                  {/* Class Dropdown */}
                  <select
                    value={formData.classOrCourse}
                    onChange={(e) =>
                      setFormData({ ...formData, classOrCourse: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-600"
                  >
                    <option value="">
                      Select {studentConfig.dropdown.label}
                    </option>
                    {studentConfig.dropdown.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* Password */}
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />
                </>
              ) : (
                <>
                  {/* Teacher/Admin/Staff ID */}
                  <input
                    type="text"
                    placeholder={rolePlaceholders[role]}
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />

                  {/* Password */}
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
