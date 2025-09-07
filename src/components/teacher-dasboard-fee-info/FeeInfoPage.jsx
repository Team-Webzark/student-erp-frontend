// src/app/teacher-dashboard/fee-info/page.js
"use client";
import React, { useEffect, useState } from "react";
import { getFeeSummary } from "@/lib/mockApi";
import FeeTable from "./FeeTable";

export default function FeeInfoPage() {
  const [feeSummary, setFeeSummary] = useState(null);

  useEffect(() => {
    async function load() {
      const summary = await getFeeSummary("Class A");
      setFeeSummary(summary);
    }
    load();
  }, []);

  if (!feeSummary) return <div className="p-6">Loading fee details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <h2 className="text-2xl font-bold">Complete Fee Information</h2>
  <button
    onClick={() => history.back()}
    className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition w-max"
  >
    ← Back
  </button>
</div>



        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Total Paid (₹)</div>
            <div className="text-xl font-bold">₹{feeSummary.totalPaid}</div>
          </div>
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Total Due (₹)</div>
            <div className="text-xl font-bold">₹{feeSummary.totalDue}</div>
          </div>
        </div>

        {/* Table Section */}
        <FeeTable students={feeSummary.students} />

      </div>
    </div>
  );
}
