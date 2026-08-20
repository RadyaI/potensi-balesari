// src/data/gallery.ts
// SINGLE SOURCE OF TRUTH untuk seluruh data foto /galeri.
//
// Dipakai oleh:
//   - src/app/galeri/GaleriClient.tsx (filter, grid masonry, "Di Balik
//     Potensi Balesari")
//   - src/components/GalleryFlipCard.tsx (lewat tipe GaleriItem)
//
// Foto-fotonya sendiri TIDAK didefinisikan ulang di sini. File ini cuma
// menyusun & memberi cerita (judul/deskripsi/lokasi/tahun) di atas path
// yang sudah ada di:
//   - src/data/bitingImages.ts    (sama dengan yang dipakai /biting)
//   - src/data/kopiImages.ts      (sama dengan yang dipakai /kopi)
//   - src/data/kerajinanImages.ts (sama dengan yang dipakai /kerajinan-tangan)
//
// Jadi kalau kamu ganti path foto di salah satu file data/*Images.ts itu,
// halaman potensi-nya DAN /galeri otomatis ikut berubah — tidak perlu
// diedit dua tempat.
//
// SOAL FOTO KERAJINAN & KEGIATAN YANG BELUM ADA ASLINYA:
// Semua slot di kerajinanImages.ts saat ini masih mengarah ke satu
// FALLBACK_IMAGE yang sama (belum ada foto asli). Supaya galeri TIDAK
// menampilkan foto yang sama berkali-kali seolah beda momen, kandidat
// kartu Kerajinan yang gambarnya persis sama dengan FALLBACK_IMAGE
// diringkas otomatis jadi satu kartu saja lewat dedupeFallback() di bawah.
// Begitu kamu ganti salah satu nilai di kerajinanImages.ts (misalnya
// IMAGES.produk.batok) ke file foto asli, kartu itu OTOMATIS lepas dari
// peringkasan dan tampil sebagai foto tersendiri — tanpa menyentuh file ini.
//
// Kategori "Kegiatan Warga" belum punya foto dokumentasi kegiatan yang
// benar-benar terpisah di project ini (sudah dicek ke seluruh
// public/images/ dan semua page). Supaya tetap jujur, sebagian kartu di
// kategori ini meminjam foto proses dari Biting/Kopi yang memang sudah
// menggambarkan warga sedang beraktivitas (bukan cerita yang tidak
// didukung foto), dan hanya SATU kartu yang memakai FALLBACK_IMAGE
// sebagai penanda "dokumentasi menyusul".

import { FALLBACK_IMAGE, IMAGES as KERAJINAN_IMAGES } from "./kerajinanImages";
import * as biting from "./bitingImages";
import * as kopi from "./kopiImages";

export type GaleriSlug = "biting" | "kopi" | "kerajinan" | "kegiatan" | "lingkungan";

export type GaleriItem = {
  id: number;
  image: string;
  /** Lebar & tinggi asli foto (atau rasio yang mendekati), dipakai grid masonry supaya landscape tetap landscape, potret tetap potret. */
  width: number;
  height: number;
  /** Label kategori yang ditampilkan di badge kartu (mis. "Biting Bambu"). */
  category: string;
  slug: GaleriSlug;
  title: string;
  description: string;
  location: string;
  year: string;
};

export type KategoriSlug = "semua" | GaleriSlug;
export type Kategori = { slug: KategoriSlug; label: string; aksen: string };

/* ============================================================
   WARNA AKSEN PER KATEGORI — dipakai badge/border kartu & tombol filter.
   ============================================================ */
const FOREST = "#2E4230";

export const AKSEN_KATEGORI: Record<GaleriSlug, string> = {
  biting: "#4E7248", // forest/bamboo green — identitas /biting
  kopi: "#6B4226", // coffee/dark earth brown — identitas /kopi
  kerajinan: "#B9805A", // warm terracotta — identitas /kerajinan-tangan
  kegiatan: "#5B6B4A", // hijau-zaitun netral, lintas potensi
  lingkungan: "#8A7B5C",
};

export const KATEGORI: Kategori[] = [
  { slug: "semua", label: "Semua", aksen: FOREST },
  { slug: "biting", label: "Biting Bambu", aksen: AKSEN_KATEGORI.biting },
  { slug: "kopi", label: "Kopi Balesari", aksen: AKSEN_KATEGORI.kopi },
  { slug: "kerajinan", label: "Kerajinan Tangan", aksen: AKSEN_KATEGORI.kerajinan },
  { slug: "kegiatan", label: "Kegiatan Warga", aksen: AKSEN_KATEGORI.kegiatan },
  { slug: "lingkungan", label: "Lingkungan Desa", aksen: AKSEN_KATEGORI.lingkungan },
];

/* ============================================================
   BITING BAMBU — 7 foto asli, semuanya sudah aktif dipakai di /biting
   (hero, profil pengrajin, alur setor-pengepul, & galeri singkatnya).
   ============================================================ */
const bitingItems: GaleriItem[] = [
  { id: 101, image: biting.FOTO_HERO, width: 1200, height: 900, category: "Biting Bambu", slug: "biting", title: "Ikatan Biting Siap Kirim", description: "Hasil serutan tangan pengrajin Dusun Segelan, diikat rapi sebelum dikirim.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 102, image: biting.FOTO_PENGRAJIN, width: 900, height: 1125, category: "Biting Bambu", slug: "biting", title: "Menyerut di Teras Rumah", description: "Warga Dusun Segelan menyerut bambu menjadi biting langsung di teras rumah.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 103, image: biting.FOTO_MENYERUT, width: 1000, height: 1000, category: "Biting Bambu", slug: "biting", title: "Menyerut Bambu", description: "Bambu dibelah tipis lalu diserut menjadi lidi biting dengan tangan.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 104, image: biting.FOTO_JEMUR, width: 900, height: 1200, category: "Biting Bambu", slug: "biting", title: "Biting Dijemur", description: "Penjemuran lidi biting di halaman rumah warga.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 105, image: biting.FOTO_IKATAN_SETOR, width: 1200, height: 800, category: "Biting Bambu", slug: "biting", title: "Siap Disetor ke Pengepul", description: "Ikatan biting bambu tersusun rapi, siap disetor ke pengepul.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 106, image: biting.FOTO_PENGEPUL, width: 1200, height: 900, category: "Biting Bambu", slug: "biting", title: "Menyetor ke Pengepul", description: "Hasil serutan dijemput mobil pengepul dan dibayar tunai di tempat.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 107, image: biting.FOTO_RUMPUN, width: 900, height: 900, category: "Biting Bambu", slug: "biting", title: "Rumpun Bambu Petung", description: "Rumpun bambu petung, bahan baku biting, tumbuh di sekitar Dusun Segelan.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
];

/* ============================================================
   KOPI BALESARI — 5 foto asli, semuanya sudah aktif dipakai di /kopi.
   ============================================================ */
const kopiItems: GaleriItem[] = [
  { id: 201, image: kopi.IMG_HERO, width: 900, height: 1200, category: "Kopi Balesari", slug: "kopi", title: "Ceri Kopi Siap Petik", description: "Buah kopi merah siap dipetik dari kebun warga di lereng Gunung Kawi.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
  { id: 202, image: kopi.IMG_JEMUR, width: 1200, height: 900, category: "Kopi Balesari", slug: "kopi", title: "Kopi Dijemur", description: "Biji kopi dijemur di halaman rumah warga sebelum diolah lebih lanjut.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
  { id: 203, image: kopi.IMG_KEBUN, width: 1000, height: 1000, category: "Kopi Balesari", slug: "kopi", title: "Membuka Lahan Kebun", description: "Lahan kebun kopi yang dibuka warga di lereng Gunung Kawi.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
  { id: 204, image: kopi.IMG_SANGRAI, width: 1200, height: 800, category: "Kopi Balesari", slug: "kopi", title: "Sangrai Tradisional", description: "Kopi disangrai warga dengan cara tradisional.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
  { id: 205, image: kopi.IMG_BIJI, width: 900, height: 1200, category: "Kopi Balesari", slug: "kopi", title: "Biji Kopi Hasil Panen", description: "Biji kopi hasil panen petani Desa Balesari, siap dijual atau diolah.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
];

/* ============================================================
   KERAJINAN TANGAN — diambil dari IMAGES di kerajinanImages.ts.
   Lihat dedupeFallback() di bawah untuk cara menghindari kartu duplikat.
   ============================================================ */
const kerajinanCandidates: GaleriItem[] = [
  { id: 301, image: KERAJINAN_IMAGES.produk.batok, width: 1000, height: 1000, category: "Kerajinan Tangan", slug: "kerajinan", title: "Kerajinan Batok Kelapa", description: "Tempurung kelapa dibersihkan dan dihaluskan menjadi wadah maupun pernak-pernik.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 302, image: KERAJINAN_IMAGES.produk.anyaman, width: 900, height: 1125, category: "Kerajinan Tangan", slug: "kerajinan", title: "Anyaman Bambu", description: "Bilah bambu dianyam menjadi perabot dan wadah sederhana.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 303, image: KERAJINAN_IMAGES.produk.souvenir, width: 1000, height: 1000, category: "Kerajinan Tangan", slug: "kerajinan", title: "Suvenir Bahan Alam", description: "Suvenir dan pernak-pernik dari bahan alam sekitar dusun.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 304, image: KERAJINAN_IMAGES.produk.custom, width: 900, height: 900, category: "Kerajinan Tangan", slug: "kerajinan", title: "Pesanan Khusus", description: "Kerajinan dibuat menyesuaikan permintaan, desain, dan ukuran pemesan.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 305, image: KERAJINAN_IMAGES.rawCrafted.before, width: 1000, height: 1000, category: "Kerajinan Tangan", slug: "kerajinan", title: "Bahan Mentah", description: "Batok kelapa sebelum diolah menjadi kerajinan.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 306, image: KERAJINAN_IMAGES.rawCrafted.after, width: 900, height: 1200, category: "Kerajinan Tangan", slug: "kerajinan", title: "Karya Jadi", description: "Hasil kerajinan tangan siap pakai.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 307, image: KERAJINAN_IMAGES.story, width: 1200, height: 900, category: "Kerajinan Tangan", slug: "kerajinan", title: "Proses Kerajinan Tangan", description: "Cuplikan proses kerajinan tangan buatan warga Dusun Segelan.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
];

/* ============================================================
   KEGIATAN WARGA — belum ada foto dokumentasi kegiatan yang terpisah.
   2 kartu pertama meminjam foto proses Biting/Kopi yang memang benar
   menunjukkan warga sedang beraktivitas (bukan klaim yang tidak
   didukung foto); 1 kartu terakhir jujur memakai FALLBACK_IMAGE sebagai
   penanda dokumentasi menyusul.
   TODO: tambah entri baru di array ini begitu foto kunjungan/kegiatan
   warga yang sesungguhnya sudah tersedia.
   ============================================================ */
const kegiatanItems: GaleriItem[] = [
  { id: 401, image: biting.FOTO_PENGRAJIN, width: 900, height: 1125, category: "Kegiatan Warga", slug: "kegiatan", title: "Keseharian Warga Dusun Segelan", description: "Aktivitas warga Dusun Segelan mengerjakan potensi desa sehari-hari.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 402, image: kopi.IMG_KEBUN, width: 1000, height: 1000, category: "Kegiatan Warga", slug: "kegiatan", title: "Kerja Bersama di Lahan", description: "Warga bekerja bersama mengelola lahan dan hasil bumi dusun.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
  { id: 403, image: FALLBACK_IMAGE, width: 1000, height: 1000, category: "Kegiatan Warga", slug: "kegiatan", title: "Dokumentasi Kegiatan Lainnya", description: "Kunjungan, obrolan, dan kegiatan warga lain. Dokumentasi foto lengkap menyusul.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
];

/* ============================================================
   LINGKUNGAN DESA — sebagian foto sengaja dipakai ulang dari kategori
   lain (rumpun bambu, lahan kebun) karena memang menggambarkan
   lingkungan dusun juga; path-nya tetap satu sumber yang sama.
   ============================================================ */
const lingkunganItems: GaleriItem[] = [
  { id: 501, image: FALLBACK_IMAGE, width: 1200, height: 900, category: "Lingkungan Desa", slug: "lingkungan", title: "Suasana Dusun Segelan", description: "Pemandangan keseharian Dusun Segelan, Desa Balesari.", location: "Kec. Ngajum, Kab. Malang", year: "2026" },
  { id: 502, image: "/images/biting.jpg", width: 1200, height: 675, category: "Lingkungan Desa", slug: "lingkungan", title: "Lereng Gunung Kawi", description: "Lingkungan alam di lereng Gunung Kawi, rumah bagi warga Dusun Segelan.", location: "Kec. Ngajum, Kab. Malang", year: "2026" },
  { id: 503, image: biting.FOTO_RUMPUN, width: 900, height: 900, category: "Lingkungan Desa", slug: "lingkungan", title: "Rumpun Bambu di Dusun Segelan", description: "Rumpun bambu petung yang tumbuh di lingkungan sekitar dusun.", location: "Dusun Segelan, Desa Balesari", year: "2026" },
  { id: 504, image: kopi.IMG_KEBUN, width: 1000, height: 1000, category: "Lingkungan Desa", slug: "lingkungan", title: "Lahan di Lereng Gunung Kawi", description: "Lahan pertanian warga yang membentang di lereng Gunung Kawi.", location: "Desa Balesari, Kec. Ngajum", year: "2026" },
];

/**
 * Kalau beberapa kartu kandidat memakai gambar yang PERSIS sama dengan
 * FALLBACK_IMAGE, cuma kartu pertama yang dipertahankan — supaya galeri
 * tidak menampilkan foto placeholder yang sama berkali-kali seolah beda.
 * Kartu yang gambarnya BUKAN fallback (sudah foto asli) selalu lolos.
 */
function dedupeFallback(items: GaleriItem[]): GaleriItem[] {
  let fallbackSudahDipakai = false;
  return items.filter((item) => {
    if (item.image !== FALLBACK_IMAGE) return true;
    if (fallbackSudahDipakai) return false;
    fallbackSudahDipakai = true;
    return true;
  });
}

export const galeriItems: GaleriItem[] = [
  ...bitingItems,
  ...kopiItems,
  ...dedupeFallback(kerajinanCandidates),
  ...dedupeFallback(kegiatanItems),
  ...lingkunganItems,
];

/** Ambil daftar foto untuk satu kategori (atau semua). Dipakai filter /galeri. */
export function getGaleriByKategori(slug: KategoriSlug): GaleriItem[] {
  if (slug === "semua") return galeriItems;
  return galeriItems.filter((item) => item.slug === slug);
}
