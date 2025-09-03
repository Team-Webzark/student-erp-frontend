// src/components/teacher/TimetablePanel.jsx
"use client";
import React from "react";

export default function TimetablePanel({ timetable = [] }) {
  // Group by period or weekday as needed - simple list for demo
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Timetable (sample)</h4>
      <div className="grid grid-cols-3 gap-3">
        {timetable.map((t, idx) => (
          <div key={idx} className="p-3 border rounded">
            <div className="text-sm text-gray-500">Period {t.period}</div>
            <div className="font-medium">{t.subject}</div>
            <div className="text-xs text-gray-400">{t.start} - {t.end} · {t.room}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
