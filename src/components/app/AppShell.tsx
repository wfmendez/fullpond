import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logoutAction } from "@/lib/auth-actions";

type ShellUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  avatar: string | null;
  country: string | null;
  phone: string | null;
} | null;

export function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-fp-dark">

      {/* ── App header — FullPond sky blue ── */}
      <header className="sticky top-0 z-40 shadow-sm">
        {/* Thin dark accent bar on top */}
        <div className="h-1 w-full bg-fp-dark" />
        <div className="bg-fp-blue">
          <Container className="flex h-15 items-center justify-between gap-4">

            {/* Logo / wordmark */}
            <div className="flex items-center gap-7">
              <Link
                href="/"
                className="font-display text-xl font-semibold tracking-tight text-fp-dark"
              >
                FullPond
              </Link>

              {/* Nav links */}
              <nav className="hidden items-center gap-6 text-sm font-medium md:flex text-fp-dark/80">
                {isAdmin ? (
                  <>
                    <Link href="/admin" className="transition-colors hover:text-fp-dark">Overview</Link>
                    <Link href="/admin/vacancies" className="transition-colors hover:text-fp-dark">Vacancies</Link>
                    <Link href="/admin/pipeline" className="transition-colors hover:text-fp-dark">Pipeline</Link>
                    <Link href="/admin/clients" className="transition-colors hover:text-fp-dark">Clients</Link>
                    <Link href="/admin/emails" className="transition-colors hover:text-fp-dark">Emails</Link>
                    <Link href="/admin/leads" className="transition-colors hover:text-fp-dark">Leads</Link>
                  </>
                ) : (
                  <>
                    <Link href="/vacancies" className="transition-colors hover:text-fp-dark">Vacancies</Link>
                    {user && (
                      <Link href="/dashboard" className="transition-colors hover:text-fp-dark">
                        My applications
                      </Link>
                    )}
                  </>
                )}
              </nav>
            </div>

            {/* Auth controls */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="hidden text-sm font-medium text-fp-dark/70 sm:block">{user.name}</span>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="rounded-full border-2 border-fp-dark/30 bg-white/20 px-4 py-1.5 text-sm font-semibold text-fp-dark transition hover:bg-fp-dark hover:text-fp-blue"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-fp-dark/80 transition-colors hover:text-fp-dark"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 rounded-full bg-fp-dark px-5 py-1.5 text-sm font-semibold text-fp-blue shadow transition hover:opacity-90"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

          </Container>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 py-10">
        <Container>{children}</Container>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-fp-blue border-t-2 border-fp-dark/10 py-5">
        <Container className="flex items-center justify-between text-xs font-medium text-fp-dark/70">
          <span className="font-semibold text-fp-dark">FullPond</span>
          <span>Talent platform · demo</span>
        </Container>
      </footer>

    </div>
  );
}
