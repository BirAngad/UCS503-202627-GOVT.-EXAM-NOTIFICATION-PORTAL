const express = require("express");

const router = express.Router();

// Temporary sample exam data.
// We will connect this to the database later.
const exams = [
  {
    id: 1,
    title: "SSC CGL",
    organization: "Staff Selection Commission",
    category: "SSC",
    lastDate: "2026-11-15",
    examDate: "2026-12-20",
    description: "Combined Graduate Level Examination",
    applicationLink: "https://ssc.gov.in/",
    isNew: true,
    eligibility: "Bachelor's degree",
    posts: 1000
  },
  {
    id: 2,
    title: "UPSC Civil Services",
    organization: "Union Public Service Commission",
    category: "UPSC",
    lastDate: "2026-11-30",
    examDate: "2027-01-10",
    description: "Civil Services Examination",
    applicationLink: "https://upsc.gov.in/",
    isNew: true,
    eligibility: "Bachelor's degree",
    posts: 500
  }
];

// GET /api/exams - return all exams
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: exams.length,
    data: exams
  });
});

// GET /api/exams/:id - return one exam
router.get("/:id", (req, res) => {
  const exam = exams.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!exam) {
    return res.status(404).json({
      success: false,
      message: "Exam not found"
    });
  }

  res.json({
    success: true,
    data: exam
  });
});

module.exports = router;