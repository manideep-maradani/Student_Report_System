# Student Report System (React + Vite)

B.Tech project for **Frontend Development and Frameworks**. A web application to manage and view student marks, attendance, faculty remarks and academic reports.

**Tech:** React 18, Vite, React Router. Data and accounts are stored in the browser's `localStorage` (frontend demo only: no backend, database or real authentication).

## Modules

| Module | Who | What they can do |
| --- | --- | --- |
| **Admin** | Faculty | View all students, search/filter and edit student details, enter and save marks, manage attendance, add remarks, view any student's report |
| **User** | Student / Parent | View their linked student's dashboard, marks, attendance, remarks and report (read-only), print the report |

Shared: Login, Signup, Forgot Password, Logout, grading format selector (letter grades / 10-point scale).

## Pages (routes)

`/login`, `/signup`, `/forgot-password`, `/dashboard`, `/students`, `/marks`, `/attendance`, `/remarks`, `/reports`

## Login and Signup (localStorage)

- Signup creates an account in `localStorage` (`srs_users`). Email must be unique, password at least 6 characters.
- A **User** account is linked to one student ID. An **Admin** account needs the demo access code `ADMIN123`.
- Login checks email, password and role, then stores the session in `localStorage` (`srs_session`). Protected pages redirect to `/login` when not logged in.

Demo accounts (created automatically):

| Role | Email | Password |
| --- | --- | --- |
| Admin | faculty@demo.edu | faculty123 |
| User (Student) | mani@demo.edu | student123 |
| User (Parent) | parent@demo.edu | parent123 |

## Project structure

```
src/
  components/  Layout (sidebar + header), ui (Badge, LevelBar, LineChart, StatCard, StudentPicker)
  context/     AuthContext (signup/login/logout/reset), DataContext (students, marks, attendance, remarks)
  pages/       Login, Signup, ForgotPassword, Dashboard, Students, Marks, Attendance, Remarks, Reports
  data/seed.js sample data (fictional), subjects, terms, grading formats
  utils/calc.js  totals, averages, attendance %, status
```

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repository.
3. Vercel detects Vite automatically (Build command `npm run build`, Output directory `dist`). Click **Deploy**.
4. `vercel.json` makes page refreshes on routes like `/marks` work.

## Future scope

Database integration, real authentication, PDF report generation, advanced analytics, notifications, multiple grading systems.
