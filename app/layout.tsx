import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Império Barbearia | Agende seu Horário",
  description:
    "Império Barbearia: corte, barba e combo com agendamento online das 09h às 19h.",
  keywords: [
    "barbearia em Itapecerica da Serra",
    "corte masculino em Itapecerica da Serra",
    "agendamento barbearia em Itapecerica da Serra",
    "barba terapia em Itapecerica da Serra",
  ],
  openGraph: {
    title: "Império Barbearia em Itapecerica da Serra",
    description: "Agende corte e barba com horário marcado em Itapecerica da Serra.",
    locale: "pt_BR",
    type: "website",
    siteName: "Império Barbearia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${cinzel.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cal.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cal.com" />
      </head>
      <body className="min-h-full scroll-smooth bg-base-black text-white">{children}</body>
    </html>
  );
}
