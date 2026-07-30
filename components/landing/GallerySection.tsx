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
          <div>
            <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
              Comodidades
            </p>
            <h3 className="mt-2 text-xl font-black uppercase tracking-[0.08em] text-white md:text-2xl">
              Mais do que um corte
            </h3>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
            {amenities.map((amenity) => (
              <li key={amenity.id}>
                <article className="flex h-full flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 transition-colors duration-200 hover:border-brand-gold/35 md:gap-3 md:rounded-2xl md:p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10 md:h-10 md:w-10">
                    <AmenityIcon id={amenity.id} className="h-4 w-4 text-brand-gold md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0 w-full">
                    <h4 className="text-[11px] font-bold uppercase leading-snug tracking-[0.04em] text-white md:text-sm md:tracking-[0.08em]">
                      {amenity.label}
                    </h4>
                    <p className="mt-0.5 hidden text-xs leading-relaxed text-zinc-400 md:mt-1.5 md:line-clamp-2 md:block">
                      {amenity.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
