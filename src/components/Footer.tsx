import { Container } from "./ui/Container";
import { Ripples } from "./ui/Ripples";
import { IconMail, IconPhone } from "./icons";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-fp-dark/80" style={{ background: "#64bcff" }}>
      <Ripples
        count={6}
        className="pointer-events-none absolute -bottom-40 -right-24 aspect-square w-[32rem] text-fp-dark/10"
      />

      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + description */}
          <div className="md:col-span-6">
            <span className="font-display text-2xl font-semibold tracking-tight text-fp-dark">
              {site.legalName}
            </span>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-fp-dark/65 text-pretty">
              {site.description}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-fp-dark">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fp-dark/65 transition-colors hover:text-fp-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-fp-dark">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2.5 text-fp-dark/65 transition-colors hover:text-fp-dark"
                >
                  <IconMail className="h-4 w-4 text-fp-dark/40 group-hover:text-fp-dark" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-2.5 text-fp-dark/65 transition-colors hover:text-fp-dark"
                >
                  <IconPhone className="h-4 w-4 text-fp-dark/40 group-hover:text-fp-dark" />
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-fp-dark/15 pt-8 text-sm text-fp-dark/50 sm:flex-row">
          <p>© {year} {site.legalName} All rights reserved.</p>
          <p>U.S. businesses · Latin America &amp; the Philippines</p>
        </div>
      </Container>
    </footer>
  );
}
