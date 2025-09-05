// src/components/teacher/TeacherHeader.jsx
"use client";
import React from "react";

export default function TeacherHeader({ teacher }) {
  return (
    <div className="flex items-center gap-4 text-gray-800">
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
        {teacher.name ? teacher.name.split(" ").map(n => n[0]).join("") : "T"}
      </div>
      <div>
        <div className="text-lg font-semibold">{teacher.name}</div>
        <div className="text-sm text-gray-500">ID: {teacher.employeeId} · {teacher.session}</div>
        <div className="text-sm text-gray-500">Classes: {teacher.classes?.join(", ")}</div>
      </div>
    </div>
  );
}
