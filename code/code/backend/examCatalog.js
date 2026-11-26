const officialExams = require("./officialExams.json");

module.exports = function initializeExamCatalog(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      category TEXT NOT NULL,
      lastDate TEXT,
      examDate TEXT,
      applicationLink TEXT,
      description TEXT,
      isNew INTEGER DEFAULT 0,
      eligibility TEXT,
      posts INTEGER
    );
    CREATE TABLE IF NOT EXISTS exam_catalog_migrations (name TEXT PRIMARY KEY);
  `);

  // The marker and records commit together. A restart preserves edits and deletions.
  db.exec("BEGIN IMMEDIATE");
  try {
    const migration = "official-catalog-v1";
    const applied = db.prepare("SELECT 1 FROM exam_catalog_migrations WHERE name = ?").get(migration);
    if (!applied) {
      db.exec(`
        ALTER TABLE exams ADD COLUMN catalogKey TEXT;
        ALTER TABLE exams ADD COLUMN examEndDate TEXT;
        CREATE UNIQUE INDEX official_exam_catalog_key ON exams(catalogKey) WHERE catalogKey IS NOT NULL;
      `);
      const insert = db.prepare(`
        INSERT INTO exams (catalogKey, title, organization, category, lastDate, examDate, examEndDate, applicationLink, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const exam of officialExams) {
        insert.run(exam.catalogKey, exam.title, exam.organization, exam.category,
          exam.lastDate, exam.examDate, exam.examEndDate ?? null, exam.applicationLink, exam.description);
      }
      db.prepare("INSERT INTO exam_catalog_migrations (name) VALUES (?)").run(migration);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
};
