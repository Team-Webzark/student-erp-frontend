// src/components/teacher/TeacherDashboard.jsx
"use client";
import React, { useEffect, useState } from "react";
import {
  getTeacher,
  getStudents,
  getLeaves,
  approveLeave,
  rejectLeave,
  getTimetable,
  getExams,
  getFeeSummary,
  getConfig,
} from "@/lib/mockApi";

import TeacherHeader from "./TeacherHeader";
import ClassOverviewCard from "./ClassOverviewCard";
import TimetablePanel from "./TimetablePanel";
import StudentRoster from "./StudentRoster";
import StudentCardModal from "./StudentCardModal";
import LeaveQueue from "./LeaveQueue";
import FeeSummary from "./FeeSummary";
import ExamTracker from "./ExamTracker";
import NotificationsWidget from "./NotificationsWidget";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [exams, setExams] = useState([]);
  const [feeSummary, setFeeSummary] = useState(null);
  const [config, setConfig] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function load() {
      const t = await getTeacher();
      setTeacher(t);
      const s = await getStudents(t.classes?.[0]);
      setStudents(s);
      const l = await getLeaves(t.classes?.[0]);
      setLeaves(l);
      const tt = await getTimetable(t.classes?.[0]);
      setTimetable(tt);
      const ex = await getExams(t.classes?.[0]);
      setExams(ex);
      const fs = await getFeeSummary(t.classes?.[0]);
      setFeeSummary(fs);
      const cfg = await getConfig();
      setConfig(cfg);

      setNotifications([`Welcome back, ${t.name}`]);
    }
    load();
  }, []);

  async function handleApprove(id, comment) {
    await approveLeave(id, comment);
    const l = await getLeaves(teacher.classes?.[0]);
    setLeaves(l);
    setNotifications((n) => [`Approved leave ${id}`, ...n].slice(0, 6));
    setStudents(await getStudents(teacher.classes?.[0]));
    setFeeSummary(await getFeeSummary(teacher.classes?.[0]));
  }

  async function handleReject(id, comment) {
    await rejectLeave(id, comment);
    const l = await getLeaves(teacher.classes?.[0]);
    setLeaves(l);
    setNotifications((n) => [`Rejected leave ${id}`, ...n].slice(0, 6));
  }

  const stats = {
    totalStudents: students.length,
    hostelCount: students.filter((s) => s.hostelAllocated).length,
    pendingLeaves: leaves.filter((l) => l.status === "pending").length,
    totalDue: feeSummary?.totalDue || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:col-span-3 mb-6 lg:mb-0">
          <div className="bg-white rounded-xl p-4 shadow">
            {teacher && <TeacherHeader teacher={teacher} />}
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <div>
                Total Students:{" "}
                <span className="font-semibold">{stats.totalStudents}</span>
              </div>
              <div>
                Hostel:{" "}
                <span className="font-semibold">{stats.hostelCount}</span>
              </div>
              <div>
                Pending Leaves:{" "}
                <span className="font-semibold">{stats.pendingLeaves}</span>
              </div>
              <div>
                Fee Due:{" "}
                <span className="font-semibold">₹{stats.totalDue}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={async () => {
                  setStudents(await getStudents(teacher.classes[0]));
                  setFeeSummary(await getFeeSummary(teacher.classes[0]));
                }}
                className="w-full py-2 bg-blue-600 text-white rounded"
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                }}
                className="w-full py-2 bg-gray-100 rounded"
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <FeeSummary summary={feeSummary} />
            <NotificationsWidget messages={notifications} />
          </div>
        </aside>

        {/* Main */}
        <main className="w-full lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold">
              Class Overview - {teacher?.classes?.[0]}
            </h2>

            <div className="flex flex-wrap gap-2">
              {["overview", "students", "leave", "exams"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 rounded text-sm sm:text-base ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <section className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-6">
              <ClassOverviewCard stats={stats} />
              <TimetablePanel timetable={timetable} />
            </section>
          )}

          {activeTab === "students" && (
            <section className="bg-white p-4 sm:p-6 rounded-xl shadow">
              <StudentRoster
                students={students}
                onView={(s) => setSelectedStudent(s)}
              />
            </section>
          )}

          {activeTab === "leave" && (
            <section className="bg-white p-4 sm:p-6 rounded-xl shadow">
              <LeaveQueue
                leaves={leaves}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </section>
          )}

          {activeTab === "exams" && (
            <section className="bg-white p-4 sm:p-6 rounded-xl shadow">
              <ExamTracker exams={exams} />
            </section>
          )}
        </main>
      </div>

      {/* Student modal */}
      <StudentCardModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
