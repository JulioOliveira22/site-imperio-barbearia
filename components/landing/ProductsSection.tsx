import { products } from "@/data/products";

export function ProductsSection() {
  return (
    <section
      id="produtos"
      className="mx-auto w-full max-w-6xl snap-start px-5 py-8"
      aria-labelledby="produtos-title"
    >
      <p className="text-xs font-semibold uppercase tracking-premium text-brand-gold/90">
        Produtos
      </p>
      <h2
        id="produtos-title"
        className="mt-2 text-2xl font-black uppercase tracking-[0.08em] text-white"
      >
        Leve o cuidado para casa
      </h2>
      <p className="mt-2 text-sm text-zinc-300">
        Disponíveis na barbearia — pergunte ao seu barbeiro no atendimento.
      </p>

      <ul className="mt-5 grid gap-3 min-[640px]:grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 transition-colors duration-200 hover:border-brand-gold/35"
          >
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.04em] text-white">
                {product.name}
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
                {product.brand}
              </p>
            </div>
            <p className="shrink-0 text-base font-extrabold text-brand-gold">
              {product.price}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
