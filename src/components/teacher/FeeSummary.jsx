// src/components/teacher/FeeSummary.jsx
"use client";
import React from "react";

export default function FeeSummary({ summary }) {
  if (!summary) return null;
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Fee Summary</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-xl font-bold">{summary.totalStudents}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Total Paid (₹)</div>
          <div className="text-xl font-bold">₹{summary.totalPaid}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Total Due (₹)</div>
          <div className="text-xl font-bold">₹{summary.totalDue}</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">Defaulters: {summary.defaulters}</div>
    </div>
  );
}
