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
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
      className="relative isolate overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36"
      style={{ background: "#64bcff" }}
    >
      {/* Concentric ripple brand motif */}
      <Ripples
        variant="emanate"
        count={5}
        className="absolute left-1/2 top-[18%] -z-10 aspect-square w-[150%] max-w-[1100px] -translate-x-1/2 text-fp-dark/10 sm:top-[12%]"
      />
      <Ripples
        count={7}
        className="absolute left-1/2 top-[20%] -z-10 aspect-square w-[120%] max-w-[900px] -translate-x-1/2 text-fp-dark/[0.05]"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-[0.04] mix-blend-multiply" />

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border-2 border-fp-dark/20 bg-white/30 px-4 py-1.5 text-xs font-semibold tracking-wide text-fp-dark backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-fp-dark" />
            Top-tier talent · Latin America &amp; the Philippines
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-7 font-display text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-fp-dark text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Cut Costs,{" "}
            <span className="relative whitespace-nowrap italic">
              <span className="text-white drop-shadow-sm">
                Not Quality
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fp-dark/75 text-pretty md:text-xl"
          >
            Tap into a "Full Pond" of global top-tier talent — at a fraction of
            the cost of local hires.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="/login"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-fp-dark px-7 py-3.5 text-base font-semibold text-fp-blue shadow-xl transition-all hover:opacity-90 sm:w-auto"
            >
              Start today
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-fp-dark/25 bg-white/20 px-7 py-3.5 text-base font-semibold text-fp-dark backdrop-blur transition-colors hover:bg-fp-dark hover:text-fp-blue hover:border-transparent sm:w-auto"
            >
              See how it works
            </a>
          </motion.div>

          {/* Trust chips */}
          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-fp-dark/70"
          >
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-fp-dark/50" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
