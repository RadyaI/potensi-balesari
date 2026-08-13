// TODO: isi metadataBase dengan domain asli saat sudah deploy
//       (contoh: new URL("https://potensibalesari.id"))

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Potensi Balesari - UMKM & Hasil Bumi Desa Balesari, Ngajum, Malang",
  description:
    "Profil potensi dan UMKM Dusun Segelan, Desa Balesari, Kecamatan Ngajum, Kabupaten Malang: biting bambu, kopi, dan olahan batok kelapa buatan tangan warga dari lereng Gunung Kawi.",
  keywords: [
    "Desa Balesari",
    "Dusun Segelan",
    "Ngajum",
    "Kabupaten Malang",
    "UMKM desa",
    "biting bambu",
    "kopi Balesari",
    "batok kelapa",
    "KKN UMM",
  ],
  openGraph: {
    siteName: "Potensi Balesari",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2E4230",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F3EDE0] text-[#3A2E22]">
        {children}
      </body>
    </html>
  );
}