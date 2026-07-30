import Image from "next/image";
import { AmenityIcon } from "@/components/icons/AmenityIcon";
import { amenities } from "@/data/amenities";
import { galleryItems } from "@/data/gallery";

export function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative snap-start overflow-hidden border-y border-brand-gold/15 bg-black"
      aria-labelledby="galeria-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
          Studio
        </p>
        <h2
          id="galeria-title"
          className="mt-2 max-w-xl text-3xl font-black uppercase tracking-[0.08em] text-white md:text-4xl"
        >
          O espaço da Império
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-300 md:text-base">
          Ambiente pensado para o atendimento — em breve com fotos reais do studio.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryItems.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <figure
                key={item.id}
                className={`relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-black/50 ${
                  isFeatured
                    ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[420px]"
                    : "aspect-[4/5] md:aspect-square"
                }`}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes={
                      isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,rgba(212,175,55,0.1),rgba(0,0,0,0.9))] px-4 text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold/80">
                      Foto {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-zinc-400 ${isFeatured ? "text-sm" : "text-xs"}`}>
                      {item.alt}
                    </span>
                  </div>
                )}
              </figure>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
                Comodidades
              </p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-[0.08em] text-white md:text-2xl">
                Mais do que um corte
              </h3>
            </div>
          </div>

          <div className="relative mt-5">
            <ul className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
              {amenities.map((amenity) => (
                <li
                  key={amenity.id}
                  className="w-[148px] shrink-0 md:w-auto"
                >
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/40 hover:bg-brand-gold/[0.06]">
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-gold/10 blur-2xl transition-opacity duration-200 group-hover:bg-brand-gold/20"
                      aria-hidden
                    />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
                      <AmenityIcon id={amenity.id} />
                    </div>
                    <h4 className="relative mt-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                      {amenity.label}
                    </h4>
                    <p className="relative mt-1.5 text-xs leading-relaxed text-zinc-400">
                      {amenity.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black to-transparent md:hidden" />
          </div>

          <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 md:hidden">
            Arraste para o lado
          </p>
        </div>
      </div>
    </section>
  );
}
