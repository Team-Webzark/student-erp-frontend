// src/components/teacher/NotificationsWidget.jsx
"use client";
import React from "react";

export default function NotificationsWidget({ messages = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Notifications</h4>
      {messages.length === 0 ? <div className="text-gray-500">No notifications</div> : (
        <ul className="space-y-2">
          {messages.map((m,i)=> <li key={i} className="text-sm text-gray-600">• {m}</li>)}
        </ul>
      )}
    </div>
  );
}
