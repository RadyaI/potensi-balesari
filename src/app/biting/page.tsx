// src/app/biting/page.tsx
// Halaman detail — Biting Bambu Segelan (REVISI humas)
//
// - Fokus utama: tusuk makanan (pentol, sempol, sate); dupa jadi contoh penggunaan
// - Katalog ukuran 30 / 40 / 50 cm bergaya visual
// - Background diberi motif & taburan siluet biar tidak polos
// - Profil pengrajin tanpa nama (diringkas jadi narasi umum)
// - Harga: arahkan tanya via WA karena bisa berubah
// - Animasi: parallax hero + reveal saat scroll (murni CSS scroll-driven),
//   daun gugur, marquee, tusuk pentol bergoyang, bara dupa berpendar
//
// CATATAN:
// - Navbar & footer masih duplikat dari home; nanti dirapikan ke layout.tsx.
// - Bagian bertanda TODO = masih asumsi, ganti saat data real ada.
// - Semua gambar sementara ke /images/desa-balesari.jpeg (const IMG).

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import BotChat from "@/components/BotChat";

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
    "Biting Bambu Segelan - Tusuk Pentol, Sempol, Sate & Dupa | Desa Balesari, Ngajum, Malang",
  description:
    "Biting bambu serut tangan dari Dusun Segelan, Desa Balesari, Ngajum, Kabupaten Malang: lidi bambu 30, 40, dan 50 cm untuk tusuk pentol, sempol, sate, hingga rangka dupa. Kapasitas ton-an per minggu.",
  keywords: [
    "biting bambu",
    "tusuk pentol bambu",
    "tusuk sempol bambu",
    "tusuk sate bambu",
    "lidi dupa",
    "kerajinan bambu Malang",
    "Desa Balesari",
    "Dusun Segelan",
    "Ngajum",
    "bambu petung",
  ],
  openGraph: {
    title: "Biting Bambu Segelan — Lidi Serut Tangan dari Balesari",
    description:
      "Di balik pentol, sempol, sate, sampai dupa, ada lidi bambu dari Dusun Segelan yang diserut satu per satu oleh tangan warga.",
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
const AKSEN = "#4E7248"; // hijau bambu, aksen produk ini

const content = {
  nav: {
    brand: "Potensi Balesari",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Apa itu Biting", href: "#apa-itu" },
      { label: "Proses", href: "#proses" },
      { label: "Ukuran", href: "#ukuran" },
    ],
    cta: "Pesan Biting",
  },
  hero: {
    breadcrumb: { home: "Beranda", current: "Biting Bambu" },
    badge: "Kerajinan · Dusun Segelan",
    title: "Biting Bambu: Lidi Untuk Tusuk Pentol, Sempol, dan Sate",
    subtitle:
      "Dari pentol di gerobak langganan sampai sate di angkringan, banyak jajanan bertumpu pada lidi bambu kecil ini. Dupa pun memakainya sebagai rangka. Dari Dusun Segelan, lidi-lidi itu diserut satu per satu oleh tangan warga, sudah lebih dari dua puluh tahun.",
    img: "/images/dokum_biting5.jpg",
    imgAlt:
      "Ikatan biting bambu hasil serutan tangan pengrajin Dusun Segelan, Desa Balesari",
    stats: [
      { angka: "4–5", satuan: "ton/minggu", label: "produksi dusun saat cuaca cerah" },
      { angka: "40–50", satuan: "warga", label: "terlibat dalam rantai produksi" },
      { angka: "20+", satuan: "tahun", label: "keterampilan diwariskan" },
    ],
    cta: "Pesan via WhatsApp",
  },
  marquee: [
    "Tusuk Pentol",
    "Tusuk Sempol",
    "Tusuk Sate",
    "Rangka Dupa",
    "Serut Tangan",
    "Dusun Segelan",
  ],
  apaItu: {
    heading: "Apa Itu Biting?",
    paragraphs: [
      "Biting adalah lidi bambu tipis, lurus, dan serbaguna. Paling banyak dipakai sebagai tusuk makanan seperti pentol, sempol, sate, sampai aneka jajanan gorengan. Lidi yang sama juga dipakai sebagai rangka batang dupa.",
      "Warga Dusun Segelan sudah lama melayani kedua pasar itu. Mereka sempat memproduksi tusuk bakso sebelum masa pandemi, dan kini serutannya mengalir ke mana pun permintaan datang, dari pedagang makanan sampai pasar dupa.",
    ],
    fakta: [
      "Tusuk pentol, sempol & sate",
      "Rangka batang dupa",
      "Dijual per kilogram",
    ],
    contoh: {
      heading: "Contoh Penggunaannya",
      items: [
        {
          jenis: "pentol" as const,
          judul: "Tusuk Pentol & Bakso",
          keterangan: "Kuat menahan beberapa butir sekaligus, favorit pedagang keliling.",
        },
        {
          jenis: "sempol" as const,
          judul: "Tusuk Sempol",
          keterangan: "Adonan dililitkan langsung ke lidi sebelum digoreng.",
        },
        {
          jenis: "dupa" as const,
          judul: "Rangka Dupa",
          keterangan: "Pasta wangi dibalut ke lidi, ujung polosnya jadi pegangan.",
        },
      ],
    },
  },
  sejarah: {
    heading: "Dari Blitar ke Segelan",
    intro:
      "Sejarah Biting Bambu di Dusun Sagelan",
    milestones: [
      {
        judul: "Berawal dari saudara di Blitar",
        cerita:
          "Mulanya biting dari Segelan disetorkan jauh ke Blitar melalui kerabat, dengan harga kala itu masih sekitar Rp1.200 per kilogram.",
      },
      {
        judul: "Pengepul hadir lebih dekat",
        cerita:
          "Seiring waktu, pengepul muncul di Sumbersari. Warga tak perlu lagi mengirim jauh, hasil serutan cukup disetor dan dijemput mobil.",
      },
      {
        judul: "Menyebar ke seisi dusun",
        cerita:
          "Melihat hasilnya, makin banyak keluarga ikut menyerut. Keterampilan menular dari orang tua ke anak, dari tetangga ke tetangga.",
      },
      {
        judul: "Hari ini",
        cerita:
          "Puluhan warga terlibat dalam rantai produksi, dari penyerut rumahan hingga pengepul bermesin, dengan hasil ton-an biting setiap minggunya.",
      },
    ],
  },
  proses: {
    heading: "Dari Rumpun Bambu Jadi Biting",
    intro:
      "Prosesnya kelihatan sederhana, tapi tiap tahap butuh ketelatenan. Salah pilih bambu saja, lidinya mudah patah.",
    bahan: {
      heading: "Jenis bambu yang biasa digunakan untuk biting.",
      items: [
        {
          nama: "Bambu Petung",
          deskripsi: "Berbatang besar dan tebal, bahan andalan karena seratnya kuat.",
        },
        {
          nama: "Bambu Jawa",
          deskripsi: "Alternatif yang banyak tumbuh di sekitar dusun.",
        },
        {
          nama: "Bambu Apus",
          deskripsi: "Lentur dan mudah dirajang halus.",
        },
      ],
      catatan: "Tidak semua bambu bisa dipakai. Pengrajin memilih batang yang cukup tua langsung dari rumpunnya.",
    },
    langkah: [
      {
        judul: "Menebang & memotong",
        deskripsi: "Bambu tua dipotong per ruas, dipilih bagian yang lurus dan mulus.",
        img: "",
        alt: "",
      },
      {
        judul: "Membelah & membuang hati bambu",
        deskripsi:
          "Ruas dibelah memanjang, lalu bagian dalam yang lunak, disebut hati bambu, dibuang karena mudah patah.",
        img: "",
        alt: "",
      },
      {
        judul: "Merajang jadi lidi",
        deskripsi:
          "Bilah bambu dirajang dan diserut menjadi lidi-lidi tipis berukuran seragam. Tahap inilah yang paling menuntut jam terbang.",
        video: "/images/cuplikan_biting.mp4",
        alt: "Tangan pengrajin menyerut bilah bambu menjadi lidi biting",
      },
      {
        judul: "Menjemur",
        deskripsi:
          "Lidi dijemur sampai benar-benar kering. Saat panas terik, sehari saja cukup.",
        video: "images/cuplikan_biting3.MOV",
        alt: "Menjemur Agar Kering",
      },
      {
        judul: "Menyortir & mengikat",
        deskripsi:
          "Lidi dipilah menurut panjang dan mutu, lalu diikat rapi per bal, siap ditimbang.",
        video: "images/cuplikan_biting2.MOV",
        alt: "",
      },
      {
        judul: "Menyetor ke pengepul",
        deskripsi:
          "Hasil serutan, bisa sampai kuintalan per keluarga, dijemput mobil pengepul dan dibayar tunai di tempat.",
        img: "/images/dokum_biting9.webp",
        alt: "Menyetor ke pengepul",
      },
    ],
    kendala: {
      judul: "Bagaimana Saat Musim Hujan?",
      cerita:
        "Saat matahari tak muncul, lidi tak bisa kering dijemur. Pengrajin menyalakan perapian dan mengeringkan biting di atas baranya. Cara lama yang tetap dipakai sampai sekarang.",
    },
  },
  manualVsMesin: {
    heading: "Serutan Tangan Justru Lebih Rapi",
    intro: "Di dusun ini ada dua cara membuat biting, dan hasilnya tidak sama.",
    manual: {
      judul: "Serut Tangan",
      poin: [
        "Hasil lidi lebih rapi dan halus",
        "Ukuran bisa disesuaikan permintaan",
        "Mengandalkan jam terbang puluhan tahun",
      ],
    },
    mesin: {
      judul: "Mesin Semi-Manual",
      poin: [
        "Lebih cepat, satu mesin bisa 50–100 kg per hari",
        "Cocok untuk volume besar",
        "Kerapian di bawah serutan tangan",
      ],
    },
    insight:
      "Menurut pengrajin, serutan tangan menghasilkan lidi yang lebih rapi. Mesin memang ringkas, tapi hasilnya kalah halus. Keduanya kini berjalan berdampingan: tangan menjaga mutu, mesin mengejar volume.",
  },
  pengrajin: {
    heading: "Warga Pengrajin Biting",
    paragraphs: [
      "Biting di dusun ini dikerjakan oleh keluarga-keluarga penyerut, kebanyakan pasangan suami-istri yang bekerja dari rumah. Ada yang sudah dua puluh tahun menekuninya, dengan keterampilan yang diturunkan dari orang tua ke anak.",
      "Setiap keluarga bisa menghasilkan hingga kuintalan lidi per minggu. Hasilnya dijemput langsung dari rumah dan dibayar di tempat, menjadi penghasilan yang menghidupi dapur sehari-hari.",
    ],
    img: "/images/dokum_biting7.jpg",
    alt: "Warga Dusun Segelan menyerut bambu menjadi biting di teras rumah",
    // TODO: ganti dengan kutipan verbatim hasil rekaman wawancara
    kutipan:
      "Sing penting telaten. Bambu dipilih sing tuwek, dirajang alon-alon, hasile mesti apik.",
    kutipanSumber: "Pengrajin biting, Dusun Segelan",
    harapan:
      "Para pengrajin berharap akses pasar yang lebih luas dan dukungan pengembangan usaha, supaya kerajinan ini terus tumbuh dan makin banyak warga yang terangkat.",
  },
  pemesanan: {
    heading: "Katalog & Pemesanan",
    intro:
      "Biting dijual per kilogram dalam ikatan. Untuk kebutuhan volume besar, mari diskusikan langsung.",
    katalog: {
      heading: "Pilih Panjangnya",
      // TODO: konfirmasi pemetaan ukuran ↔ kegunaan ke pengrajin
      items: [
        { cm: 30, lebar: 58, cocok: "Tusuk pentol & sempol" },
        { cm: 40, lebar: 78, cocok: "Tusuk sate & dupa sedang" },
        { cm: 50, lebar: 100, cocok: "Dupa panjang & kebutuhan khusus" },
      ],
    },
    spesifikasi: [
      { label: "Satuan jual", nilai: "Per kg, diikat per bal" },
      { label: "Varian panjang", nilai: "30, 40, dan 50 cm" },
      { label: "Harga", nilai: "Tanya via WhatsApp" },
      { label: "Kapasitas", nilai: "Kuintalan per minggu per pengrajin" },
      { label: "Pembayaran", nilai: "Tunai / transfer (Bisa diskusi)" }, // TODO: konfirmasi
      { label: "Pengambilan", nilai: "Ambil di tempat / kirim (nego)" }, // TODO: konfirmasi
    ],
    catatan:
      "Harga mengikuti ukuran, proses (tangan atau mesin), dan kondisi pasar, jadi bisa berubah sewaktu-waktu. Chat kami kapan saja untuk penawaran terbaru.",
    cta: {
      heading: "Butuh Pasokan Biting?",
      deskripsi:
        "Hubungi kami untuk harga terkini, contoh produk, atau penjadwalan kunjungan langsung ke Dusun Segelan.",
      waNumber: "6281234567890", // TODO: ganti nomor WhatsApp asli
      waText: "Halo, saya tertarik memesan biting bambu dari Desa Balesari.",
      label: "Tanya Harga & Pesan",
    },
  },
  galeri: {
    heading: "Sekilas dari Dapur Produksi",
    items: [
      { img: "/images/dokum_biting2.jpg", alt: "Warga menyerut bambu menjadi biting di teras rumah" },
      { img: "/images/dokum_biting4.jpg", alt: "Ikatan biting bambu tersusun siap disetor ke pengepul" },
      { img: "/images/dokum_biting1.jpg", alt: "Penjemuran lidi biting di halaman rumah warga" },
      { img: "/images/dokum_biting11.webp", alt: "Rumpun bambu petung di Dusun Segelan" },
    ],
  },
  lainnya: {
    heading: "Jelajahi Potensi Lainnya",
    items: [
      {
        slug: "/kopi",
        nama: "Kopi Balesari",
        pancingan: "Biji kopi lereng Gunung Kawi, disangrai tradisional.",
        img: IMG,
        alt: "Biji kopi dari kebun warga Desa Balesari",
        aksen: "#6B4226",
      },
      {
        slug: "/batok-kelapa",
        nama: "Batok Kelapa",
        pancingan: "Tempurung kelapa diolah jadi arang dan kerajinan.",
        img: IMG,
        alt: "Olahan batok kelapa buatan warga Desa Balesari",
        aksen: "#8B5E3C",
      },
    ],
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
      { label: "Tentang Desa", href: "/#sekilas-desa" },
      { label: "Galeri", href: "/#galeri" },
      { label: "Lokasi", href: "/#lokasi" },
    ],
  },
};

/* ============================================================
   ORNAMEN SVG
   ============================================================ */

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

/* Daun bambu kecil (dekorasi gugur & taburan) */
function DaunBambu({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 24" aria-hidden="true" className={className} style={style} fill="currentColor">
      <path d="M2 12 Q 22 -4 58 4 Q 40 22 10 18 Q 4 16 2 12 Z" />
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

/* Ikatan biting: kipas lidi diikat tali (hiasan besar) */
function IkatanBiting({ className = "" }: { className?: string }) {
  const lidi = [-16, -12, -8, -5, -2, 0, 2, 5, 8, 12, 16];
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" className={className} fill="none">
      <g stroke="#C9B285" strokeWidth="4" strokeLinecap="round">
        {lidi.map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="235"
            x2={100 + Math.tan((deg * Math.PI) / 180) * 210}
            y2="25"
            transform={`rotate(${deg / 3} 100 235)`}
            opacity={0.75 + (Math.abs(deg) % 3) * 0.08}
          />
        ))}
      </g>
      <g stroke="#A88B5C" strokeWidth="4" strokeLinecap="round" opacity="0.9">
        <line x1="100" y1="235" x2="66" y2="28" />
        <line x1="100" y1="235" x2="138" y2="30" />
      </g>
      <rect x="82" y="150" width="36" height="12" rx="6" fill="#7A5C3E" />
      <rect x="84" y="196" width="32" height="10" rx="5" fill="#7A5C3E" />
      <rect x="82" y="153" width="36" height="3" rx="1.5" fill="#A88B5C" opacity="0.7" />
    </svg>
  );
}

/* Kipas lidi kecil satu warna (taburan dekorasi) */
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

/* Batang bambu hias bergradasi: dua batang + ruas + mata tunas.
   idPrefix wajib unik per pemakaian supaya id gradient tidak bentrok. */
function BatangBambu({ idPrefix, className = "" }: { idPrefix: string; className?: string }) {
  const gid = `${idPrefix}-grad-bambu`;
  return (
    <svg viewBox="0 0 96 330" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3F5C3A" />
          <stop offset="0.45" stopColor="#4E7248" />
          <stop offset="1" stopColor="#6C8F60" />
        </linearGradient>
      </defs>
      {/* batang utama */}
      <rect x="18" y="6" width="24" height="324" rx="12" fill={`url(#${gid})`} />
      <rect x="24" y="8" width="4" height="320" rx="2" fill="#9DBE85" opacity="0.55" />
      {[64, 130, 196, 262].map((y) => (
        <g key={y}>
          <rect x="15" y={y} width="30" height="7" rx="3.5" fill="#2E4230" />
          <rect x="15" y={y + 1.4} width="30" height="1.8" rx="0.9" fill="#9DBE85" opacity="0.45" />
        </g>
      ))}
      <circle cx="20" cy="100" r="3" fill="#2E4230" />
      <circle cx="40" cy="230" r="3" fill="#2E4230" />
      {/* batang kedua, lebih pendek */}
      <rect x="60" y="96" width="17" height="234" rx="8.5" fill={`url(#${gid})`} opacity="0.9" />
      <rect x="64" y="98" width="3" height="230" rx="1.5" fill="#9DBE85" opacity="0.5" />
      {[150, 214, 278].map((y) => (
        <rect key={y} x="58" y={y} width="21" height="6" rx="3" fill="#2E4230" />
      ))}
    </svg>
  );
}

/* Dupa berdiri: badan terbalut, pegangan lidi polos, bara berpendar + asap tipis */
function DupaBerdiri({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 230" aria-hidden="true" className={className}>
      <path d="M22 30 q 7 -8 0 -16 q -6 -7 2 -12" stroke="#7A5C3E" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
      <circle className="ember-glow" cx="22" cy="40" r="9" fill="#FF9A56" opacity="0.35" />
      <circle cx="22" cy="40" r="4.5" fill="#D9531E" />
      <circle cx="22" cy="40" r="2" fill="#FF9A56" />
      <rect x="19" y="44" width="6" height="132" rx="3" fill="#6B4226" />
      {[62, 84, 106, 128, 150].map((y) => (
        <circle key={y} cx="22" cy={y} r="1.2" fill="#5C3A21" />
      ))}
      <rect x="20" y="176" width="4" height="50" rx="2" fill="#D9C9A3" />
    </svg>
  );
}

/* Tusuk pentol tegak (signature hero): lidi + tiga pentol */
function TusukPentol({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 170" aria-hidden="true" className={className}>
      <rect x="25" y="8" width="6" height="158" rx="3" fill="#D9C9A3" />
      <rect x="27" y="10" width="2" height="154" rx="1" fill="#F3EDE0" opacity="0.5" />
      {[34, 68, 102].map((cy, i) => (
        <g key={cy}>
          <circle cx="28" cy={cy} r="17" fill={i === 1 ? "#9A7355" : "#A98467"} />
          <circle cx="22" cy={cy - 6} r="5" fill="#F3EDE0" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

/* Ilustrasi horizontal: contoh penggunaan */
function IlustrasiPentol() {
  return (
    <svg viewBox="0 0 240 52" aria-hidden="true" className="w-full">
      <rect x="4" y="23" width="232" height="6" rx="3" fill="#D9C9A3" />
      {[124, 162, 200].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="26" r="17" fill={i === 1 ? "#9A7355" : "#A98467"} />
          <circle cx={cx - 6} cy="20" r="4.5" fill="#F3EDE0" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}
function IlustrasiSempol() {
  return (
    <svg viewBox="0 0 240 52" aria-hidden="true" className="w-full">
      <rect x="4" y="23" width="232" height="6" rx="3" fill="#D9C9A3" />
      <rect x="108" y="9" width="122" height="34" rx="17" fill="#D9A05B" />
      <path d="M120 18 q 20 8 0 16 M146 15 q 22 10 0 22 M174 15 q 22 10 0 22 M202 18 q 16 8 0 16" stroke="#B97F3E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="132" cy="16" rx="10" ry="4" fill="#F3EDE0" opacity="0.3" />
    </svg>
  );
}
function IlustrasiDupa() {
  return (
    <svg viewBox="0 0 240 52" aria-hidden="true" className="w-full">
      <rect x="4" y="23" width="72" height="6" rx="3" fill="#D9C9A3" />
      <rect x="72" y="20" width="146" height="12" rx="6" fill="#6B4226" />
      {[92, 116, 140, 164, 188].map((x) => (
        <circle key={x} cx={x} cy="26" r="1.4" fill="#5C3A21" />
      ))}
      {/* bara berpendar (animasi opacity, aman untuk SVG) */}
      <circle className="ember-glow" cx="226" cy="26" r="11" fill="#FF9A56" opacity="0.35" />
      <circle cx="226" cy="26" r="6.5" fill="#D9531E" />
      <circle cx="226" cy="26" r="3" fill="#FF9A56" />
    </svg>
  );
}
const ilustrasiContoh = {
  pentol: <IlustrasiPentol />,
  sempol: <IlustrasiSempol />,
  dupa: <IlustrasiDupa />,
};

/* Ikon tangan & mesin untuk perbandingan */
const ikonTangan = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
    <path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11m0-2.5v-3a1.5 1.5 0 0 1 3 0v3m0 .5v-2a1.5 1.5 0 0 1 3 0V13" />
    <path d="M16 12.5a1.5 1.5 0 0 1 3 1v2.5a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-6-6v-3" />
  </svg>
);
const ikonMesin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8v3m0 12.4v3M4.2 12h3m9.6 0h3M6 6l2.1 2.1M15.9 15.9 18 18M18 6l-2.1 2.1M8.1 15.9 6 18" />
  </svg>
);

/* ============================================================
   HALAMAN
   ============================================================ */
export default function BitingPage() {
  const c = content;
  const waHref = `https://wa.me/${c.pemesanan.cta.waNumber}?text=${encodeURIComponent(c.pemesanan.cta.waText)}`;
  const marqueeItems = [...c.marquee, ...c.marquee];

  return (
    <>
      <BotChat
        judul="Tanya Biting"
        systemPrompt="Kamu asisten website Potensi Balesari. 
        Pengunjung sedang membuka halaman produk BITING BAMBU dari Dusun Segelan. 
        Biting adalah lidi bambu tipis untuk tusuk pentol, sempol, sate, dan rangka dupa. 
        Tersedia panjang 30, 40, dan 50 cm, dijual per kilogram dalam ikatan. 
        Dibuat dari bambu petung, jawa, dan apus, diserut manual oleh warga sehingga lebih rapi dibanding hasil mesin. 
        Produksi dusun 4 sampai 5 ton per minggu, melibatkan 40 sampai 50 warga. 
        Jawab singkat tapi excited dalam bahasa Indonesia santai, maksimal 3 kalimat. 
        Untuk harga, arahkan ke WhatsApp karena berubah-ubah.
        Kalau user memancingmu keluar dari topik selalu arahkah ke topik dengan halus
        Kalau user menanyakan tentang Radya, jawab dia adalah salah satu mahasiswa kkn yang mengembangkan website yang keren ini
        Kalau user menanyakan tentang Heri, jawab dia adalah CEO hebat salah satu saudagar kaya pemilik perusahaan biting di sini (kasih emoji raja)
        "
        sapaan="Hai! Mau tanya soal biting bambu? Aku bantu jawab."
        saran={["Ukurannya apa saja?", "Bedanya manual dan mesin?", "Cara pesannya gimana?"]}
      />
      <main className={`${fraunces.variable} flex-1 overflow-x-clip bg-[#F3EDE0] text-[#3A2E22]`}>
        <style>{`
        .font-display { font-family: var(--font-fraunces), Georgia, serif; }

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

        /* Navbar glass → menggelap saat scroll */
        @supports (animation-timeline: scroll()) {
          .navbar-glass {
            animation: navbar-solid linear both;
            animation-timeline: scroll();
            animation-range: 0 480px;
          }
        }
        @keyframes navbar-solid { to { background-color: rgba(30, 46, 32, 0.95); } }

        /* ---- PARALLAX & REVEAL (murni CSS scroll-driven) ---- */
        @supports (animation-timeline: view()) {
          @media (prefers-reduced-motion: no-preference) {
            /* Hero: ikatan biting & konten bergeser keluar saat di-scroll */
            .hero-timeline { view-timeline: --heroB block; }
            .hero-ikatan {
              animation: ikatan-exit linear both;
              animation-timeline: --heroB;
              animation-range: exit 0% exit 80%;
              will-change: transform, opacity;
            }
            .hero-drift {
              animation: heroB-drift linear both;
              animation-timeline: --heroB;
              animation-range: exit 0% exit 100%;
            }
            /* Reveal: elemen muncul naik saat masuk viewport */
            .reveal {
              animation: reveal-up linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 38%;
            }
          }
        }
        @keyframes ikatan-exit { to { transform: translate(30%, 15%); opacity: 0; } }
        @keyframes heroB-drift { to { transform: translateY(-6%); opacity: 0.25; } }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: no-preference) {
          .marquee-track { animation: marquee 26s linear infinite; }
          /* Bambu hias bergoyang pelan dari pangkalnya */
          .bamboo-sway { transform-origin: 50% 100%; animation: bamboo-sway var(--sway-dur, 7s) ease-in-out infinite alternate; }
          .ember-glow { animation: ember-glow 1.5s ease-in-out infinite alternate; }
          /* Tusuk pentol di hero bergoyang pelan dari pangkalnya */
          .tusuk-goyang { transform-origin: 50% 96%; animation: tusuk-goyang 4.5s ease-in-out infinite alternate; }
          .leaf-fall {
            animation: leaf-fall var(--fall-dur, 14s) linear var(--fall-del, 0s) infinite;
            will-change: transform, opacity;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .leaf-fall { display: none; }
        }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes ember-glow { from { opacity: 0.2; } to { opacity: 0.6; } }
        @keyframes tusuk-goyang { from { rotate: -2.5deg; } to { rotate: 3deg; } }
        @keyframes bamboo-sway { from { rotate: -2.6deg; } to { rotate: 3deg; } }
        @keyframes leaf-fall {
          0%   { transform: translate3d(0, -8vh, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.75; }
          30%  { transform: translate3d(42px, 26vh, 0) rotate(85deg); }
          55%  { transform: translate3d(-30px, 54vh, 0) rotate(170deg); }
          80%  { transform: translate3d(36px, 80vh, 0) rotate(250deg); opacity: 0.75; }
          100% { transform: translate3d(-16px, 104vh, 0) rotate(340deg); opacity: 0; }
        }
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

            <a href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#F3EDE0] px-4 py-2 text-xs font-semibold text-[#2E4230] shadow transition hover:bg-[#EAE1CD] sm:text-sm"
            >
              {c.nav.cta}
            </a>
          </div>
        </header>

        {/* ================= 1. HERO PRODUK ================= */}
        <section aria-label="Biting Bambu Segelan" className="hero-timeline relative isolate overflow-hidden bg-[#2E4230] text-[#F3EDE0]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(243,237,224,0.10),transparent_62%)]" />
          <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-40" />

          {/* daun gugur */}
          {[
            { left: "8%", dur: "14s", del: "-2s", ukuran: "h-4 w-11", warna: "text-[#7FA36F]/55" },
            { left: "30%", dur: "18s", del: "-9s", ukuran: "h-3 w-9", warna: "text-[#A88B5C]/45" },
            { left: "55%", dur: "15s", del: "-5s", ukuran: "h-3.5 w-10", warna: "text-[#9DBE85]/45" },
            { left: "82%", dur: "17s", del: "-12s", ukuran: "h-3 w-9", warna: "text-[#A88B5C]/40" },
          ].map((daun, i) => (
            <DaunBambu
              key={i}
              className={`leaf-fall pointer-events-none absolute -top-8 ${daun.ukuran} ${daun.warna}`}
              style={{ left: daun.left, "--fall-dur": daun.dur, "--fall-del": daun.del } as React.CSSProperties}
            />
          ))}

          {/* ikatan biting besar sebagai latar, ikut parallax keluar saat scroll */}
          <div aria-hidden="true" className="hero-ikatan pointer-events-none absolute -right-16 bottom-0 hidden lg:block">
            <IkatanBiting className="h-[420px] w-auto opacity-25" />
          </div>

          <div className="hero-drift relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 pb-24 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32">
            <div>
              <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#F3EDE0]/60">
                <ol className="flex items-center gap-2">
                  <li><Link href="/" className="transition hover:text-[#F3EDE0]">{c.hero.breadcrumb.home}</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-medium text-[#F3EDE0]/90">{c.hero.breadcrumb.current}</li>
                </ol>
              </nav>

              <p className="mb-4 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#F3EDE0] uppercase" style={{ backgroundColor: AKSEN }}>
                {c.hero.badge}
              </p>
              <h1 className="font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                {c.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F3EDE0]/85 sm:text-lg">
                {c.hero.subtitle}
              </p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F3EDE0] px-7 py-3.5 font-semibold text-[#2E4230] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EAE1CD] motion-reduce:hover:translate-y-0"
              >
                {c.hero.cta} <span aria-hidden="true">→</span>
              </a>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {c.hero.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[#F3EDE0]/15 bg-[#F3EDE0]/10 px-3 py-4 text-center backdrop-blur-sm">
                    <dd className="font-display text-2xl font-semibold">{s.angka}</dd>
                    <dd className="text-[11px] font-medium text-[#9DBE85]">{s.satuan}</dd>
                    <dt className="mt-1 text-[10px] leading-tight text-[#F3EDE0]/60">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* foto produk + tusuk pentol bergoyang */}
            <figure className="relative mx-auto w-full max-w-sm">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 -rotate-2 rounded-3xl bg-[#F3EDE0]/10" />
              <div className="relative rotate-[1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={c.hero.img}
                    alt={c.hero.imgAlt}
                    fill
                    // sizes="(min-width: 1024px) 36vw, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-5 -left-8 rotate-[-8deg] sm:-left-11">
                <div className="tusuk-goyang">
                  <TusukPentol className="h-36 w-auto drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]" />
                </div>
              </div>
            </figure>
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

        {/* ================= 2. APA ITU BITING ================= */}
        <section id="apa-itu" aria-labelledby="apaitu-heading" className="relative overflow-hidden py-20 sm:py-24">
          {/* bambu tumbuh miring dari pojok kiri bawah, bergoyang */}
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-8 hidden origin-bottom-left rotate-[14deg] opacity-[0.35] md:block">
            <div className="bamboo-sway" style={{ "--sway-dur": "6.6s" } as React.CSSProperties}>
              <BatangBambu idPrefix="apaitu" className="h-[340px] w-auto" />
            </div>
          </div>
          <LidiBiting className="pointer-events-none absolute top-10 -right-8 h-48 w-auto -rotate-12 text-[#4E7248] opacity-[0.14]" />
          <DaunBambu className="pointer-events-none absolute bottom-16 left-[16%] hidden h-5 w-14 rotate-12 text-[#4E7248]/25 lg:block" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Kenalan Dulu</p>
              <h2 id="apaitu-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
                {c.apaItu.heading}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A3B2C] sm:text-lg">
                {c.apaItu.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {c.apaItu.fakta.map((f) => (
                  <li key={f} className="rounded-full border border-[#4E7248]/25 bg-[#4E7248]/10 px-4 py-1.5 text-xs font-medium text-[#2E4230]">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* kartu contoh penggunaan */}
            <div className="reveal rounded-3xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-6 shadow-sm sm:p-8">
              <p className="mb-6 text-center text-xs font-semibold tracking-[0.18em] uppercase text-[#7A5C3E]">
                {c.apaItu.contoh.heading}
              </p>
              <ul className="space-y-6">
                {c.apaItu.contoh.items.map((item) => (
                  <li key={item.judul} className="grid items-center gap-4 sm:grid-cols-[190px_1fr]">
                    <div className="rounded-2xl bg-[#EAE1CD] px-4 py-3">{ilustrasiContoh[item.jenis]}</div>
                    <div>
                      <p className="font-display font-semibold text-[#2E4230]">{item.judul}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#4A3B2C]/85">{item.keterangan}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= 3. SEJARAH ================= */}
        <section aria-labelledby="sejarah-heading" className="relative bg-[#EAE1CD]">
          <Wave fill="#F3EDE0" flip className="absolute inset-x-0 top-0" />
          <div className="pattern-anyaman absolute inset-0" aria-hidden="true" />
          <DaunBambu className="pointer-events-none absolute top-32 right-[6%] hidden h-5 w-14 rotate-12 text-[#4E7248]/30 md:block" />
          <LidiBiting className="pointer-events-none absolute bottom-12 left-[3%] hidden h-32 w-auto rotate-6 text-[#7A5C3E]/20 lg:block" />

          <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Cerita Perjalanan</p>
            <h2 id="sejarah-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
              {c.sejarah.heading}
            </h2>
            <p className="mt-3 max-w-xl text-[#4A3B2C]/80">{c.sejarah.intro}</p>

            <ol className="relative mt-12 space-y-10 border-l-2 border-[#4E7248]/30 pl-8">
              {c.sejarah.milestones.map((m, i) => (
                <li key={m.judul} className="reveal relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#EAE1CD] text-[9px] font-bold text-[#F3EDE0]"
                    style={{ backgroundColor: AKSEN }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#2E4230]">{m.judul}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{m.cerita}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= 4. PROSES PRODUKSI ================= */}
        <section id="proses" aria-labelledby="proses-heading" className="relative overflow-hidden">
          {/* rumpun bambu tumbuh miring dari pojok kanan bawah, sumber bahan bakunya */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-14 hidden origin-bottom-right -rotate-[14deg] opacity-[0.32] lg:block">
            <div className="bamboo-sway" style={{ "--sway-dur": "8s" } as React.CSSProperties}>
              <BatangBambu idPrefix="proses" className="h-[380px] w-auto -scale-x-100" />
            </div>
          </div>
          <DaunBambu className="pointer-events-none absolute top-24 right-[14%] hidden h-5 w-14 -rotate-12 text-[#4E7248]/25 md:block" />
          <LidiBiting className="pointer-events-none absolute -bottom-6 -left-6 h-44 w-auto rotate-12 text-[#4E7248] opacity-[0.12]" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Dapur Produksi</p>
            <h2 id="proses-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
              {c.proses.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.proses.intro}</p>

            {/* bahan baku */}
            <div className="reveal mt-10 rounded-3xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-[#2E4230]">{c.proses.bahan.heading}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {c.proses.bahan.items.map((b) => (
                  <div key={b.nama} className="rounded-2xl bg-[#EAE1CD] p-5">
                    <LogoBambu className="mb-3 h-8 w-auto" />
                    <p className="font-display font-semibold text-[#2E4230]">{b.nama}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4A3B2C]/85">{b.deskripsi}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-[#7A5C3E] italic">{c.proses.bahan.catatan}</p>
            </div>

            {/* langkah-langkah: timeline vertikal */}
            <ol className="relative mt-14 space-y-11 border-l-2 border-[#4E7248]/25 pl-8 sm:pl-12">
              {/* Step 1 — Menebang & memotong */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  1
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[0].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[0].deskripsi}</p>
                {c.proses.langkah[0].img && (
                  <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg rotate-[0.8deg]">
                    <Image
                      src={c.proses.langkah[0].img}
                      alt={c.proses.langkah[0].alt}
                      fill
                      sizes="(min-width: 640px) 576px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>

              {/* Step 2 — Membelah & membuang hati bambu (tanpa media) */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  2
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[1].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[1].deskripsi}</p>
              </li>

              {/* Step 3 — Merajang jadi lidi (VIDEO) */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  3
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[2].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[2].deskripsi}</p>
                {c.proses.langkah[2].video && (
                  <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg rotate-[0.8deg]">
                    <video
                      src={c.proses.langkah[2].video}
                      controls
                      muted
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>
                )}
              </li>

              {/* Step 4 — Menjemur (tanpa media) */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  4
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[3].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[3].deskripsi}</p>
                {c.proses.langkah[3].video && (
                  <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg rotate-[0.8deg]">
                    <video
                      src={c.proses.langkah[3].video}
                      controls
                      muted
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>
                )}
              </li>

              {/* Step 5 — Menyortir & mengikat */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  5
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[4].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[4].deskripsi}</p>
                {c.proses.langkah[4].video && (
                  <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg rotate-[0.8deg]">
                    <video
                      src={c.proses.langkah[4].video}
                      controls
                      muted
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>
                )}
              </li>

              {/* Step 6 — Menyetor ke pengepul (tanpa media) */}
              <li className="reveal relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                  style={{ backgroundColor: AKSEN }}
                >
                  6
                </span>
                <h3 className="font-display pt-1 text-xl font-semibold text-[#2E4230] sm:pt-1.5">{c.proses.langkah[5].judul}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{c.proses.langkah[5].deskripsi}</p>
                {c.proses.langkah[5].img && (
                  <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg rotate-[0.8deg]">
                    <Image
                      src={c.proses.langkah[5].img}
                      alt={c.proses.langkah[5].alt}
                      fill
                      sizes="(min-width: 640px) 576px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>
            </ol>

            {/* kendala musim hujan */}
            <div className="reveal relative mt-14 overflow-hidden rounded-3xl bg-[#2E4230] px-6 py-10 text-[#F3EDE0] sm:px-10">
              <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-25" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <span aria-hidden="true" className="text-5xl">🔥</span>
                <div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{c.proses.kendala.judul}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F3EDE0]/80 sm:text-base">{c.proses.kendala.cerita}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. MANUAL VS MESIN ================= */}
        <section aria-labelledby="mvm-heading" className="relative bg-[#2E4230] text-[#F3EDE0]">
          <Wave fill="#F3EDE0" className="absolute inset-x-0 top-0 rotate-180" />
          <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-30" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 -left-9 hidden origin-bottom-left rotate-[12deg] opacity-25 lg:block">
            <div className="bamboo-sway" style={{ "--sway-dur": "7s" } as React.CSSProperties}>
              <BatangBambu idPrefix="mvm" className="h-80 w-auto" />
            </div>
          </div>
          <DaunBambu className="pointer-events-none absolute top-28 left-[5%] h-5 w-14 -rotate-12 text-[#9DBE85]/20" />

          <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-24 sm:pt-32 sm:pb-28">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9BC9C]">FYI</p>
              <h2 id="mvm-heading" className="font-display text-3xl font-semibold sm:text-4xl">
                {c.manualVsMesin.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#F3EDE0]/75">{c.manualVsMesin.intro}</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                { data: c.manualVsMesin.manual, ikon: ikonTangan, utama: true },
                { data: c.manualVsMesin.mesin, ikon: ikonMesin, utama: false },
              ].map(({ data, ikon, utama }) => (
                <div
                  key={data.judul}
                  className={`reveal rounded-3xl border p-7 ${utama
                    ? "border-[#9DBE85]/50 bg-[#F3EDE0]/10 shadow-lg backdrop-blur-sm"
                    : "border-[#F3EDE0]/15 bg-[#F3EDE0]/5"
                    }`}
                >
                  <div className={`mb-4 flex h-13 w-13 items-center justify-center rounded-2xl p-3 ${utama ? "bg-[#9DBE85] text-[#22331F]" : "bg-[#F3EDE0]/15 text-[#F3EDE0]"}`}>
                    {ikon}
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    {data.judul}
                    {utama && <span className="ml-2 rounded-full bg-[#9DBE85] px-2.5 py-0.5 align-middle text-[10px] font-bold tracking-wide text-[#22331F] uppercase">Andalan</span>}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#F3EDE0]/85">
                    {data.poin.map((poin) => (
                      <li key={poin} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-0.5 text-[#9DBE85]">✦</span>
                        {poin}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-[#F3EDE0]/70 italic sm:text-base">
              {c.manualVsMesin.insight}
            </p>
          </div>

          <Wave fill="#F3EDE0" className="absolute inset-x-0 bottom-0" />
        </section>

        {/* ================= 6. PENGRAJIN (tanpa nama) ================= */}
        <section id="pengrajin" aria-labelledby="pengrajin-heading" className="relative overflow-hidden py-20 sm:py-24">
          {/* dupa menyala di tepi kanan, salah satu hasil karya mereka */}
          <DupaBerdiri className="pointer-events-none absolute top-12 right-[3%] hidden h-56 w-auto rotate-6 opacity-40 md:block" />
          <LidiBiting className="pointer-events-none absolute bottom-10 -left-8 h-44 w-auto rotate-12 text-[#4E7248] opacity-[0.12]" />

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <figure className="reveal relative mx-auto w-full max-w-md">
                <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-3xl bg-[#2E4230]/15" />
                <div className="relative rotate-[-1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-xl">
                  <div className="relative aspect-[4/3]">
                    <Image src={c.pengrajin.img} alt={c.pengrajin.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  </div>
                </div>
              </figure>

              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Orang-Orangnya</p>
                <h2 id="pengrajin-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
                  {c.pengrajin.heading}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A3B2C] sm:text-lg">
                  {c.pengrajin.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <figure className="reveal relative mt-12 overflow-hidden rounded-3xl bg-[#EAE1CD] px-6 py-10 text-center sm:px-16">
              <span aria-hidden="true" className="font-display absolute top-2 left-6 text-7xl text-[#4E7248]/25">“</span>
              <DaunBambu className="absolute -right-3 -bottom-2 h-8 w-24 rotate-[-12deg] text-[#4E7248]/20" />
              <blockquote className="font-display mx-auto max-w-2xl text-xl leading-relaxed text-[#2E4230] italic sm:text-2xl">
                {c.pengrajin.kutipan}
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-[#7A5C3E]">— {c.pengrajin.kutipanSumber}</figcaption>
            </figure>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#4A3B2C]/75 sm:text-base">
              {c.pengrajin.harapan}
            </p>
          </div>
        </section>

        {/* ================= 7. KATALOG, SPESIFIKASI & PEMESANAN ================= */}
        <section id="ukuran" aria-labelledby="pesan-heading" className="relative bg-[#EAE1CD]">
          <Wave fill="#F3EDE0" flip className="absolute inset-x-0 top-0" />
          <div className="pattern-anyaman absolute inset-0" aria-hidden="true" />
          {/* tusuk pentol bergoyang di tepi kanan, produk andalannya */}
          <div aria-hidden="true" className="pointer-events-none absolute top-44 right-[4%] hidden rotate-12 opacity-45 lg:block">
            <div className="tusuk-goyang">
              <TusukPentol className="h-44 w-auto" />
            </div>
          </div>
          <DaunBambu className="pointer-events-none absolute top-32 left-[5%] hidden h-5 w-14 rotate-12 text-[#4E7248]/25 md:block" />

          <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Untuk Pembeli</p>
            <h2 id="pesan-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
              {c.pemesanan.heading}
            </h2>
            <p className="mt-3 max-w-xl text-[#4A3B2C]/80">{c.pemesanan.intro}</p>

            {/* katalog ukuran: panjang lidi digambar proporsional */}
            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold text-[#2E4230]">{c.pemesanan.katalog.heading}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {c.pemesanan.katalog.items.map((k) => (
                  <div key={k.cm} className="reveal rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-6 shadow-sm transition hover:shadow-md">
                    <p className="font-display text-3xl font-semibold text-[#2E4230]">
                      {k.cm}
                      <span className="ml-1 text-base font-normal text-[#7A5C3E]">cm</span>
                    </p>
                    {/* lidi digambar sepanjang persentase kartu, biar beda panjangnya kelihatan */}
                    <div aria-hidden="true" className="mt-4 h-2 rounded-full bg-[#EAE1CD]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#C9B285] to-[#A88B5C]"
                        style={{ width: `${k.lebar}%` }}
                      />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#4A3B2C]/85">
                      <span className="font-semibold text-[#2E4230]">Cocok untuk:</span> {k.cocok}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* spesifikasi */}
            <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {c.pemesanan.spesifikasi.map((s) => (
                <div key={s.label} className="reveal rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-5 shadow-sm">
                  <dt className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7A5C3E]">{s.label}</dt>
                  <dd className="font-display mt-1.5 font-semibold text-[#2E4230]">{s.nilai}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-[#7A5C3E] italic">{c.pemesanan.catatan}</p>

            {/* CTA */}
            <div className="reveal relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E4230] to-[#22331F] px-6 py-12 text-center text-[#F3EDE0] shadow-2xl sm:px-12">
              <div aria-hidden="true" className="pattern-titik absolute inset-0 opacity-25" />
              <IkatanBiting className="pointer-events-none absolute -left-10 -bottom-16 h-56 w-auto opacity-20" />
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">{c.pemesanan.cta.heading}</h3>
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#F3EDE0]/80 sm:text-base">{c.pemesanan.cta.deskripsi}</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F3EDE0] px-7 py-3.5 font-semibold text-[#2E4230] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EAE1CD] motion-reduce:hover:translate-y-0"
                >
                  {c.pemesanan.cta.label} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. GALERI MINI ================= */}
        <section aria-labelledby="galeri-heading" className="relative overflow-hidden py-20 sm:py-24">
          {/* bambu kecil tumbuh miring dari pojok kanan bawah */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-10 hidden origin-bottom-right -rotate-[13deg] opacity-30 md:block">
            <div className="bamboo-sway" style={{ "--sway-dur": "6.2s" } as React.CSSProperties}>
              <BatangBambu idPrefix="galeri" className="h-72 w-auto -scale-x-100" />
            </div>
          </div>
          <DaunBambu className="pointer-events-none absolute top-16 right-[6%] hidden h-5 w-14 rotate-12 text-[#4E7248]/25 md:block" />

          <div className="relative mx-auto max-w-6xl px-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#7A5C3E]">Dokumentasi</p>
            <h2 id="galeri-heading" className="font-display text-3xl font-semibold text-[#2E4230] sm:text-4xl">
              {c.galeri.heading}
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {c.galeri.items.map((foto, i) => (
                <li
                  key={i}
                  className={`reveal overflow-hidden rounded-xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg transition hover:z-10 hover:scale-[1.03] hover:rotate-0 motion-reduce:hover:scale-100 ${i % 2 === 0 ? "rotate-[1.2deg]" : "-rotate-[1.2deg]"
                    }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={foto.img} alt={foto.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= 9. POTENSI LAINNYA ================= */}
        <section aria-labelledby="lainnya-heading" className="relative mx-auto max-w-6xl px-6 pb-24">
          <h2 id="lainnya-heading" className="font-display text-2xl font-semibold text-[#2E4230] sm:text-3xl">
            {c.lainnya.heading}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {c.lainnya.items.map((item) => (
              <article
                key={item.slug}
                className="group reveal relative overflow-hidden rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] shadow-md transition hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: item.aksen }} />
                <Link href={item.slug} className="flex items-center gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E4230]">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#DCD2BC]">
                    <Image src={item.img} alt={item.alt} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#2E4230]">{item.nama}</h3>
                    <p className="mt-1 text-sm text-[#4A3B2C]/85">{item.pancingan}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 motion-reduce:group-hover:gap-1.5" style={{ color: item.aksen }}>
                      Lihat <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="relative bg-[#22331F] text-[#F3EDE0]">
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-4">
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
                    <Link href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Halaman">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9DBE85]">Jelajah</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F3EDE0]/80">
                {c.footer.kolomHalaman.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">{n.label}</Link>
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
      </main >
    </>
  );
}