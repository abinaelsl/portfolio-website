import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abinael Sarungallo Lumempouw",
  description:
    "Student at Kyushu University. Startup founder at StatusMaxx. Researching net zero buildings.",
  openGraph: {
    title: "Abinael Sarungallo Lumempouw",
    description:
      "Student at Kyushu University. Startup founder at StatusMaxx. Researching net zero buildings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
