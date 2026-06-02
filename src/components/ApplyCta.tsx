import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";
import { IconArrowUpRight } from "./icons";
import { site } from "@/lib/site";

export function ApplyCta() {
  return (
    <section
      id="apply"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#64bcff" }}
    >
      <div className="absolute inset-0 -z-10 bg-spotlight" />
      <div className="absolute inset-0 -z-10 bg-caustic opacity-60" />
      <Ripples
        variant="emanate"
        count={5}
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 text-fp-dark/10"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-[0.06] mix-blend-overlay" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-fp-dark/25" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fp-dark/70">
              Find a job
            </span>
            <span className="h-px w-8 bg-fp-dark/25" />
          </div>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-fp-dark text-balance md:text-6xl">
            Let’s work <span className="italic">together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-fp-dark/70 text-pretty">
            Skilled, motivated, and fluent in English? Dive into the pond and
            get matched with U.S. companies that value your work.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.applicantFormUrl}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-fp-dark px-8 py-4 text-base font-semibold text-fp-blue shadow-xl transition-all hover:opacity-90 sm:w-auto"
            >
              See open roles
              <IconArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/hire"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-fp-dark/25 bg-white/25 px-8 py-4 text-base font-semibold text-fp-dark backdrop-blur transition-colors hover:bg-fp-dark hover:text-fp-blue hover:border-transparent sm:w-auto"
            >
              Hire talent instead
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
