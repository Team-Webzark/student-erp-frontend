// src/components/teacher/LeaveQueue.jsx
"use client";
import React, { useState } from "react";

export default function LeaveQueue({ leaves = [], onApprove, onReject }) {
  const [commentMap, setCommentMap] = useState({});

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Leave Applications</h4>
      {leaves.length === 0 ? <div className="text-gray-500">No leave applications</div> : (
        <div className="space-y-3">
          {leaves.map(l => (
            <div key={l.id} className="p-3 border rounded flex justify-between items-start">
              <div>
                <div className="font-semibold">{l.studentName} <span className="text-sm text-gray-400">({l.class})</span></div>
                <div className="text-sm text-gray-600">From {l.from} to {l.to} — {l.reason}</div>
                <div className="text-xs text-gray-400">Submitted: {new Date(l.submittedAt).toLocaleString()}</div>
              </div>

              <div className="flex flex-col gap-2 w-44">
                {l.status === "pending" ? (
                  <>
                    <input value={commentMap[l.id] || ""} onChange={(e)=>setCommentMap(prev=>({ ...prev, [l.id]: e.target.value }))} placeholder="comment (optional)"
                      className="px-2 py-1 border rounded text-sm" />
                    <div className="flex gap-2">
                      <button onClick={()=>onApprove(l.id, commentMap[l.id])} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                      <button onClick={()=>onReject(l.id, commentMap[l.id])} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                    </div>
                  </>
                ) : (
                  <div className={`px-3 py-1 rounded ${l.status==="approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{l.status}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
