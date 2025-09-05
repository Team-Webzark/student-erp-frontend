// src/lib/mockApi.js
// Simple mock API using localStorage (safe to call from client components).
// All functions return Promises to mimic fetch.

const LS_KEYS = {
  TEACHER: "mock_teacher_v1",
  STUDENTS: "mock_students_v1",
  LEAVES: "mock_leaves_v1",
  TIMETABLE: "mock_timetable_v1",
  EXAMS: "mock_exams_v1",
  CONFIG: "mock_config_v1",
};

const defaultTeacher = {
  id: "t-1001",
  name: "Anita Verma",
  employeeId: "EMP045",
  photo: "/images/teacher-placeholder.png",
  classes: ["8-A"],
  session: "2024-25",
};

const defaultStudents = [
  { id: "s-2001", roll: "08-01", name: "Rahul Sharma", class: "8-A", hostelAllocated: true, fee: { paid: 12000, due: 3000 }, phone: "9876543210", onLeave: false },
  { id: "s-2002", roll: "08-02", name: "Meena Gupta", class: "8-A", hostelAllocated: false, fee: { paid: 15000, due: 0 }, phone: "9812345670", onLeave: false },
  { id: "s-2003", roll: "08-03", name: "Arjun Roy", class: "8-A", hostelAllocated: true, fee: { paid: 9000, due: 6000 }, phone: "9900112233", onLeave: false },
];

const defaultLeaves = [
  { id: "leave-501", studentId: "s-2001", studentName: "Rahul Sharma", class: "8-A", from: "2025-05-10", to: "2025-05-12", reason: "Fever", status: "pending", submittedAt: "2025-05-09T08:30:00Z", teacherComment: null },
  { id: "leave-502", studentId: "s-2002", studentName: "Meena Gupta", class: "8-A", from: "2025-05-11", to: "2025-05-11", reason: "Medical appointment", status: "pending", submittedAt: "2025-05-09T09:05:00Z", teacherComment: null },
];

const defaultTimetable = [
  { classId: "8-A", weekday: "Monday", period: 1, subject: "Mathematics", start: "09:00", end: "09:40", room: "B101" },
  { classId: "8-A", weekday: "Monday", period: 2, subject: "Science", start: "09:50", end: "10:30", room: "B101" },
  { classId: "8-A", weekday: "Monday", period: 3, subject: "English", start: "10:50", end: "11:30", room: "B101" },
];

const defaultExams = [
  { id: "exam-1", title: "Term 1", date: "2025-06-23", syllabusCompletion: 40, testsThisMonth: 1 },
];

const defaultConfig = {
  // Superadmin-set field labels for teacher view (dynamic)
  teacherFields: [
    { key: "name", label: "Teacher Name" },
    { key: "employeeId", label: "Employee ID" },
    { key: "classes", label: "Assigned Classes" },
    { key: "session", label: "Session" },
  ],
  studentFields: [
    { key: "roll", label: "Roll" },
    { key: "name", label: "Student Name" },
    { key: "hostelAllocated", label: "Hostel" },
    { key: "fee_due", label: "Fee Due" },
  ],
};

function _read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(key);
  if (!v) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(v);
  } catch (e) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function _write(key, data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getTeacher() {
  return Promise.resolve(_read(LS_KEYS.TEACHER, defaultTeacher));
}

export function getStudents(classId) {
  const all = _read(LS_KEYS.STUDENTS, defaultStudents);
  if (!classId) return Promise.resolve(all);
  return Promise.resolve(all.filter((s) => s.class === classId));
}

export function getLeaves(classId) {
  const all = _read(LS_KEYS.LEAVES, defaultLeaves);
  if (!classId) return Promise.resolve(all);
  return Promise.resolve(all.filter((l) => l.class === classId));
}

export function approveLeave(leaveId, comment) {
  const leaves = _read(LS_KEYS.LEAVES, defaultLeaves).map((l) =>
    l.id === leaveId ? { ...l, status: "approved", teacherComment: comment || null } : l
  );
  _write(LS_KEYS.LEAVES, leaves);
  // mark student onLeave true
  const leavesObj = leaves.find((x) => x.id === leaveId);
  if (leavesObj) {
    const students = _read(LS_KEYS.STUDENTS, defaultStudents).map((s) =>
      s.id === leavesObj.studentId ? { ...s, onLeave: true } : s
    );
    _write(LS_KEYS.STUDENTS, students);
  }
  return Promise.resolve({ ok: true });
}

export function rejectLeave(leaveId, comment) {
  const leaves = _read(LS_KEYS.LEAVES, defaultLeaves).map((l) =>
    l.id === leaveId ? { ...l, status: "rejected", teacherComment: comment || null } : l
  );
  _write(LS_KEYS.LEAVES, leaves);
  return Promise.resolve({ ok: true });
}

export function getTimetable(classId) {
  const all = _read(LS_KEYS.TIMETABLE, defaultTimetable);
  if (!classId) return Promise.resolve(all);
  return Promise.resolve(all.filter((t) => t.classId === classId));
}

export function getExams(classId) {
  const all = _read(LS_KEYS.EXAMS, defaultExams);
  if (!classId) return Promise.resolve(all);
  return Promise.resolve(all);
}

export function getFeeSummary(classId) {
  const students = _read(LS_KEYS.STUDENTS, defaultStudents).filter((s) => !classId || s.class === classId);
  const totalDue = students.reduce((sum, s) => sum + (s.fee?.due || 0), 0);
  const totalPaid = students.reduce((sum, s) => sum + (s.fee?.paid || 0), 0);
  const defaulters = students.filter((s) => (s.fee?.due || 0) > 0).length;
  return Promise.resolve({ totalDue, totalPaid, defaulters, totalStudents: students.length });
}

// 🔥 NEW: Full fee details table data
export function getFeeDetails(classId) {
  const students = _read(LS_KEYS.STUDENTS, defaultStudents).filter((s) => !classId || s.class === classId);
  return Promise.resolve(
    students.map((s) => ({
      id: s.id,
      roll: s.roll,
      name: s.name,
      class: s.class,
      hostelAllocated: s.hostelAllocated,
      phone: s.phone,
      feePaid: s.fee?.paid || 0,
      feeDue: s.fee?.due || 0,
      totalFee: (s.fee?.paid || 0) + (s.fee?.due || 0),
    }))
  );
}

export function getConfig() {
  return Promise.resolve(_read(LS_KEYS.CONFIG, defaultConfig));
}

// For convenience - reset mocks (dev)
export function resetMocks() {
  _write(LS_KEYS.TEACHER, defaultTeacher);
  _write(LS_KEYS.STUDENTS, defaultStudents);
  _write(LS_KEYS.LEAVES, defaultLeaves);
  _write(LS_KEYS.TIMETABLE, defaultTimetable);
  _write(LS_KEYS.EXAMS, defaultExams);
  _write(LS_KEYS.CONFIG, defaultConfig);
  return Promise.resolve(true);
}
