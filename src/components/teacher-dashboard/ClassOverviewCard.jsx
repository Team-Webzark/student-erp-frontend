// src/components/teacher/ClassOverviewCard.jsx
"use client";
import React from "react";

export default function ClassOverviewCard({ stats }) {
  // stats: { totalStudents, hostelCount, pendingLeaves, totalDue }
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="text-sm text-gray-500">Students</div>
        <div className="text-2xl font-bold">{stats.totalStudents}</div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="text-sm text-gray-500">Pending Leaves</div>
        <div className="text-2xl font-bold">{stats.pendingLeaves}</div>
      </div>
    </div>
  );
}
