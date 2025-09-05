// src/components/teacher/FeeDetailsTable.jsx
"use client";
import React, { useEffect, useState } from "react";
import { getFeeDetails } from "@/lib/mockApi";

export default function FeeTable({ classId }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getFeeDetails(classId);
      setRows(data);
    }
    load();
  }, [classId]);

  if (!rows.length) {
    return <p className="text-gray-500">No fee records available.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Fee Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
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
            {rows.map((s) => (
              <tr key={s.id} className="text-center">
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
    </div>
  );
}
