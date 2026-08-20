// src/app/kerajinan-tangan/page.tsx
// Halaman detail — Kerajinan Tangan Dusun Segelan
//
// REVISI: polishing visual + identitas warna & komponen khas "Kerajinan"
// (Earth / Craft / Clay / Weave), supaya tidak terasa seperti clone dari
// /biting (forest green, lidi bambu) atau /kopi (coffee brown, biji kopi).
//
// Yang beda dari halaman produk lain di project ini:
// - Palet warna sendiri: warm sand / oat cream / walnut / terracotta /
//   muted green (lihat konstanta warna di bawah), bukan cream global
//   #F4EEE1 ataupun hijau/coklat kopi punya biting & kopi.
// - Animasi masuk halaman sendiri: HujanBatok (keping batok kelapa jatuh,
//   mantul singkat, lalu memudar) — lihat src/components/animation/kerajinan.tsx.
// - Motif dekorasi sendiri: pola anyaman, garis serat, keping tanah liat —
//   bukan motif bambu/daun kopi.
// - Komponen khas kerajinan yang tidak dipakai di biting/kopi:
//   MaterialPalette (swatch bahan), TransformasiBahan (material→product
//   stepper + connector line), RawToCrafted (before/after ringan),
//   CraftDetailCard (katalog modern), KarakterKerajinan (stat "kalung"
//   non-grid), DocumentationWall (masonry asimetris + efek selotip
//   kertas), HandmadeStory (editorial + kutipan).
// - Semua informasi dari versi sebelumnya (cerita, produk, proses, nilai,
//   dokumentasi, CTA) tetap dipertahankan, hanya dikemas ulang secara visual.
//
// Gambar masih placeholder /images/desa-balesari.jpeg (konvensi project ini
// untuk section yang belum ada foto asli) — tinggal ganti path-nya nanti.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import {
  Shell,
  Layers,
  Gift,
  Hammer,
  Hand,
  Sun,
  Users,
  Leaf,
  Sparkles,
  Droplets,
  ArrowRight,
  Quote,
  Feather,
} from "lucide-react";
import BotChat from "@/components/BotChat";
import HujanBatok from "@/components/animation/kerajinan";
import { IMAGES } from "@/data/kerajinanImages";

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
    "Kerajinan Tangan Balesari - Batok Kelapa, Anyaman Bambu & Suvenir | Desa Balesari, Ngajum, Malang",
  description:
    "Kerajinan tangan buatan warga Dusun Segelan, Desa Balesari, Ngajum, Kabupaten Malang: olahan batok kelapa, anyaman bambu, dan suvenir dari bahan alam sekitar, dikerjakan manual dan diwariskan turun-temurun.",
  keywords: [
    "kerajinan tangan",
    "kerajinan batok kelapa",
    "anyaman bambu",
    "suvenir Malang",
    "kerajinan Desa Balesari",
    "Dusun Segelan",
    "Ngajum",
    "kerajinan Gunung Kawi",
  ],
  openGraph: {
    title: "Kerajinan Tangan Balesari — Buatan Warga Dusun Segelan",
    description:
      "Batok kelapa, bambu, sampai bahan alam sekitar, diolah tangan warga Dusun Segelan menjadi kerajinan bernilai.",
    locale: "id_ID",
    type: "website",
  },
};

/* ============================================================
   GAMBAR — dipindah ke src/data/kerajinanImages.ts (IMAGES,
   FALLBACK_IMAGE) supaya src/data/gallery.ts bisa memakai foto yang
   sama tanpa menduplikasi path. Lihat file itu untuk detail & komentar.
   ============================================================ */

/* ============================================================
   IDENTITAS WARNA — "Earth / Craft / Clay / Weave"
   Sengaja BEDA dari hijau hutan (biting) & coklat kopi sangrai (kopi).
   Prioritas pemakaian: warm sand → cream → walnut → terracotta → hijau lumut.
   ============================================================ */
const WARM_SAND = "#E9DDC8";
const OAT_CREAM = "#F1E7D5";
const WALNUT = "#50372B";
const DARK_TEXT = "#3F3027";
const BODY_TEXT = "#65564B";
const TERRACOTTA = "#B86F4A";
const CLAY_ORANGE = "#D08A55";
const MUTED_GREEN = "#6E7955";
const CARD_LIGHT = "#F6EEDF";
const BORDER = "#CDBDA5";

/* ============================================================
   KONTEN — semua teks di sini biar gampang diedit.
   (informasi dipertahankan dari versi sebelumnya, dikemas ulang)
   ============================================================ */
const content = {
  nav: {
    brand: "Potensi Balesari",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Cerita", href: "#cerita" },
      { label: "Material", href: "#material" },
      { label: "Karya", href: "#produk" },
      { label: "Proses", href: "#proses" },
    ],
    cta: "Pesan Kerajinan",
  },
  hero: {
    breadcrumb: { home: "Beranda", current: "Kerajinan Tangan" },
    badge: "Kerajinan · Dusun Segelan",
    titleAtas: "Dibuat dengan Tangan,",
    titleBawah: "Diberi Nilai oleh Waktu",
    subtitle:
      "Batok kelapa, bilah bambu, dan bahan alam sekitar, diolah warga Dusun Segelan menjadi kerajinan bernilai — dengan tangan, dan keterampilan yang diwariskan turun-temurun.",
    img: IMAGES.hero,
    imgAlt: "Kerajinan tangan buatan warga Dusun Segelan, Desa Balesari",
    caption: "Sepotong batok kelapa, sebelum jadi karya",
    cta: "Tanya via WhatsApp",
  },
  marquee: [
    "Kerajinan Tangan",
    "Batok Kelapa",
    "Anyaman Bambu",
    "Bahan Lokal",
    "Buatan Tangan",
    "Dusun Segelan",
  ],
  cerita: {
    heading: "Kerajinan yang Lahir dari Keseharian",
    paragraphs: [
      "Selain biting bambu dan kopi, warga Dusun Segelan, Desa Balesari, juga terbiasa mengolah bahan-bahan yang ada di sekitar rumah, salah satunya batok kelapa yang biasanya terbuang, menjadi beragam kerajinan tangan.",
      "Prosesnya dikerjakan manual di rumah masing-masing, dari memilih bahan, membentuk, sampai menghaluskan hasil akhir. Tidak ada mesin pabrik yang terlibat, hanya tangan dan ketelatenan pengrajin.",
      "Keterampilan ini diwariskan dari orang tua ke anak, dari tetangga ke tetangga, sama seperti biting bambu dan kopi. Bagi warga, kerajinan tangan bukan sekadar sampingan, tapi juga bagian dari keseharian dan identitas dusun.",
    ],
    fakta: ["Bahan dari lingkungan sekitar", "Dikerjakan manual di rumah", "Keterampilan turun-temurun"],
    sisi: {
      heading: "Kenapa Bahan Lokal?",
      paragraf:
        "Batok kelapa, misalnya, sering dianggap sisa dapur yang dibuang begitu saja. Di tangan warga Segelan, bahan seperti ini justru diberi nilai tambah, diolah jadi kerajinan yang bisa dipakai maupun dipajang.",
    },
  },
  material: {
    heading: "Bahan dari Sekitar Rumah",
    intro: "Sebelum menjadi karya, semuanya berawal dari bahan yang tersedia di lingkungan Dusun Segelan.",
    items: [
      {
        nama: "Batok Kelapa",
        deskripsi: "Tempurung kelapa yang biasanya jadi sisa dapur, dibersihkan dan dihaluskan jadi bahan utama.",
        warna: `linear-gradient(150deg, ${CLAY_ORANGE}, ${WALNUT})`,
      },
      {
        nama: "Bilah Bambu",
        deskripsi: "Bahan yang sama dengan biting, dianyam dengan cara berbeda untuk hasil kerajinan lain.",
        warna: `linear-gradient(150deg, ${MUTED_GREEN}, #4B5238)`,
      },
      {
        nama: "Bahan Alam Sekitar",
        deskripsi: "Bahan lain di sekitar dusun, dipakai menyesuaikan ketersediaan dan jenis kerajinan.",
        warna: `linear-gradient(150deg, ${BORDER}, ${BODY_TEXT})`,
      },
    ],
  },
  produk: {
    heading: "Ragam Kerajinan Tangan",
    intro:
      "Beberapa jenis kerajinan yang biasa dibuat warga Dusun Segelan. Ketersediaan, ukuran, dan bentuk bisa berbeda tiap pesanan, silakan konfirmasi langsung lewat WhatsApp.",
    items: [
      {
        nama: "Kerajinan Batok Kelapa",
        deskripsi: "Tempurung kelapa dibersihkan, dihaluskan, lalu dibentuk menjadi wadah maupun pernak-pernik rumah tangga.",
        bahan: "Batok kelapa pilihan",
        fungsi: "Wadah, hiasan, suvenir",
        karakter: "Kokoh & bertekstur alami",
        ikon: "batok" as const,
        img: IMAGES.produk.batok,
      },
      {
        nama: "Anyaman Bambu",
        deskripsi: "Bilah bambu dianyam menjadi perabot dan wadah sederhana untuk kebutuhan sehari-hari.",
        bahan: "Bilah bambu",
        fungsi: "Perabot rumah tangga, suvenir",
        karakter: "Rapi & fleksibel bentuknya",
        ikon: "anyaman" as const,
        img: IMAGES.produk.anyaman,
      },
      {
        nama: "Suvenir Bahan Alam",
        deskripsi: "Bahan-bahan alam yang tersedia di sekitar dusun diolah warga menjadi suvenir dan pernak-pernik khas.",
        bahan: "Bahan alam sekitar (menyesuaikan ketersediaan)",
        fungsi: "Suvenir, oleh-oleh, hiasan",
        karakter: "Ringan & mudah dibawa",
        ikon: "suvenir" as const,
        img: IMAGES.produk.souvenir,
      },
      {
        nama: "Pesanan Khusus",
        deskripsi: "Terbuka untuk pesanan sesuai kebutuhan. Desain, ukuran, dan jumlah bisa didiskusikan langsung dengan pengrajin.",
        bahan: "Menyesuaikan permintaan",
        fungsi: "Custom order",
        karakter: "Menyesuaikan permintaan Anda",
        ikon: "custom" as const,
        img: IMAGES.produk.custom,
      },
    ],
    catatan: "Detail bahan, ukuran, dan harga pada tiap produk bersifat gambaran umum. Untuk spesifikasi dan ketersediaan terbaru, silakan hubungi kami.",
  },
  proses: {
    heading: "Dari Bahan Mentah Jadi Karya",
    intro: "Prosesnya kelihatan sederhana, tapi tiap tahap butuh ketelatenan supaya hasil akhirnya rapi dan tahan lama.",
    langkah: [
      { label: "Bahan Mentah", judul: "Pemilihan Bahan", deskripsi: "Pengrajin memilih bahan alam sekitar, seperti batok kelapa atau bilah bambu, dengan kualitas yang paling sesuai untuk diolah." },
      { label: "Dipilih", judul: "Persiapan Bahan", deskripsi: "Bahan dibersihkan dan dipilah lebih dulu, memisahkan mana yang layak lanjut ke tahap pengolahan." },
      { label: "Diolah", judul: "Proses Pengolahan", deskripsi: "Bahan dipotong, direndam, atau dihaluskan sesuai kebutuhan, tergantung jenis kerajinan yang akan dibuat." },
      { label: "Dibentuk", judul: "Pembentukan", deskripsi: "Bahan dibentuk oleh tangan pengrajin menjadi wadah, hiasan, atau produk lain sesuai desain yang diinginkan." },
      { label: "Menjadi Karya", judul: "Finishing", deskripsi: "Tahap akhir berupa penghalusan permukaan dan pemeriksaan mutu, supaya hasil kerajinan rapi dan siap dipakai." },
    ],
  },
  rawCrafted: {
    heading: "Dari Bahan ke Karya",
    intro: "Potret sederhana bagaimana bahan mentah berubah wujud menjadi kerajinan siap pakai.",
    before: { img: IMAGES.rawCrafted.before, label: "Bahan Mentah", caption: "Batok kelapa sebelum diolah" },
    after: { img: IMAGES.rawCrafted.after, label: "Karya Jadi", caption: "Hasil kerajinan siap pakai" },
    // TODO: ganti dua foto di atas dengan foto asli "sebelum" & "sesudah" saat sudah tersedia
  },
  karakter: {
    heading: "Karakter Kerajinan Balesari",
    intro: "Bukan produksi massal — tiap barang lewat tangan orang yang sama, dari awal sampai akhir.",
    nilai: [
      { judul: "Dikerjakan Manual", deskripsi: "Setiap produk melewati proses pengerjaan langsung oleh tangan pengrajin." },
      { judul: "Bahan Lokal", deskripsi: "Memanfaatkan bahan yang tersedia di lingkungan sekitar." },
      { judul: "Warisan Keterampilan", deskripsi: "Pengetahuan dan teknik pengerjaan diwariskan dari generasi ke generasi." },
    ],
    fakta: [
      { angka: "100%", label: "buatan tangan, tanpa mesin pabrik" },
      { angka: "Turun-Temurun", label: "keterampilan antargenerasi" },
      { angka: "4 Jenis", label: "ragam karya yang bisa dipesan" },
    ],
  },
  galeri: {
    heading: "Dinding Dokumentasi Kerajinan",
    intro: "Cuplikan suasana dan proses kerajinan tangan warga Dusun Segelan.",
    // TODO: ganti dengan foto dokumentasi kerajinan tangan asli saat sudah tersedia
    items: [
      { img: IMAGES.gallery[0], alt: "Dokumentasi kerajinan tangan warga Dusun Segelan (placeholder)", caption: "Suasana dusun" },
      { img: IMAGES.gallery[1], alt: "Proses pengolahan bahan kerajinan tangan warga (placeholder)", caption: "Proses pengolahan" },
      { img: IMAGES.gallery[2], alt: "Hasil kerajinan tangan warga Desa Balesari (placeholder)", caption: "Hasil karya" },
      { img: IMAGES.gallery[3], alt: "Bahan baku kerajinan tangan warga (placeholder)", caption: "Bahan baku" },
      { img: IMAGES.gallery[4], alt: "Detail tekstur kerajinan tangan warga (placeholder)", caption: "Detail tekstur" },
    ],
    ctaLabel: "Lihat Selengkapnya",
    ctaHref: "/galeri?kategori=kerajinan",
  },
  story: {
    eyebrow: "Cerita di Balik Karya",
    heading: "Setiap Keping Punya Ceritanya Sendiri",
    paragraf: "Warga tidak sekadar membuat barang. Ada proses memilih, mencoba, dan memperbaiki, sebelum sebuah bahan sederhana pantas disebut karya.",
    kutipan: "Bahan seadanya, asal telaten, bisa jadi sesuatu yang berguna.",
    // TODO: ganti dengan kutipan asli dari pengrajin, beserta namanya bila bersedia dicantumkan
    sumber: "Pengrajin kerajinan tangan, Dusun Segelan",
    img: IMAGES.story,
  },
  lainnya: {
    heading: "Jelajahi Potensi Lainnya",
    items: [
      { slug: "/biting", nama: "Biting Bambu", pancingan: "Lidi bambu untuk tusuk pentol, sempol, sate, dan rangka dupa.", img: "/images/dokum_biting10.webp", alt: "Ikatan biting bambu hasil serutan tangan warga Dusun Segelan", aksen: "#4E7248" },
      { slug: "/kopi", nama: "Kopi Balesari", pancingan: "Biji kopi lereng Gunung Kawi, disangrai tradisional.", img: "/images/dokum_kopi5.webp", alt: "Biji kopi dari kebun warga Desa Balesari", aksen: "#6B4226" },
    ],
  },
  cta: {
    heading: "Tertarik dengan Kerajinan Balesari?",
    deskripsi: "Kami terbuka untuk pemesanan, kunjungan, maupun kerja sama.",
    waNumber: "6281234567890", // TODO: ganti dengan nomor WhatsApp asli
    waText: "Halo, saya tertarik dengan kerajinan tangan dari Desa Balesari.",
    label: "Hubungi via WhatsApp",
  },
  footer: {
    brand: "Potensi Balesari",
    tagline: "Profil potensi dan UMKM Dusun Segelan, Desa Balesari, dari lereng Gunung Kawi untuk lebih banyak orang.",
    alamat: "Dusun Segelan, Desa Balesari, Kec. Ngajum, Kab. Malang, Jawa Timur",
    kredit: `© ${new Date().getFullYear()} KKN 165 UMM × Warga Desa Balesari`,
    kolomProduk: [
      { label: "Biting Bambu", href: "/biting" },
      { label: "Kopi Balesari", href: "/kopi" },
      { label: "Batok Kelapa", href: "/batok-kelapa" },
    ],
    kolomHalaman: [
      { label: "Tentang Desa", href: "/#sekilas-desa" },
      { label: "Galeri", href: "/#galeri" },
      { label: "Lokasi", href: "/#lokasi" },
    ],
  },
};

/* ============================================================
   ORNAMEN SVG & MOTIF — dunia visual "kerajinan", bukan bambu/kopi
   ============================================================ */

/* Logo mini: ruas bambu (identitas situs, tetap sama di semua halaman) */
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

/* Batok kelapa terbelah — siluet dekorasi statis (bukan yang jatuh) */
function BatokKelapa({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden="true" className={className} style={style}>
      <path d="M2 12 Q 32 24 62 12 L62 14 C 62 34 49 46 32 46 C 15 46 2 34 2 14 Z" fill="currentColor" />
      <ellipse cx="32" cy="11" rx="29" ry="7" fill="currentColor" opacity="0.45" />
      <path d="M13 24 q 4 12 11 16 M51 24 q -4 12 -11 16" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.5" />
    </svg>
  );
}

/* Garis serat — motif khas kerajinan (bukan daun bambu) */
function GarisSerat({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 60" aria-hidden="true" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M0 10 Q 50 2 100 12 T 200 8" opacity="0.5" />
      <path d="M0 28 Q 50 20 100 30 T 200 26" opacity="0.7" />
      <path d="M0 46 Q 50 38 100 48 T 200 44" opacity="0.5" />
    </svg>
  );
}

/* Keping tanah liat — bentuk organik lembut, dekorasi latar */
function KepingTanah({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className={className} style={style}>
      <path
        d="M40 20 C 90 -10 170 20 185 70 C 198 115 160 155 105 158 C 50 161 5 130 3 85 C 1 50 5 40 40 20 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Pembatas gelombang antar-section */
function Wave({ fill, flip = false, className = "" }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 88"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-12 w-full sm:h-[88px] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0,46 C180,86 360,6 560,30 C760,54 900,84 1080,60 C1230,40 1340,14 1440,40 L1440,88 L0,88 Z" fill={fill} />
    </svg>
  );
}

/* Ikon per-kartu produk */
const ikonProduk: Record<string, React.ReactNode> = {
  batok: <Shell className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />,
  anyaman: <Layers className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />,
  suvenir: <Gift className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />,
  custom: <Hammer className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />,
};

const ikonProses = [
  <Leaf key="0" className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />,
  <Droplets key="1" className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />,
  <Layers key="2" className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />,
  <Hammer key="3" className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />,
  <Sparkles key="4" className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />,
];

const ikonNilai = [
  <Hand key="0" className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />,
  <Sun key="1" className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />,
  <Users key="2" className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />,
];

/* ============================================================
   HALAMAN
   ============================================================ */
export default function KerajinanTanganPage() {
  const c = content;
  const waHref = `https://wa.me/${c.cta.waNumber}?text=${encodeURIComponent(c.cta.waText)}`;
  const marqueeItems = [...c.marquee, ...c.marquee];

  return (
    <>
      {/* Animasi khas: keping batok kelapa jatuh sekali saat halaman dibuka.
          Murni CSS (lihat komponen), tidak menambah dependency baru. */}
      <HujanBatok jumlah={10} />

      <BotChat
        judul="Tanya Kerajinan"
        systemPrompt="Kamu asisten website Potensi Balesari.
        Pengunjung sedang membuka halaman KERAJINAN TANGAN dari Dusun Segelan.
        Kerajinan tangan di sini mencakup olahan batok kelapa (wadah, hiasan, suvenir), anyaman bambu (perabot rumah tangga, suvenir), suvenir dari bahan alam sekitar, dan pesanan khusus (custom order).
        Semua dikerjakan manual oleh warga di rumah masing-masing, memakai bahan dari lingkungan sekitar dusun, dengan keterampilan yang diwariskan turun-temurun.
        Jawab singkat tapi ramah dalam bahasa Indonesia santai, maksimal 3 kalimat.
        Untuk harga, ketersediaan, dan detail pesanan, arahkan ke WhatsApp karena bisa berubah dan menyesuaikan pesanan.
        Kalau user memancingmu keluar dari topik selalu arahkan kembali ke topik dengan halus.
        Kalau user menanyakan tentang Radya, jawab dia adalah salah satu mahasiswa kkn yang mengembangkan website yang keren ini."
        sapaan="Hai! Mau tanya soal kerajinan tangan Balesari?"
        saran={["Apa saja jenis kerajinannya?", "Bahannya dari mana?", "Cara pesannya gimana?"]}
      />

      <main className={`${fraunces.variable} flex-1 overflow-x-clip`} style={{ backgroundColor: WARM_SAND, color: DARK_TEXT }}>
        <style>{`
        .font-display { font-family: var(--font-fraunces), Georgia, serif; }

        html { scroll-padding-top: 84px; }
        @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }

        /* Motif anyaman: dua arah garis silang, kerapatan renggang khas serat */
        .motif-anyaman {
          background-image:
            repeating-linear-gradient(48deg, rgba(80,55,43,0.07) 0 2px, transparent 2px 18px),
            repeating-linear-gradient(-42deg, rgba(80,55,43,0.06) 0 2px, transparent 2px 18px);
        }
        /* Motif titik lembut, dipakai di atas dasar gelap */
        .motif-titik {
          background-image: radial-gradient(rgba(241,231,213,0.14) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }
        /* Efek "selotip kertas" untuk dinding dokumentasi */
        .selotip::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          width: 46px;
          height: 20px;
          background: rgba(241, 231, 213, 0.75);
          border: 1px solid rgba(80,55,43,0.12);
          transform: translateX(-50%) rotate(-3deg);
          box-shadow: 0 2px 4px rgba(63,48,39,0.12);
        }

        /* Navbar glass → menggelap saat scroll */
        @supports (animation-timeline: scroll()) {
          .navbar-glass { animation: navbar-solid linear both; animation-timeline: scroll(); animation-range: 0 480px; }
        }
        @keyframes navbar-solid { to { background-color: rgba(80, 55, 43, 0.95); } }

        @supports (animation-timeline: view()) {
          @media (prefers-reduced-motion: no-preference) {
            .hero-timeline { view-timeline: --heroKT block; }
            .hero-drift { animation: heroKT-drift linear both; animation-timeline: --heroKT; animation-range: exit 0% exit 100%; }
            .reveal { animation: reveal-up linear both; animation-timeline: view(); animation-range: entry 0% entry 38%; }
            .garis-jalan { animation: garis-tumbuh linear both; animation-timeline: view(); animation-range: entry 10% entry 70%; }
          }
        }
        @keyframes heroKT-drift { to { transform: translateY(-6%); opacity: 0.3; } }
        @keyframes reveal-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
        @keyframes garis-tumbuh { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: no-preference) {
          .marquee-track { animation: marquee 26s linear infinite; }
        }
        @keyframes marquee { to { transform: translateX(-50%); } }
      `}</style>

        {/* ================= NAVBAR ================= */}
        <header className="navbar-glass fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md" style={{ backgroundColor: "rgba(80,55,43,0.3)" }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold" style={{ color: OAT_CREAM }}>
              <Image src="/images/logo.png" alt="Logo Potensi Balesari" width={45} height={45} priority className="h-9 w-auto" />
              {c.nav.brand}
            </Link>
            <nav aria-label="Navigasi utama" className="hidden md:block">
              <ul className="flex items-center gap-7 text-sm font-medium" style={{ color: "rgba(241,231,213,0.85)" }}>
                {c.nav.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:opacity-80">
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
              className="rounded-full px-4 py-2 text-xs font-semibold shadow transition hover:opacity-90 sm:text-sm"
              style={{ backgroundColor: OAT_CREAM, color: WALNUT }}
            >
              {c.nav.cta}
            </a>
          </div>
        </header>

        {/* ================= 1. HERO ================= */}
        <section
          aria-label="Kerajinan Tangan Dusun Segelan"
          className="hero-timeline relative isolate overflow-hidden text-[#F1E7D5]"
          style={{ background: `linear-gradient(180deg, #6B4A38 0%, #50372B 55%, #3A281F 100%)` }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(241,231,213,0.10),transparent_62%)]" />
          <div aria-hidden="true" className="motif-titik absolute inset-0 opacity-40" />
          <GarisSerat className="pointer-events-none absolute inset-x-0 top-1/3 h-16 w-full text-[#F1E7D5]/10" />
          <KepingTanah className="pointer-events-none absolute -right-16 -bottom-16 hidden h-72 w-auto text-[#F1E7D5]/[0.06] lg:block" />

          <div className="hero-drift relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-22 pb-24 sm:pt-26 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
            <div>
              <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#F1E7D5]/60">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-[#F1E7D5]">{c.hero.breadcrumb.home}</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-medium text-[#F1E7D5]/90">{c.hero.breadcrumb.current}</li>
                </ol>
              </nav>

              <p className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ backgroundColor: TERRACOTTA, color: OAT_CREAM }}>
                <Shell className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {c.hero.badge}
              </p>

              <h1 className="font-display text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-[3.4rem]">
                {c.hero.titleAtas}
                <br />
                <span style={{ color: CLAY_ORANGE }}>{c.hero.titleBawah}</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#F1E7D5]/80 sm:text-lg">{c.hero.subtitle}</p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold shadow-lg transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                style={{ backgroundColor: OAT_CREAM, color: WALNUT }}
              >
                {c.hero.cta} <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>

            {/* foto produk — frame cream, aksen terracotta, sedikit miring */}
            <figure className="relative mx-auto w-full max-w-sm">
              <span aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border-2 border-dashed" style={{ borderColor: "rgba(241,231,213,0.25)" }} />
              <div className="relative rotate-[1.2deg] overflow-hidden rounded-3xl border-8 shadow-2xl" style={{ borderColor: CARD_LIGHT, backgroundColor: BORDER }}>
                <div className="relative aspect-[4/5]">
                  <Image src={c.hero.img} alt={c.hero.imgAlt} fill className="object-cover" priority />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 -left-8 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl sm:-left-11"
                style={{ backgroundColor: CARD_LIGHT }}
              >
                <BatokKelapa className="h-9 w-auto" style={{ color: TERRACOTTA }} />
                <span className="max-w-[7.5rem] text-[11px] leading-tight font-medium" style={{ color: WALNUT }}>{c.hero.caption}</span>
              </div>
            </figure>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20">
            <Wave fill={WARM_SAND} />
          </div>
        </section>

        {/* ============ PITA MARQUEE ============ */}
        <div aria-hidden="true" className="overflow-hidden border-y py-3.5" style={{ backgroundColor: OAT_CREAM, borderColor: BORDER }}>
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap px-4">
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-medium tracking-[0.14em] uppercase" style={{ color: BODY_TEXT }}>
                {item}
                <Feather className="h-3.5 w-3.5" style={{ color: TERRACOTTA }} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        {/* ================= 2. CERITA ================= */}
        <section id="cerita" aria-labelledby="cerita-heading" className="relative overflow-hidden py-20 sm:py-24" style={{ backgroundColor: WARM_SAND }}>
          <GarisSerat className="pointer-events-none absolute top-8 -right-4 hidden h-20 w-64 lg:block" style={{ color: TERRACOTTA, opacity: 0.18 }} />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TERRACOTTA }}>Kenalan Dulu</p>
              <h2 id="cerita-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: DARK_TEXT }}>{c.cerita.heading}</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg" style={{ color: BODY_TEXT }}>
                {c.cerita.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {c.cerita.fakta.map((f) => (
                  <li key={f} className="rounded-full border px-4 py-1.5 text-xs font-medium" style={{ borderColor: BORDER, backgroundColor: CARD_LIGHT, color: DARK_TEXT }}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal relative rounded-3xl border p-6 shadow-sm sm:p-8" style={{ borderColor: BORDER, backgroundColor: CARD_LIGHT }}>
              <span aria-hidden="true" className="absolute top-6 right-6 opacity-[0.12]"><Shell className="h-16 w-16" style={{ color: WALNUT }} /></span>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: TERRACOTTA, color: OAT_CREAM }}>
                <Shell className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="font-display text-lg font-semibold" style={{ color: DARK_TEXT }}>{c.cerita.sisi.heading}</p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: BODY_TEXT }}>{c.cerita.sisi.paragraf}</p>
            </div>
          </div>
        </section>

        {/* ================= 3. MATERIAL PALETTE ================= */}
        <section id="material" aria-labelledby="material-heading" className="relative overflow-hidden" style={{ backgroundColor: OAT_CREAM }}>
          <div className="motif-anyaman absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TERRACOTTA }}>Material Palette</p>
            <h2 id="material-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: DARK_TEXT }}>{c.material.heading}</h2>
            <p className="mt-3 max-w-2xl" style={{ color: BODY_TEXT }}>{c.material.intro}</p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {c.material.items.map((m) => (
                <div key={m.nama} className="reveal flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span
                    aria-hidden="true"
                    className="mb-5 block h-24 w-24 rounded-full shadow-inner ring-4"
                    style={{ background: m.warna, boxShadow: "inset 0 4px 10px rgba(0,0,0,0.18)", "--tw-ring-color": CARD_LIGHT } as React.CSSProperties}
                  />
                  <h3 className="font-display text-lg font-semibold" style={{ color: DARK_TEXT }}>{m.nama}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed" style={{ color: BODY_TEXT }}>{m.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. PRODUK — CRAFT DETAIL CARD ================= */}
        <section id="produk" aria-labelledby="produk-heading" className="relative overflow-hidden" style={{ backgroundColor: WALNUT }}>
          <Wave fill={OAT_CREAM} flip className="absolute inset-x-0 top-0" />
          <div className="motif-titik absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <KepingTanah className="pointer-events-none absolute bottom-10 -left-10 hidden h-40 w-auto lg:block" style={{ color: "rgba(241,231,213,0.05)" }} />

          <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: CLAY_ORANGE }}>Katalog Karya</p>
            <h2 id="produk-heading" className="font-display text-3xl font-semibold text-[#F1E7D5] sm:text-4xl">{c.produk.heading}</h2>
            <p className="mt-3 max-w-2xl text-[#F1E7D5]/70">{c.produk.intro}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.produk.items.map((p) => (
                <article
                  key={p.nama}
                  className="reveal group relative flex flex-col overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1.5 motion-reduce:hover:translate-y-0"
                  style={{ backgroundColor: CARD_LIGHT }}
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={`Ilustrasi ${p.nama}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full shadow"
                      style={{ backgroundColor: TERRACOTTA, color: OAT_CREAM }}
                    >
                      {ikonProduk[p.ikon]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-1.5 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase" style={{ backgroundColor: WARM_SAND, color: WALNUT }}>
                      {p.karakter}
                    </span>
                    <h3 className="font-display text-base font-semibold" style={{ color: DARK_TEXT }}>{p.nama}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: BODY_TEXT }}>{p.deskripsi}</p>
                    <dl className="mt-3 space-y-1 border-t pt-3 text-[11px]" style={{ borderColor: BORDER }}>
                      <div className="flex gap-1.5"><dt className="shrink-0 font-semibold" style={{ color: TERRACOTTA }}>Bahan:</dt><dd style={{ color: BODY_TEXT }}>{p.bahan}</dd></div>
                      <div className="flex gap-1.5"><dt className="shrink-0 font-semibold" style={{ color: TERRACOTTA }}>Guna:</dt><dd style={{ color: BODY_TEXT }}>{p.fungsi}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#F1E7D5]/60 italic">{c.produk.catatan}</p>
          </div>
        </section>

        {/* ================= 5. PROSES — MATERIAL TO PRODUCT ================= */}
        <section id="proses" aria-labelledby="proses-heading" className="relative overflow-hidden" style={{ backgroundColor: WARM_SAND }}>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TERRACOTTA }}>Material to Product</p>
            <h2 id="proses-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: DARK_TEXT }}>{c.proses.heading}</h2>
            <p className="mt-3 max-w-2xl" style={{ color: BODY_TEXT }}>{c.proses.intro}</p>

            {/* stepper horizontal dengan connector line yang "tumbuh" saat discroll */}
            <div className="mt-14 hidden lg:block">
              <div className="relative">
                <span aria-hidden="true" className="garis-jalan absolute top-5 right-0 left-0 h-0.5 origin-left" style={{ backgroundColor: BORDER }} />
                <ol className="relative grid grid-cols-5 gap-4">
                  {c.proses.langkah.map((l, i) => (
                    <li key={l.judul} className="reveal flex flex-col items-center text-center">
                      <span
                        aria-hidden="true"
                        className="font-display relative z-10 mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow"
                        style={{ backgroundColor: i === c.proses.langkah.length - 1 ? TERRACOTTA : CARD_LIGHT, color: i === c.proses.langkah.length - 1 ? OAT_CREAM : WALNUT, border: `2px solid ${BORDER}` }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: MUTED_GREEN }}>{ikonProses[i]}</span>
                      <span className="mt-2 mb-1 text-[11px] font-semibold tracking-wide uppercase" style={{ color: TERRACOTTA }}>{l.label}</span>
                      <h3 className="font-display text-sm font-semibold" style={{ color: DARK_TEXT }}>{l.judul}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed" style={{ color: BODY_TEXT }}>{l.deskripsi}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* versi mobile/tablet: kartu vertikal dengan garis penghubung */}
            <ol className="relative mt-12 space-y-6 border-l-2 pl-6 lg:hidden" style={{ borderColor: BORDER }}>
              {c.proses.langkah.map((l, i) => (
                <li key={l.judul} className="reveal relative">
                  <span
                    aria-hidden="true"
                    className="font-display absolute top-0 -left-[31px] flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow"
                    style={{ backgroundColor: i === c.proses.langkah.length - 1 ? TERRACOTTA : CARD_LIGHT, color: i === c.proses.langkah.length - 1 ? OAT_CREAM : WALNUT, border: `2px solid ${BORDER}` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: TERRACOTTA }}>{l.label}</span>
                  <h3 className="font-display text-base font-semibold" style={{ color: DARK_TEXT }}>{l.judul}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: BODY_TEXT }}>{l.deskripsi}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= 6. RAW → CRAFTED ================= */}
        <section aria-labelledby="raw-heading" className="relative overflow-hidden" style={{ backgroundColor: OAT_CREAM }}>
          <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TERRACOTTA }}>Sebelum &amp; Sesudah</p>
            <h2 id="raw-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: DARK_TEXT }}>{c.rawCrafted.heading}</h2>
            <p className="mt-3 max-w-2xl" style={{ color: BODY_TEXT }}>{c.rawCrafted.intro}</p>

            <div className="mt-10 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              {[c.rawCrafted.before, c.rawCrafted.after].map((sisi, i) => (
                <div key={sisi.label} className="contents">
                  <figure className={`reveal relative overflow-hidden rounded-2xl border-4 shadow-lg ${i === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`} style={{ borderColor: CARD_LIGHT }}>
                    <div className="relative aspect-[4/3]">
                      <Image src={sisi.img} alt={sisi.caption} fill className="object-cover" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 px-4 py-2.5" style={{ backgroundColor: "rgba(80,55,43,0.85)" }}>
                      <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: CLAY_ORANGE }}>{sisi.label}</span>
                      <span className="block text-xs text-[#F1E7D5]/85">{sisi.caption}</span>
                    </figcaption>
                  </figure>
                  {i === 0 && (
                    <div aria-hidden="true" className="flex items-center justify-center py-2 sm:py-0">
                      <span className="flex h-11 w-11 rotate-90 items-center justify-center rounded-full shadow sm:rotate-0" style={{ backgroundColor: TERRACOTTA, color: OAT_CREAM }}>
                        <ArrowRight className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 7. KARAKTER KERAJINAN (stat non-grid) ================= */}
        <section aria-labelledby="karakter-heading" className="relative overflow-hidden" style={{ backgroundColor: WALNUT }}>
          <div className="motif-titik absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <GarisSerat className="pointer-events-none absolute -bottom-4 left-0 hidden h-20 w-full lg:block" style={{ color: "rgba(241,231,213,0.08)" }} />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: CLAY_ORANGE }}>Craft Statistics</p>
              <h2 id="karakter-heading" className="font-display text-3xl font-semibold text-[#F1E7D5] sm:text-4xl">{c.karakter.heading}</h2>
              <p className="mt-3 text-[#F1E7D5]/70">{c.karakter.intro}</p>
            </div>

            {/* "kalung" fakta singkat, selang-seling posisi, bukan grid rata */}
            <div className="mt-10 flex flex-wrap gap-4">
              {c.karakter.fakta.map((f, i) => (
                <div
                  key={f.angka}
                  className={`reveal flex items-center gap-3 rounded-full py-2.5 pr-5 pl-2.5 shadow ${i % 2 === 1 ? "sm:mt-6" : ""}`}
                  style={{ backgroundColor: "rgba(241,231,213,0.08)", border: `1px solid rgba(241,231,213,0.18)` }}
                >
                  <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: TERRACOTTA, color: OAT_CREAM }}>
                    {f.angka.length > 4 ? "✓" : f.angka}
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-sm font-semibold text-[#F1E7D5]">{f.angka}</p>
                    <p className="text-xs text-[#F1E7D5]/65">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* nilai/keunggulan, tetap dipertahankan sebagai kartu tapi lebih ringkas & bertekstur */}
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {c.karakter.nilai.map((item, i) => (
                <div key={item.judul} className="reveal relative overflow-hidden rounded-2xl p-6" style={{ backgroundColor: "rgba(241,231,213,0.06)", border: "1px solid rgba(241,231,213,0.14)" }}>
                  <span aria-hidden="true" className="absolute -top-4 -right-4 opacity-[0.15]"><KepingTanah className="h-24 w-24" style={{ color: CLAY_ORANGE }} /></span>
                  <div className="relative mb-4 text-[#E9DDC8]">{ikonNilai[i]}</div>
                  <h3 className="font-display relative text-lg font-semibold text-[#F1E7D5]">{item.judul}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[#F1E7D5]/70">{item.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 8. DOCUMENTATION WALL ================= */}
        <section aria-labelledby="galeri-heading" className="relative overflow-hidden" style={{ backgroundColor: WARM_SAND }}>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TERRACOTTA }}>Documentation Wall</p>
                <h2 id="galeri-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: DARK_TEXT }}>{c.galeri.heading}</h2>
                <p className="mt-3 max-w-xl" style={{ color: BODY_TEXT }}>{c.galeri.intro}</p>
              </div>
              <Link
                href={c.galeri.ctaHref}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                style={{ borderColor: WALNUT, color: WALNUT }}
              >
                {c.galeri.ctaLabel} <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            {/* masonry asimetris: baris/kolom bervariasi, sedikit miring, efek selotip */}
            <ul className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-5 sm:grid-cols-4 sm:auto-rows-[160px]">
              {c.galeri.items.map((foto, i) => {
                const span = [
                  "col-span-2 row-span-2",
                  "col-span-1 row-span-1",
                  "col-span-1 row-span-2",
                  "col-span-2 row-span-1",
                  "col-span-1 row-span-1",
                ][i % 5];
                const miring = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]", "rotate-[0.8deg]", "-rotate-1"][i % 5];
                return (
                  <li
                    key={i}
                    className={`selotip reveal relative ${span} ${miring} overflow-hidden rounded-lg border-[6px] shadow-lg transition hover:z-10 hover:scale-[1.03] hover:rotate-0 motion-reduce:hover:scale-100`}
                    style={{ borderColor: CARD_LIGHT, backgroundColor: WALNUT }}
                  >
                    <Image src={foto.img} alt={foto.alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                    <span className="absolute right-1.5 bottom-1.5 rounded px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: "rgba(80,55,43,0.75)", color: OAT_CREAM }}>
                      {foto.caption}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ================= 9. HANDMADE STORY (editorial + quote) ================= */}
        <section aria-labelledby="story-heading" className="relative overflow-hidden" style={{ backgroundColor: WALNUT }}>
          <div className="relative mx-auto grid max-w-6xl items-stretch gap-0 overflow-hidden rounded-none sm:mx-6 sm:my-20 sm:grid-cols-2 sm:rounded-3xl sm:shadow-2xl lg:mx-auto">
            <div className="relative min-h-[340px]">
              <Image src={c.story.img} alt={c.story.heading} fill className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(63,48,39,0.55), transparent 45%)" }} />
            </div>
            <div className="relative flex flex-col justify-center px-8 py-14 sm:px-10" style={{ backgroundColor: WALNUT }}>
              <Quote className="mb-4 h-8 w-8" style={{ color: CLAY_ORANGE }} aria-hidden="true" />
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: CLAY_ORANGE }}>{c.story.eyebrow}</p>
              <h2 id="story-heading" className="font-display text-2xl font-semibold text-[#F1E7D5] sm:text-3xl">{c.story.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#F1E7D5]/75">{c.story.paragraf}</p>
              <blockquote className="mt-6 border-l-2 pl-4 text-base leading-relaxed font-medium text-[#F1E7D5] italic" style={{ borderColor: TERRACOTTA }}>
                “{c.story.kutipan}”
                <footer className="mt-2 text-xs font-normal text-[#F1E7D5]/60 not-italic">— {c.story.sumber}</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ================= 10. CTA ================= */}
        <section aria-labelledby="cta-heading" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24" style={{ backgroundColor: WARM_SAND }}>
          <div className="reveal relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-2xl sm:px-16" style={{ background: `linear-gradient(135deg, ${TERRACOTTA}, ${WALNUT})`, color: OAT_CREAM }}>
            <div aria-hidden="true" className="motif-titik absolute inset-0 opacity-25" />
            <BatokKelapa className="pointer-events-none absolute -bottom-14 -left-8 h-48 w-auto opacity-10" />
            <BatokKelapa className="pointer-events-none absolute -top-10 -right-8 h-40 w-auto -scale-x-100 opacity-10" />
            <div className="relative">
              <h2 id="cta-heading" className="font-display text-2xl font-semibold sm:text-3xl">{c.cta.heading}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm opacity-85 sm:text-base">{c.cta.deskripsi}</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold shadow-lg transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                style={{ backgroundColor: OAT_CREAM, color: WALNUT }}
              >
                {c.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= POTENSI LAINNYA ================= */}
        <section aria-labelledby="lainnya-heading" className="relative mx-auto max-w-6xl px-6 pb-24" style={{ backgroundColor: WARM_SAND }}>
          <h2 id="lainnya-heading" className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: DARK_TEXT }}>{c.lainnya.heading}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {c.lainnya.items.map((item) => (
              <article key={item.slug} className="group reveal relative overflow-hidden rounded-2xl border shadow-md transition hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0" style={{ borderColor: BORDER, backgroundColor: CARD_LIGHT }}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: item.aksen }} />
                <Link href={item.slug} className="flex items-center gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: WALNUT }}>
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl" style={{ backgroundColor: BORDER }}>
                    <Image src={item.img} alt={item.alt} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold" style={{ color: DARK_TEXT }}>{item.nama}</h3>
                    <p className="mt-1 text-sm" style={{ color: BODY_TEXT }}>{item.pancingan}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 motion-reduce:group-hover:gap-1.5" style={{ color: item.aksen }}>
                      Lihat <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="relative" style={{ backgroundColor: WALNUT, color: OAT_CREAM }}>
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <LogoBambu className="h-7 w-auto" />
                {c.footer.brand}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#F1E7D5]/70">{c.footer.tagline}</p>
              <p className="mt-4 text-sm text-[#F1E7D5]/60">📍 {c.footer.alamat}</p>
            </div>

            <nav aria-label="Produk">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: CLAY_ORANGE }}>Produk</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F1E7D5]/80">
                {c.footer.kolomProduk.map((n) => (
                  <li key={n.href}><Link href={n.href} className="transition hover:text-[#F1E7D5] hover:underline">{n.label}</Link></li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Halaman">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: CLAY_ORANGE }}>Jelajah</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F1E7D5]/80">
                {c.footer.kolomHalaman.map((n) => (
                  <li key={n.href}><Link href={n.href} className="transition hover:text-[#F1E7D5] hover:underline">{n.label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="relative border-t border-[#F1E7D5]/10">
            <p className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-[#F1E7D5]/50 sm:text-left">{c.footer.kredit}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
