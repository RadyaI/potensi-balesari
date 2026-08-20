// src/data/kopiImages.ts
// Sumber tunggal untuk path foto dokumentasi yang SUDAH dipakai di
// src/app/kopi/page.tsx (hero, kebun, jemur, sangrai, biji). Dipindah ke
// sini supaya src/data/gallery.ts bisa memakai foto yang sama persis
// tanpa menuliskan ulang path-nya.
//
// Semua 5 file di bawah nyata ada di public/images/ dan sudah dipakai
// aktif di halaman /kopi — bukan foto baru/karangan.

export const IMG_HERO = "/images/dokum_kopi1.webp";
export const IMG_JEMUR = "/images/dokum_kopi2.webp";
export const IMG_KEBUN = "/images/dokum_kopi3.webp";
export const IMG_SANGRAI = "/images/dokum_kopi4.webp";
export const IMG_BIJI = "/images/dokum_kopi5.webp";
