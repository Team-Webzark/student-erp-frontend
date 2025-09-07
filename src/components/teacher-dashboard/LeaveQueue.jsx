"use client";
import React, { useState, useEffect } from "react";

function formatDate(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
}

export default function LeaveQueue({ leaves = [], onApprove, onReject, onSendToAdmin, onMarkPending }) {
  const [commentMap, setCommentMap] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredLeaves, setFilteredLeaves] = useState(leaves);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredLeaves(leaves);
      return;
    }

    const lower = searchText.toLowerCase();
    setFilteredLeaves(
      leaves.filter(l =>
        l.studentName.toLowerCase().includes(lower) ||
        l.class.toLowerCase().includes(lower) ||
        l.reason.toLowerCase().includes(lower)
      )
    );
  }, [searchText, leaves]);

  const todayStr = formatDate(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);

  const groupedLeaves = {
    Today: [],
    Yesterday: [],
    Older: [],
  };

  filteredLeaves.forEach(l => {
    const leaveDate = formatDate(new Date(l.submittedAt));
    if (leaveDate === todayStr) {
      groupedLeaves.Today.push(l);
    } else if (leaveDate === yesterdayStr) {
      groupedLeaves.Yesterday.push(l);
    } else {
      groupedLeaves.Older.push(l);
    }
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-3">Leave Applications</h4>

      {/* Search input with white bg */}
      <input
        type="text"
        placeholder="Search by student, class, or reason..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="mb-4 w-full p-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {filteredLeaves.length === 0 ? (
        <div className="text-gray-500">No leave applications</div>
      ) : (
        <>
          {Object.entries(groupedLeaves).map(([groupName, groupLeaves]) =>
            groupLeaves.length > 0 ? (
              <div key={groupName} className="mb-6">
                <h5 className="text-md font-semibold mb-2">{groupName}</h5>
                <div className="space-y-3">
                  {groupLeaves.map(l => (
                    <div key={l.id} className="p-3 border rounded flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          {l.studentName} <span className="text-sm text-gray-400">({l.class})</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          From {l.from} to {l.to} — {l.reason}
                        </div>
                        <div className="text-xs text-gray-400">
                          Submitted: {new Date(l.submittedAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-52">
                        {l.status === "pending" ? (
                          <>
                            <input
                              value={commentMap[l.id] || ""}
                              onChange={e => setCommentMap(prev => ({ ...prev, [l.id]: e.target.value }))}
                              placeholder="Comment (optional)"
                              className="px-2 py-1 border rounded text-sm"
                            />
                            <div className="flex gap-2 flex-wrap">
                              <button
                                onClick={() => onApprove(l.id, commentMap[l.id])}
                                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => onReject(l.id, commentMap[l.id])}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => onSendToAdmin && onSendToAdmin(l.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                              >
                                Send to Admin
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`px-3 py-1 rounded ${
                                l.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {l.status}
                            </div>
                            {onMarkPending && (
                              <button
                                onClick={() => onMarkPending(l.id)}
                                className="mt-2 px-3 py-1 bg-yellow-400 text-yellow-900 rounded text-sm"
                              >
                                Mark Pending
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </>
      )}
    </div>
  );
}
