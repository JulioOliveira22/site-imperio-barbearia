import Image from "next/image";
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
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
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
      </div>
    </section>
  );
}
