"use client";
import React, { useEffect, useState } from "react";
import { getFeeDetails } from "@/lib/mockApi";
import { useRouter } from "next/navigation"; // Optional: for back button

export default function FeeTable({ classId }) {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hostelFilter, setHostelFilter] = useState("all");
  const [feeDueFilter, setFeeDueFilter] = useState("all");

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await getFeeDetails(classId);
      setRows(data);
      setFilteredRows(data); // Initial display
    }
    load();
  }, [classId]);

  useEffect(() => {
    applyFilters();
  }, [searchText, hostelFilter, feeDueFilter, rows]);

  const applyFilters = () => {
    let temp = [...rows];

    // Search filter
    if (searchText.trim()) {
      const lower = searchText.toLowerCase();
      temp = temp.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.roll.toLowerCase().includes(lower) ||
          s.phone.includes(lower) ||
          s.class.toLowerCase().includes(lower)
      );
    }

    // Hostel filter
    if (hostelFilter !== "all") {
      const isHostel = hostelFilter === "hostel";
      temp = temp.filter((s) => s.hostelAllocated === isHostel);
    }

    // Fee due filter
    if (feeDueFilter !== "all") {
      const hasDue = feeDueFilter === "due";
      temp = temp.filter((s) =>
        hasDue ? s.feeDue > 0 : s.feeDue === 0
      );
    }

    setFilteredRows(temp);
  };

  const downloadCSV = () => {
  const headers = [
    "Roll",
    "Student Name",
    "Class",
    "Phone",
    "Hostel",
    "Fee Paid (₹)",
    "Fee Due (₹)",
    "Total Fee (₹)",
  ];

  const rowsToExport = filteredRows.length ? filteredRows : rows;

  const csvContent = [
    headers.join(","), // header row
    ...rowsToExport.map(s =>
      [
        s.roll,
        s.name,
        s.class,
        s.phone,
        s.hostelAllocated ? "Yes" : "No",
        s.feePaid,
        s.feeDue,
        s.totalFee,
      ].join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "fee-details.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4">

      <h3 className="text-lg font-semibold mb-4">Fee Details</h3>


{/* Filter Section */}
{/* Filter Section */}
<div className="bg-white border border-gray-200 rounded p-4 mb-4 shadow-sm">
  <h4 className="font-medium text-gray-800 mb-3">Filters</h4>
  <div className="flex flex-col md:flex-row md:items-end gap-4 flex-wrap">

    {/* Search Field */}
    <div className="flex flex-col w-full md:w-64">
      <label className="text-sm text-gray-700 mb-1">Search</label>
      <input
        type="text"
        placeholder="Name, Roll No., Phone, Class..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* Hostel Filter */}
    <div className="flex flex-col w-full md:w-48">
      <label className="text-sm text-gray-700 mb-1">Hostel Status</label>
      <select
        value={hostelFilter}
        onChange={(e) => setHostelFilter(e.target.value)}
        className="border p-2 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="all">All Students</option>
        <option value="hostel">Hostel Only</option>
        <option value="day">Day Scholars Only</option>
      </select>
    </div>

    {/* Fee Due Filter */}
    <div className="flex flex-col w-full md:w-48">
      <label className="text-sm text-gray-700 mb-1">Fee Status</label>
      <select
        value={feeDueFilter}
        onChange={(e) => setFeeDueFilter(e.target.value)}
        className="border p-2 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="all">All</option>
        <option value="due">Fee Due</option>
        <option value="paid">No Due</option>
      </select>
    </div>

    {/* Download Button */}
    <div className="flex flex-col w-full md:w-auto">
      <label className="text-sm text-gray-700 mb-1 invisible">Download</label>
      <button
        onClick={downloadCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
      >
        Download Table
      </button>
    </div>
  </div>
</div>



      {/* Table */}
      {filteredRows.length === 0 ? (
        <p className="text-gray-500">No matching fee records.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-2 border">Roll</th>
                <th className="p-2 border">Student Name</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Hostel</th>
                <th className="p-2 border">Fee Paid (₹)</th>
                <th className="p-2 border">Fee Due (₹)</th>
                <th className="p-2 border">Total Fee (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((s) => (
                <tr key={s.id} className="text-center text-sm">
                  <td className="p-2 border">{s.roll}</td>
                  <td className="p-2 border">{s.name}</td>
                  <td className="p-2 border">{s.class}</td>
                  <td className="p-2 border">{s.phone}</td>
                  <td className="p-2 border">
                    {s.hostelAllocated ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border">₹{s.feePaid}</td>
                  <td className="p-2 border text-red-600">₹{s.feeDue}</td>
                  <td className="p-2 border font-semibold">₹{s.totalFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
