// src/components/teacher/StudentRoster.jsx
"use client";
import React from "react";

export default function StudentRoster({ students = [], onView }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Student Roster</h4>
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
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.hostelAllocated ? "Yes" : "No"}</td>
                <td>₹{s.fee?.due || 0}</td>
                <td>
                  <button onClick={() => onView(s)} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
