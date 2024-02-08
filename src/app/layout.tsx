import type { Metadata } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";

import "./globals.css";
import ConvexProviderWithKinde from "@/components/providers/convex-with-auth";
import Kinde from "@/components/providers/kinde";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/siteConfig";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mont = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Nana A. Gaisie",
      url: "https://nana.enpeer.tech",
    },
  ],
  creator: "Nana A. Gaisie",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
      "en-GH": "/en-GB",
      "en-GB": "/en-GB",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage[0],
        width: 500,
        height: 500,
        alt: siteConfig.name,
      },
      {
        url: siteConfig.ogImage[1],
        width: 500,
        height: 500,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage[0], siteConfig.ogImage[1]],
    creator: "@nana.gaisie",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: siteConfig.image.lightsvg,
        href: siteConfig.image.lightsvg,
      },
      {
        media: "(prefers-color-scheme: light)",
        url: siteConfig.image.lightpng,
        href: siteConfig.image.lightpng,
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: siteConfig.image.darksvg,
        href: siteConfig.image.darksvg,
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: siteConfig.image.darkpng,
        href: siteConfig.image.darkpng,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mont.variable} ${nunito.variable}`}>
      <body className={cn("min-h-screen  font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="smartnote-1"
        >
          <EdgeStoreProvider>
            <Kinde>
              <ConvexProviderWithKinde>
                <Toaster />
                {children}
              </ConvexProviderWithKinde>
            </Kinde>
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
