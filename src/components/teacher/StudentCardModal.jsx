// src/components/teacher/StudentCardModal.jsx
"use client";
import React from "react";

export default function StudentCardModal({ student, onClose }) {
  if (!student) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>
        <div className="mt-4 space-y-2 text-gray-700">
          <div><span className="font-semibold">Roll:</span> {student.roll}</div>
          <div><span className="font-semibold">Class:</span> {student.class}</div>
          <div><span className="font-semibold">Phone:</span> {student.phone}</div>
          <div><span className="font-semibold">Hostel:</span> {student.hostelAllocated ? "Yes" : "No"}</div>
          <div><span className="font-semibold">Fee Paid:</span> ₹{student.fee?.paid || 0}</div>
          <div><span className="font-semibold">Fee Due:</span> ₹{student.fee?.due || 0}</div>
        </div>
      </div>
    </div>
  );
}
