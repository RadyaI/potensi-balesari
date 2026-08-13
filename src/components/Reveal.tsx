// src/components/Reveal.tsx
// Pembungkus animasi "muncul saat di-scroll".
//
// Pakai:
//   <Reveal>...</Reveal>                       // default: fade-up, sekali jalan
//   <Reveal type="from-left" delay={150}>...</Reveal>
//   <Reveal as="li" className="rounded-xl">...</Reveal>
//   <Reveal ulang>...</Reveal>                 // ikut memudar lagi saat keluar layar
//
// Untuk grid berisi banyak kartu, pakai index supaya munculnya berurutan:
//   {items.map((item, i) => (
//     <Reveal key={item.id} as="li" index={i}>...</Reveal>
//   ))}
//
// Catatan:
// - Hanya opacity + transform, jadi ringan dan tidak memicu hitung ulang layout.
// - Jika pengguna menyalakan "kurangi gerakan", isi langsung tampil tanpa animasi.
// - Butuh: npm i motion

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

type JenisAnimasi = "fade-up" | "from-left" | "from-right" | "zoom-in";

/* Posisi awal tiap jenis. Namanya menyebut ASAL gerakan:
   "from-left" berarti mulai dari kiri lalu bergeser ke tempatnya.
   Jarak sengaja pendek (24px) supaya terasa halus, bukan melompat
   dari luar layar. */
const posisiAwal: Record<JenisAnimasi, { opacity: number; y?: number; x?: number; scale?: number }> = {
  "fade-up": { opacity: 0, y: 24 },
  "from-left": { opacity: 0, x: -24 },
  "from-right": { opacity: 0, x: 24 },
  "zoom-in": { opacity: 0, scale: 0.94 },
};

const posisiAkhir = { opacity: 1, x: 0, y: 0, scale: 1 };

/* Jeda antar-kartu dalam satu grid (detik) */
const JEDA_BERURUTAN = 0.09;

type Props = {
  children: ReactNode;
  /** Arah munculnya. Default: fade-up */
  type?: JenisAnimasi;
  /** Jeda sebelum animasi mulai, dalam milidetik */
  delay?: number;
  /** Urutan kartu dalam satu grid; menambah jeda otomatis per kartu */
  index?: number;
  /** Tag HTML yang dirender. Default: div. Pakai "li" di dalam <ul>/<ol> */
  as?: ElementType;
  className?: string;
  /** Lama animasi dalam detik. Default: 0.5 */
  duration?: number;
  /**
   * Ulangi animasi tiap kali elemen masuk layar, dan pudarkan lagi
   * saat keluar. Default false (sekali jalan) karena kalau semua
   * elemen memakai ini, scroll bolak-balik jadi ramai.
   */
  ulang?: boolean;
};

export default function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  index = 0,
  as = "div",
  className,
  duration = 0.5,
  ulang = false,
}: Props) {
  const kurangiGerakan = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  // Hormati preferensi perangkat: tampilkan langsung tanpa animasi.
  if (kurangiGerakan) {
    const Statis = as as ElementType;
    return <Statis className={className}>{children}</Statis>;
  }

  return (
    <Tag
      className={className}
      initial={posisiAwal[type]}
      whileInView={posisiAkhir}
      viewport={{ once: !ulang, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{
        duration,
        delay: delay / 1000 + index * JEDA_BERURUTAN,
        ease: [0.22, 0.61, 0.36, 1], // pelan di akhir, terasa "mendarat"
      }}
    >
      {children}
    </Tag>
  );
}