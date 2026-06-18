import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { NeuralNetworkBackground } from "@/components/layout/NeuralNetworkBackground";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.brand} | Portfolio`,
    template: `%s | ${profile.brand}`,
  },
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="relative min-h-full flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary">
        <NeuralNetworkBackground />
        <PageTransitionProvider>
          <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
            <Nav />
            {children}
            <Footer />
          </div>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
