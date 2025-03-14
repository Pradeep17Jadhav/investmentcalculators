import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Script from "next/script";
import AppBar from "@/components/AppBar/AppBar";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import Footer from "@/components/Footer/Footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400"] });

export const viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Investment Calculators - SIP, EMI, FD, RD, and Income Tax",
  description:
    "Free Investment Calculators like SIP calculator, EMI calculator, FD calculator, RD calculator, and income tax calculator to plan your investments effectively.",
  keywords:
    "Investment Calculator, SIP Calculator, EMI Calculator, FD Calculator, RD Calculator, Income Tax Calculator, Fixed Deposit, Mutual Fund, Financial Calculators, Finance Tools",
  authors: [{ name: "Pradeep Jadhav" }],
  openGraph: {
    type: "website",
    title: "Investment Calculators",
    siteName: "Investment Calculators",
    url: "https://investmentcalculators.in/",
    images: ["https://investmentcalculators.in/thumbnail.jpg"],
    description:
      "SIP calculator, EMI calculator, FD calculator, RD calculator, income tax calculator and more Investment Calculators.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Calculators - FD, RD, SIP, Income Tax",
    images: ["https://investmentcalculators.in/thumbnail.jpg"],
    description:
      "Plan your investments with free SIP, EMI, FD, RD, and Income Tax calculators.",
  },
  other: {
    "google-adsense-account": "ca-pub-8297185763828699",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${merriweather.className}`}>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GWRNM1EMVX"
        ></Script>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-GWRNM1EMVX');
            `,
          }}
        />

        {/* Google Adsense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297185763828699"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://investmentcalculators.in/" />

        {/* Web Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Schema */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Investment Calculators - SIP, EMI, FD, RD, and Income Tax",
              url: "https://investmentcalculators.in",
            }),
          }}
        />

        <Script
          id="json-ld-webpage"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Investment Calculators - SIP, EMI, FD, RD, and Income Tax",
              description:
                "Free online financial calculators for SIP, EMI, FD, RD, and income tax to help users plan their investments effectively.",
              url: "https://investmentcalculators.in",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://investmentcalculators.in/thumbnail.jpg",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AppBar />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
