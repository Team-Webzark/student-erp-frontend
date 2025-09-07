"use client";
import React, { useState, useEffect } from "react";

export default function StudentRoster({ students = [], onView }) {
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    let temp = [...students];

    if (searchText.trim()) {
      const lower = searchText.toLowerCase();
      temp = temp.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.roll.toLowerCase().includes(lower)
      );
    }

    if (genderFilter !== "all") {
      temp = temp.filter((s) => s.gender === genderFilter);
    }

    setFilteredStudents(temp);
  }, [searchText, genderFilter, students]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Student Roster</h4>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        {/* Search */}
        <div className="flex flex-col w-full md:w-64">
          <label className="text-sm text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Name or Roll..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Gender Filter */}
        <div className="flex flex-col w-full md:w-48">
          <label className="text-sm text-gray-700 mb-1">Gender</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border p-2 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="male">Boys</option>
            <option value="female">Girls</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-96">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="pb-2">Roll</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Hostel</th>
              <th className="pb-2">Fee Due</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.hostelAllocated ? "Yes" : "No"}</td>
                <td>₹{s.fee?.due || 0}</td>
                <td>
                  <button
                    onClick={() => onView(s)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
