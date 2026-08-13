// src/app/kopi/page.tsx
// Halaman detail — Kopi Balesari
//
// Sudut cerita: kopi di Dusun Segelan itu POTENSI BARU yang sedang tumbuh,
// dirintis Pak Wakit sejak 2019, kini diikuti makin banyak warga.
// Berbeda dari biting yang bercerita soal warisan puluhan tahun.
//
// CATATAN:
// - Navbar & footer masih duplikat dari halaman lain; nanti dirapikan ke layout.tsx.
// - Bagian bertanda TODO = masih perlu konfirmasi ke narasumber.
// - Harga sengaja tidak dicantumkan, diarahkan bertanya via WhatsApp.
// - Butuh: npm i motion lucide-react

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import {
    CalendarClock,
    CloudRain,
    Coffee,
    Handshake,
    Leaf,
    MessageCircle,
    Mountain,
    Sprout,
    Sun,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimasiKopi from "@/components/animation/kopi";
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
        "Kopi Balesari — Arabika & Robusta Lereng Gunung Kawi | Desa Balesari, Ngajum, Malang",
    description:
        "Kopi dari Dusun Segelan, Desa Balesari, Ngajum, Kabupaten Malang. Ditanam di lereng Gunung Kawi sejak 2019, diolah pulpwash dan natural, dijual dalam bentuk biji.",
    keywords: [
        "kopi Balesari",
        "kopi Gunung Kawi",
        "kopi arabika Malang",
        "kopi robusta Malang",
        "petani kopi Ngajum",
        "Dusun Segelan",
        "kopi pulpwash",
        "kopi natural",
    ],
    openGraph: {
        title: "Kopi Balesari — Tumbuh di Lereng Gunung Kawi",
        description:
            "Dari hutan yang dibuka jadi kebun, kopi Dusun Segelan tumbuh menjadi potensi baru desa sejak 2019.",
        locale: "id_ID",
        type: "website",
    },
};

/* ============================================================
   GAMBAR
   ============================================================ */
const IMG_HERO = "/images/dokum_kopi1.webp";
const IMG_JEMUR = "/images/dokum_kopi2.webp";
const IMG_KEBUN = "/images/dokum_kopi3.webp";
const IMG_SANGRAI = "/images/dokum_kopi4.webp";
const IMG_BIJI = "/images/dokum_kopi5.webp";
const IMG_BITING = "/images/dokum_biting10.webp";
const IMG_DESA = "/images/desa-balesari.jpeg";

/* ============================================================
   KONTEN — semua teks di sini biar gampang diedit
   ============================================================ */
const AKSEN = "#6B4226"; // coklat kopi, aksen halaman ini

const content = {
    nav: {
        brand: "Potensi Balesari",
        links: [
            { label: "Beranda", href: "/" },
            { label: "Ceritanya", href: "#cerita" },
            { label: "Jenis Kopi", href: "#jenis" },
            { label: "Proses", href: "#proses" },
        ],
        cta: "Tanya Kopi",
    },
    hero: {
        breadcrumb: { home: "Beranda", current: "Kopi Balesari" },
        badge: "Hasil Kebun · Dusun Segelan",
        title: "Kopi Balesari, Potensi Muda dari Lereng Gunung Kawi",
        subtitle:
            "Tahun 2019 seorang warga melihat lereng Kawi dan berpikir tanah ini cocok ditanami kopi. Ia bukan keturunan petani, tapi tetap memulai. Kini makin banyak warga Dusun Segelan ikut membuka lahan dan menanam.",
        img: IMG_HERO,
        imgAlt:
            "Buah kopi merah di kebun warga Dusun Segelan, Desa Balesari, lereng Gunung Kawi",
        stats: [
            { angka: "2019", satuan: "dirintis", label: "tahun kopi mulai ditanam" },
            { angka: "1", satuan: "hektar", label: "lahan yang sudah berproduksi" },
            { angka: "10", satuan: "petak", label: "lahan lain masih masa tanam" },
        ],
        cta: "Tanya Ketersediaan",
    },
    marquee: [
        "Arabika",
        "Robusta",
        "Pulpwash",
        "Natural",
        "Petik Merah",
        "Lereng Gunung Kawi",
    ],
    cerita: {
        heading: "Berawal dari Satu Orang",
        paragraphs: [
            "Pak Wakit bukan lahir dari keluarga petani. Ia mulai menanam kopi pada 2019 setelah melihat lereng Gunung Kawi punya tanah dan ketinggian yang cocok untuk arabika maupun robusta.",
            "Ia menjadi pelopor di Dusun Segelan. Setelah hasilnya terlihat cukup menjanjikan, satu per satu warga ikut mencoba. Kini bahkan para pemuda desa mulai membuka lahan dan menanam kopi mereka sendiri.",
            "Keterampilan ini tidak diwarisi dari generasi sebelumnya, tapi mulai dirintis untuk diwariskan ke generasi berikutnya.",
        ],
        img: IMG_KEBUN,
        alt: "Kebun kopi warga di lereng Gunung Kawi, Dusun Segelan, Desa Balesari",
        sorotan: [
            { ikon: "sprout" as const, judul: "Bukan warisan", teks: "Dirintis dari nol, bukan diturunkan dari orang tua." },
            { ikon: "mountain" as const, judul: "Modal tempat", teks: "Ketinggian lereng Kawi cocok untuk arabika dan robusta." },
            { ikon: "leaf" as const, judul: "Menular", teks: "Dari satu petani, menyebar ke banyak keluarga dan pemuda desa." },
        ],
    },
    jenis: {
        heading: "Kopi yang Ditanam di Sini",
        intro:
            "Bukan satu jenis saja. Tiap varietas punya watak, umur panen, dan nasib pasarnya sendiri.",
        items: [
            {
                nama: "Arabika",
                catatan: "Harga paling bagus saat ini",
                deskripsi:
                    "Tumbuh baik di ketinggian lereng Kawi. Mulai bisa dipanen sekitar tiga tahun setelah tanam.",
                sorot: true,
            },
            {
                nama: "Robusta",
                catatan: "Sabar menunggu",
                deskripsi:
                    "Lebih tahan, tapi butuh waktu lebih lama. Panen perdananya sekitar enam tahun.",
                sorot: false,
            },
            {
                nama: "Kayu Satu",
                catatan: "Paling laku",
                deskripsi:
                    "Jadi pilihan utama sekarang karena petani makin bisa memilih bibit yang bagus.", // TODO: konfirmasi nama varietas
                sorot: true,
            },
            {
                nama: "Ateng",
                catatan: "Mulai ditinggalkan",
                deskripsi:
                    "Termasuk arabika, tapi umur produktifnya pendek, sekitar lima kali panen saja, jadi perlahan ditinggalkan.",
                sorot: false,
            },
        ],
    },
    menunggu: {
        heading: "Kopi Menguji Kesabaran",
        intro:
            "Menanam kopi bukan pekerjaan yang hasilnya kelihatan musim itu juga. Bibit yang ditanam hari ini baru berbuah bertahun-tahun kemudian.",
        bar: [
            { nama: "Arabika", tahun: 3, lebar: 50 },
            { nama: "Robusta", tahun: 6, lebar: 100 },
        ],
        catatan: "Itu pun kalau cuacanya bersahabat.",
    },
    olahan: {
        heading: "Dua Cara Mengolah",
        intro:
            "Setelah dipanen, buah kopi bisa diolah dengan dua cara yang menghasilkan karakter berbeda.",
        items: [
            {
                nama: "Pulpwash",
                julukan: "Petik merah",
                deskripsi:
                    "Hanya buah yang sudah merah yang diambil, lalu kulitnya dikupas sebelum dikeringkan. Prosesnya bisa memakan waktu sekitar satu bulan, sangat bergantung cuaca.",
                poin: ["Buah merah dikupas kulitnya", "Sekitar satu bulan", "Butuh cuaca mendukung"],
                warna: "#B4362B",
            },
            {
                nama: "Natural",
                julukan: "Dikeringkan utuh",
                deskripsi:
                    "Buah dikeringkan tanpa dikupas, disebut juga DPP karena bentuknya bulat utuh. Bisa dari buah hijau maupun merah.",
                poin: ["Buah dikeringkan utuh", "Bentuknya bulat (DPP)", "Dari buah hijau dan merah"], // TODO: konfirmasi
                warna: "#7A5C3E",
            },
        ],
    },
    proses: {
        heading: "Dari Hutan Jadi Biji Kopi",
        intro:
            "Perjalanannya panjang dan dimulai jauh sebelum ada pohon kopi berdiri di sana.",
        langkah: [
            {
                judul: "Membuka lahan",
                deskripsi:
                    "Semuanya bermula dari membabat semak dan membuka lahan di lereng agar bisa ditanami.",
                img: IMG_KEBUN,
                alt: "Lahan kebun kopi yang dibuka di lereng Gunung Kawi",
            },
            {
                judul: "Menyiapkan bibit",
                deskripsi:
                    "Bibit disemai dan dipilih. Sekarang petani sudah lebih paham memilih bibit yang bagus.",
                img: null,
                alt: "",
            },
            {
                judul: "Menanam saat musim tanam",
                deskripsi:
                    "Bibit dipindahkan ke lahan ketika musim tanam tiba, tidak bisa sembarang waktu.",
                img: null,
                alt: "",
            },
            {
                judul: "Merawat dan memupuk",
                deskripsi:
                    "Perawatan berjalan bertahun-tahun. Petani di sini memilih pupuk kandang karena efeknya bertahan lama dan biayanya lebih terjangkau.",
                img: null,
                alt: "",
            },
            {
                judul: "Memanen",
                deskripsi:
                    "Arabika mulai berbuah sekitar tiga tahun, robusta sekitar enam tahun. Untuk pulpwash, hanya buah merah yang dipetik.",
                img: IMG_HERO,
                alt: "Buah kopi merah siap petik di kebun Dusun Segelan",
            },
            {
                judul: "Mengeringkan dan mengolah",
                deskripsi:
                    "Buah dijemur sampai kering, lalu diolah menjadi biji. Lamanya sangat bergantung pada cuaca.",
                img: IMG_JEMUR,
                alt: "Penjemuran biji kopi di halaman rumah warga Desa Balesari",
            },
        ],
    },
    tantangan: {
        heading: "Yang Tidak Selalu Mulus",
        intro:
            "Bertani kopi bukan cerita yang selalu manis. Ada hal-hal yang sampai sekarang masih jadi taruhan tiap musim.",
        items: [
            {
                ikon: "hujan" as const,
                judul: "Cuaca yang menentukan",
                teks: "Musim hujan membawa risiko hasil rusak saat pengeringan. Petani kerap harus menunggu kemarau supaya mutunya bagus.",
            },
            {
                ikon: "matahari" as const,
                judul: "Menunggu kemarau",
                teks: "Proses pengeringan bisa molor jauh dari perkiraan kalau matahari tidak muncul-muncul.",
            },
            {
                ikon: "waktu" as const,
                judul: "Biaya perawatan",
                teks: "Pupuk kandang dipilih karena tahan lama dan lebih terjangkau, sementara pupuk kimia terkendala biaya.",
            },
        ],
    },
    petani: {
        heading: "Harapan dari Kebun",
        paragraphs: [
            "Hasil panen saat ini dijual dalam bentuk biji, dikumpulkan bersama petani lain, lalu diteruskan ke pengepul.",
            "Harapan terbesarnya sederhana tapi besar dampaknya: ada investor yang masuk dan membangun pabrik pengolahan di desa. Menjual ke pabrik bisa memberi harga yang jauh lebih baik dibanding melempar ke pasar.",
        ],
        img: IMG_BIJI,
        alt: "Biji kopi hasil panen petani Desa Balesari",
        // TODO: ganti dengan kutipan verbatim hasil rekaman wawancara
        kutipan:
            "Di sini tanahnya cocok. Tinggal telaten nunggu, kopi pasti kasih hasil.",
        kutipanSumber: "Pak Wakit, petani kopi Dusun Segelan",
    },
    pemesanan: {
        heading: "Tertarik dengan Kopi Balesari?",
        intro:
            "Kopi dijual dalam bentuk biji. Ketersediaan mengikuti musim panen, jadi silakan tanyakan dulu sebelum memesan.",
        spesifikasi: [
            { label: "Bentuk jual", nilai: "Biji kopi" },
            { label: "Varietas", nilai: "Arabika, Robusta, Kayu Satu" },
            { label: "Cara olah", nilai: "Pulpwash & Natural" },
            { label: "Harga", nilai: "Tanya via WhatsApp" },
            { label: "Ketersediaan", nilai: "Mengikuti musim panen" },
            { label: "Lokasi kebun", nilai: "Lereng timur Gunung Kawi" },
        ],
        catatan:
            "Harga kopi bergerak mengikuti jenis, mutu, dan kondisi pasar, jadi kami tidak mencantumkannya di sini. Silakan hubungi kami untuk penawaran terbaru.",
        waNumber: "6281234567890", // TODO: ganti nomor WhatsApp asli
        waText: "Halo, saya tertarik dengan kopi dari Desa Balesari.",
        waLabel: "Tanya Harga & Ketersediaan",
        mitra: {
            judul: "Terbuka untuk Kemitraan",
            teks: "Petani di sini berharap ada investor atau mitra yang mau mengembangkan pengolahan kopi bersama warga desa.",
            label: "Ajak Kerja Sama",
            waText: "Halo, saya tertarik menjajaki kerja sama pengolahan kopi Desa Balesari.",
        },
    },
    galeri: {
        heading: "Sekilas dari Kebun",
        items: [
            { img: IMG_HERO, alt: "Buah kopi merah siap petik di kebun Dusun Segelan" },
            { img: IMG_JEMUR, alt: "Penjemuran biji kopi di halaman rumah warga" },
            { img: IMG_SANGRAI, alt: "Penyangraian kopi secara tradisional" },
            { img: IMG_BIJI, alt: "Biji kopi hasil panen petani Desa Balesari" },
        ],
    },
    lainnya: {
        heading: "Jelajahi Potensi Lainnya",
        items: [
            {
                slug: "/biting",
                nama: "Biting Bambu",
                pancingan: "Lidi bambu untuk tusuk pentol, sempol, sate, dan dupa.",
                img: IMG_BITING,
                alt: "Ikatan biting bambu buatan warga Dusun Segelan",
                aksen: "#4E7248",
            },
            {
                slug: "/batok-kelapa",
                nama: "Batok Kelapa",
                pancingan: "Tempurung kelapa diolah jadi arang dan kerajinan.",
                img: IMG_DESA,
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
   ORNAMEN SVG — bertema kopi
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

/* Biji kopi tunggal, dipakai untuk taburan dekorasi & biji berjatuhan */
function BijiKopi({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 40 54" aria-hidden="true" className={className} style={style} fill="currentColor">
            <ellipse cx="20" cy="27" rx="18" ry="26" />
            <path
                d="M20 3 C 12 14, 12 40, 20 51 C 28 40, 28 14, 20 3 Z"
                fill="#2B1A0E"
                opacity="0.35"
            />
        </svg>
    );
}

/* Cangkir kopi dengan uap mengepul (uap dianimasi lewat class .uap) */
function CangkirKopi({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 130" aria-hidden="true" className={className} fill="none">
            {/* uap */}
            <g stroke="#EAE1CD" strokeWidth="4" strokeLinecap="round" opacity="0.55">
                <path className="uap uap-1" d="M44 44 q 10 -12 0 -24 q -9 -11 2 -18" />
                <path className="uap uap-2" d="M60 40 q 11 -13 0 -26 q -10 -12 2 -20" />
                <path className="uap uap-3" d="M76 44 q 10 -12 0 -24 q -9 -11 2 -18" />
            </g>
            {/* cangkir */}
            <path d="M22 56 h 76 v 22 a 38 38 0 0 1 -76 0 Z" fill="#F3EDE0" />
            <path d="M22 56 h 76 v 8 a 38 34 0 0 1 -76 0 Z" fill="#C9BC9C" opacity="0.5" />
            <ellipse cx="60" cy="57" rx="38" ry="9" fill="#6B4226" />
            <ellipse cx="60" cy="57" rx="30" ry="6" fill="#8B5E3C" opacity="0.8" />
            {/* telinga cangkir */}
            <path d="M98 62 q 18 2 18 16 q 0 14 -18 14" stroke="#F3EDE0" strokeWidth="8" strokeLinecap="round" />
            {/* alas */}
            <ellipse cx="60" cy="116" rx="46" ry="9" fill="#F3EDE0" opacity="0.9" />
            <ellipse cx="60" cy="114" rx="46" ry="8" fill="#DCD2BC" />
        </svg>
    );
}

/* Ranting ceri kopi: buah merah + daun, dipakai sebagai hiasan tepi */
function RantingCeri({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 150 260" aria-hidden="true" className={className} fill="none">
            {/* batang */}
            <path d="M75 258 C 70 200, 82 150, 74 96 C 70 64, 78 32, 74 4" stroke="#5C3A21" strokeWidth="7" strokeLinecap="round" />
            {/* daun */}
            <g fill="#4E7248">
                <path d="M74 66 Q 116 46, 138 62 Q 106 88, 74 66 Z" />
                <path d="M74 118 Q 32 98, 10 114 Q 42 140, 74 118 Z" />
                <path d="M74 176 Q 116 156, 138 172 Q 106 198, 74 176 Z" />
            </g>
            <g stroke="#3F5C3A" strokeWidth="2" opacity="0.6">
                <path d="M78 68 L 132 62" />
                <path d="M70 120 L 16 114" />
                <path d="M78 178 L 132 172" />
            </g>
            {/* buah ceri */}
            <g>
                <circle cx="56" cy="88" r="12" fill="#B4362B" />
                <circle cx="52" cy="84" r="3.5" fill="#F3EDE0" opacity="0.45" />
                <circle cx="96" cy="140" r="13" fill="#C0392B" />
                <circle cx="92" cy="136" r="4" fill="#F3EDE0" opacity="0.45" />
                <circle cx="54" cy="204" r="11" fill="#9E2F24" />
                <circle cx="50" cy="200" r="3" fill="#F3EDE0" opacity="0.4" />
            </g>
        </svg>
    );
}

/* Daun kopi lepas, untuk taburan halus */
function DaunKopi({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 64 28" aria-hidden="true" className={className} style={style} fill="currentColor">
            <path d="M2 14 Q 24 -4 62 6 Q 40 26 10 21 Q 4 18 2 14 Z" />
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

/* Peta ikon untuk beberapa daftar */
const ikonSorotan = {
    sprout: Sprout,
    mountain: Mountain,
    leaf: Leaf,
};

const ikonTantangan = {
    hujan: CloudRain,
    matahari: Sun,
    waktu: CalendarClock,
};

/* ============================================================
   HALAMAN
   ============================================================ */
export default function KopiPage() {
    const c = content;
    const waHref = `https://wa.me/${c.pemesanan.waNumber}?text=${encodeURIComponent(c.pemesanan.waText)}`;
    const waMitraHref = `https://wa.me/${c.pemesanan.waNumber}?text=${encodeURIComponent(c.pemesanan.mitra.waText)}`;
    const marqueeItems = [...c.marquee, ...c.marquee];

    return (
        <>
            <BotChat
                systemPrompt="Kamu asisten ramah website Potensi Balesari, profil 
                    UMKM Dusun Segelan, Desa Balesari, Kecamatan Ngajum, Kabupaten Malang, di lereng timur Gunung Kawi. 
                    Desa ini punya tiga potensi utama: biting bambu (lidi untuk tusuk pentol, sempol, sate, dan rangka dupa), kopi, serta olahan batok kelapa. 
                    Pengunjung sedang membuka halaman kopi. 
                    Jawab singkat tapi excited dalam bahasa Indonesia yang santai dan sopan, maksimal 3 kalimat. 
                    Jika ditanya harga, arahkan menghubungi WhatsApp karena harga berubah-ubah. 
                    Jika ditanya di luar topik desa, tolak dengan halus dan kembalikan ke topik desa. 
                    Kalau user menanyakan tentang Radya, jawab dia adalah salah satu mahasiswa kkn yang mengembangkan website yang keren ini
                    Kalau user menanyakan tentang Heri, jawab dia adalah seorang CEO hebat salah satu saudagar kaya pemilik perusahaan biting di sini (kasih emoji raja)
                    "
                sapaan="Halo! Aku bisa bantu jelasin soal potensi Desa Balesari. Mau tanya apa?"
                saran={["Apa saja produk desanya?", "Di mana lokasinya?", "Bagaimana cara memesan?"]}
            />            <AnimasiKopi></AnimasiKopi>
            <main className={`${fraunces.variable} flex-1 overflow-x-clip bg-[#F3EDE0] text-[#3A2E22]`}>
                <style>{`
        .font-display { font-family: var(--font-fraunces), Georgia, serif; }

        html { scroll-padding-top: 84px; }
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }

        .pattern-titik-kopi {
          background-image: radial-gradient(rgba(243,237,224,0.13) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }
        /* Bercak lembut, seperti noda kopi tipis di kertas */
        .noda-kopi {
          background-image:
            radial-gradient(circle at 12% 22%, rgba(107,66,38,0.07) 0, transparent 26%),
            radial-gradient(circle at 88% 68%, rgba(107,66,38,0.06) 0, transparent 24%),
            radial-gradient(circle at 62% 12%, rgba(122,92,62,0.05) 0, transparent 20%);
        }

        /* Navbar glass menggelap saat di-scroll */
        @supports (animation-timeline: scroll()) {
          .navbar-glass {
            animation: navbar-solid linear both;
            animation-timeline: scroll();
            animation-range: 0 480px;
          }
        }
        @keyframes navbar-solid { to { background-color: rgba(43, 26, 14, 0.95); } }

        /* Parallax hero */
        @supports (animation-timeline: view()) {
          @media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
            .hero-timeline { view-timeline: --heroK block; }
            .hero-ranting-kiri, .hero-ranting-kanan {
              animation: linear both;
              animation-timeline: --heroK;
              animation-range: exit 0% exit 85%;
              will-change: transform, opacity;
            }
            .hero-ranting-kiri  { animation-name: ranting-keluar-kiri; }
            .hero-ranting-kanan { animation-name: ranting-keluar-kanan; }
            .hero-cangkir {
              animation: cangkir-keluar linear both;
              animation-timeline: --heroK;
              animation-range: exit 0% exit 90%;
            }
            .hero-isi {
              animation: hero-drift linear both;
              animation-timeline: --heroK;
              animation-range: exit 0% exit 100%;
            }
          }
        }
        @keyframes ranting-keluar-kiri  { to { transform: translate(-40%, 18%); rotate: 22deg;  opacity: 0; } }
        @keyframes ranting-keluar-kanan { to { transform: translate(40%, 18%);  rotate: -22deg; opacity: 0; } }
        @keyframes cangkir-keluar       { to { transform: translateY(45%) scale(0.9); opacity: 0; } }
        @keyframes hero-drift           { to { transform: translateY(-8%); opacity: 0.15; } }

        @media (prefers-reduced-motion: no-preference) {
          .marquee-track { animation: marquee 26s linear infinite; }

          /* Uap mengepul dari cangkir */
          .uap {
            transform-origin: 50% 100%;
            animation: uap-naik 3.4s ease-in-out infinite;
          }
          .uap-2 { animation-duration: 4.1s; animation-delay: -1.2s; }
          .uap-3 { animation-duration: 3.8s; animation-delay: -2.4s; }

          /* Ranting ceri bergoyang pelan dari pangkalnya */
          .ceri-goyang {
            transform-origin: 50% 100%;
            animation: ceri-goyang var(--goyang-dur, 7s) ease-in-out infinite alternate;
          }

          /* Biji kopi berjatuhan pelan di hero */
          .biji-jatuh {
            animation: biji-jatuh var(--jatuh-dur, 15s) linear var(--jatuh-del, 0s) infinite;
            will-change: transform, opacity;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .biji-jatuh { display: none; }
        }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes uap-naik {
          0%   { opacity: 0; transform: translateY(6px) scaleY(0.85); }
          25%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-16px) scaleY(1.15); }
        }
        @keyframes ceri-goyang { from { rotate: -2.2deg; } to { rotate: 2.6deg; } }
        @keyframes biji-jatuh {
          0%   { transform: translate3d(0, -8vh, 0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          35%  { transform: translate3d(34px, 28vh, 0) rotate(120deg); }
          65%  { transform: translate3d(-26px, 58vh, 0) rotate(240deg); }
          88%  { transform: translate3d(22px, 84vh, 0) rotate(320deg); opacity: 0.6; }
          100% { transform: translate3d(-10px, 104vh, 0) rotate(380deg); opacity: 0; }
        }
      `}</style>

                {/* ================= NAVBAR ================= */}
                <header className="navbar-glass fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#2B1A0E]/30 backdrop-blur-md">
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
                                        {l.href.startsWith("#") ? (
                                            <a href={l.href} className="transition hover:text-[#F3EDE0]">{l.label}</a>
                                        ) : (
                                            <Link href={l.href} className="transition hover:text-[#F3EDE0]">{l.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[#F3EDE0] px-4 py-2 text-xs font-semibold text-[#4A3524] shadow transition hover:bg-[#EAE1CD] sm:text-sm"
                        >
                            {c.nav.cta}
                        </a>
                    </div>
                </header>

                {/* ================= 1. HERO ================= */}
                <section
                    aria-label="Kopi Balesari"
                    className="hero-timeline relative isolate overflow-hidden bg-gradient-to-b from-[#4A3524] via-[#3B2416] to-[#2B1A0E] text-[#F3EDE0]"
                >
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(243,237,224,0.12),transparent_62%)]" />
                    <div aria-hidden="true" className="pattern-titik-kopi absolute inset-0 opacity-40" />

                    {/* biji kopi berjatuhan */}
                    {[
                        { left: "10%", dur: "16s", del: "-3s", ukuran: "h-6 w-4", warna: "text-[#8B5E3C]/50" },
                        { left: "32%", dur: "20s", del: "-11s", ukuran: "h-5 w-3.5", warna: "text-[#A9714B]/40" },
                        { left: "58%", dur: "17s", del: "-6s", ukuran: "h-7 w-5", warna: "text-[#8B5E3C]/35" },
                        { left: "80%", dur: "19s", del: "-14s", ukuran: "h-5 w-3.5", warna: "text-[#C89A6B]/30" },
                    ].map((b, i) => (
                        <BijiKopi
                            key={i}
                            className={`biji-jatuh pointer-events-none absolute -top-8 ${b.ukuran} ${b.warna}`}
                            style={{ left: b.left, "--jatuh-dur": b.dur, "--jatuh-del": b.del } as React.CSSProperties}
                        />
                    ))}

                    {/* ranting ceri di dua sisi, bergoyang & ikut parallax */}
                    <div aria-hidden="true" className="hero-ranting-kiri pointer-events-none absolute bottom-0 -left-10 hidden origin-bottom-left rotate-[10deg] opacity-60 lg:block">
                        <div className="ceri-goyang" style={{ "--goyang-dur": "7.2s" } as React.CSSProperties}>
                            <RantingCeri className="h-[440px] w-auto" />
                        </div>
                    </div>
                    <div aria-hidden="true" className="hero-ranting-kanan pointer-events-none absolute -right-12 bottom-0 hidden origin-bottom-right -rotate-[12deg] opacity-50 lg:block">
                        <div className="ceri-goyang" style={{ "--goyang-dur": "8.4s" } as React.CSSProperties}>
                            <RantingCeri className="h-[380px] w-auto -scale-x-100" />
                        </div>
                    </div>

                    <div className="hero-isi relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-24 pb-24 sm:pt-26 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
                        <div>
                            <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#F3EDE0]/60">
                                <ol className="flex items-center gap-2">
                                    <li><Link href="/" className="transition hover:text-[#F3EDE0]">{c.hero.breadcrumb.home}</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li aria-current="page" className="font-medium text-[#F3EDE0]/90">{c.hero.breadcrumb.current}</li>
                                </ol>
                            </nav>

                            <p className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#F3EDE0] uppercase" style={{ backgroundColor: AKSEN }}>
                                <Coffee aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
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
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F3EDE0] px-7 py-3.5 font-semibold text-[#4A3524] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EAE1CD] motion-reduce:hover:translate-y-0"
                            >
                                {c.hero.cta} <span aria-hidden="true">→</span>
                            </a>

                            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                                {c.hero.stats.map((s) => (
                                    <div key={s.label} className="rounded-2xl border border-[#F3EDE0]/15 bg-[#F3EDE0]/10 px-3 py-4 text-center backdrop-blur-sm">
                                        <dd className="font-display text-2xl font-semibold">{s.angka}</dd>
                                        <dd className="text-[11px] font-medium text-[#C89A6B]">{s.satuan}</dd>
                                        <dt className="mt-1 text-[10px] leading-tight text-[#F3EDE0]/60">{s.label}</dt>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* foto + cangkir beruap */}
                        <figure className="relative mx-auto w-full max-w-sm">
                            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 -rotate-2 rounded-3xl bg-[#F3EDE0]/10" />
                            <div className="relative rotate-[1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-2xl">
                                <div className="relative aspect-[4/5]">
                                    <Image
                                        src={c.hero.img}
                                        alt={c.hero.imgAlt}
                                        fill
                                        sizes="(min-width: 1024px) 36vw, 90vw"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                            <div aria-hidden="true" className="hero-cangkir absolute -bottom-8 -left-6 sm:-left-12">
                                <CangkirKopi className="h-32 w-auto drop-shadow-[0_10px_14px_rgba(0,0,0,0.4)] sm:h-40" />
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
                                <BijiKopi className="h-4 w-3 text-[#6B4226]/60" />
                            </span>
                        ))}
                    </div>
                </div>

                {/* ================= 2. CERITA PELOPOR ================= */}
                <section id="cerita" aria-labelledby="cerita-heading" className="noda-kopi relative overflow-hidden py-20 sm:py-24">
                    <div aria-hidden="true" className="ceri-goyang pointer-events-none absolute -bottom-12 -left-8 hidden origin-bottom-left rotate-[12deg] opacity-25 md:block" style={{ "--goyang-dur": "6.8s" } as React.CSSProperties}>
                        <RantingCeri className="h-80 w-auto" />
                    </div>
                    <BijiKopi className="pointer-events-none absolute top-24 right-[8%] hidden h-10 w-7 rotate-12 text-[#6B4226]/20 md:block" />
                    <DaunKopi className="pointer-events-none absolute bottom-24 right-[16%] hidden h-5 w-14 -rotate-12 text-[#4E7248]/25 lg:block" />

                    <div className="relative mx-auto max-w-6xl px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <Reveal type="from-left">
                                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Awal Mulanya</p>
                                <h2 id="cerita-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                    {c.cerita.heading}
                                </h2>
                                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A3B2C] sm:text-lg">
                                    {c.cerita.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </Reveal>

                            <figure className="relative mx-auto w-full max-w-md">
                                <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-3xl bg-[#6B4226]/15" />
                                <div className="relative rotate-[-1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-xl">
                                    <div className="relative aspect-[4/3]">
                                        <Image src={c.cerita.img} alt={c.cerita.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                                    </div>
                                </div>
                            </figure>
                        </div>

                        {/* tiga sorotan singkat */}
                        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
                            {c.cerita.sorotan.map((s, i) => {
                                const Ikon = ikonSorotan[s.ikon];
                                return (
                                    <Reveal
                                        key={s.judul}
                                        as="li"
                                        index={i}
                                        ulang
                                        className="rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-6 shadow-sm"
                                    >
                                        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6B4226]/12 text-[#6B4226]">
                                            <Ikon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                                        </span>
                                        <p className="font-display font-semibold text-[#4A3524]">{s.judul}</p>
                                        <p className="mt-1.5 text-sm leading-relaxed text-[#4A3B2C]/85">{s.teks}</p>
                                    </Reveal>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* ================= 3. JENIS KOPI ================= */}
                <section id="jenis" aria-labelledby="jenis-heading" className="relative bg-[#EAE1CD]">
                    <Wave fill="#F3EDE0" flip className="absolute inset-x-0 top-0" />
                    <div aria-hidden="true" className="noda-kopi absolute inset-0" />
                    <BijiKopi className="pointer-events-none absolute top-32 left-[5%] hidden h-12 w-8 -rotate-12 text-[#6B4226]/18 md:block" />
                    <BijiKopi className="pointer-events-none absolute right-[7%] bottom-20 hidden h-9 w-6 rotate-[24deg] text-[#6B4226]/15 md:block" />
                    <DaunKopi className="pointer-events-none absolute top-40 right-[12%] hidden h-5 w-14 rotate-12 text-[#4E7248]/25 lg:block" />

                    <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Varietas</p>
                            <h2 id="jenis-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.jenis.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.jenis.intro}</p>
                        </Reveal>

                        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                            {c.jenis.items.map((j, i) => (
                                <Reveal
                                    key={j.nama}
                                    as="li"
                                    index={i}
                                    ulang
                                    className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0 ${j.sorot ? "border-[#6B4226]/30 bg-[#F8F4EA]" : "border-[#3A2E22]/10 bg-[#F8F4EA]/70"
                                        }`}
                                >
                                    <BijiKopi className="pointer-events-none absolute -right-3 -bottom-4 h-20 w-14 rotate-12 text-[#6B4226]/8" />
                                    <div className="relative flex items-start justify-between gap-3">
                                        <h3 className="font-display text-xl font-semibold text-[#4A3524]">{j.nama}</h3>
                                        <span
                                            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${j.sorot ? "bg-[#6B4226] text-[#F3EDE0]" : "bg-[#3A2E22]/10 text-[#7A5C3E]"
                                                }`}
                                        >
                                            {j.catatan}
                                        </span>
                                    </div>
                                    <p className="relative mt-2.5 text-sm leading-relaxed text-[#4A3B2C]/85">{j.deskripsi}</p>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ================= 4. MENUNGGU (umur panen) ================= */}
                <section aria-labelledby="menunggu-heading" className="relative overflow-hidden bg-[#2B1A0E] text-[#F3EDE0]">
                    <div aria-hidden="true" className="pattern-titik-kopi absolute inset-0 opacity-40" />
                    <div aria-hidden="true" className="ceri-goyang pointer-events-none absolute -right-10 bottom-0 hidden origin-bottom-right -rotate-[10deg] opacity-30 lg:block" style={{ "--goyang-dur": "7.6s" } as React.CSSProperties}>
                        <RantingCeri className="h-80 w-auto -scale-x-100" />
                    </div>

                    <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#C89A6B] uppercase">Soal Waktu</p>
                            <h2 id="menunggu-heading" className="font-display text-3xl font-semibold sm:text-4xl">
                                {c.menunggu.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#F3EDE0]/75">{c.menunggu.intro}</p>
                        </Reveal>

                        <ul className="mt-10 space-y-6">
                            {c.menunggu.bar.map((b, i) => (
                                <Reveal key={b.nama} as="li" index={i} ulang>
                                    <div className="mb-2 flex items-baseline justify-between">
                                        <span className="font-display text-lg font-semibold">{b.nama}</span>
                                        <span className="text-sm text-[#C89A6B]">{b.tahun} tahun sampai panen perdana</span>
                                    </div>
                                    <div className="h-3 overflow-hidden rounded-full bg-[#F3EDE0]/10">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#C89A6B]"
                                            style={{ width: `${b.lebar}%` }}
                                        />
                                    </div>
                                    {/* penanda tahun */}
                                    <div aria-hidden="true" className="mt-1.5 flex justify-between text-[10px] text-[#F3EDE0]/40">
                                        {Array.from({ length: b.tahun }, (_, t) => (
                                            <span key={t}>{t + 1}</span>
                                        ))}
                                    </div>
                                </Reveal>
                            ))}
                        </ul>

                        <p className="mt-8 text-center text-sm text-[#F3EDE0]/60 italic">{c.menunggu.catatan}</p>
                    </div>
                </section>

                {/* ================= 5. DUA CARA OLAH ================= */}
                <section aria-labelledby="olahan-heading" className="noda-kopi relative overflow-hidden py-20 sm:py-24">
                    <BijiKopi className="pointer-events-none absolute top-16 left-[6%] hidden h-11 w-8 rotate-[18deg] text-[#6B4226]/18 md:block" />
                    <DaunKopi className="pointer-events-none absolute bottom-16 left-[18%] hidden h-5 w-14 rotate-6 text-[#4E7248]/22 lg:block" />
                    <div aria-hidden="true" className="ceri-goyang pointer-events-none absolute -top-6 right-[4%] hidden origin-top opacity-20 lg:block" style={{ "--goyang-dur": "8s" } as React.CSSProperties}>
                        <RantingCeri className="h-64 w-auto rotate-180" />
                    </div>

                    <div className="relative mx-auto max-w-6xl px-6">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Pascapanen</p>
                            <h2 id="olahan-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.olahan.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.olahan.intro}</p>
                        </Reveal>

                        <div className="mt-10 grid gap-6 sm:grid-cols-2">
                            {c.olahan.items.map((o, i) => (
                                <Reveal
                                    key={o.nama}
                                    type={i === 0 ? "from-left" : "from-right"}
                                    ulang
                                    className="relative overflow-hidden rounded-3xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-7 shadow-sm"
                                >
                                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: o.warna }} />
                                    <span
                                        aria-hidden="true"
                                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                                        style={{ backgroundColor: `${o.warna}1F`, color: o.warna }}
                                    >
                                        <Coffee className="h-6 w-6" strokeWidth={1.8} />
                                    </span>
                                    <h3 className="font-display text-xl font-semibold text-[#4A3524]">
                                        {o.nama}
                                        <span className="ml-2 align-middle text-xs font-normal text-[#7A5C3E]">{o.julukan}</span>
                                    </h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-[#4A3B2C]/85">{o.deskripsi}</p>
                                    <ul className="mt-4 space-y-2 text-sm text-[#4A3B2C]/85">
                                        {o.poin.map((p) => (
                                            <li key={p} className="flex gap-2.5">
                                                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: o.warna }} />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= 6. PROSES ================= */}
                <section id="proses" aria-labelledby="proses-heading" className="relative bg-[#EAE1CD]">
                    <Wave fill="#F3EDE0" flip className="absolute inset-x-0 top-0" />
                    <div aria-hidden="true" className="noda-kopi absolute inset-0" />
                    <div aria-hidden="true" className="ceri-goyang pointer-events-none absolute -right-12 bottom-24 hidden origin-bottom-right -rotate-[14deg] opacity-25 lg:block" style={{ "--goyang-dur": "7.4s" } as React.CSSProperties}>
                        <RantingCeri className="h-96 w-auto -scale-x-100" />
                    </div>
                    <BijiKopi className="pointer-events-none absolute top-40 left-[4%] hidden h-10 w-7 -rotate-12 text-[#6B4226]/15 md:block" />

                    <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Perjalanannya</p>
                            <h2 id="proses-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.proses.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.proses.intro}</p>
                        </Reveal>

                        <ol className="relative mt-12 space-y-11 border-l-2 border-[#6B4226]/25 pl-8 sm:pl-12">
                            {c.proses.langkah.map((l, i) => (
                                <Reveal key={l.judul} as="li" type="from-right" className="relative">
                                    <span
                                        aria-hidden="true"
                                        className="font-display absolute top-0 -left-[51px] flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-[#F3EDE0] shadow sm:-left-[69px] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base"
                                        style={{ backgroundColor: AKSEN }}
                                    >
                                        {i + 1}
                                    </span>
                                    <h3 className="font-display pt-1 text-xl font-semibold text-[#4A3524] sm:pt-1.5">{l.judul}</h3>
                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A3B2C]/85 sm:text-base">{l.deskripsi}</p>
                                    {l.img && (
                                        <div
                                            className={`relative mt-5 aspect-[16/9] max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg ${i % 2 === 0 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"
                                                }`}
                                        >
                                            <Image src={l.img} alt={l.alt} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
                                        </div>
                                    )}
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ================= 7. TANTANGAN ================= */}
                <section aria-labelledby="tantangan-heading" className="noda-kopi relative overflow-hidden py-20 sm:py-24">
                    <BijiKopi className="pointer-events-none absolute right-[6%] bottom-16 hidden h-12 w-8 rotate-12 text-[#6B4226]/15 md:block" />
                    <DaunKopi className="pointer-events-none absolute top-20 left-[8%] hidden h-5 w-14 -rotate-6 text-[#4E7248]/22 md:block" />

                    <div className="relative mx-auto max-w-6xl px-6">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Apa Adanya</p>
                            <h2 id="tantangan-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.tantangan.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.tantangan.intro}</p>
                        </Reveal>

                        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                            {c.tantangan.items.map((t, i) => {
                                const Ikon = ikonTantangan[t.ikon];
                                return (
                                    <Reveal
                                        key={t.judul}
                                        as="li"
                                        index={i}
                                        ulang
                                        className="rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-6 shadow-sm"
                                    >
                                        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B5E3C]/12 text-[#8B5E3C]">
                                            <Ikon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                                        </span>
                                        <p className="font-display font-semibold text-[#4A3524]">{t.judul}</p>
                                        <p className="mt-1.5 text-sm leading-relaxed text-[#4A3B2C]/85">{t.teks}</p>
                                    </Reveal>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* ================= 8. PETANI & HARAPAN ================= */}
                <section aria-labelledby="petani-heading" className="relative overflow-hidden bg-[#2B1A0E] text-[#F3EDE0]">
                    <Wave fill="#F3EDE0" className="absolute inset-x-0 top-0 rotate-180" />
                    <div aria-hidden="true" className="pattern-titik-kopi absolute inset-0 opacity-35" />
                    <div aria-hidden="true" className="ceri-goyang pointer-events-none absolute -bottom-10 -left-10 hidden origin-bottom-left rotate-[12deg] opacity-25 lg:block" style={{ "--goyang-dur": "6.9s" } as React.CSSProperties}>
                        <RantingCeri className="h-80 w-auto" />
                    </div>

                    <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-24 sm:pt-32 sm:pb-28">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <figure className="relative mx-auto w-full max-w-md">
                                <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-3xl bg-[#F3EDE0]/10" />
                                <div className="relative rotate-[-1.5deg] overflow-hidden rounded-3xl border-8 border-[#F8F4EA] bg-[#DCD2BC] shadow-2xl">
                                    <div className="relative aspect-[4/3]">
                                        <Image src={c.petani.img} alt={c.petani.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                                    </div>
                                </div>
                            </figure>

                            <Reveal type="from-right">
                                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#C89A6B] uppercase">Orang di Baliknya</p>
                                <h2 id="petani-heading" className="font-display text-3xl font-semibold sm:text-4xl">
                                    {c.petani.heading}
                                </h2>
                                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#F3EDE0]/85 sm:text-lg">
                                    {c.petani.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        <Reveal as="figure" ulang className="relative mt-14 overflow-hidden rounded-3xl border border-[#F3EDE0]/12 bg-[#F3EDE0]/8 px-6 py-10 text-center backdrop-blur-sm sm:px-16">
                            <span aria-hidden="true" className="font-display absolute top-2 left-6 text-7xl text-[#C89A6B]/30">“</span>
                            <BijiKopi className="pointer-events-none absolute -right-2 -bottom-3 h-16 w-11 rotate-12 text-[#C89A6B]/15" />
                            <blockquote className="font-display mx-auto max-w-2xl text-xl leading-relaxed italic sm:text-2xl">
                                {c.petani.kutipan}
                            </blockquote>
                            <figcaption className="mt-4 text-sm font-medium text-[#C89A6B]">{c.petani.kutipanSumber}</figcaption>
                        </Reveal>
                    </div>

                    <Wave fill="#F3EDE0" className="absolute inset-x-0 bottom-0" />
                </section>

                {/* ================= 9. PEMESANAN & KEMITRAAN ================= */}
                <section id="pesan" aria-labelledby="pesan-heading" className="noda-kopi relative overflow-hidden py-20 sm:py-24">
                    <BijiKopi className="pointer-events-none absolute top-24 left-[5%] hidden h-11 w-8 -rotate-[18deg] text-[#6B4226]/15 md:block" />
                    <DaunKopi className="pointer-events-none absolute right-[10%] bottom-32 hidden h-5 w-14 rotate-12 text-[#4E7248]/22 lg:block" />

                    <div className="relative mx-auto max-w-6xl px-6">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Untuk Pembeli</p>
                            <h2 id="pesan-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.pemesanan.heading}
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#4A3B2C]/80">{c.pemesanan.intro}</p>
                        </Reveal>

                        <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
                            {c.pemesanan.spesifikasi.map((s, i) => (
                                <Reveal
                                    key={s.label}
                                    as="div"
                                    index={i}
                                    ulang
                                    className="rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] p-5 shadow-sm"
                                >
                                    <dt className="text-[11px] font-semibold tracking-[0.14em] text-[#7A5C3E] uppercase">{s.label}</dt>
                                    <dd className="font-display mt-1.5 font-semibold text-[#4A3524]">{s.nilai}</dd>
                                </Reveal>
                            ))}
                        </dl>
                        <p className="mt-4 text-sm text-[#7A5C3E] italic">{c.pemesanan.catatan}</p>

                        {/* dua ajakan: beli & kemitraan */}
                        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                            <Reveal type="from-left" ulang className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A3524] to-[#2B1A0E] px-6 py-10 text-[#F3EDE0] shadow-2xl sm:px-10">
                                <div aria-hidden="true" className="pattern-titik-kopi absolute inset-0 opacity-30" />
                                <CangkirKopi className="pointer-events-none absolute -right-6 -bottom-10 h-44 w-auto opacity-15" />
                                <div className="relative">
                                    <h3 className="font-display text-2xl font-semibold sm:text-3xl">Mau pesan kopinya?</h3>
                                    <p className="mt-3 max-w-md text-sm text-[#F3EDE0]/80 sm:text-base">
                                        Tanyakan jenis, mutu, dan ketersediaan panen terbaru langsung ke kami.
                                    </p>
                                    <a
                                        href={waHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F3EDE0] px-7 py-3.5 font-semibold text-[#4A3524] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EAE1CD] motion-reduce:hover:translate-y-0"
                                    >
                                        <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                                        {c.pemesanan.waLabel}
                                    </a>
                                </div>
                            </Reveal>

                            <Reveal type="from-right" ulang className="relative overflow-hidden rounded-3xl border-2 border-dashed border-[#6B4226]/35 bg-[#F8F4EA] px-6 py-10 sm:px-8">
                                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B4226]/12 text-[#6B4226]">
                                    <Handshake aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                                </span>
                                <h3 className="font-display text-xl font-semibold text-[#4A3524] sm:text-2xl">
                                    {c.pemesanan.mitra.judul}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-[#4A3B2C]/85">{c.pemesanan.mitra.teks}</p>
                                <a
                                    href={waMitraHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#6B4226] px-6 py-2.5 text-sm font-semibold text-[#6B4226] transition hover:bg-[#6B4226] hover:text-[#F3EDE0]"
                                >
                                    {c.pemesanan.mitra.label} <span aria-hidden="true">→</span>
                                </a>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ================= 10. GALERI ================= */}
                <section aria-labelledby="galeri-heading" className="relative overflow-hidden bg-[#EAE1CD] py-20 sm:py-24">
                    <div aria-hidden="true" className="noda-kopi absolute inset-0" />
                    <BijiKopi className="pointer-events-none absolute top-14 right-[7%] hidden h-10 w-7 rotate-[22deg] text-[#6B4226]/15 md:block" />

                    <div className="relative mx-auto max-w-6xl px-6">
                        <Reveal>
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#7A5C3E] uppercase">Dokumentasi</p>
                            <h2 id="galeri-heading" className="font-display text-3xl font-semibold text-[#4A3524] sm:text-4xl">
                                {c.galeri.heading}
                            </h2>
                        </Reveal>

                        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {c.galeri.items.map((foto, i) => (
                                <li
                                    key={i}
                                    className={`overflow-hidden rounded-xl border-[6px] border-[#F8F4EA] bg-[#DCD2BC] shadow-lg transition hover:z-10 hover:scale-[1.03] hover:rotate-0 motion-reduce:hover:scale-100 ${i % 2 === 0 ? "rotate-[1.2deg]" : "-rotate-[1.2deg]"
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

                {/* ================= 11. POTENSI LAINNYA ================= */}
                <section aria-labelledby="lainnya-heading" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <Reveal>
                        <h2 id="lainnya-heading" className="font-display text-2xl font-semibold text-[#4A3524] sm:text-3xl">
                            {c.lainnya.heading}
                        </h2>
                    </Reveal>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {c.lainnya.items.map((item, i) => (
                            <Reveal
                                key={item.slug}
                                as="article"
                                index={i}
                                ulang
                                className="group relative overflow-hidden rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA] shadow-md transition hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0"
                            >
                                <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: item.aksen }} />
                                <Link href={item.slug} className="flex items-center gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4226]">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#DCD2BC]">
                                        <Image src={item.img} alt={item.alt} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-semibold text-[#4A3524]">{item.nama}</h3>
                                        <p className="mt-1 text-sm text-[#4A3B2C]/85">{item.pancingan}</p>
                                        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 motion-reduce:group-hover:gap-1.5" style={{ color: item.aksen }}>
                                            Lihat <span aria-hidden="true">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ================= FOOTER ================= */}
                <footer className="relative bg-[#2B1A0E] text-[#F3EDE0]">
                    <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="sm:col-span-2">
                            <p className="font-display flex items-center gap-2.5 text-xl font-semibold">
                                <LogoBambu className="h-7 w-auto" />
                                {c.footer.brand}
                            </p>
                            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#F3EDE0]/70">{c.footer.tagline}</p>
                            <p className="mt-4 text-sm text-[#F3EDE0]/60">📍 {c.footer.alamat}</p>
                        </div>

                        <nav aria-label="Produk">
                            <p className="text-xs font-semibold tracking-[0.18em] text-[#C89A6B] uppercase">Produk</p>
                            <ul className="mt-4 space-y-2.5 text-sm text-[#F3EDE0]/80">
                                {c.footer.kolomProduk.map((n) => (
                                    <li key={n.href}>
                                        <Link href={n.href} className="transition hover:text-[#F3EDE0] hover:underline">{n.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-label="Halaman">
                            <p className="text-xs font-semibold tracking-[0.18em] text-[#C89A6B] uppercase">Jelajah</p>
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
            </main>
        </>
    );
}