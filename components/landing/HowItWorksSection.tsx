export function HowItWorksSection() {
  const steps = [
    {
      title: "Escolha o barbeiro",
      description: "Selecione o profissional que vai te atender.",
    },
    {
      title: "Escolha o serviço",
      description: "Selecione o corte, barba ou combo que deseja fazer.",
    },
    {
      title: "Escolha o horário",
      description: "Veja a agenda em tempo real e confirme o atendimento pelo site.",
    },
  ];

  return (
    <section
      className="mx-auto w-full max-w-6xl snap-start px-5 py-10"
      aria-labelledby="como-funciona-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
        Como funciona
      </p>
      <h2
        id="como-funciona-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Agendamento em 3 passos
      </h2>

      <div className="relative mt-6">
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1 min-[780px]:grid min-[780px]:grid-cols-3 min-[780px]:overflow-visible">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="w-[85%] min-w-[260px] shrink-0 rounded-3xl border border-white/10 bg-base-charcoal/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/45 min-[780px]:w-auto min-[780px]:min-w-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold/90">
                Passo {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{step.description}</p>
            </article>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-base-black to-transparent min-[780px]:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-base-black to-transparent min-[780px]:hidden" />
      </div>
      <div className="mt-3 min-[780px]:hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Arraste para o lado
        </p>
        <div className="mx-auto mt-2 h-1.5 w-36 rounded-full bg-white/10">
          <div className="h-full w-14 rounded-full bg-brand-gold/85" />
        </div>
      </div>
    </section>
  );
}
