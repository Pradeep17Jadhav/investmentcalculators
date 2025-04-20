import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Script from "next/script";
import AppBar from "@/components/AppBar/AppBar";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { CurrencyProvider } from "@/contexts/currency";
import CanonicalTag from "@/components/System/CanonicalTag/CanonicalTag";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "MoneyReload - SIP, EMI, FD, RD, Loan, and Income Tax",
  description:
    "Free investment calculators like SIP calculator, EMI calculator, FD calculator, RD calculator, and income tax calculator to plan your investments effectively.",
  keywords:
    "MoneyReload, Money Reload, Investment Calculator, SIP Calculator, EMI Calculator, FD Calculator, RD Calculator, Income Tax Calculator, Fixed Deposit, Mutual Fund, Financial Calculators, Finance Tools",
  authors: [{ name: "Pradeep Jadhav" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "MoneyReload",
    siteName: "MoneyReload",
    url: process.env.PROD_URL,
    images: [`${process.env.PROD_URL}/thumbnail.webp`],
    description:
      "SIP calculator, EMI calculator, FD calculator, RD calculator, income tax calculator and more Investment Calculators by MoneyReload.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyReload - FD, RD, SIP, Loans, Income Tax",
    images: [`${process.env.PROD_URL}/thumbnail.webp`],
    description:
      "Plan your investments with free SIP, EMI, FD, RD, and Income Tax calculators by MoneyReload.",
  },
  other: {
    "google-adsense-account": "ca-pub-8297185763828699",
  },
  alternates: {
    canonical: process.env.PROD_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
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
        <CanonicalTag />

        {/* Web Manifest */}
        <link rel="manifest" href="/manifest.json" />

        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD Schema */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MoneyReload",
              url: process.env.PROD_URL,
              alternateName: ["Money Reload"],
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
              name: "MoneyReload",
              alternateName: ["Money Reload"],
              description:
                "Free online financial calculators by MoneyReload for SIP, EMI, FD, RD, and income tax to help users plan your investments effectively.",
              url: process.env.PROD_URL,
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.PROD_URL}/thumbnail.webp`,
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CurrencyProvider>
            <AppBar />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            <Footer />
            <ScrollToTop />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
