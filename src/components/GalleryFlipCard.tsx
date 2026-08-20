// src/components/GalleryFlipCard.tsx
// Kartu foto 3D yang bisa dibalik — komponen inti halaman /galeri.
//
// DEPAN : foto + badge kategori + petunjuk "Klik untuk melihat cerita →"
// BELAKANG: kategori, judul, deskripsi, lokasi/tahun, tombol "↺ Balik Foto"
//
// - Murni CSS 3D transform (perspective, preserve-3d, backface-visibility),
//   tidak pakai library eksternal.
// - Dikontrol lewat <button>, jadi otomatis bisa di-fokus keyboard dan
//   diaktifkan dengan Enter/Space tanpa kode tambahan.
// - Petunjuk "klik untuk cerita" SELALU terlihat (bukan cuma saat hover),
//   supaya tetap jelas dipakai di perangkat sentuh/mobile.
// - Menghormati "kurangi gerakan": flip jadi instan tanpa animasi 3D.
//
// REVISI POLISHING: dua sisi kartu sekarang ditumpuk pakai CSS Grid
// (`grid-area: 1 / 1`), bukan `position: absolute` seperti sebelumnya.
// Alasannya: di mode "natural" (dipakai grid masonry utama), tinggi kartu
// ditentukan oleh rasio asli foto (lewat width/height, bukan `fill`),
// supaya foto landscape tetap landscape, potret tetap potret — tidak ada
// lagi kartu dipaksa ke tinggi seragam yang menyisakan area kosong.
// Mode "cover" (dipakai di grid seragam "Di Balik Potensi Balesari") tetap
// memakai `fill` + object-cover seperti semula, supaya barisan kartu di
// sana tetap rapi sejajar.

"use client";

import Image from "next/image";
import { useState } from "react";
import type { GaleriItem } from "@/data/gallery";

export type { GaleriItem };

type Props = {
  item: GaleriItem;
  /** Warna aksen sesuai kategori/asal foto (badge, border belakang, dsb) */
  aksen: string;
  /** Kelas tambahan dari parent (spacing, rounded, dsb — bukan lagi untuk paksa tinggi) */
  className?: string;
  /** Urutan kartu, dipakai untuk sizes attribute gambar */
  sizes?: string;
  /**
   * "natural" (default): tinggi kartu mengikuti rasio asli foto — dipakai di
   * grid masonry utama supaya tidak ada lubang kosong.
   * "cover": foto dipaksa penuh ke wadah (object-cover) — dipakai di grid
   * seragam seperti "Di Balik Potensi Balesari", wadah pemanggil WAJIB
   * memberi tinggi lewat className (mis. "aspect-square").
   */
  mode?: "natural" | "cover";
};

export default function GalleryFlipCard({
  item,
  aksen,
  className = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  mode = "natural",
}: Props) {
  const [terbalik, setTerbalik] = useState(false);
  const isCover = mode === "cover";

  return (
    <div className={`gallery-flip relative ${className}`} style={{ perspective: "1400px" }}>
      <button
        type="button"
        onClick={() => setTerbalik((v) => !v)}
        aria-pressed={terbalik}
        aria-label={
          terbalik
            ? `Tutup cerita foto: ${item.title}`
            : `${item.title}. Klik untuk melihat cerita di balik foto ini`
        }
        className={`flip-card group relative block w-full rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E4230] ${isCover ? "h-full" : ""}`}
      >
        <div
          className={`flip-inner relative w-full rounded-2xl ${isCover ? "h-full" : ""}`}
          style={{ transform: terbalik ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* ================= DEPAN ================= */}
          <div className="flip-face relative overflow-hidden rounded-2xl bg-[#DCD2BC] shadow-lg">
            {isCover ? (
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={sizes}
                  className="object-cover transition duration-500 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                />
              </div>
            ) : (
              <Image
                src={item.image}
                alt={item.title}
                width={item.width}
                height={item.height}
                sizes={sizes}
                className="block h-auto w-full transition duration-500 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
              />
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1C1710]/75 via-[#1C1710]/10 to-transparent" />
            <span
              className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide text-[#F3EDE0] uppercase shadow"
              style={{ backgroundColor: aksen }}
            >
              {item.category}
            </span>
            <span className="absolute right-3 bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-[#F3EDE0]/95 transition group-hover:translate-x-0.5 sm:text-xs">
              Klik untuk melihat cerita <span aria-hidden="true">→</span>
            </span>
          </div>

          {/* ================= BELAKANG ================= */}
          <div
            className="flip-face flip-back relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 bg-[#F8F4EA] p-4 shadow-lg sm:p-5"
            style={{ borderColor: aksen }}
          >
            <div>
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: aksen }}>
                {item.category}
              </span>
              <h3 className="font-display mt-1 text-sm leading-snug font-semibold text-[#2E4230] sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#4A3B2C]/85 sm:text-xs">{item.description}</p>
            </div>
            <div className="flex items-end justify-between gap-2">
              <p className="text-[10px] leading-tight text-[#7A5C3E] sm:text-[11px]">
                {item.location}
                <br />
                {item.year}
              </p>
              <span
                className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-[11px]"
                style={{ backgroundColor: aksen, color: "#F3EDE0" }}
              >
                <span aria-hidden="true">↺</span> Balik Foto
              </span>
            </div>
          </div>
        </div>
      </button>

      <style>{`
        .flip-card { -webkit-tap-highlight-color: transparent; }
        .flip-inner {
          transform-style: preserve-3d;
          transition: transform 620ms cubic-bezier(0.22, 0.61, 0.36, 1);
          display: grid;
          grid-template-columns: 1fr;
        }
        .flip-face {
          grid-area: 1 / 1;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .flip-inner { transition: none; }
        }
      `}</style>
    </div>
  );
}
