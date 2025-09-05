// src/components/teacher/ExamTracker.jsx
"use client";
import React from "react";

export default function ExamTracker({ exams = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Exams & Tests</h4>
      <div className="space-y-3">
        {exams.map(e => (
          <div key={e.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-gray-500">Date: {e.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Syllabus</div>
                <div className="font-bold">{e.syllabusCompletion}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
