// src/components/TeksBergantian.tsx
// Efek mengetik: satu per satu kata muncul, terhapus, lalu ganti kata berikutnya.
// Dipakai di judul hero untuk menampilkan ketiga produk desa secara bergantian.
//
// Pakai:
//   <TeksBergantian
//     kata={[
//       { teks: "Biting Bambu", warna: "#9DBE85" },
//       { teks: "Kopi", warna: "#C89A6B" },
//     ]}
//   />
//
// Catatan:
// - Lebarnya mengikuti panjang teks yang sedang tampil, jadi tidak ada
//   celah kosong saat katanya pendek.
// - Elemen ini aria-hidden. Judul versi utuh tetap ditulis di halaman
//   sebagai sr-only supaya pembaca layar dan mesin pencari tetap dapat
//   kalimat lengkapnya.
// - Jika pengguna menyalakan "kurangi gerakan", kata pertama tampil diam.

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Ritme pengetikan (milidetik) */
const JEDA_KETIK = 85;
const JEDA_HAPUS = 45;
const JEDA_BACA = 1800; // diam sejenak setelah kata selesai diketik
const JEDA_GANTI = 400; // diam sejenak setelah kata habis terhapus

type Kata = { teks: string; warna?: string };

type Props = {
  kata: Kata[];
  className?: string;
};

export default function TeksBergantian({ kata, className = "" }: Props) {
  const kurangiGerakan = useReducedMotion();

  const [indeks, setIndeks] = useState(0);
  const [jumlahHuruf, setJumlahHuruf] = useState(0);
  const [sedangHapus, setSedangHapus] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const kataAktif = kata[indeks];
  const tampil = kataAktif.teks.slice(0, jumlahHuruf);

  useEffect(() => {
    if (kurangiGerakan) return;

    const selesaiKetik = jumlahHuruf === kataAktif.teks.length;
    const habisTerhapus = jumlahHuruf === 0;

    let jeda: number;

    if (!sedangHapus && selesaiKetik) {
      jeda = JEDA_BACA;
    } else if (sedangHapus && habisTerhapus) {
      jeda = JEDA_GANTI;
    } else {
      jeda = sedangHapus ? JEDA_HAPUS : JEDA_KETIK;
    }

    timerRef.current = setTimeout(() => {
      if (!sedangHapus && selesaiKetik) {
        setSedangHapus(true);
      } else if (sedangHapus && habisTerhapus) {
        setSedangHapus(false);
        setIndeks((i) => (i + 1) % kata.length);
      } else {
        setJumlahHuruf((n) => n + (sedangHapus ? -1 : 1));
      }
    }, jeda);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [jumlahHuruf, sedangHapus, indeks, kataAktif.teks.length, kata.length, kurangiGerakan]);

  /* Tanpa animasi: tampilkan kata pertama apa adanya */
  if (kurangiGerakan) {
    return (
      <span aria-hidden="true" className={className} style={{ color: kata[0].warna }}>
        {kata[0].teks}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`whitespace-nowrap transition-colors duration-500 ${className}`}
      style={{ color: kataAktif.warna }}
    >
      {tampil}
      <span className="kursor-ketik ml-0.5 inline-block w-[0.06em] bg-current align-middle">
        &nbsp;
      </span>

      <style>{`
        .kursor-ketik {
          height: 0.9em;
          animation: kursor-kedip 1s steps(2, start) infinite;
        }
        @keyframes kursor-kedip { to { visibility: hidden; } }
      `}</style>
    </span>
  );
}