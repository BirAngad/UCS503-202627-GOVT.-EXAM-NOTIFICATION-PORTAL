// Hide the two original example records from the UI without changing SQLite.
const initialSamples = [
  { title: "SSC CGL", organization: "Staff Selection Commission", lastDate: "2026-11-15", examDate: "2026-12-20" },
  { title: "UPSC Civil Services", organization: "Union Public Service Commission", lastDate: "2026-11-30", examDate: "2027-01-10" },
];

export function isOriginalSample(exam: { title: string; organization: string; lastDate?: string; examDate?: string }) {
  return initialSamples.some(sample => sample.title === exam.title && sample.organization === exam.organization &&
    sample.lastDate === exam.lastDate && sample.examDate === exam.examDate);
}
