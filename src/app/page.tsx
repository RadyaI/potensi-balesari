// src/app/page.tsx
// Halaman Home — Potensi Balesari (REVISI: "penuh tapi rapi")
//
// Konsep visual:
// - Bambu = motif utama (hero, ikon, tekstur anyaman)
// - Siluet lereng Gunung Kawi = benang merah antar section
// - Palet 3 warna produk: hijau bambu / coklat kopi / coklat batok
// - Parallax hero murni CSS scroll-driven (nonaktif di mobile & reduced-motion)
//
// Semua gambar SEMENTARA mengarah ke /images/desa-balesari.jpeg (lihat const IMG).

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import PetaLokasi from "@/components/potensi/PetaLokasi";
import BotChat from "@/components/BotChat";
import Reveal from "@/components/Reveal";
import TeksBergantian from "@/components/TextBergantian";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
});

/* ============================================================
   SEO METADATA
   ============================================================ */
export const metadata: Metadata = {
  title:
    "Potensi Balesari - Biting, Kopi & Batok Kelapa | Desa Balesari, Ngajum, Malang",
  description:
    "Jelajahi potensi UMKM Dusun Segelan, Desa Balesari, Kecamatan Ngajum, Kabupaten Malang: kerajinan biting bambu, kopi lereng Gunung Kawi, dan olahan batok kelapa buatan tangan warga.",
  keywords: [
    "Desa Balesari",
    "Ngajum",
    "Kabupaten Malang",
    "UMKM desa",
    "biting bambu",
    "kopi Gunung Kawi",
    "kerajinan batok kelapa",
    "potensi desa",
  ],
  openGraph: {
    title: "Potensi Balesari — Biting, Kopi & Batok Kelapa",
    description:
      "Produk asli warga Dusun Segelan, Desa Balesari, Ngajum, Kabupaten Malang, dibuat manual dan diwariskan turun-temurun.",
    locale: "id_ID",
    type: "website",
  },
};

/* ============================================================
   GAMBAR SEMENTARA — ganti per-bagian kalau foto asli sudah ada
   ============================================================ */
const IMG = "/images/desa-balesari.jpeg";

/* ============================================================
   KONTEN — semua teks di sini biar gampang diedit
   ============================================================ */
const content = {
  nav: {
    brand: "Potensi Balesari",
    links: [
      { label: "Tentang", href: "#sekilas-desa" },
      { label: "Potensi", href: "#potensi" },
      { label: "Galeri", href: "#galeri" },
      { label: "Lokasi", href: "#lokasi" },
    ],
    cta: "Hubungi Kami",
  },
  hero: {
    eyebrow: "Dusun Segelan · Desa Balesari · Ngajum · Kab. Malang",
    title_default:
      "Potensi Desa Balesari: Biting, Kopi & Batok Kelapa dari Kaki Gunung Kawi",
    titleLengkap:
      "Potensi Desa Balesari: Biting, Kopi & Batok Kelapa dari Kaki Gunung Kawi",
    titleAwal: "Potensi Desa Balesari:",
    titleKata: [
      { teks: "Biting Bambu", warna: "#9DBE85" },
      { teks: "Kopi", warna: "#C89A6B" },
      { teks: "Kerajinan Tangan", warna: "#B08968" },
    ],
    titleAkhir: "dari Kaki Gunung Kawi",
    subtitle:
      "Tiga hasil bumi dan kerajinan yang lahir dari tangan warga, dikerjakan manual dan diwariskan turun-temurun.",
    ctaUtama: "Jelajahi Potensi",
    chips: [
      { label: "Biting Bambu", href: "/biting", warna: "#9DBE85" },
      { label: "Kopi Balesari", href: "/kopi", warna: "#C89A6B" },
      { label: "Kerajinan Tangan", href: "/kerajinan-tangan", warna: "#B08968" },
    ],
  },
  marquee: [
    "Biting Bambu",
    "Kopi Lereng Kawi",
    "Kerajinan Tangan",
    "Dusun Segelan",
    "Buatan Tangan",
    "Turun-Temurun",
  ],
  sekilas: {
    heading: "Sekilas Desa Balesari",
    paragraphs: [
      "Desa Balesari terletak di Kecamatan Ngajum, Kabupaten Malang, di lereng timur Gunung Kawi dengan udara sejuk dan tanah yang subur.",
      "Di Dusun Segelan, keseharian warga tak lepas dari rumpun bambu, kebun kopi, dan pohon kelapa, tiga bahan yang diolah menjadi produk bernilai lewat keterampilan yang diwariskan antargenerasi.",
    ],
    imgUtama: IMG,
    imgUtamaAlt:
      "Pemandangan Desa Balesari di lereng timur Gunung Kawi, Kecamatan Ngajum, Kabupaten Malang",
    imgKecil: IMG,
    imgKecilAlt: "Suasana keseharian warga Dusun Segelan, Desa Balesari",
    imgCaption: "Desa Balesari",
    stats: [
      { angka: "650-900", satuan: "mdpl", label: "Ketinggian desa" },
      { angka: "±2.400", satuan: "mm/thn", label: "Curah hujan" },
      { angka: "Kawi", satuan: "lereng timur", label: "Kaki gunung" },
    ],
  },
  potensi: {
    heading: "Potensi Unggulan",
    intro: "Tiga produk andalan warga Balesari, dari bahan mentah sampai siap dipesan.",
    items: [
      {
        slug: "/biting",
        nama: "Biting Bambu",
        kategori: "Kerajinan",
        pancingan:
          "Lidi bambu tipis nan presisi untuk dupa, sempol, hingga sate, diserut satu per satu dengan tangan.",
        img: "/images/dokum_biting10.webp",
        alt: "Ikatan biting bambu hasil serutan tangan warga Dusun Segelan, Desa Balesari",
        aksen: "#4E7248",
      },
      {
        slug: "/kopi",
        nama: "Kopi Balesari",
        kategori: "Hasil Kebun",
        pancingan:
          "Biji kopi lereng Gunung Kawi, dipetik merah dan disangrai tradisional hingga harum pekat.",
        img: "/images/dokum_kopi5.webp",
        alt: "Biji kopi sangrai dari kebun warga Desa Balesari di lereng Gunung Kawi",
        aksen: "#6B4226",
      },
      {
        slug: "/kerajinan-tangan",
        nama: "Batok Kelapa",
        kategori: "Olahan",
        pancingan:
          "Tempurung kelapa yang biasanya terbuang, diolah jadi arang dan kerajinan bernilai.",
        img: "/images/batok_kelapa.jpg",
        alt: "Olahan batok kelapa berupa arang dan kerajinan buatan warga Desa Balesari",
        aksen: "#8B5E3C",
      },
    ],
  },
  keunggulan: {
    heading: "Kenapa Produk Sini Beda",
    intro: "Bukan produksi massal, tiap barang lewat tangan orang yang sama dari awal sampai akhir.",
    items: [
      {
        judul: "Dikerjakan Manual",
        deskripsi:
          "Tanpa mesin pabrik, tiap biting diserut, tiap biji kopi dipilah, tiap batok dibentuk dengan tangan.",
      },
      {
        judul: "Ilmu Turun-Temurun",
        deskripsi:
          "Teknik dan takarannya diwariskan dari orang tua ke anak, dijaga puluhan tahun.",
      },
      {
        judul: "Langsung dari Warga",
        deskripsi:
          "Tanpa perantara panjang, harga adil untuk pembeli, hasil utuh untuk pengrajin dan petani.",
      },
    ],
    // TODO: ganti dengan kutipan asli warga saat wawancara KKN
    kutipan:
      "Sing penting telaten. Bambu, kopi, kelapa, kabeh butuh sabar sebelum dadi rezeki.",
    kutipanSumber: "Pengrajin biting, Dusun Segelan",
  },
  galeri: {
    heading: "Cuplikan Kegiatan",
    intro: "Suasana produksi dan keseharian warga Dusun Segelan.",
    // TODO: taruh file video di public/images/dokumentasi.mp4 (atau ganti src ini sesuai nama filenya)
    videoSrc: "/images/cuplikan_biting.mp4",
    items: [
      {
        img: "/images/dokum_biting3.jpg",
        alt: "Warga menyerut bambu menjadi biting di teras rumah",
      },
      {
        img: "/images/dokum_kopi2.webp",
        alt: "Proses penjemuran biji kopi di halaman rumah warga Balesari",
      },
      {
        img: "/images/dokum_kopi4.webp",
        alt: "Penyangraian kopi secara tradisional menggunakan wajan tanah",
      },
      {
        img: "/images/dokum_biting8.webp",
        alt: "Pembakaran batok kelapa menjadi arang di Dusun Segelan",
      },
      {
        img: "/images/dokum_kopi3.webp",
        alt: "Pemandangan kebun dan rumpun bambu Desa Balesari",
      },
      {
        img: "/images/dokum_biting10.webp",
        alt: "Warga mengikat biting bambu yang sudah jadi ke dalam bal",
      },
    ],
  },
  peta: {
    heading: "Lokasi Desa Balesari",
    intro:
      "Desa Balesari, Kecamatan Ngajum, Kabupaten Malang, Jawa Timur, tepat di lereng timur Gunung Kawi.",
  },
  kontak: {
    heading: "Tertarik Bekerja Sama?",
    deskripsi:
      "Kami terbuka untuk pemesanan, kemitraan, maupun kunjungan langsung ke Dusun Segelan. Hubungi kami, warga siap menyambut.",
    waNumber: "6281234567890", // TODO: ganti dengan nomor WhatsApp asli
    waText: "Halo, saya tertarik dengan produk Desa Balesari.",
    ctaLabel: "Hubungi via WhatsApp",
    infoChips: ["Pemesanan produk", "Kemitraan & reseller", "Kunjungan edukasi"],
  },
  footer: {
    brand: "Potensi Balesari",
    tagline:
      "Profil potensi dan UMKM Dusun Segelan, Desa Balesari, dari lereng Gunung Kawi untuk lebih banyak orang.",
    alamat: "Dusun Segelan, Desa Balesari, Kec. Ngajum, Kab. Malang, Jawa Timur",
    kredit: `© ${new Date().getFullYear()} KKN 165 UMM × Warga Desa Balesari`,
    kolomProduk: [
      { label: "Biting Bambu", href: "/biting" },
      { label: "Kopi Balesari", href: "/kopi" },
      { label: "Batok Kelapa", href: "/batok-kelapa" },
    ],
    kolomHalaman: [
      { label: "Tentang Desa", href: "#sekilas-desa" },
      { label: "Galeri", href: "#galeri" },
      { label: "Lokasi", href: "#lokasi" },
    ],
  },
};

/* ============================================================
   ORNAMEN SVG
   ============================================================ */

/* Bambu 3D — gradasi silinder; idPrefix wajib unik (dirender 2x) */
function BambooCluster({ idPrefix }: { idPrefix: string }) {
  const p = idPrefix;
  const ruasUtama = [90, 205, 320, 435, 550];
  const ruasBelakang = [140, 260, 380, 500];
  const ruasDepan = [400, 490, 580];

  return (
    <svg viewBox="0 0 300 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-full w-auto">
      <defs>
        <linearGradient id={`${p}-culm`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1E3220" />
          <stop offset="0.3" stopColor="#4E7248" />
          <stop offset="0.48" stopColor="#9DBE85" />
          <stop offset="0.62" stopColor="#5E8455" />
          <stop offset="1" stopColor="#15230F" />
        </linearGradient>
        <linearGradient id={`${p}-culm2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A4527" />
          <stop offset="0.45" stopColor="#7FA36F" />
          <stop offset="1" stopColor="#1E3220" />
        </linearGradient>
        <linearGradient id={`${p}-node`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9D3A0" />
          <stop offset="0.5" stopColor="#4E7248" />
          <stop offset="1" stopColor="#132009" />
        </linearGradient>
        <filter id={`${p}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="130" cy="688" rx="120" ry="14" fill="#000" opacity="0.28" filter={`url(#${p}-soft)`} />

      <g opacity="0.55" filter={`url(#${p}-soft)`} transform="rotate(7 190 700)">
        <rect x="180" y="60" width="30" height="640" rx="15" fill={`url(#${p}-culm2)`} />
        {ruasBelakang.map((y) => (
          <rect key={y} x="175" y={y} width="40" height="10" rx="5" fill={`url(#${p}-node)`} />
        ))}
      </g>

      <g transform="rotate(-6 90 700)">
        <rect x="66" y="0" width="52" height="700" rx="24" fill={`url(#${p}-culm)`} />
        <rect x="94" y="10" width="7" height="680" rx="3.5" fill="#EAF3DC" opacity="0.35" />
        {ruasUtama.map((y) => (
          <g key={y}>
            <rect x="58" y={y} width="68" height="14" rx="7" fill={`url(#${p}-node)`} />
            <rect x="58" y={y + 13} width="68" height="4" rx="2" fill="#0E1A08" opacity="0.55" />
            <rect x="66" y={y - 3} width="52" height="3" rx="1.5" fill="#D7E6C2" opacity="0.4" />
          </g>
        ))}
        <ellipse cx="98" cy="52" rx="8" ry="26" fill="#F3F9E8" opacity="0.25" />

        {/* Hiasan batang (pengganti daun):
            - mata tunas kecil di atas tiap buku, selang-seling kiri/kanan
            - serat vertikal halus
            - bercak usia samar
            - pelepah kering menempel di dua buku */}
        {ruasUtama.map((y, i) => (
          <g key={`mata-${y}`}>
            <circle cx={i % 2 === 0 ? 78 : 106} cy={y - 10} r="4.5" fill="#16240F" />
            <circle cx={(i % 2 === 0 ? 78 : 106) - 1.5} cy={y - 11.5} r="1.6" fill="#9DBE85" opacity="0.8" />
          </g>
        ))}
        <rect x="76" y="6" width="1.5" height="688" fill="#12200D" opacity="0.22" />
        <rect x="86" y="6" width="1" height="688" fill="#12200D" opacity="0.16" />
        <rect x="108" y="6" width="1.5" height="688" fill="#12200D" opacity="0.25" />
        <ellipse cx="84" cy="270" rx="7" ry="14" fill="#2A4527" opacity="0.35" />
        <ellipse cx="104" cy="500" rx="6" ry="11" fill="#2A4527" opacity="0.3" />
        <ellipse cx="80" cy="600" rx="5" ry="9" fill="#5B8151" opacity="0.3" />
        {/* pelepah kering (sheath) — warna kecoklatan, ujung melengkung lepas */}
        <path d="M118 320 q 26 6 34 34 q -20 2 -30 -10 q -5 -12 -4 -24 Z" fill="#A88B5C" opacity="0.85" />
        <path d="M118 320 q 26 6 34 34" stroke="#7A5C3E" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M66 438 q -24 8 -30 34 q 18 2 27 -9 q 4 -13 3 -25 Z" fill="#8F754C" opacity="0.8" />
      </g>

      <g transform="rotate(-14 20 700)">
        <rect x="8" y="330" width="26" height="370" rx="13" fill={`url(#${p}-culm2)`} />
        <rect x="21" y="336" width="4" height="358" rx="2" fill="#EAF3DC" opacity="0.35" />
        {ruasDepan.map((y) => (
          <rect key={y} x="3" y={y} width="36" height="9" rx="4.5" fill={`url(#${p}-node)`} />
        ))}
      </g>

      {/* Rebung (tunas bambu muda) di pangkal — kelopak berlapis */}
      <g>
        <path d="M150 700 L168 588 L188 700 Z" fill="#5B8151" />
        <path d="M156 700 L168 612 L181 700 Z" fill="#3E5A3B" />
        <path d="M162 700 L168 636 L175 700 Z" fill="#7FA36F" opacity="0.9" />
        <path d="M168 592 L168 700" stroke="#243A22" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Rumpun rumput di dasar biar bambunya "berpijak" */}
      <g stroke="#33502F" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M46 700 q -6 -26 -20 -36" />
        <path d="M58 700 q 0 -30 -6 -44" />
        <path d="M130 700 q 4 -24 16 -34" />
        <path d="M214 700 q -2 -22 -12 -30" />
      </g>
      <g stroke="#5B8151" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M52 700 q -2 -22 6 -34" />
        <path d="M124 700 q -4 -20 -14 -28" />
        <path d="M222 700 q 4 -20 14 -26" />
      </g>

    </svg>
  );
}

/* Siluet lereng Gunung Kawi — benang merah antar section */
function Pegunungan({ depan, belakang, className = "" }: { depan: string; belakang: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true" className={`block w-full ${className}`}>
      <path d="M0,150 L200,60 L340,120 L520,30 L700,130 L880,55 L1060,140 L1240,80 L1440,150 L1440,220 L0,220 Z" fill={belakang} />
      <path d="M0,190 L260,110 L430,170 L640,90 L840,180 L1040,115 L1250,175 L1440,120 L1440,220 L0,220 Z" fill={depan} />
    </svg>
  );
}

/* Pembatas gelombang antar-section */
function Wave({ fill, flip = false, className = "" }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1440 88" preserveAspectRatio="none" aria-hidden="true" className={`block h-12 w-full sm:h-[88px] ${flip ? "rotate-180" : ""} ${className}`}>
      <path d="M0,46 C180,86 360,6 560,30 C760,54 900,84 1080,60 C1230,40 1340,14 1440,40 L1440,88 L0,88 Z" fill={fill} />
    </svg>
  );
}

/* Daun bambu kecil (dekorasi gugur) */
function DaunBambu({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 24" aria-hidden="true" className={className} style={style} fill="currentColor">
      <path d="M2 12 Q 22 -4 58 4 Q 40 22 10 18 Q 4 16 2 12 Z" />
    </svg>
  );
}

/* Biji kopi (dekorasi) */
function BijiKopi({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 52" aria-hidden="true" className={className} fill="none">
      <ellipse cx="20" cy="26" rx="18" ry="24" fill="currentColor" />
      <path d="M20 4 C 14 18, 26 34, 20 48" stroke="#F3EDE0" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/* Logo mini: ruas bambu */
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

/* Batok kelapa terbelah (siluet dekorasi) */
function BatokKelapa({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden="true" className={className}>
      <path d="M2 12 Q 32 24 62 12 L62 14 C 62 34 49 46 32 46 C 15 46 2 34 2 14 Z" fill="currentColor" />
      <ellipse cx="32" cy="11" rx="29" ry="7" fill="currentColor" opacity="0.45" />
      <path d="M13 24 q 4 12 11 16 M51 24 q -4 12 -11 16" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.5" />
    </svg>
  );
}

/* Kipas lidi biting kecil (siluet dekorasi) */
function LidiBiting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      <g strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="150" x2="14" y2="16" />
        <line x1="60" y1="150" x2="34" y2="8" />
        <line x1="60" y1="150" x2="60" y2="4" />
        <line x1="60" y1="150" x2="86" y2="8" />
        <line x1="60" y1="150" x2="106" y2="16" />
      </g>
      <rect x="48" y="104" width="24" height="9" rx="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Ikon poin keunggulan */
const keunggulanIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
    <path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11m0-2.5v-3a1.5 1.5 0 0 1 3 0v3m0 .5v-2a1.5 1.5 0 0 1 3 0V13" />
    <path d="M16 12.5a1.5 1.5 0 0 1 3 1v2.5a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-6-6v-3" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
    <path d="M12 3v6m0 0c0-3 2.5-4.5 5-4.5C17 8 15 9 12 9Zm0 0C12 6 9.5 4.5 7 4.5 7 8 9 9 12 9Z" />
    <path d="M12 9v12M6 21c0-4 2.5-6.5 6-6.5s6 2.5 6 6.5" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>,
];

/* ============================================================
   HALAMAN
   ============================================================ */
export default function HomePage() {
  const c = content;
  const waHref = `https://wa.me/${c.kontak.waNumber}?text=${encodeURIComponent(c.kontak.waText)}`;
  // Marquee: daftar digandakan supaya loop-nya mulus
  const marqueeItems = [...c.marquee, ...c.marquee];

  return (
    <>
      <BotChat
        systemPrompt="
        Kamu asisten ramah website Potensi Balesari, profil 
        UMKM Dusun Segelan, Desa Balesari, Kecamatan Ngajum, Kabupaten Malang, di lereng timur Gunung Kawi. 
        Desa ini punya tiga potensi utama: biting bambu (lidi untuk tusuk pentol, sempol, sate, dan rangka dupa), kopi, serta olahan batok kelapa. 
        Pengunjung sedang membuka halaman utam  a. 
        Jawab singkat tapi excited dalam bahasa Indonesia yang santai dan sopan, maksimal 3 kalimat. 
        Jika ditanya harga, arahkan menghubungi WhatsApp karena harga berubah-ubah. 
        Jika ditanya di luar topik desa, tolak dengan halus dan kembalikan ke topik desa. 
        Kalau user menanyakan tentang Radya, jawab dia adalah salah satu mahasiswa kkn yang mengembangkan website yang keren ini
        Kalau user menanyakan tentang Heri, jawab dia adalah seorang CEO hebat salah satu saudagar kaya pemilik perusahaan biting di sini (kasih emoji raja)
        "
        sapaan="Halo! Aku bisa bantu jelasin soal potensi Desa Balesari. Mau tanya apa?"
        saran={["Apa saja produk desanya?", "Di mana lokasinya?", "Bagaimana cara memesan?"]}
      />
      <main className={`${fraunces.variable} flex-1 overflow-x-clip bg-[#F3EDE0] text-[#3A2E22]`}>
        <style>{`
        .font-display { font-family: var(--font-fraunces), Georgia, serif; }

        /* Navbar sekarang fixed (mengambang di atas hero) — beri jarak
           saat lompat ke anchor supaya judul section tidak ketutupan */
        html { scroll-padding-top: 84px; }
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }

        .pattern-anyaman {
          background-image:
            repeating-linear-gradient(45deg, rgba(58,46,34,0.06) 0 2px, transparent 2px 16px),
            repeating-linear-gradient(-45deg, rgba(58,46,34,0.06) 0 2px, transparent 2px 16px);
        }
        .pattern-titik {
          background-image: radial-gradient(rgba(243,237,224,0.14) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }

        /* ---- Marquee & daun melayang: hanya saat motion diizinkan ---- */
        @media (prefers-reduced-motion: no-preference) {
          .marquee-track { animation: marquee 28s linear infinite; }

          /* Bambu goyang tertiup angin — dari pangkal batang.
             Dipasang di elemen DALAM container parallax supaya
             tidak bentrok dengan animasi scroll-nya. */
          .bamboo-sway {
            --sway-dur: 2.5s;
            --sway-del: 0s;
            transform-origin: 50% 100%;
            animation: bamboo-sway var(--sway-dur) ease-in-out var(--sway-del) infinite alternate;
          }
          .bamboo-sway-2 { --sway-dur: 7.8s; --sway-del: -2.6s; }

          /* Daun gugur: jatuh melayang zig-zag sambil berputar,
             lalu mengulang dari atas. Tiap daun punya durasi/jeda
             sendiri lewat CSS variable (di-set inline per daun). */
          .leaf-fall {
            animation: leaf-fall var(--fall-dur, 4s) linear var(--fall-del, 0s) infinite;
            will-change: transform, opacity;
          }
        }
        /* Tanpa animasi (reduced motion), daun gugur disembunyikan
           supaya tidak menggantung diam di tengah layar */
        @media (prefers-reduced-motion: reduce) {
          .leaf-fall { display: none; }
        }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes bamboo-sway { from { rotate: -1.4deg; } to { rotate: 2.4deg; } }
        @keyframes leaf-fall {
          0%   { transform: translate3d(0, -8vh, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.75; }
          30%  { transform: translate3d(42px, 26vh, 0) rotate(85deg); }
          55%  { transform: translate3d(-30px, 54vh, 0) rotate(170deg); }
          80%  { transform: translate3d(36px, 80vh, 0) rotate(250deg); opacity: 0.75; }
          100% { transform: translate3d(-16px, 104vh, 0) rotate(340deg); opacity: 0; }
        }

        /* Navbar glass: transparan di atas hero, lalu menggelap jadi
           solid setelah di-scroll — supaya teks krem tetap kebaca saat
           lewat section berlatar krem. Fallback: tetap /30 (spek awal). */
        @supports (animation-timeline: scroll()) {
          .navbar-glass {
            animation: navbar-solid linear both;
            animation-timeline: scroll();
            animation-range: 0 480px;
          }
        }
        @keyframes navbar-solid {
          to { background-color: rgba(30, 46, 32, 0.95); }
        }

        /* ---- PARALLAX HERO (murni CSS scroll-driven) ----
           Aktif hanya jika: browser support, layar >= md,
           dan user tidak menyalakan prefers-reduced-motion. */
        @supports (animation-timeline: view()) {
          @media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
            .hero-timeline { view-timeline: --hero block; }
            .bamboo-left, .bamboo-right {
              animation: linear both;
              animation-timeline: --hero;
              animation-range: exit 0% exit 85%;
              will-change: transform, opacity;
            }
            .bamboo-left  { animation-name: bamboo-exit-left; }
            .bamboo-right { animation-name: bamboo-exit-right; }
            .hero-inner {
              animation: hero-drift linear both;
              animation-timeline: --hero;
              animation-range: exit 0% exit 100%;
            }
          }
        }
        /* rotate ditulis sebagai properti terpisah supaya tidak
           menimpa kemiringan awal dari class Tailwind (rotate-*) */
        @keyframes bamboo-exit-left  { to { transform: translate(-60%, 22%); rotate: 34deg;  opacity: 0; } }
        @keyframes bamboo-exit-right { to { transform: translate(60%, 22%);  rotate: -34deg; opacity: 0; } }
        @keyframes hero-drift        { to { transform: translateY(-8%); opacity: 0.15; } }
      `}</style>

        {/* ================= NAVBAR ================= */}
        <header className="navbar-glass fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#2E4230]/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold text-[#F3EDE0]">
              <Image
                src="/images/logo.png"
                alt="Logo Potensi Balesari"
                width={45}
                height={45}
                priority
                className="h-9 w-auto"
              />
              {c.nav.brand}
            </Link>
            <nav aria-label="Navigasi utama" className="hidden md:block">
              <ul className="flex items-center gap-7 text-sm font-medium text-[#F3EDE0]/85">
                {c.nav.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-[#F3EDE0]">
                      {l.label}
                    </a>
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

        {/* ================= 1. HERO ================= */}
        <section
          aria-label="Beranda Potensi Balesari"
          className="hero-timeline relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden bg-[#2E4230] text-[#F3EDE0]"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(243,237,224,0.10),transparent_62%)]" />
          <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-40" />

          {/* Siluet lereng Gunung Kawi di kejauhan */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 opacity-70">
            <Pegunungan belakang="#243A26" depan="#1C2E1E" className="h-40 sm:h-56" />
          </div>

          {/* Daun gugur — jatuh melayang dari atas hero, tempo & posisi acak.
            Ini daun lepas (bukan daun di bambu), disembunyikan saat reduced motion. */}
          {[
            { left: "10%", dur: "13s", del: "0s", ukuran: "h-4 w-11", warna: "text-[#7FA36F]/60" },
            { left: "26%", dur: "17s", del: "-9s", ukuran: "h-3 w-9", warna: "text-[#9DBE85]/45" },
            { left: "44%", dur: "15s", del: "-4s", ukuran: "h-3.5 w-10", warna: "text-[#A88B5C]/50" },
            { left: "62%", dur: "19s", del: "-13s", ukuran: "h-3 w-8", warna: "text-[#7FA36F]/40" },
            { left: "78%", dur: "14s", del: "-6s", ukuran: "h-4 w-11", warna: "text-[#9DBE85]/55" },
            { left: "90%", dur: "16s", del: "-11s", ukuran: "h-3 w-9", warna: "text-[#A88B5C]/40" },
          ].map((daun, i) => (
            <DaunBambu
              key={i}
              className={`leaf-fall pointer-events-none absolute -top-8 ${daun.ukuran} ${daun.warna}`}
              style={{ left: daun.left, "--fall-dur": daun.dur, "--fall-del": daun.del } as React.CSSProperties}
            />
          ))}

          {/* Bambu 3D dari pojok kiri & kanan */}
          <div
            aria-hidden="true"
            className="bamboo-left pointer-events-none absolute -bottom-10 -left-24 z-0 hidden h-[118%] origin-bottom-left rotate-[15deg] drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] md:block lg:-left-12"
          >
            <div className="bamboo-sway h-full">
              <BambooCluster idPrefix="bmb-l" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="bamboo-right pointer-events-none absolute -right-24 -bottom-10 z-0 hidden h-[118%] origin-bottom-right -rotate-[15deg] -scale-x-100 drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] md:block lg:-right-12"
          >
            <div className="bamboo-sway bamboo-sway-2 h-full">
              <BambooCluster idPrefix="bmb-r" />
            </div>
          </div>

          <div className="hero-inner relative z-10 mx-auto max-w-3xl px-6 pt-20 pb-32 text-center sm:pb-40">
            <p className="mb-5 inline-block rounded-full border border-[#F3EDE0]/25 bg-[#F3EDE0]/10 px-4 py-1.5 text-xs tracking-[0.18em] uppercase backdrop-blur-sm">
              {c.hero.eyebrow}
            </p>
            {/* <h1 className="font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
              {c.hero.title_default}
            </h1> */}
            <h1 className="font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
              <span className="sr-only">{c.hero.titleLengkap}</span>

              <span aria-hidden="true">
                <span className="block">{c.hero.titleAwal}</span>
                <TeksBergantian kata={c.hero.titleKata} className="block" />
                <span className="block">{c.hero.titleAkhir}</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-[#F3EDE0]/85 sm:text-lg">
              {c.hero.subtitle}
            </p>

            <a
              href="#sekilas-desa"
              className="group mt-9 inline-flex flex-col items-center gap-2 text-sm font-medium tracking-wide text-[#F3EDE0]/90 transition hover:text-[#F3EDE0]"
            >
              {c.hero.ctaUtama}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F3EDE0]/40 bg-[#F3EDE0]/5 transition group-hover:translate-y-1 group-hover:border-[#F3EDE0] motion-reduce:group-hover:translate-y-0"
              >
                ↓
              </span>
            </a>

            {/* Pintasan ke tiga produk */}
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {c.hero.chips.map((chip) => (
                <li key={chip.href}>
                  <Link
                    href={chip.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[#F3EDE0]/20 bg-[#F3EDE0]/10 px-4 py-2 text-xs font-medium backdrop-blur-sm transition hover:border-[#F3EDE0]/50 hover:bg-[#F3EDE0]/20"
                  >
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: chip.warna }} />
                    {chip.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20">
            <Wave fill="#F3EDE0" />
          </div>
        </section>

        {/* ============ PITA MARQUEE ============ */}
        <div aria-hidden="true" className="overflow-hidden border-y border-[#3A2E22]/10 bg-[#EAE1CD] py-3.5">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap px-4">
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-medium tracking-[0.14em] text-[#7A5C3E] uppercase">
                {item}
                <DaunBambu className="h-3 w-8 text-[#4E7248]/60" />
              </span>
            ))}
          </div>
        </div>

        {/* ================= 2. SEKILAS DESA ================= */}
        <section id="sekilas-desa" aria-labelledby="sekilas-heading" className="relative overflow-hidden py-20 sm:py-24">
          {/* garis kontur perbukitan sebagai latar */}
          <svg
            aria-hidden="true"
            viewBox="0 0 900 600"
            className="pointer-events-none absolute top-8 -right-24 h-[420px] w-auto text-[#8B5E3C] opacity-[0.12]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {[0, 42, 84, 126, 168, 210].map((o) => (
              <path key={o} d={`M0 ${300 + o} C 180 ${180 + o}, 320 ${380 + o}, 520 ${240 + o} S 820 ${160 + o}, 900 ${260 + o}`} />
            ))}
          </svg>
          {/* aksen biting: kipas lidi samar di sisi kiri */}
          <LidiBiting className="pointer-events-none absolute bottom-8 -left-8 h-44 w-auto rotate-12 text-[#4E7248] opacity-[0.13]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
            <div>
              <Reveal type="from-left">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Tentang Desa</p>
                <h2 id="sekilas-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
                  {c.sekilas.heading}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A3B2C] sm:text-lg">
                  {c.sekilas.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <dl className="mt-8 grid grid-cols-3 gap-3">
                {c.sekilas.stats.map((s, i) => (
                  <Reveal
                    key={s.label}
                    as="div"
                    index={i}
                    delay={120}
                    className="rounded-2xl border border-[#3A2E22]/10 bg-[#EAE1CD] px-4 py-4 text-center shadow-sm"
                  >
                    <dt className="order-2 mt-1 block text-[11px] leading-tight text-[#4A3B2C]/70">{s.label}</dt>
                    <dd className="font-display text-xl font-semibold text-[#2E4230]">
                      {s.angka}
                      <span className="ml-1 text-xs font-normal text-[#7A5C3E]">{s.satuan}</span>
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>

            {/* dua foto bertumpuk gaya cetakan */}
            <Reveal as="figure" type="from-right" delay={100} className="relative mx-auto w-full max-w-md pb-10">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-3xl bg-[#2E4230]/15" />
              <div className="relative rotate-[-1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={c.sekilas.imgUtama}
                    alt={c.sekilas.imgUtamaAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* foto kecil menimpa di kanan bawah */}
              <div className="absolute -right-2 bottom-0 w-36 rotate-[4deg] overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] shadow-lg sm:-right-6 sm:w-44">
                <div className="relative aspect-square bg-[#DCD2BC]">
                  <Image
                    src={c.sekilas.imgKecil}
                    alt={c.sekilas.imgKecilAlt}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="absolute bottom-4 left-4 rotate-[-1.5deg] rounded-full bg-[#2E4230] px-4 py-2 text-xs font-medium text-[#F3EDE0] shadow-lg">
                📍 {c.sekilas.imgCaption}
              </figcaption>
            </Reveal>
          </div>
        </section>

        {/* ================= 3. POTENSI UNGGULAN ================= */}
        <section id="potensi" aria-labelledby="potensi-heading" className="relative bg-[#EAE1CD]">
          <Wave fill="#F3EDE0" flip className="absolute inset-x-0 top-0" />
          <div className="pattern-anyaman absolute inset-0" aria-hidden="true" />
          {/* aksen tiga produk bertebaran samar */}
          <DaunBambu className="pointer-events-none absolute top-28 left-[6%] hidden h-5 w-14 -rotate-12 text-[#4E7248]/30 md:block" />
          <BijiKopi className="pointer-events-none absolute top-36 right-[7%] hidden h-10 w-8 rotate-12 text-[#6B4226]/25 md:block" />
          <BatokKelapa className="pointer-events-none absolute bottom-16 left-[8%] hidden h-9 w-14 -rotate-6 text-[#8B5E3C]/25 md:block" />
          <LidiBiting className="pointer-events-none absolute right-[4%] bottom-24 hidden h-28 w-auto rotate-6 text-[#4E7248]/20 lg:block" />

          <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Produk Warga</p>
              <h2 id="potensi-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
                {c.potensi.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#4A3B2C]/80">{c.potensi.intro}</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.potensi.items.map((item) => (
                <article
                  key={item.slug}
                  className="group relative overflow-hidden rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] shadow-md transition hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: item.aksen }} />
                  <Link href={item.slug} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E4230]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#DCD2BC]">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      />
                      <span
                        className="absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-[#F3EDE0] shadow"
                        style={{ backgroundColor: item.aksen }}
                      >
                        {item.kategori}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-[#2E4230]">{item.nama}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A3B2C]/85">{item.pancingan}</p>
                      <span
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 motion-reduce:group-hover:gap-1.5"
                        style={{ color: item.aksen }}
                      >
                        Lihat selengkapnya <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. KENAPA BEDA ================= */}
        <section aria-labelledby="keunggulan-heading" className="relative overflow-hidden">
          <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 text-[#2E4230] opacity-[0.07]">
            <path d="M100 10 C 40 60, 30 140, 100 190 C 170 140, 160 60, 100 10 Z M100 30 L 100 175" fill="currentColor" />
          </svg>
          {/* watermark kopi & batok: tiga produk hadir dalam satu bingkai */}
          <BijiKopi className="pointer-events-none absolute -top-8 right-10 h-36 w-28 rotate-[18deg] text-[#6B4226] opacity-[0.06]" />
          <BatokKelapa className="pointer-events-none absolute right-1/4 -bottom-14 h-32 w-48 text-[#8B5E3C] opacity-[0.06]" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Nilai Kami</p>
              <h2 id="keunggulan-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
                {c.keunggulan.heading}
              </h2>
              <p className="mt-3 text-[#4A3B2C]/80">{c.keunggulan.intro}</p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {c.keunggulan.items.map((item, i) => (
                <div
                  key={item.judul}
                  className="relative rounded-2xl border border-[#3A2E22]/10 bg-gradient-to-b from-[#F8F4EA] to-[#EFE7D4] p-6 shadow-sm transition hover:shadow-md"
                >
                  <span aria-hidden="true" className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#2E4230] via-[#7FA36F] to-[#8B5E3C]" />
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2E4230] text-[#F3EDE0] shadow-inner ring-4 ring-[#2E4230]/10">
                    {keunggulanIcons[i]}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2E4230]">{item.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A3B2C]/85">{item.deskripsi}</p>
                </div>
              ))}
            </div>

            {/* kutipan warga */}
            <figure className="relative mt-10 overflow-hidden rounded-3xl bg-[#EAE1CD] px-6 py-10 text-center sm:px-16">
              <span aria-hidden="true" className="font-display absolute top-2 left-6 text-7xl text-[#8B5E3C]/25">“</span>
              <DaunBambu className="absolute -right-3 -bottom-2 h-8 w-24 rotate-[-12deg] text-[#4E7248]/20" />
              <blockquote className="font-display mx-auto max-w-2xl text-xl leading-relaxed text-[#4A3524] italic sm:text-2xl">
                {c.keunggulan.kutipan}
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-[#7A5C3E]">— {c.keunggulan.kutipanSumber}</figcaption>
            </figure>
          </div>
        </section>

        {/* ================= 5. GALERI ================= */}
        <section id="galeri" aria-labelledby="galeri-heading" className="relative bg-[#2E4230] text-[#F3EDE0]">
          <Wave fill="#F3EDE0" className="absolute inset-x-0 top-0 rotate-180" />
          <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-30" />
          <DaunBambu className="pointer-events-none absolute top-24 right-10 h-6 w-16 rotate-12 text-[#9DBE85]/20" />
          <BijiKopi className="pointer-events-none absolute bottom-44 left-8 h-11 w-8 -rotate-12 text-[#C9BC9C]/15" />
          {/* siluet pegunungan samar di dasar galeri */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-6 opacity-40">
            <Pegunungan belakang="#263C28" depan="#1F3320" className="h-32" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-24 sm:pt-32 sm:pb-28">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9BC9C]">Dokumentasi</p>
            <h2 id="galeri-heading" className="font-display text-3xl font-semibold sm:text-4xl">
              {c.galeri.heading}
            </h2>
            <p className="mt-3 max-w-xl text-[#F3EDE0]/75">{c.galeri.intro}</p>

            {/* video dokumentasi: autoplay senyap + berulang, tetap ada kontrol
              (browser hanya mengizinkan autoplay jika muted) */}
            {/* <div className="mt-10 overflow-hidden rounded-3xl border-[6px] border-[#F8F4EA] bg-[#1F3320] shadow-2xl">
            <video
              src={c.galeri.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="aspect-video w-full object-cover"
            >
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div> */}

            {/* mozaik: foto pertama tampil besar */}
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {c.galeri.items.map((foto, i) => (
                <li
                  key={i}
                  className={`overflow-hidden rounded-xl border-[6px] border-[#F8F4EA] bg-[#3E5A3B] shadow-lg transition hover:z-10 hover:scale-[1.03] hover:rotate-0 motion-reduce:hover:scale-100 ${i % 2 === 0 ? "rotate-[1.2deg]" : "-rotate-[1.2deg]"
                    } ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <div className={`relative ${i === 0 ? "h-full min-h-64" : "aspect-[4/3]"}`}>
                    <Image
                      src={foto.img}
                      alt={foto.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Wave fill="#F3EDE0" className="absolute inset-x-0 bottom-0" />
        </section>

        {/* ================= 6. PETA LOKASI ================= */}
        <section id="lokasi" aria-labelledby="peta-heading" className="relative overflow-hidden py-20 sm:py-24">
          {/* kontur perbukitan samar, meneruskan benang merah lereng Kawi */}
          <svg
            aria-hidden="true"
            viewBox="0 0 900 600"
            className="pointer-events-none absolute top-4 -left-24 h-[380px] w-auto -scale-x-100 text-[#4E7248] opacity-[0.1]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {[0, 42, 84, 126, 168].map((o) => (
              <path key={o} d={`M0 ${300 + o} C 180 ${180 + o}, 320 ${380 + o}, 520 ${240 + o} S 820 ${160 + o}, 900 ${260 + o}`} />
            ))}
          </svg>
          <BatokKelapa className="pointer-events-none absolute top-16 right-[6%] hidden h-10 w-16 rotate-6 text-[#8B5E3C]/25 md:block" />

          <div className="relative mx-auto max-w-6xl px-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Kunjungi Kami</p>
            <h2 id="peta-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
              {c.peta.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.peta.intro}</p>
            <div className="mt-8">
              <PetaLokasi />
            </div>
          </div>
        </section>

        {/* ================= 7. CTA KONTAK ================= */}
        <section aria-labelledby="kontak-heading" className="px-6 pb-24">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A3524] to-[#332417] px-6 py-14 text-center text-[#F3EDE0] shadow-2xl sm:px-12">
            <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-25" />
            <BijiKopi className="absolute -top-4 -left-3 h-20 w-16 rotate-[-18deg] text-[#8B5E3C]/50" />
            <BijiKopi className="absolute top-10 right-6 h-12 w-9 rotate-[24deg] text-[#8B5E3C]/40" />
            <BijiKopi className="absolute -bottom-5 left-1/4 h-16 w-12 rotate-[10deg] text-[#8B5E3C]/40" />
            <DaunBambu className="absolute right-10 -bottom-2 h-6 w-20 rotate-[-10deg] text-[#7FA36F]/30" />

            <div className="relative">
              <h2 id="kontak-heading" className="font-display text-3xl font-semibold sm:text-4xl">
                {c.kontak.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#F3EDE0]/85">{c.kontak.deskripsi}</p>

              <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {c.kontak.infoChips.map((chip) => (
                  <li key={chip} className="rounded-full border border-[#F3EDE0]/20 bg-[#F3EDE0]/10 px-4 py-1.5 text-xs font-medium">
                    {chip}
                  </li>
                ))}
              </ul>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F3EDE0] px-7 py-3.5 font-semibold text-[#4A3524] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EAE1CD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3EDE0] motion-reduce:hover:translate-y-0"
              >
                {c.kontak.ctaLabel} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= 8. FOOTER ================= */}
        <footer className="relative bg-[#22331F] text-[#F3EDE0]">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 opacity-60">
            <Pegunungan belakang="#2E4230" depan="#22331F" className="h-14" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-20 pb-10 sm:grid-cols-2 lg:grid-cols-4">
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
                    <a href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="relative border-t border-[#F3EDE0]/10">
            <p className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-[#F3EDE0]/50 sm:text-left">
              {c.footer.kredit}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}