// src/app/galeri/page.tsx
// Halaman pusat dokumentasi visual — "Cerita Balesari dalam Bingkai".
//
// Server component (supaya bisa export metadata untuk SEO). Bagian yang
// butuh state/hook (filter kategori, useSearchParams, flip card) ada di
// GaleriClient.tsx, dibungkus <Suspense> di sini karena useSearchParams
// mewajibkannya di App Router.
//
// Identitas visual sengaja NETRAL — memakai warna global situs (forest
// green, cream, warm beige, coklat) seperti homepage, BUKAN warna
// eksklusif Biting/Kopi/Kerajinan. Warna tiap potensi hanya muncul kecil
// di badge/border kartu (lihat GaleriClient.tsx & GalleryFlipCard.tsx).
//
// Navbar, footer, dan pola dekorasi (pattern-titik, siluet gunung, logo
// bambu) mengikuti konvensi yang sudah ada di src/app/page.tsx, supaya
// halaman ini tetap terasa satu keluarga dengan Potensi Balesari.

import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import BotChat from "@/components/BotChat";
import AnimasiGaleriHero from "@/components/animation/galeriHero";
import GaleriClient from "./GaleriClient";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
});

/* ============================================================
   SEO METADATA
   ============================================================ */
export const metadata: Metadata = {
  title: "Galeri & Dokumentasi - Potensi Balesari | Desa Balesari, Ngajum, Malang",
  description:
    "Dokumentasi visual Potensi Balesari: proses biting bambu, kopi, kerajinan tangan, kegiatan warga, dan lingkungan Dusun Segelan, Desa Balesari, Ngajum, Kabupaten Malang.",
  keywords: [
    "galeri Desa Balesari",
    "dokumentasi Dusun Segelan",
    "foto biting bambu",
    "foto kopi Balesari",
    "foto kerajinan tangan",
    "Ngajum Malang",
  ],
  openGraph: {
    title: "Cerita Balesari, dalam Setiap Bingkai",
    description: "Dokumentasi visual potensi, produksi, dan kegiatan warga Dusun Segelan, Desa Balesari.",
    locale: "id_ID",
    type: "website",
  },
};

const IMG = "/images/desa-balesari.jpeg";

const content = {
  nav: {
    brand: "Potensi Balesari",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Potensi", href: "/#potensi" },
      { label: "Galeri", href: "/galeri" },
      { label: "Lokasi", href: "/#lokasi" },
    ],
    cta: "Hubungi Kami",
  },
  hero: {
    badge: "Gallery · Desa Balesari",
    titleAtas: "Cerita Balesari,",
    titleBawah: "dalam Setiap Bingkai.",
    subtitle:
      "Kumpulan dokumentasi potensi desa, proses produksi, warga, kegiatan, hasil karya, dan lingkungan Dusun Segelan — dirawat dalam satu galeri.",
    img: IMG,
    imgAlt: "Dokumentasi kegiatan dan lingkungan Dusun Segelan, Desa Balesari",
  },
  marquee: [
   "Dusun Segelan",
   "Desa Balesari",
   "Kecamatan Ngajum",
   "Kabupaten Malang",
  ],
  footer: {
    brand: "Potensi Balesari",
    tagline: "Profil potensi dan UMKM Dusun Segelan, Desa Balesari, dari lereng Gunung Kawi untuk lebih banyak orang.",
    alamat: "Dusun Segelan, Desa Balesari, Kec. Ngajum, Kab. Malang, Jawa Timur",
    kredit: `© ${new Date().getFullYear()} KKN 165 UMM × Warga Desa Balesari`,
    kolomProduk: [
      { label: "Biting Bambu", href: "/biting" },
      { label: "Kopi Balesari", href: "/kopi" },
      { label: "Kerajinan Tangan", href: "/kerajinan-tangan" },
    ],
    kolomHalaman: [
      { label: "Tentang Desa", href: "/#sekilas-desa" },
      { label: "Galeri", href: "/galeri" },
      { label: "Lokasi", href: "/#lokasi" },
    ],
  },
};

/* Logo mini: ruas bambu — identitas situs, sama di semua halaman */
function LogoBambu({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true" className={className}>
      <rect x="7" y="1" width="10" height="30" rx="5" fill="#4E7248" />
      <rect x="5" y="9" width="14" height="3" rx="1.5" fill="#2E4230" />
      <rect x="5" y="20" width="14" height="3" rx="1.5" fill="#2E4230" />
      <rect x="10" y="2" width="2" height="28" rx="1" fill="#9DBE85" opacity="0.7" />
    </svg>
  );
}

/* Sudut bingkai — motif "museum kecil": empat siku di sudut foto,
   dipilih khusus supaya cocok dengan tema "dalam Setiap Bingkai",
   tanpa meminjam motif bambu/kopi/terracotta dari halaman potensi lain. */
function SudutBingkai({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 12 V4 H10" />
      <path d="M18 4 H26 V12" />
      <path d="M26 16 V24 H18" />
      <path d="M10 24 H2 V16" />
    </svg>
  );
}

export default function GaleriPage() {
  const c = content;
  const waHref = "https://wa.me/6281234567890"; // TODO: ganti dengan nomor WhatsApp asli
  const marqueeItems = [...c.marquee, ...c.marquee];

  return (
    <>
      <BotChat
        judul="Tanya Galeri"
        systemPrompt="Kamu asisten website Potensi Balesari.
        Pengunjung sedang membuka halaman GALERI, pusat dokumentasi foto dari tiga potensi utama (biting bambu, kopi, kerajinan tangan), kegiatan warga, dan lingkungan Dusun Segelan, Desa Balesari.
        Halaman ini punya filter kategori dan kartu foto yang bisa diklik untuk dibalik dan menampilkan cerita di baliknya.
        Jawab singkat dan ramah dalam bahasa Indonesia santai, maksimal 3 kalimat.
        Untuk detail produk atau pemesanan, arahkan ke halaman potensi terkait (/biting, /kopi, /kerajinan-tangan) atau WhatsApp.
        Kalau user memancingmu keluar dari topik selalu arahkan kembali ke topik dengan halus."
        sapaan="Hai! Lagi lihat-lihat dokumentasi Balesari?"
        saran={["Foto ini dari mana?", "Ada foto kerajinan tangan?", "Cara filter kategori gimana?"]}
      />

      <main className={`${fraunces.variable} flex-1 overflow-x-clip bg-[#F3EDE0] text-[#3A2E22]`}>
        <style>{`
        .font-display { font-family: var(--font-fraunces), Georgia, serif; }
        html { scroll-padding-top: 84px; }
        @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }

        .pattern-titik {
          background-image: radial-gradient(rgba(243,237,224,0.14) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }

        @supports (animation-timeline: scroll()) {
          .navbar-glass { animation: navbar-solid linear both; animation-timeline: scroll(); animation-range: 0 480px; }
        }
        @keyframes navbar-solid { to { background-color: rgba(58, 48, 38, 0.95); } }

        @media (prefers-reduced-motion: no-preference) {
          .marquee-track { animation: marquee-galeri 28s linear infinite; }
        }
        @keyframes marquee-galeri { to { transform: translateX(-50%); } }
      `}</style>

        {/* ================= NAVBAR ================= */}
        <header className="navbar-glass fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#3A3226]/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold text-[#F3EDE0]">
              <Image src="/images/logo.png" alt="Logo Potensi Balesari" width={45} height={45} priority className="h-9 w-auto" />
              {c.nav.brand}
            </Link>
            <nav aria-label="Navigasi utama" className="hidden md:block">
              <ul className="flex items-center gap-7 text-sm font-medium text-[#F3EDE0]/85">
                {c.nav.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-[#F3EDE0]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#F3EDE0] px-4 py-2 text-xs font-semibold text-[#2E4230] shadow transition hover:bg-[#EAE1CD] sm:text-sm"
            >
              {c.nav.cta}
            </a>
          </div>
        </header>

        {/* ================= HERO =================
            Gradient dasar mengalir dari hijau (biting) → coklat kopi →
            terracotta hangat (kerajinan), dilapis warna gelap supaya teks
            tetap kontras, ditambah glow lembut tiap warna di atasnya —
            supaya Gallery terasa jadi "rumah bersama" tiga potensi,
            bukan halaman hijau milik Biting. */}
        <section
          aria-label="Galeri Potensi Balesari"
          className="relative isolate overflow-hidden text-[#F3EDE0]"
          style={{ background: "linear-gradient(135deg, #24361F 0%, #3B2416 50%, #4A3120 100%)" }}
        >
          {/* glow lembut tiap identitas — blurred, tidak membentuk blok tegas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, rgba(78,114,72,0.55), transparent 42%)," +
                "radial-gradient(circle at 55% 55%, rgba(107,66,38,0.5), transparent 48%)," +
                "radial-gradient(circle at 90% 85%, rgba(237,225,206,0.35), transparent 45%)",
            }}
          />
          <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-30" />

          {/* Layer dekoratif: tiga animasi identitas jatuh bersamaan (lihat
              src/components/animation/galeriHero.tsx). aria-hidden & 
              pointer-events-none, tidak memblok klik atau mengubah layout. */}
          <AnimasiGaleriHero />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-28 pb-24 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
            <div>
              <p className="mb-5 inline-block rounded-full bg-[#F3EDE0] px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#2E4230] uppercase">
                {c.hero.badge}
              </p>
              <h1 className="font-display text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-[3.3rem]">
                {c.hero.titleAtas}
                <br />
                {c.hero.titleBawah}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#F3EDE0]/80 sm:text-lg">{c.hero.subtitle}</p>

              {/* penanda tiga identitas hidup berdampingan */}
              <ul className="mt-7 flex flex-wrap gap-2.5 text-[11px] font-semibold tracking-wide text-[#F3EDE0]/90 uppercase">
                <li className="flex items-center gap-1.5 rounded-full border border-[#F3EDE0]/20 px-3 py-1.5">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: "#4E7248" }} />
                  Biting Bambu
                </li>
                <li className="flex items-center gap-1.5 rounded-full border border-[#F3EDE0]/20 px-3 py-1.5">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: "#6B4226" }} />
                  Kopi Balesari
                </li>
                <li className="flex items-center gap-1.5 rounded-full border border-[#F3EDE0]/20 px-3 py-1.5">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: "#B9805A" }} />
                  Kerajinan Tangan
                </li>
              </ul>
            </div>

            {/* foto editorial dengan "sudut bingkai" — motif khas halaman ini */}
            <figure className="relative mx-auto w-full max-w-md">
              <SudutBingkai className="pointer-events-none absolute -top-3 -left-3 h-8 w-8 text-[#F3EDE0]/50" />
              <SudutBingkai className="pointer-events-none absolute -top-3 -right-3 h-8 w-8 -scale-x-100 text-[#F3EDE0]/50" />
              <SudutBingkai className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 -scale-y-100 text-[#F3EDE0]/50" />
              <SudutBingkai className="pointer-events-none absolute -right-3 -bottom-3 h-8 w-8 -scale-x-100 -scale-y-100 text-[#F3EDE0]/50" />
              <div className="relative overflow-hidden rounded-2xl border-4 border-[#F3EDE0]/20 shadow-2xl">
                <div className="relative aspect-[4/5]">
                  <Image src={c.hero.img} alt={c.hero.imgAlt} fill className="object-cover" priority sizes="(min-width: 1024px) 40vw, 90vw" />
                </div>
              </div>
            </figure>
          </div>

          {/* transisi lembut ke section berikutnya (cream) — bukan garis tegas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: "linear-gradient(to bottom, transparent, #F3EDE0)" }}
          />
        </section>

        {/* ================= MARQUEE — jembatan visual Hero → Galeri =================
            Mengisi area krem yang sebelumnya kosong di antara Hero dan
            section dokumentasi, sekaligus jadi penegas branding berjalan. */}
        <div aria-hidden="true" className="relative overflow-hidden border-y py-3.5" style={{ backgroundColor: "#F1E7D5", borderColor: "rgba(58,46,34,0.14)" }}>
          {/* glow terracotta sangat halus, kelanjutan warna dari hero */}
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #B9805A, transparent 70%)" }}
          />
          <div className="marquee-track relative flex w-max items-center gap-8 whitespace-nowrap px-4">
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 text-xs font-semibold tracking-[0.18em] uppercase sm:text-sm"
                style={{ color: "#7A5C3E" }}
              >
                {item}
                <span aria-hidden="true" className="h-1 w-1 rounded-full" style={{ backgroundColor: i % 2 === 0 ? "#4E7248" : "#B9805A" }} />
              </span>
            ))}
          </div>
        </div>

        {/* ================= FILTER + GRID + CERITA PILIHAN + KEGIATAN ================= */}
        <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16 text-sm text-[#7A5C3E]">Memuat galeri…</div>}>
          <GaleriClient />
        </Suspense>

        {/* ================= FOOTER ================= */}
        <footer className="relative text-[#F3EDE0]" style={{ background: "linear-gradient(135deg, #3B2416 0%, #22331F 65%)" }}>
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <LogoBambu className="h-7 w-auto" />
                {c.footer.brand}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#F3EDE0]/70">{c.footer.tagline}</p>
              <p className="mt-4 text-sm text-[#F3EDE0]/60">📍 {c.footer.alamat}</p>
            </div>

            <nav aria-label="Produk">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9DBE85]">Produk</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F3EDE0]/80">
                {c.footer.kolomProduk.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Halaman">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9DBE85]">Jelajah</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F3EDE0]/80">
                {c.footer.kolomHalaman.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="relative border-t border-[#F3EDE0]/10">
            <p className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-[#F3EDE0]/50 sm:text-left">{c.footer.kredit}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
