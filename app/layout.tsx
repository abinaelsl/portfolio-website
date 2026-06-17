import type { Metadata } from "next";
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const display = Archivo({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Space_Grotesk({
  variable: "--ff-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_DESCRIPTION =
  "Student at Kyushu University. Startup founder at StatusMaxx. Researching net-zero buildings.";

export const metadata: Metadata = {
  metadataBase: new URL("https://abinael.xyz"),
  title: {
    default: "Abinael Sarungallo Lumempouw",
    template: "%s · Abinael S.L.",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Abinael Sarungallo Lumempouw",
    "Kyushu University",
    "StatusMaxx",
    "net zero buildings",
    "building energy research",
    "founder",
  ],
  authors: [{ name: "Abinael Sarungallo Lumempouw" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abinael Sarungallo Lumempouw",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Abinael S.L.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abinael Sarungallo Lumempouw",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
