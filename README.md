
# GovExam Alert

## Government Exam Notification and Deadline Alert System

**UCS503 – Software Engineering Semester Project**  
Thapar Institute of Engineering and Technology, Patiala  
BE Third Year – Computer Engineering  
Academic Session: 2026–27  
Group: 3C53

## Project Overview

GovExam Alert is a web-based platform designed to help students and government job aspirants discover government examinations, track application deadlines and manage saved examinations through a centralized dashboard.

The platform provides a searchable examination catalog, user authentication, deadline alerts and an administrative panel for managing examination records.

## Problem Statement

Government examination notifications are published across multiple recruitment websites, making it difficult for aspirants to track important dates and application deadlines.

GovExam Alert addresses this problem by providing a centralized platform where users can browse examinations, access recruitment source links and track upcoming deadlines.

## Features

### User Features

- Browse 36 government examination listings.
- Search examinations by name and keyword.
- Filter examinations by category.
- Sort examination listings.
- View examination details and source links.
- Register and log in securely.
- Save and remove examinations.
- Receive in-app deadline alerts.
- Manage user profile and alert preferences.
- Switch between light and dark modes.
- Responsive interface for desktop and mobile devices.

### Administrator Features

- Secure administrator login.
- View and manage examination records.
- Add new examinations.
- Edit existing examination details.
- Delete examination records.
- Manage the centralized SQLite examination catalog.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | SQLite |
| Authentication | Session-based authentication |
| Password Security | Salted scrypt password hashing |
| API | REST API |
| Version Control | Git and GitHub |
| Documentation | Markdown and LaTeX |
| Testing | Backend smoke tests and Chromium |

## System Architecture

The application follows a client-server architecture.

```text
User / Administrator
         |
    React Frontend
         |
      REST API
         |
   Express Backend
         |
   SQLite Database
```

Both the user dashboard and the administrator panel use the same SQLite database, ensuring consistent examination records.

## Repository Structure

```text
.
├── code/
│   ├── src/
│   ├── backend/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── accounts.js
│   │   ├── adminRoutes.js
│   │   ├── database.js
│   │   ├── examCatalog.js
│   │   ├── officialExams.json
│   │   ├── server.js
│   │   └── package.json
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
├── docs/
├── journals/
├── project-proposal/
├── project-report-prototype-stage/
├── project-report-final/
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js 24 or compatible newer version
- npm
- Git
- Visual Studio Code (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/BirAngad/UCS503-202627-GOVT.-EXAM-NOTIFICATION-PORTAL.git
```

Open the repository and navigate to the `code` folder.

### 2. Install Frontend Dependencies

```bash
npm ci
```

### 3. Install Backend Dependencies

```bash
cd backend
npm ci
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder using `.env.example` as a reference.

```env
PORT=5000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourUniquePasswordHere
```

The administrator password must contain at least 12 characters.

### 5. Start the Backend

Run the following command inside the backend folder:

```bash
npm start
```

The backend runs at:

http://localhost:5000

### 6. Start the Frontend

Open a separate terminal in the `code` folder and run:

```bash
npm run dev
```

Open the application at:

http://localhost:5173

Keep both servers running while using the application.

## Database

The application uses SQLite for persistent data storage.

The database maintains the following entities:

- Users
- Examinations
- Sessions
- Reminders
- Database migrations

The examination catalog is initialized automatically using the supplied examination data.

## Software Engineering Documentation

The project documentation includes:

- Functional and non-functional requirements
- System architecture
- Use Case Diagram
- Activity Diagram
- Swimlane Diagram
- Entity Relationship Diagram
- Data Flow Diagrams (Level 0, Level 1 and Level 2)
- Sequence Diagram
- Database schema
- User stories and acceptance criteria
- Requirements traceability
- Software testing and evaluation

## Testing and Evaluation

The final evaluation report records the following results:

| Test | Result |
|---|---|
| Backend smoke tests (31 request checks) | Passed |
| Examination catalog retrieval | Passed |
| User authentication | Passed |
| Administrator access control | Passed |
| Examination CRUD operations | Passed |
| Database persistence | Passed |
| Saved examinations | Passed |
| Deadline alerts | Passed |
| Frontend production build | Passed |
| Chromium browser workflows | Passed |

## Project Reports

- Project Proposal
- Prototype Stage Progress Report
- Final Evaluation Report
- Individual Technical Journals

The reports document the development process, system design, implementation, testing and improvements made throughout the semester.

## Team Members

| Name | Roll Number | Contribution |
|---|---|---|
| Aryan Juneja | 1024030731 | Database and Administration |
| Raghav Mittal | 1024030747 | Frontend Development and UI/UX |
| Bir Angad | 1024031150 | Backend Development and API Integration |

## Submitted To

Paramveer Kaur

Computer Science and Engineering Department  
Thapar Institute of Engineering and Technology, Patiala

## Future Scope

- Email and push notification support.
- Automated examination notification updates.
- Periodic verification of examination information.
- Advanced personalized examination recommendations.
- Expanded examination catalog.
- Cloud deployment and scalability improvements.

## Deployment

Deployment is currently pending. The live application URL will be updated once deployment is completed.

## Disclaimer

GovExam Alert is an academic software engineering project. Users should refer to the official recruitment websites for confirmed examination dates, eligibility criteria, vacancies and application information.

## Acknowledgement

We would like to thank our faculty for their guidance and support throughout the development of this project.

---

Developed as part of UCS503 – Software Engineering, TIET, Academic Session 2026–27.
