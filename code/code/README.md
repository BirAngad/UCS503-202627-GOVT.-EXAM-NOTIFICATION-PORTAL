# GovExam Alert — UCS503 semester project

Updated from the existing Figma-generated React/Vite project. Android and iOS are browser-based design variants, not native mobile apps. The catalog includes 36 listings with official source links. Calendar dates may change. Open the source to check the current dates, eligibility, and application details.

## Windows setup (VS Code)
1. Extract this ZIP to a new folder; keep your original as a backup. Install Node.js 22.13 or newer (Node 22 LTS recommended). Run `node -v` and `npm -v`.
2. Open the extracted `GovExam-Alert` folder in VS Code. In a PowerShell terminal run `npm ci`.
3. In a second terminal run `cd backend`, then `npm ci`, then `Copy-Item .env.example .env`. Open `backend/.env` and choose your own ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters). Do not commit .env. Keep PORT=5000.
4. In the backend terminal run `npm start`. Leave it running. Visit http://localhost:5000/api/health to check the server.
5. In the first terminal (project root) run `npm run dev`. Open the localhost URL Vite prints (normally http://localhost:5173). Choose Android or iOS.

## Demonstration
- Browse, search, filter, and sort the exams loaded from SQLite.
- Settings > Register a new user. Sign in, bookmark any listing, then open Saved Exams or Reminders. Refresh to verify persistence. Edit profile and alert preference in Settings.
- Sign out and log in with the admin credentials you configured before first startup. Settings > Admin dashboard. All catalog listings can be edited or deleted. To try the workflow without changing an official listing, add a temporary exam with a deadline within three days, edit it, then delete it after testing. A user who saves that exam will see an in-app alert. Normal users cannot use admin APIs.
- The admin account is created only if the configured email does not already exist. Editing the password in .env does not reset an existing account. For a clean demo database, stop the backend, back up govexam.db, and use a fresh database file (existing accounts and saved exams are not transferred).
- For backend tests: from project root run `node backend/tests/smoke.cjs`. It uses a disposable database and port 5012. For frontend build: `npm run build` (run locally after installation). `npm run preview` uses the same API proxy while backend runs.

## Catalog and storage

- The 36 official listings are stored in SQLite. A one-time migration loads them when the backend first opens an older or empty database. Restarting preserves admin edits and deletions, accounts, and bookmarks. The two original sample rows are hidden in the interface when upgrading an older database.
- Bookmarks and deadline reminders use the signed-in account. Deadline alerts appear in the app. The project has no background scheduler, email, or push notifications.
- Run both terminals. Vite forwards relative `/api` requests to the backend on port 5000.
