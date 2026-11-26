
const express = require("express");

function validate(v) {
  for (const k of ['title','organization','category']) if(typeof v[k] !== 'string' || !v[k].trim() || v[k].length > 200) return k+' is required (max 200 characters)';
  for(const k of ['lastDate','examDate','examEndDate']) if(v[k] && (typeof v[k] !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v[k]) || !Number.isFinite(Date.parse(v[k])) || new Date(v[k]).toISOString().slice(0,10)!==v[k])) return 'Invalid '+k;
  if (v.examEndDate && (!v.examDate || v.examEndDate < v.examDate)) return 'Exam end date must be on or after the exam date';
  if(v.posts!=null && v.posts!=='' && (!Number.isSafeInteger(Number(v.posts)) || Number(v.posts)<0)) return 'Posts must be a non-negative integer';
  if(v.applicationLink) {try {if(!['http:','https:'].includes(new URL(v.applicationLink).protocol))return 'Use an HTTP(S) application link';}catch{return 'Invalid application link';}}
  for(const k of ['description','eligibility']) if(v[k]!=null && (typeof v[k]!=='string'||v[k].length>5000)) return 'Invalid '+k;
  return null;
}
module.exports = function createAdminRoutes(db) {
  const router = express.Router();

  // Add a new exam
  router.post("/exams", (req, res) => {
    const body = req.body || {};
    const {
      title,
      organization,
      category,
      lastDate,
      examDate,
      examEndDate,
      applicationLink,
      description,
      isNew = true,
      eligibility,
      posts
    } = body;

    const problem = validate(body);
    if (problem) {
      return res.status(400).json({
        success: false,
        message: problem
      });
    }

    try {
      const result = db.prepare(`
        INSERT INTO exams (
          title, organization, category, lastDate, examDate, examEndDate,
          applicationLink, description, isNew, eligibility, posts
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        title,
        organization,
        category,
        lastDate || null,
        examDate || null,
        examEndDate || null,
        applicationLink || null,
        description || null,
        isNew ? 1 : 0,
        eligibility || null,
        posts == null ? null : Number(posts)
      );

      const exam = db.prepare(
        "SELECT * FROM exams WHERE id = ?"
      ).get(result.lastInsertRowid);

      res.status(201).json({
        success: true,
        message: "Exam added successfully",
        data: { ...exam, isNew: Boolean(exam.isNew) }
      });
    } catch (error) {
      console.error("Add exam error:", error.message);
      res.status(500).json({
        success: false,
        message: "Could not add exam"
      });
    }
  });

  // Update an existing exam
  router.put("/exams/:id", (req, res) => {
    const existing = db.prepare(
      "SELECT * FROM exams WHERE id = ?"
    ).get(Number(req.params.id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    const fields = [
      "title", "organization", "category", "lastDate",
      "examDate", "examEndDate", "applicationLink", "description",
      "isNew", "eligibility", "posts"
    ];

    const updates = {};
    const body = req.body || {};
    for (const field of fields) {
      updates[field] = body[field] === undefined
        ? existing[field]
        : body[field];
    }

    const problem = validate(updates);
    if(problem) return res.status(400).json({success:false,message:problem});
    try {
      db.prepare(`
        UPDATE exams SET
          title = ?, organization = ?, category = ?,
          lastDate = ?, examDate = ?, examEndDate = ?, applicationLink = ?,
          description = ?, isNew = ?, eligibility = ?, posts = ?
        WHERE id = ?
      `).run(
        updates.title,
        updates.organization,
        updates.category,
        updates.lastDate,
        updates.examDate || null,
        updates.examEndDate || null,
        updates.applicationLink,
        updates.description,
        updates.isNew ? 1 : 0,
        updates.eligibility,
        updates.posts == null || updates.posts === "" ? null : Number(updates.posts),
        Number(req.params.id)
      );

      const exam = db.prepare(
        "SELECT * FROM exams WHERE id = ?"
      ).get(Number(req.params.id));

      res.json({
        success: true,
        message: "Exam updated successfully",
        data: { ...exam, isNew: Boolean(exam.isNew) }
      });
    } catch (error) {
      console.error("Update exam error:", error.message);
      res.status(500).json({
        success: false,
        message: "Could not update exam"
      });
    }
  });

  // Delete an existing exam
  router.delete("/exams/:id", (req, res) => {
    const result = db.prepare(
      "DELETE FROM exams WHERE id = ?"
    ).run(Number(req.params.id));

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    res.json({
      success: true,
      message: "Exam deleted successfully"
    });
  });

  return router;
};
