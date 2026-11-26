
const express = require("express");
const cors = require("cors");
const Database = require("./database");
const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env")});

const app = express();
const PORT = process.env.PORT || 5000;

// Create a persistent SQLite database inside the backend folder
const db = new Database(process.env.DB_PATH || path.join(__dirname, "govexam.db"));

app.use(cors());
app.use(express.json());

const createAdminRoutes = require("./adminRoutes");


require("./examCatalog")(db);

// Convert SQLite rows into the format expected by the frontend
function formatExam(exam) {
  return {
    ...exam,
    isNew: Boolean(exam.isNew)
  };
}

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "GovExam Alert backend is running!"
  });
});

// Health-check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working correctly"
  });
});

// Get, search, and filter exams from SQLite
app.get("/api/exams", (req, res) => {
  const { search, category } = req.query;

  let exams = db.prepare("SELECT * FROM exams ORDER BY id").all();

  if (search) {
    const term = String(search).toLowerCase();

    exams = exams.filter((exam) =>
      exam.title.toLowerCase().includes(term) ||
      exam.organization.toLowerCase().includes(term) ||
      exam.category.toLowerCase().includes(term)
    );
  }

  if (category) {
    exams = exams.filter(
      (exam) =>
        exam.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  res.json({
    success: true,
    count: exams.length,
    data: exams.map(formatExam)
  });
});

// Get one exam by ID
app.get("/api/exams/:id", (req, res) => {
  const exam = db.prepare("SELECT * FROM exams WHERE id = ?")
    .get(Number(req.params.id));

  if (!exam) {
    return res.status(404).json({
      success: false,
      message: "Exam not found"
    });
  }

  res.json({
    success: true,
    data: formatExam(exam)
  });
});

const {auth, admin} = require("./accounts")(app, db);
app.use("/api/admin", auth, admin, createAdminRoutes(db));
app.use("/api", (req,res) => res.status(404).json({success:false,message:"API route not found"}));
app.use((err,req,res,next) => { console.error(err.message); res.status(err.status || 500).json({success:false,message: err.status === 400 ? "Invalid request" : "Server error"}); });
// Start server
app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `GovExam Alert backend running at http://localhost:${PORT}`
  );
});
