import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
