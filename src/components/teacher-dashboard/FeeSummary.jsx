// src/components/teacher/FeeSummary.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function FeeSummary({ summary }) {
  const router = useRouter();

  if (!summary) return null;
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Fee Summary</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Total Paid (₹)</div>
          <div className="text-xl font-bold">₹{summary.totalPaid}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Total Due (₹)</div>
          <div className="text-xl font-bold">₹{summary.totalDue}</div>
        </div>
      </div>

      {/* New Button */}
      <button
        onClick={() => router.push("/teacher-dashboard/fee-info")}
        className="mt-4 w-full py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        View Total Fee Info
      </button>
    </div>
  );
}
