# FullPond — Demo User Manual

FullPond is a remote-talent platform. This demo adds a full **Applicant Tracking System (ATS)**
on top of the marketing site: candidates register and apply to roles, and recruiters manage the
whole hiring pipeline — all the way to the **client interview & hiring** stage.

- **Live demo:** https://fullpond.vercel.app
- **Two roles:** **Candidate** (regular user) and **Recruiter / Admin**.

---

## 1. Accounts & sign-in

There are two seeded accounts so you can try both sides immediately:

| Role | Email | Password |
|------|-------|----------|
| **Recruiter (Admin)** | `admin@fullpond.co` | `FullPond2026!` |
| **Candidate (demo)** | `demo@fullpond.co` | `Demo2026!` |

Anyone can also **Sign up** for a new candidate account from the landing page (“Start today”) or
at `/register`. New sign-ups are always candidates.

> Tip: use a normal window for the recruiter and a private/incognito window for the candidate to
> stay logged into both at once.

---

## 2. Candidate experience

1. **Browse roles** — Click **Find a Job** / **See open roles** on the landing page, or go to
   `/vacancies`. This page is public.
2. **Open a role** — See the full job description (e.g. *Business Development Analyst*).
3. **Apply** — Click **Apply**. If you’re not signed in you’ll be asked to log in / sign up first.
   The application form is **specific to each role**: it shows that role’s questions plus the
   general questions (full name, country, English level, contact method, salary expectation, etc.).
   Your name and country are pre-filled from your profile.
4. **Track your application** — After submitting you land on **My applications** (`/dashboard`),
   where each application shows its current **stage** and a progress bar. You can’t apply twice to
   the same role.

---

## 3. Recruiter experience (Admin)

Sign in with the admin account. The top navigation shows: **Overview · Vacancies · Pipeline ·
Clients · Emails**.

### Overview (`/admin`)
Key counters (vacancies, applications, clients) and a snapshot of how many candidates sit in each
pipeline stage.

### Vacancies (`/admin/vacancies`)
- **Create** a role with **+ New vacancy**: title, summary, full description (Markdown supported:
  `## headings`, `**bold**`, `- bullets`), location, type, salary, **status** (Draft / Open /
  Closed) and an optional **client**.
- **Build the application form**: add as many questions as you want. Each question has a *label*,
  *section*, *type* (text, textarea, select, radio, number, email, phone, URL), *required* flag and
  optional *options*. The **“Maps to”** field copies an answer into a first-class candidate field
  (e.g. WhatsApp, LinkedIn, salary) so it’s easy to read later.
- Change a role’s **status** inline, jump to its **candidates**, or **delete** it.
- Only **Open** roles appear publicly on `/vacancies`.

### Pipeline (`/admin/pipeline`)
A drag-and-drop **kanban** of every application across the stages:

`Applied → Screening → Interview → Client interview → Offer → Hired` (plus **Rejected**).

- **Drag a card** from one column to another to move the candidate — it saves automatically.
- **Client interview** is the stage where the candidate meets the hiring **client company**; **Hired**
  means they were placed.
- Click **View profile →** on any card to open the candidate.

### Candidate profile (`/admin/candidates/[id]`)
Everything about one applicant: contact details, the role (and its client), the current stage, and
the **full set of answers** they submitted. You can change their **stage** and add private
**recruiter notes**, then **Save**.

### Clients (`/admin/clients`)
The companies FullPond recruits for. **Add a client** (name, industry, contact, notes); clients can
be attached to vacancies and are shown on candidate cards/profiles at the *Client interview* stage.

### Emails (`/admin/emails`)
Send a **branded “new role” email** to every registered candidate.
- Pick an open role and click **Send notifications**.
- **Demo mode:** because no email provider key is configured, each email is **rendered and logged**
  (status `RENDERED`) but **not actually delivered**. Expand **Preview email** to see exactly what
  each candidate would receive (personalized with their name and the role).
- To send for real, add a `RESEND_API_KEY` environment variable; the same button will then deliver
  via Resend and show status `SENT`.

---

## 4. How a full demo flows (suggested script)

1. **Admin:** create or open a role and confirm it’s **Open**.
2. **Candidate:** sign up, open the role, and **apply** (fill the form).
3. **Candidate:** see the application on **My applications** at stage *Applied*.
4. **Admin → Pipeline:** drag the candidate from *Applied* to *Interview*, then to
   *Client interview*.
5. **Candidate:** refresh **My applications** — the stage and progress bar updated.
6. **Admin → Candidate profile:** read their answers, add a note.
7. **Admin → Emails:** send a notification for the role and preview the branded email.

---

## 5. Good to know

- **Data store:** a dedicated Supabase Postgres database, fully separate from any other project.
- **Seeded content:** one client (*Peak Labs Supplements*) and one role
  (*Business Development Analyst*) with its full question set.
- **Resetting:** re-running the seed restores the admin/demo accounts and the sample role without
  touching anything else.
- **Security:** passwords are hashed (bcrypt); sessions are signed cookies; all admin pages and
  actions verify the recruiter role on the server.

_Questions or want changes? This is a living demo — tell us what to adjust._
