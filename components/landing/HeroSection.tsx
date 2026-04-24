import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative snap-start overflow-hidden border-b border-brand-gold/20 bg-black"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(212,175,55,0.22),transparent_45%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-md flex-col px-5 pb-10 pt-10 text-center">
        <div className="mx-auto h-44 w-44 overflow-hidden rounded-full border border-brand-gold/45 shadow-glow">
          <Image
            src="/imperio-logo.png"
            alt="Logo da Império Barbearia"
            width={600}
            height={600}
            className="h-full w-full scale-[1.2] object-cover object-center"
            priority
          />
        </div>

        <h1 id="hero-title" className="mt-6">
          <span className="block font-brand text-[2.7rem] font-bold uppercase leading-none tracking-[0.14em] text-brand-gold">
            Império
          </span>
          <span className="mt-1 block text-lg font-semibold uppercase tracking-[0.34em] text-white/95">
            Barbearia
          </span>
        </h1>

        <div className="mx-auto mt-4 h-px w-28 bg-brand-gold/45" aria-hidden />

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          Escolha seu serviço e reserve seu horário.
        </p>

        <a
          href="#servicos"
          className="mt-6 inline-flex min-h-16 w-full items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-glow transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.99] animate-pulse"
        >
          AGENDAR HORÁRIO
        </a>

      </div>
    </section>
  );
}
