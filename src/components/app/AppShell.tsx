import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logoutAction } from "@/lib/auth-actions";

type ShellUser = {
  id: string; name: string; email: string;
  role: "ADMIN" | "USER";
  avatar: string | null; country: string | null; phone: string | null;
} | null;

// ── Inline icons (no lucide dep needed) ──────────────────────────
function IcoHome() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/></svg>; }
function IcoBriefcase() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>; }
function IcoKanban() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="11" rx="1"/><rect x="17" y="3" width="5" height="14" rx="1"/></svg>; }
function IcoBuilding() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><rect x="4" y="3" width="16" height="18"/><path d="M9 21V9h6v12"/><rect x="9" y="3" width="6" height="4"/></svg>; }
function IcoMail() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>; }
function IcoTarget() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; }
function IcoVacancies() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }

const adminNav = [
  { href: "/admin",           label: "Overview",   Icon: IcoHome },
  { href: "/admin/vacancies", label: "Vacancies",  Icon: IcoVacancies },
  { href: "/admin/pipeline",  label: "Pipeline",   Icon: IcoKanban },
  { href: "/admin/clients",   label: "Clients",    Icon: IcoBuilding },
  { href: "/admin/emails",    label: "Emails",     Icon: IcoMail },
  { href: "/admin/leads",     label: "Leads",      Icon: IcoTarget },
];

export function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-fp-dark">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-fp-dark" />

      {/* Header */}
      <header className="sticky top-0 z-40 shadow-sm bg-fp-blue">
        <Container className="flex h-15 items-center justify-between gap-4">

          {/* Logo + nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-display text-xl font-semibold tracking-tight text-fp-dark">
              FullPond
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {isAdmin ? (
                adminNav.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-fp-dark/75 transition-colors hover:bg-fp-dark/10 hover:text-fp-dark"
                  >
                    <Icon />
                    {label}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/vacancies" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-fp-dark/75 transition-colors hover:bg-fp-dark/10 hover:text-fp-dark">
                    <IcoVacancies />
                    Vacancies
                  </Link>
                  {user && (
                    <Link href="/dashboard" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-fp-dark/75 transition-colors hover:bg-fp-dark/10 hover:text-fp-dark">
                      <IcoHome />
                      My applications
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* How to use button — center of header */}
          <Link
            href="/guide"
            className="hidden items-center gap-1.5 rounded-full border-2 border-fp-dark/20 bg-white/30 px-4 py-1.5 text-xs font-semibold text-fp-dark transition hover:bg-fp-dark hover:text-fp-blue md:inline-flex"
          >
            <span>?</span>
            How to use this app
          </Link>

          {/* Auth controls */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden text-sm font-medium text-fp-dark/70 sm:block">{user.name}</span>
                <form action={logoutAction}>
                  <button type="submit" className="rounded-full border-2 border-fp-dark/25 bg-white/20 px-4 py-1.5 text-sm font-semibold text-fp-dark transition hover:bg-fp-dark hover:text-fp-blue">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-fp-dark/80 transition-colors hover:text-fp-dark">Sign in</Link>
                <Link href="/register" className="inline-flex items-center gap-1.5 rounded-full bg-fp-dark px-5 py-1.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90">Sign up</Link>
              </>
            )}
          </div>
        </Container>
      </header>

      {/* Page content */}
      <main className="flex-1 py-10">
        <Container>{children}</Container>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-fp-dark/10 py-5" style={{ background: "#64bcff" }}>
        <Container className="flex items-center justify-between text-xs font-medium text-fp-dark/70">
          <span className="font-semibold text-fp-dark">FullPond</span>
          <span>Talent platform · demo</span>
        </Container>
      </footer>
    </div>
  );
}
