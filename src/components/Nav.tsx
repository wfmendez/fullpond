"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "./ui/Container";
import { IconMenu, IconX, IconArrowRight } from "./icons";
import { navLinks } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-stone-200/70 bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between md:h-18">
          <a
            href="#top"
            className={`font-display text-2xl font-semibold tracking-tight transition-colors ${
              scrolled ? "text-fp-dark" : "text-white"
            }`}
          >
            FullPond
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[var(--ease-out-soft)] hover:after:scale-x-100 ${
                  scrolled
                    ? "text-stone-600 hover:text-ink-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className="group inline-flex items-center gap-1.5 rounded-full rounded-full bg-fp-dark px-5 py-2.5 text-sm font-semibold text-fp-blue shadow-md transition-all hover:opacity-90"
            >
              Start today
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden ${scrolled ? "text-fp-dark" : "text-white"}`}
          >
            {open ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </button>
        </Container>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <Container className="space-y-1 border-b border-stone-200 bg-paper/95 py-4 backdrop-blur-xl">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-fp-dark px-5 py-3 text-sm font-semibold text-fp-blue"
              >
                Start today
                <IconArrowRight className="h-4 w-4" />
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
