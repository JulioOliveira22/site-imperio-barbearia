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
  title: "Império Barbearia no Centro de São Paulo | Agende seu Horário",
  description:
    "Império Barbearia no Centro de São Paulo: corte, barba e combo com agendamento online das 08h às 18h.",
  keywords: [
    "barbearia em são paulo",
    "barbearia centro sp",
    "corte masculino são paulo",
    "agendamento barbearia",
    "barba terapia",
  ],
  openGraph: {
    title: "Império Barbearia no Centro de São Paulo",
    description: "Agende corte e barba com horário marcado no Centro de São Paulo.",
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
