// src/data/kerajinanImages.ts
// Sumber tunggal untuk semua path gambar yang dipakai src/app/kerajinan-tangan/page.tsx.
// Dipindah ke sini (dari yang sebelumnya const lokal di dalam page.tsx) supaya
// src/data/gallery.ts juga bisa memakai foto yang sama tanpa menduplikasi path
// secara manual — dan supaya gallery.ts tidak perlu meng-import seluruh modul
// page.tsx (yang berat: ada komponen React, metadata, font loader, dst).
//
// page.tsx TETAP mengontrol section mana yang menampilkan slot mana; file ini
// HANYA menyimpan path-nya. Ganti nilai di sini, otomatis kepakai di halaman
// /kerajinan-tangan MAUPUN /galeri.

export const FALLBACK_IMAGE = "/images/desa-balesari.jpeg";

export const IMAGES = {
  hero: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/hero.jpg
  // Section "Cerita" saat ini belum memakai elemen foto (hanya kartu
  // teks + ikon), jadi slot ini disiapkan untuk pemakaian mendatang
  // tanpa mengubah layout section tersebut sekarang.
  cerita: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/cerita.jpg

  // Section "Material Palette" saat ini memakai swatch warna (bukan
  // foto), jadi key ini disiapkan saja, belum dipakai di JSX supaya
  // desain swatch yang sudah ada tidak berubah.
  material: {
    batok: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/material-batok.jpg
    bambu: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/material-bambu.jpg
    alam: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/material-alam.jpg
  },

  produk: {
    batok: "/images/dokum_handcraft2.png", // ganti ke: /images/kerajinan/produk-batok.jpg
    anyaman: "/images/anyaman_bambu.jpg", // ganti ke: /images/kerajinan/produk-anyaman.jpg
    souvenir: "/images/hasil_batok.jpg", // ganti ke: /images/kerajinan/produk-souvenir.jpg
    custom: FALLBACK_IMAGE, // ganti ke: /images/kerajinan/produk-custom.jpg
  },

  rawCrafted: {
    before: "/images/batok_kelapa.jpg", // ganti ke: /images/kerajinan/before.jpg
    after: "/images/hasil_batok.jpg", // ganti ke: /images/kerajinan/after.jpg
  },

  gallery: [
    "/images/fotbar_kerajinan.jpg", // ganti ke: /images/kerajinan/gallery-01.jpg
    "/images/dokum_handcraft2.png", // ganti ke: /images/kerajinan/gallery-02.jpg
    "/images/hasil_batok.jpg", // ganti ke: /images/kerajinan/gallery-03.jpg
    "/images/batok_kelapa.jpg", // ganti ke: /images/kerajinan/gallery-04.jpg
    FALLBACK_IMAGE, // ganti ke: /images/kerajinan/gallery-05.jpg
  ],

  story: "/images/fotbar_kerajinan.jpg", // ganti ke: /images/kerajinan/story.jpg
};
