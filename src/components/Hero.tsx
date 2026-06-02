"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "./ui/Container";
import { Ripples } from "./ui/Ripples";
import { IconArrowRight } from "./icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const trust = [
  "25% of local cost",
  "3-step interview",
  "Screened from 50–100 applicants",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink-900 pt-36 pb-28 md:pt-44 md:pb-36"
    >
      {/* Deep-water atmosphere */}
      <div className="absolute inset-0 -z-10 bg-spotlight" />
      <div className="absolute inset-0 -z-10 bg-caustic opacity-70" />
      {/* Droplet ripples emanating behind the headline */}
      <Ripples
        variant="emanate"
        count={5}
        className="absolute left-1/2 top-[18%] -z-10 aspect-square w-[150%] max-w-[1100px] -translate-x-1/2 text-brand-300/25 sm:top-[12%]"
      />
      <Ripples
        count={7}
        className="absolute left-1/2 top-[20%] -z-10 aspect-square w-[120%] max-w-[900px] -translate-x-1/2 text-brand-200/[0.08]"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-[0.06] mix-blend-overlay" />

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-brand-100 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-400 shadow-[0_0_8px_var(--color-aqua-400)]" />
            Top-tier talent · Latin America &amp; the Philippines
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Cut Costs,{" "}
            <span className="relative whitespace-nowrap italic">
              <span className="bg-gradient-to-r from-aqua-300 via-brand-300 to-brand-500 bg-clip-text text-transparent">
                Not Quality
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-300 text-pretty md:text-xl"
          >
            Tap into a “Full Pond” of global top-tier talent — at a fraction of
            the cost of local hires.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="/login"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-500/30 ring-1 ring-inset ring-white/20 transition-all hover:shadow-brand-400/50 hover:brightness-110 sm:w-auto"
            >
              Start today
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/35 hover:bg-white/10 sm:w-auto"
            >
              See how it works
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-stone-400"
          >
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-aqua-400/60" />
                  <span className="h-3 w-3 rounded-full ring-1 ring-aqua-400/30" />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
