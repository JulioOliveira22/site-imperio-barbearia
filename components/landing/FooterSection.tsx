import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative border-t border-brand-gold/25 bg-base-charcoal/70">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-gold/10 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-9">
        <div className="rounded-[1.8rem] border border-brand-gold/25 bg-black/40 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-brand-gold/40 shadow-glow">
              <Image
                src="/imperio-logo.png"
                alt="Logo da Império Barbearia"
                width={600}
                height={600}
                className="h-full w-full scale-[1.2] object-cover object-center"
              />
            </div>
            <div>
              <p className="font-brand text-xl font-semibold uppercase tracking-[0.12em] text-brand-gold">
                Império Barbearia
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Endereço
              </p>
              <p className="mt-1 text-sm text-zinc-100">
                Rua das Lâminas, 247 - Centro, São Paulo - SP
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Horário
              </p>
              <p className="mt-1 text-sm text-zinc-100">Segunda a Sábado, 08:00 às 18:00</p>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white">
          <a
            href="https://instagram.com"
            className="rounded-full border border-white/20 px-4 py-2 transition-colors duration-200 hover:border-brand-gold/60 hover:bg-brand-gold/10"
          >
            Instagram
          </a>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col gap-2 text-xs text-zinc-500 min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between">
            <p className="tracking-[0.08em]">
              © {new Date().getFullYear()} <span className="text-zinc-300">Império Barbearia</span> -
              Todos os direitos reservados.
            </p>
            <p className="tracking-[0.12em] uppercase text-zinc-400">
              Desenvolvido por <span className="font-semibold text-brand-gold">JulioOliveira</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
