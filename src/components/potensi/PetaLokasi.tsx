// src/components/potensi/PetaLokasi.tsx
// Peta lokasi Desa Balesari — Leaflet + citra satelit Esri (gratis, tanpa API key).
// Client component: Leaflet butuh `window`, jadi di-import dinamis di dalam useEffect
// supaya aman dari SSR Next.js.
//
// Install dulu:
//   npm install leaflet
//   npm install -D @types/leaflet

"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

/* ===== Konten & konfigurasi — gampang diedit ===== */
const peta = {
  // Koordinat sekitar Kantor Desa Balesari, Ngajum
  lat: -8.0272,
  lng: 112.5204,
  zoom: 14,
  radiusMeter: 900, // lingkaran sorotan kawasan desa
  judulPin: "Desa Balesari",
  deskripsiPin: "Dusun Segelan · Kec. Ngajum · Kab. Malang",
  infoBaris: ["650–900 mdpl", "Lereng timur Gunung Kawi"],
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Desa+Balesari,+Ngajum,+Kabupaten+Malang",
};

/* Pin SVG custom (hijau bambu) yang dipakai sebagai divIcon Leaflet */
const pinSvg = `
<svg width="46" height="58" viewBox="0 0 46 58" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="pinGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7FA36F"/>
      <stop offset="1" stop-color="#2E4230"/>
    </linearGradient>
  </defs>
  <path d="M23 2 C 11 2 3 11 3 22 C 3 37 23 56 23 56 C 23 56 43 37 43 22 C 43 11 35 2 23 2 Z"
        fill="url(#pinGrad)" stroke="#F3EDE0" stroke-width="3"/>
  <circle cx="23" cy="21" r="8" fill="#F3EDE0"/>
  <circle cx="23" cy="21" r="3.5" fill="#4A3524"/>
</svg>`;

export default function PetaLokasi() {
  const wadahRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    let batal = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (batal || !wadahRef.current || mapRef.current) return;

      const map = L.map(wadahRef.current, {
        center: [peta.lat, peta.lng],
        zoom: peta.zoom,
        scrollWheelZoom: false, // biar scroll halaman tidak "terjebak" di peta
        attributionControl: true,
      });
      mapRef.current = map;

      // Lapisan dasar: citra satelit Esri (gratis, wajib mencantumkan atribusi)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18,
          attribution:
            "Citra &copy; <a href='https://www.esri.com/'>Esri</a>, Maxar, Earthstar Geographics",
        }
      ).addTo(map);

      // Lapisan label jalan/tempat di atas satelit
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 18,
          attribution:
            "Label &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='https://carto.com/'>CARTO</a>",
        }
      ).addTo(map);

      // Lingkaran sorotan kawasan desa
      L.circle([peta.lat, peta.lng], {
        radius: peta.radiusMeter,
        color: "#9DBE85",
        weight: 2,
        dashArray: "8 8",
        fillColor: "#7FA36F",
        fillOpacity: 0.15,
      }).addTo(map);

      // Pin custom + denyut
      const ikon = L.divIcon({
        className: "peta-pin", // kosongkan style bawaan leaflet
        html: `<span class="peta-pin-pulse" aria-hidden="true"></span>${pinSvg}`,
        iconSize: [46, 58],
        iconAnchor: [23, 56],
        popupAnchor: [0, -50],
      });

      L.marker([peta.lat, peta.lng], {
        icon: ikon,
        title: peta.judulPin,
        alt: `Penanda lokasi ${peta.judulPin}`,
      })
        .addTo(map)
        .bindPopup(
          `<strong class="peta-popup-judul">${peta.judulPin}</strong><br/><span class="peta-popup-sub">${peta.deskripsiPin}</span>`,
          { closeButton: false, offset: [0, -4] }
        )
        .openPopup();

      setSiap(true);
    })();

    return () => {
      batal = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative">
      <style>{`
        /* Pin + animasi denyut */
        .peta-pin { position: relative; }
        .peta-pin svg { position: relative; z-index: 2; filter: drop-shadow(0 6px 8px rgba(0,0,0,0.35)); }
        .peta-pin-pulse {
          position: absolute; left: 50%; bottom: 2px; z-index: 1;
          width: 30px; height: 12px; border-radius: 9999px;
          background: rgba(127,163,111,0.65);
          transform: translateX(-50%);
        }
        @media (prefers-reduced-motion: no-preference) {
          .peta-pin-pulse { animation: peta-denyut 1.8s ease-out infinite; }
        }
        @keyframes peta-denyut {
          0%   { box-shadow: 0 0 0 0 rgba(127,163,111,0.55); }
          70%  { box-shadow: 0 0 0 22px rgba(127,163,111,0); }
          100% { box-shadow: 0 0 0 0 rgba(127,163,111,0); }
        }

        /* Popup senada tema */
        .leaflet-popup-content-wrapper {
          background: #F8F4EA; color: #3A2E22;
          border-radius: 14px; border: 1px solid rgba(58,46,34,0.15);
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }
        .leaflet-popup-tip { background: #F8F4EA; }
        .peta-popup-judul { font-weight: 700; color: #2E4230; }
        .peta-popup-sub { font-size: 12px; color: rgba(58,46,34,0.75); }
        .leaflet-container { font-family: inherit; }
      `}</style>

      {/* Bingkai dekoratif peta */}
      <div className="overflow-hidden rounded-3xl border-4 border-[#2E4230]/90 bg-[#DCD2BC] shadow-xl">
        <div
          ref={wadahRef}
          role="region"
          aria-label={`Peta lokasi ${peta.judulPin}, Kecamatan Ngajum, Kabupaten Malang`}
          className="relative z-0 h-[380px] w-full sm:h-[480px]"
        >
          {/* Placeholder saat peta belum termuat */}
          {!siap && (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#4A3B2C]/70">
              Memuat peta…
            </div>
          )}
        </div>
      </div>

      {/* Kartu info di atas peta */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
        <div className="pointer-events-auto rounded-2xl border border-[#3A2E22]/10 bg-[#F8F4EA]/95 px-4 py-3 shadow-lg backdrop-blur">
          <p className="font-semibold text-[#2E4230]">{peta.judulPin}</p>
          <p className="text-xs text-[#4A3B2C]/75">{peta.deskripsiPin}</p>
          <p className="mt-1 flex flex-wrap gap-x-3 text-[11px] font-medium text-[#7A5C3E]">
            {peta.infoBaris.map((b) => (
              <span key={b}>⛰ {b}</span>
            ))}
          </p>
        </div>
        <a
          href={peta.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-full bg-[#2E4230] px-4 py-2.5 text-xs font-semibold text-[#F3EDE0] shadow-lg transition hover:bg-[#3E5A3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E4230]"
        >
          Petunjuk Arah ↗
        </a>
      </div>
    </div>
  );
}