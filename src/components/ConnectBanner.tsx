import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Ripples } from "./ui/Ripples";

export function ConnectBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#64bcff" }}>
      {/* Brand ripple motif */}
      <Ripples
        variant="emanate"
        count={4}
        className="absolute left-[12%] top-1/2 aspect-square w-[40rem] -translate-y-1/2 text-fp-dark/10"
      />
      <Ripples
        count={6}
        className="absolute -right-24 top-1/2 aspect-square w-[34rem] -translate-y-1/2 text-fp-dark/[0.07]"
      />
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply" />

      <Container className="relative py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug text-fp-dark text-balance md:text-[2rem]">
            We can connect you with top talent for{" "}
            <span className="italic underline decoration-fp-dark/40 decoration-2 underline-offset-[6px]">
              anything
            </span>{" "}
            that can be done remotely.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
