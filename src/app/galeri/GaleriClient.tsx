// src/app/galeri/GaleriClient.tsx
// Bagian interaktif dari halaman /galeri: filter kategori (tersinkron ke
// query URL ?kategori=...), grid flip-card masonry, "Cerita Pilihan",
// dan "Di Balik Potensi Balesari".
//
// Dipisah dari page.tsx supaya page.tsx tetap bisa jadi server component
// (export metadata untuk SEO), sementara bagian yang butuh state & hook
// (useState, useSearchParams) ada di sini sebagai client component.
//
// REVISI ARSITEKTUR DATA: semua data foto (galeriItems, KATEGORI, warna
// aksen per kategori) TIDAK lagi didefinisikan di file ini. Semuanya
// ditarik dari src/data/gallery.ts — satu sumber data yang sama juga
// dipakai (lewat src/data/kerajinanImages.ts, bitingImages.ts,
// kopiImages.ts) oleh halaman /kerajinan-tangan, /biting, dan /kopi.
// Kalau foto di salah satu sumber itu diganti, halaman ini otomatis ikut
// berubah — tidak perlu menyalin ulang path di sini.
//
// Tidak ada perubahan pada desain/perilaku: filter, flip card, masonry,
// query parameter, dan "Di Balik Potensi Balesari" tetap persis seperti
// sebelumnya, cuma sumber datanya yang dipusatkan.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import GalleryFlipCard from "@/components/GalleryFlipCard";
import { galeriItems, KATEGORI, AKSEN_KATEGORI, type KategoriSlug } from "@/data/gallery";

/* ============================================================
   WARNA — identitas GLOBAL (bukan warna satu potensi tertentu).
   Warna aksen per kategori (biting/kopi/kerajinan/dst) diimpor dari
   src/data/gallery.ts, bukan didefinisikan ulang di sini.
   ============================================================ */
const FOREST = "#2E4230";
const LABEL = "#7A5C3E";
const BODY = "#4A3B2C";
const CARD_BG = "#F8F4EA";
const SECONDARY_BG = "#EFE7D2"; // beige hangat, sedikit lebih terang dari cream global — transisi ke identitas kerajinan

/* Item tetap untuk section "Di Balik Potensi Balesari" (tidak ikut filter) */
const kegiatanItems = galeriItems.filter((it) => it.slug === "kegiatan");

/* Cerita pilihan — statis, beda tampilan dari flip card supaya tidak monoton */
const ceritaPilihan = {
  eyebrow: "Cerita Pilihan",
  heading: "Dari tangan warga, menjadi karya",
  paragraf:
    "Di balik setiap kerajinan yang lahir dari Dusun Segelan, ada tangan yang telaten dan waktu yang tidak buru-buru. Bahan sederhana dari sekitar rumah, diolah pelan-pelan sampai pantas disebut karya.",
  img: "/images/desa-balesari.jpeg",
  ctaLabel: "Lihat Potensi",
  ctaHref: "/kerajinan-tangan",
};

export default function GaleriClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kurangiGerakan = useReducedMotion();

  const kategoriUrl = searchParams.get("kategori");
  const kategoriAwal = KATEGORI.some((k) => k.slug === kategoriUrl) ? (kategoriUrl as KategoriSlug) : "semua";
  const [aktif, setAktif] = useState<KategoriSlug>(kategoriAwal);

  const itemTerfilter = useMemo(
    () => (aktif === "semua" ? galeriItems : galeriItems.filter((it) => it.slug === aktif)),
    [aktif]
  );

  function pilihKategori(slug: KategoriSlug) {
    setAktif(slug);
    const url = slug === "semua" ? "/galeri" : `/galeri?kategori=${slug}`;
    router.replace(url, { scroll: false });
  }

  return (
    <>
      {/* ================= FILTER KATEGORI ================= */}
      <section aria-labelledby="filter-heading" className="relative mx-auto max-w-6xl px-6 pt-14 pb-4 sm:pt-16">
        <h2 id="filter-heading" className="sr-only">
          Filter kategori dokumentasi
        </h2>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter kategori foto">
          {KATEGORI.map((k) => {
            const isAktif = aktif === k.slug;
            return (
              <button
                key={k.slug}
                type="button"
                onClick={() => pilihKategori(k.slug)}
                aria-pressed={isAktif}
                className="rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition sm:text-sm"
                style={
                  isAktif
                    ? { backgroundColor: k.aksen, borderColor: k.aksen, color: "#F3EDE0" }
                    : { backgroundColor: CARD_BG, borderColor: "rgba(58,46,34,0.16)", color: BODY }
                }
              >
                {k.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= GRID FLIP CARD — MASONRY (CSS columns) ================= */}
      <section aria-labelledby="grid-heading" className="relative mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <h2 id="grid-heading" className="sr-only">
          Dokumentasi foto Potensi Balesari
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={aktif}
            initial={kurangiGerakan ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={kurangiGerakan ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4"
          >
            {itemTerfilter.map((item) => (
              <div key={item.id} className="mb-4 break-inside-avoid sm:mb-5">
                <GalleryFlipCard item={item} aksen={AKSEN_KATEGORI[item.slug]} mode="natural" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {itemTerfilter.length === 0 && (
          <p className="py-10 text-center text-sm" style={{ color: LABEL }}>
            Belum ada foto untuk kategori ini.
          </p>
        )}
      </section>

      {/* ================= CERITA PILIHAN (bukan flip card) ================= */}
      <section aria-labelledby="cerita-pilihan-heading" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: SECONDARY_BG }}>
        {/* glow lembut aksen terracotta di sudut, penanda "flow" menuju identitas kerajinan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #B9805A, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <figure className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-8 shadow-xl" style={{ borderColor: CARD_BG, backgroundColor: "#DCD2BC" }}>
              <Image src={ceritaPilihan.img} alt={ceritaPilihan.heading} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </figure>
          <div className="order-1 lg:order-2">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: LABEL }}>
              {ceritaPilihan.eyebrow}
            </p>
            <h2 id="cerita-pilihan-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: FOREST }}>
              {ceritaPilihan.heading}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: BODY }}>
              {ceritaPilihan.paragraf}
            </p>
            <Link
              href={ceritaPilihan.ctaHref}
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#F3EDE0] shadow-lg transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: FOREST }}
            >
              {ceritaPilihan.ctaLabel} <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DI BALIK POTENSI BALESARI ================= */}
      <section aria-labelledby="kegiatan-heading" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: LABEL }}>
          Dokumentasi Kegiatan
        </p>
        <h2 id="kegiatan-heading" className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: FOREST }}>
          Di Balik Potensi Balesari
        </h2>
        <p className="mt-3 max-w-2xl" style={{ color: BODY }}>
          Sebelum jadi produk, ada kunjungan, obrolan, dan kerja bareng warga Dusun Segelan yang jarang terlihat.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kegiatanItems.map((item) => (
            <li key={item.id} className="aspect-square">
              <GalleryFlipCard item={item} aksen={AKSEN_KATEGORI[item.slug]} mode="cover" className="h-full" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
