import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Özge Bilici | Yazılım Mühendisi",
  description:
    "Yazılım geliştirme, makine öğrenmesi ve görüntü işleme alanlarında çalışan Yazılım Mühendisi. TÜBİTAK 2209-A Hibrit AI Erken Uyarı Sistemi projesi.",
  keywords: [
    "Özge Bilici",
    "Yazılım Mühendisi",
    "Software Engineer",
    "TÜBİTAK",
    "ASP.NET Core",
    "Python",
    "Machine Learning",
    "Aksaray Üniversitesi",
  ],
  authors: [{ name: "Özge Bilici" }],
  openGraph: {
    title: "Özge Bilici | Yazılım Mühendisi",
    description: "Analitik, üretken, çok yönlü mühendis.",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
