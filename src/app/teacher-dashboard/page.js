// src/app/teacher-dashboard/page.js
"use client";

import dynamic from "next/dynamic";

const TeacherDashboard = dynamic(
  () => import("@/components/teacher-dashboard/TeacherDashboard"),
  { ssr: false }
);

export default function Page() {
  return <TeacherDashboard />;
}
