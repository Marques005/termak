import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:4173";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "Workspace comercial para mapear operações, equipas, sistemas e prioridades de implementação.";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Termak · Diagnóstico operacional",
      template: "%s · Termak",
    },
    description,
    openGraph: {
      title: "Termak · Diagnóstico operacional",
      description,
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1792,
          height: 910,
          alt: "Termak — Diagnóstico operacional, sem zonas cegas.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Termak · Diagnóstico operacional",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-scroll-behavior="smooth">
      <body className={geistSans.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
