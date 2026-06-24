import { SerwistProvider } from "@serwist/next/react";
import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SceneBackground } from "@/components/layout/SceneBackground";
import { XRStatusStrip } from "@/components/layout/XRStatusStrip";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { UpdatePrompt } from "@/components/pwa/UpdatePrompt";
import { profile } from "@/content/profile";
import { PWA_THEME_COLOR, swScope, swUrl } from "@/lib/pwa";
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
  applicationName: profile.brand,
  title: {
    default: `${profile.brand} | Portfolio`,
    template: `%s | ${profile.brand}`,
  },
  description: profile.tagline,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: profile.brand,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: PWA_THEME_COLOR,
  colorScheme: "dark",
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
        <SerwistProvider
          swUrl={swUrl}
          disable={process.env.NODE_ENV === "development"}
          options={{ scope: swScope }}
          reloadOnOnline
        >
          <SceneBackground />
          <PageTransitionProvider>
            <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
              <Nav />
              <XRStatusStrip />
              {children}
              <Footer />
            </div>
          </PageTransitionProvider>
          <OfflineBanner />
          <UpdatePrompt />
        </SerwistProvider>
      </body>
    </html>
  );
}
