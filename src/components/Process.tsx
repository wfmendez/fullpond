import { Container } from "./ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

const steps = [
  {
    n: "01",
    title: "We get to know you and your business",
    body: "We work closely with you to understand your unique needs and make a perfect match.",
  },
  {
    n: "02",
    title: "We find the best talent in our “Pond”",
    body: "Our team rigorously screens 50–100 applicants, narrowing down to the very best.",
  },
  {
    n: "03",
    title: "Interview your top 2–3 candidates",
    body: "You'll interview and choose from the top 2–3 candidates, ensuring a perfect match.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#64bcff" }}
    >
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-fp-dark/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fp-dark/70">
              How it works · 03
            </span>
            <span className="h-px w-8 bg-fp-dark/30" />
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fp-dark text-balance md:text-5xl">
            We source. <span className="italic">You onboard.</span>
          </h2>
          <p className="mt-4 text-lg text-fp-dark/70 text-pretty">
            A simple, three-step path from &ldquo;we need help&rdquo; to &ldquo;welcome aboard.&rdquo;
          </p>
        </Reveal>

        <RevealGroup className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute inset-x-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-fp-dark/20 to-transparent md:block" />

          {steps.map((step) => (
            <RevealItem key={step.n} className="relative">
              <div className="group relative h-full overflow-hidden rounded-4xl bg-white p-8 shadow-lg shadow-fp-dark/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-fp-dark/15">
                {/* Number with violet accent */}
                <span
                  className="relative block font-display text-6xl font-semibold italic leading-none md:text-7xl"
                  style={{ color: "#5231ff", opacity: 0.25 }}
                >
                  {step.n}
                </span>
                <h3 className="relative mt-5 font-display text-xl font-semibold leading-snug text-fp-dark">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-fp-dark/60">{step.body}</p>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-4xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: "#5231ff" }}
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
