"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my information");
  const [selectedYear, setSelectedYear] = useState("2019");

  const menuItems = [
    "my information",
    "hostel info",
    "fee info",
    "exam info",
    "applications",
    "previous year results",
  ];

  const tabConfig = {
    "my information": [
      { key: "name", label: "Name" },
      { key: "class", label: "Class" },
      { key: "section", label: "Section" },
      { key: "address", label: "Address" },
      { key: "phone", label: "Phone" },
      { key: "dob", label: "DOB" },
    ],
    "hostel info": [
      { key: "allocated", label: "Hostel allocated" },
      { key: "building", label: "Building" },
      { key: "blockAndRoom", label: "Block and room" },
      { key: "remainingFee", label: "Hostel remaining fee" },
      { key: "submittedFee", label: "Hostel submitted fee" },
    ],
    "fee info": [
      { key: "cycle", label: "Fee cycle" },
      { key: "remaining", label: "Fee remaining" },
      { key: "submitted", label: "Fee submitted" },
    ],
    "exam info": [{ key: "date", label: "Exam date" }],
  };

  const studentInfo = {
    name: "xyz",
    class: "12th",
    section: "A",
    address: "abc",
    phone: "6349169070",
    dob: "23/05/2005",
    photo: "/images/profile-placeholder.png",
  };

  const hostelInfo = {
    allocated: "yes",
    building: "12 b hostel boys",
    blockAndRoom: "B block 112",
    remainingFee: "xxxxxx",
    submittedFee: "xxxxxx",
  };

  const feeInfo = {
    cycle: "yearly",
    remaining: "xxxxxx",
    submitted: "xxxxxx",
  };

  const examInfo = {
    date: "23/05/2025",
  };

  const applications = {
    total: [1, 2, 3, 4, 5],
    pending: [1, 2],
  };

  const previousResults = ["2019", "2020", "2021", "2022"];

  const downloadInfo = (data, filename = "data.json") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-md shadow-xl p-6 flex flex-col border-r border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">
          Marsh EduPortal
        </h2>
        <div className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === item
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Home
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-red-500 font-medium hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Info Box */}
          <div className="flex-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 text-gray-700 text-lg border border-gray-100">
            {/* Dynamic Tabs Rendering */}
            {tabConfig[activeTab] &&
              tabConfig[activeTab].map((field) => {
                const dataSource =
                  activeTab === "my information"
                    ? studentInfo
                    : activeTab === "hostel info"
                    ? hostelInfo
                    : activeTab === "fee info"
                    ? feeInfo
                    : activeTab === "exam info"
                    ? examInfo
                    : {};

                return (
                  <p
                    key={field.key}
                    className="mb-3 flex justify-between border-b border-gray-100 pb-1"
                  >
                    <span className="font-semibold text-gray-800">
                      {field.label}:
                    </span>
                    <span className="text-gray-600">{dataSource[field.key]}</span>
                  </p>
                );
              })}

            {/* Special Cases */}
            {activeTab === "hostel info" && (
              <div className="flex gap-4 mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                  Download Payment History
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                  Pay Now
                </button>
              </div>
            )}

            {activeTab === "fee info" && (
              <div className="flex gap-4 mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                  Download Payment History
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                  Pay Now
                </button>
              </div>
            )}

            {activeTab === "exam info" && (
              <div className="flex flex-col gap-3 mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Download Syllabus
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
                  Download Scheme
                </button>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
                  Download PYQs
                </button>
              </div>
            )}

            {activeTab === "applications" && (
              <div>
                <div className="flex justify-between mb-6">
                  <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg shadow">
                    Total Applications: {applications.total.length}
                  </div>
                  <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg shadow">
                    Pending: {applications.pending.length}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg shadow">
                    {applications.total.map((app) => (
                      <p key={app}>Application #{app}</p>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow">
                    {applications.pending.map((p) => (
                      <p key={p}>Pending #{p}</p>
                    ))}
                  </div>
                </div>
                <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                  New Application
                </button>
              </div>
            )}

            {activeTab === "previous year results" && (
              <div>
                <p className="mb-4 font-semibold text-gray-800">
                  Previously passed year results:
                </p>
                <div className="flex flex-col gap-3">
                  {previousResults.map((year) => (
                    <label
                      key={year}
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    >
                      <input
                        type="radio"
                        name="year"
                        checked={selectedYear === year}
                        onChange={() => setSelectedYear(year)}
                      />
                      {year}
                    </label>
                  ))}
                </div>
                <button
                  onClick={() =>
                    downloadInfo(
                      { year: selectedYear },
                      `result-${selectedYear}.json`
                    )
                  }
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Download Selected Year
                </button>
              </div>
            )}
          </div>

          {/* Profile Photo */}
          {activeTab === "my information" && (
            <div className="w-64 flex flex-col items-center bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-100">
              <img
                src={studentInfo.photo}
                alt="Profile"
                className="w-32 h-32 rounded-xl object-cover border-2 border-blue-200 shadow-md hover:scale-105 transition"
              />
              <button
                onClick={() => downloadInfo(studentInfo, "student-info.json")}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Download Info
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
