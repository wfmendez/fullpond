import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";
import { IconArrowUpRight } from "./icons";
import { site } from "@/lib/site";

export function ApplyCta() {
  return (
    <section
      id="apply"
      className="relative isolate overflow-hidden bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-spotlight" />
      <div className="absolute inset-0 -z-10 bg-caustic opacity-60" />
      <Ripples
        variant="emanate"
        count={5}
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 text-brand-300/20"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-[0.06] mix-blend-overlay" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-300/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              Find a job
            </span>
            <span className="h-px w-8 bg-brand-300/50" />
          </div>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-white text-balance md:text-6xl">
            Let’s work <span className="italic">together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-stone-300 text-pretty">
            Skilled, motivated, and fluent in English? Dive into the pond and
            get matched with U.S. companies that value your work.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.applicantFormUrl}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/30 ring-1 ring-inset ring-white/20 transition-all hover:shadow-brand-400/50 hover:brightness-110 sm:w-auto"
            >
              See open roles
              <IconArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/hire"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/35 hover:bg-white/10 sm:w-auto"
            >
              Hire talent instead
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
