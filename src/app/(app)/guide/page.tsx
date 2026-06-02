import Link from "next/link";

export const metadata = { title: "How to use FullPond — Guide" };

const RECRUITER_STEPS = [
  {
    n: "01",
    icon: "📋",
    title: "Create a vacancy",
    body: "Go to Vacancies → + New vacancy. Write the title, description and build the application form with custom questions. Set status to Open to publish it publicly.",
    action: { label: "Go to Vacancies", href: "/admin/vacancies" },
  },
  {
    n: "02",
    icon: "🏢",
    title: "Add the hiring client",
    body: "In Clients, add the U.S. company that's hiring. Give their contact info and industry. Then link the client to the vacancy so it shows on every candidate card.",
    action: { label: "Go to Clients", href: "/admin/clients" },
  },
  {
    n: "03",
    icon: "📥",
    title: "Candidates apply",
    body: "Once the role is Open, candidates register on the site and submit their application. Each answer is stored and tied to their profile — no spreadsheets needed.",
    action: null,
  },
  {
    n: "04",
    icon: "↔️",
    title: "Move them through the pipeline",
    body: "Open the Pipeline board. You'll see a card for each candidate. Drag it from Applied → Screening → Interview → Client interview → Offer → Hired. Or mark them Rejected.",
    action: { label: "Go to Pipeline", href: "/admin/pipeline" },
  },
  {
    n: "05",
    icon: "👤",
    title: "Review candidate profiles",
    body: "Click View profile on any card to see their full answers, contact info, country and salary expectation. Add private recruiter notes and update their stage from the profile.",
    action: null,
  },
  {
    n: "06",
    icon: "📧",
    title: "Notify your talent pool",
    body: "When a new role opens, go to Emails, pick the vacancy and click Send notifications. Every registered candidate gets a branded email with the role details.",
    action: { label: "Go to Emails", href: "/admin/emails" },
  },
  {
    n: "07",
    icon: "🎯",
    title: "Handle inbound hire requests",
    body: "Companies that fill the Hire talent form on the landing page appear in Leads. Contact them, update the status (New → Contacted → Won/Lost) and add them as a Client when ready.",
    action: { label: "Go to Leads", href: "/admin/leads" },
  },
];

const CANDIDATE_STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "Browse open roles",
    body: "Visit the Vacancies page — no account needed. Read the full job description for any role that interests you.",
    action: { label: "View open roles", href: "/vacancies" },
  },
  {
    n: "02",
    icon: "✍️",
    title: "Create your account",
    body: "Click Apply — you'll be asked to sign in or sign up. Use your Google account for one click, or register with your email and password.",
    action: { label: "Sign up", href: "/register" },
  },
  {
    n: "03",
    icon: "📝",
    title: "Complete the application",
    body: "Answer the role-specific questions and the general questions (English level, contact method, LinkedIn, salary). It takes 5–7 minutes. Some fields are pre-filled from your profile.",
    action: null,
  },
  {
    n: "04",
    icon: "📊",
    title: "Track your application",
    body: "Go to My applications to see where you stand. A progress bar shows your current stage: Applied → Screening → Interview → Client interview → Offer → Hired.",
    action: { label: "My applications", href: "/dashboard" },
  },
];

const PIPELINE_STAGES = [
  { label: "Applied",          color: "bg-stone-100 text-stone-700",         desc: "Just submitted" },
  { label: "Screening",        color: "bg-fp-blue/30 text-fp-dark",          desc: "Under review" },
  { label: "Interview",        color: "bg-fp-blue/60 text-fp-dark",          desc: "Meeting scheduled" },
  { label: "Client interview", color: "bg-fp-violet/20 text-fp-dark border border-fp-violet/30", desc: "Meets hiring company" },
  { label: "Offer",            color: "bg-emerald-100 text-emerald-800",     desc: "Offer extended" },
  { label: "Hired",            color: "bg-emerald-500 text-white",           desc: "Placement confirmed" },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 pb-16">

      {/* Hero */}
      <header className="rounded-3xl p-10 text-center" style={{ background: "#64bcff" }}>
        <p className="text-sm font-semibold uppercase tracking-widest text-fp-dark/60">FullPond</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-fp-dark">
          How to use this app
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-fp-dark/70 text-lg">
          Everything you need to know — whether you're a recruiter managing the pipeline or a candidate applying to roles.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#recruiter" className="rounded-full bg-fp-dark px-6 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">
            I'm a Recruiter
          </a>
          <a href="#candidate" className="rounded-full border-2 border-fp-dark/25 bg-white/30 px-6 py-2.5 text-sm font-semibold text-fp-dark transition hover:bg-fp-dark hover:text-fp-blue">
            I'm a Candidate
          </a>
        </div>
      </header>

      {/* Demo credentials */}
      <section className="rounded-2xl border-2 border-fp-blue/50 bg-fp-blue/10 p-6">
        <h2 className="font-display text-xl text-fp-dark">Demo credentials</h2>
        <p className="mt-1 text-sm text-fp-dark/60">Use these to explore the app right now.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { role: "Recruiter (Admin)", email: "admin@fullpond.co", password: "FullPond2026!", icon: "🛠️", href: "/admin" },
            { role: "Candidate",         email: "demo@fullpond.co",  password: "Demo2026!",    icon: "👤", href: "/dashboard" },
          ].map((c) => (
            <div key={c.role} className="rounded-xl border border-fp-dark/10 bg-white p-4">
              <p className="text-sm font-semibold text-fp-dark">{c.icon} {c.role}</p>
              <p className="mt-2 font-mono text-xs text-fp-dark/70">{c.email}</p>
              <p className="font-mono text-xs text-fp-dark/50">{c.password}</p>
              <Link href={c.href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-fp-dark/60 hover:text-fp-dark underline">
                Sign in and go →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline visual */}
      <section>
        <h2 className="font-display text-2xl text-fp-dark">The recruitment pipeline</h2>
        <p className="mt-1 text-fp-dark/60">Every candidate moves through these stages — recruiters drag the card, candidates see the progress.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PIPELINE_STAGES.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${s.color}`}>
                <span className="block">{s.label}</span>
                <span className="block text-[10px] font-normal opacity-70">{s.desc}</span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <span className="text-fp-dark/30 text-lg">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter guide */}
      <section id="recruiter">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fp-dark text-fp-blue text-lg font-bold">🛠️</div>
          <div>
            <h2 className="font-display text-3xl text-fp-dark">For Recruiters</h2>
            <p className="text-fp-dark/60 text-sm">Manage vacancies, clients and the full hiring pipeline.</p>
          </div>
        </div>

        <div className="space-y-4">
          {RECRUITER_STEPS.map((step, i) => (
            <div key={step.n} className="flex gap-5 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-fp-blue/40 hover:shadow-sm">
              <div className="shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: "#64bcff" }}>
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-fp-dark/30 tracking-widest">{step.n}</span>
                  <h3 className="font-display text-lg text-fp-dark">{step.title}</h3>
                </div>
                <p className="mt-1 text-sm text-fp-dark/65 leading-relaxed">{step.body}</p>
                {step.action && (
                  <Link href={step.action.href} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-fp-dark px-4 py-1.5 text-xs font-semibold text-fp-blue transition hover:opacity-90">
                    {step.action.label} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate guide */}
      <section id="candidate">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fp-dark text-fp-blue text-lg font-bold">👤</div>
          <div>
            <h2 className="font-display text-3xl text-fp-dark">For Candidates</h2>
            <p className="text-fp-dark/60 text-sm">Find a role, apply in minutes, and track your progress.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CANDIDATE_STEPS.map((step) => (
            <div key={step.n} className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-fp-blue/40 hover:shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl mb-4" style={{ background: "#64bcff" }}>
                {step.icon}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold text-fp-dark/30 tracking-widest">{step.n}</span>
                <h3 className="font-display text-lg text-fp-dark">{step.title}</h3>
              </div>
              <p className="text-sm text-fp-dark/65 leading-relaxed">{step.body}</p>
              {step.action && (
                <Link href={step.action.href} className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-fp-dark px-4 py-1.5 text-xs font-semibold text-fp-blue transition hover:opacity-90">
                  {step.action.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-stone-200 bg-white p-8">
        <h2 className="font-display text-2xl text-fp-dark mb-6">Quick answers</h2>
        <dl className="space-y-5 divide-y divide-stone-100">
          {[
            { q: "Can I apply to the same role twice?", a: "No — the system prevents duplicate applications. If you already applied, your dashboard will say so." },
            { q: "Do candidates see recruiter notes?", a: "No — recruiter notes are private and only visible to admins in the candidate profile." },
            { q: "How do vacancy emails work?", a: "When you open a new role, you can instantly notify your entire talent pool with one click. Every candidate receives a personalised email with the role title and their name — keeping them engaged and driving more quality applications." },
            { q: "What is the Client interview stage?", a: "This is when the candidate meets the actual hiring company. Mark a candidate at this stage when you've arranged that introduction." },
            { q: "Can I log in with Google?", a: "Yes — the Sign in page has a Continue with Google button. First-time Google users get a candidate account created automatically." },
          ].map(({ q, a }) => (
            <div key={q} className="pt-5 first:pt-0">
              <dt className="font-semibold text-fp-dark">{q}</dt>
              <dd className="mt-1 text-sm text-fp-dark/60 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <div className="rounded-3xl p-8 text-center" style={{ background: "#64bcff" }}>
        <h2 className="font-display text-2xl text-fp-dark">Ready to dive in?</h2>
        <p className="mt-2 text-fp-dark/65">Sign in with one of the demo accounts above and explore.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="rounded-full bg-fp-dark px-6 py-2.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">
            Sign in
          </Link>
          <Link href="/vacancies" className="rounded-full border-2 border-fp-dark/25 bg-white/30 px-6 py-2.5 text-sm font-semibold text-fp-dark transition hover:bg-fp-dark hover:text-fp-blue">
            Browse open roles
          </Link>
        </div>
      </div>

    </div>
  );
}
