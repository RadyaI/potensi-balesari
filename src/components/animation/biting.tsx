// src/components/animation/biting.tsx
// Hujan biting: lidi bambu berjatuhan dari atas layar, mendarat menumpuk
// di dasar layar, diam sekitar 5 detik, lalu jatuh lagi sampai hilang.
//
// Pakai di halaman /biting:
//   import HujanBiting from "@/components/animation/biting";
//   ...
//   <HujanBiting />
//   <HujanBiting jumlah={12} berulang />
//
// Catatan:
// - Murni CSS, tanpa state, jadi tetap bisa dipakai di server component.
// - Perputaran memakai titik tengah lidi. Karena itu tiap lidi diberi
//   margin atas setengah panjangnya, supaya nilai --darat langsung
//   menjadi posisi batangnya, tidak lagi bergantung panjang lidi.
// - Nilai tiap lidi ditulis tetap (bukan acak) supaya hasil render di
//   server dan di browser selalu sama.
// - Lapisan ini pointer-events-none, jadi tidak menghalangi klik apa pun.
// - Otomatis tidak tampil jika pengguna menyalakan "kurangi gerakan".

type Lidi = {
  /** Posisi mendatar, persen dari lebar layar */
  x: number;
  /** Panjang lidi dalam piksel */
  panjang: number;
  /** Lama satu putaran animasi, detik */
  durasi: number;
  /** Jeda sebelum lidi ini mulai jatuh, detik */
  jeda: number;
  /** Ketinggian batang saat tergeletak, vh dari atas (100 = tepat dasar) */
  darat: number;
  /** Sudut awal saat masih di atas */
  rotasiAwal: number;
  /** Sudut saat menyentuh dasar (masih berputar) */
  rotasiDarat: number;
  /** Sudut akhir setelah rebah. 90 = mendatar sempurna */
  rotasiRebah: number;
  /** Geser mendatar selama melayang, piksel */
  goyang: number;
  /** Ketebalan tampilan, 1 = normal */
  skala: number;
};

/* Disusun manual supaya sebarannya rata dan tumpukannya terlihat wajar.
   Sudut rebah sengaja bervariasi jauh dari 90 derajat agar lidi saling
   menyilang seperti tumpukan sungguhan, bukan berbaris sejajar. */
const DAFTAR_LIDI: Lidi[] = [
  { x: 4,  panjang: 150, durasi: 9.0,  jeda: 0.0, darat: 97.5, rotasiAwal: -18, rotasiDarat: 128, rotasiRebah: 76,  goyang: 22,  skala: 1.0 },
  { x: 11, panjang: 120, durasi: 9.8,  jeda: 1.4, darat: 99.0, rotasiAwal: 34,  rotasiDarat: 196, rotasiRebah: 104, goyang: -18, skala: 0.9 },
  { x: 18, panjang: 168, durasi: 8.6,  jeda: 0.7, darat: 96.4, rotasiAwal: -6,  rotasiDarat: 154, rotasiRebah: 63,  goyang: 14,  skala: 1.1 },
  { x: 25, panjang: 134, durasi: 9.4,  jeda: 2.3, darat: 98.6, rotasiAwal: 22,  rotasiDarat: 238, rotasiRebah: 117, goyang: -26, skala: 0.95 },
  { x: 32, panjang: 158, durasi: 8.9,  jeda: 0.4, darat: 97.0, rotasiAwal: -30, rotasiDarat: 118, rotasiRebah: 84,  goyang: 19,  skala: 1.05 },
  { x: 39, panjang: 112, durasi: 10.1, jeda: 3.1, darat: 99.2, rotasiAwal: 12,  rotasiDarat: 212, rotasiRebah: 96,  goyang: -12, skala: 0.85 },
  { x: 46, panjang: 172, durasi: 8.4,  jeda: 1.8, darat: 96.0, rotasiAwal: -24, rotasiDarat: 142, rotasiRebah: 71,  goyang: 24,  skala: 1.1 },
  { x: 53, panjang: 128, durasi: 9.6,  jeda: 0.9, darat: 98.8, rotasiAwal: 40,  rotasiDarat: 224, rotasiRebah: 110, goyang: -20, skala: 0.9 },
  { x: 60, panjang: 146, durasi: 9.1,  jeda: 2.7, darat: 97.6, rotasiAwal: -12, rotasiDarat: 166, rotasiRebah: 88,  goyang: 16,  skala: 1.0 },
  { x: 67, panjang: 162, durasi: 8.7,  jeda: 1.1, darat: 96.6, rotasiAwal: 28,  rotasiDarat: 132, rotasiRebah: 58,  goyang: -23, skala: 1.05 },
  { x: 74, panjang: 118, durasi: 10.0, jeda: 3.6, darat: 99.4, rotasiAwal: -36, rotasiDarat: 204, rotasiRebah: 122, goyang: 13,  skala: 0.88 },
  { x: 81, panjang: 154, durasi: 8.8,  jeda: 0.2, darat: 97.2, rotasiAwal: 8,   rotasiDarat: 148, rotasiRebah: 80,  goyang: -17, skala: 1.0 },
  { x: 88, panjang: 138, durasi: 9.5,  jeda: 2.0, darat: 98.4, rotasiAwal: -20, rotasiDarat: 188, rotasiRebah: 99,  goyang: 21,  skala: 0.95 },
  { x: 94, panjang: 166, durasi: 8.5,  jeda: 1.6, darat: 96.2, rotasiAwal: 16,  rotasiDarat: 136, rotasiRebah: 67,  goyang: -15, skala: 1.08 },
  { x: 8,  panjang: 126, durasi: 9.9,  jeda: 4.2, darat: 99.0, rotasiAwal: -8,  rotasiDarat: 218, rotasiRebah: 113, goyang: 18,  skala: 0.9 },
  { x: 57, panjang: 144, durasi: 9.2,  jeda: 4.8, darat: 97.8, rotasiAwal: 26,  rotasiDarat: 160, rotasiRebah: 92,  goyang: -21, skala: 1.0 },
  { x: 29, panjang: 132, durasi: 9.7,  jeda: 5.4, darat: 98.2, rotasiAwal: -28, rotasiDarat: 198, rotasiRebah: 106, goyang: 12,  skala: 0.92 },
  { x: 71, panjang: 156, durasi: 8.9,  jeda: 6.0, darat: 97.4, rotasiAwal: 18,  rotasiDarat: 144, rotasiRebah: 74,  goyang: -19, skala: 1.03 },
  { x: 15, panjang: 148, durasi: 9.3,  jeda: 6.6, darat: 96.8, rotasiAwal: -14, rotasiDarat: 174, rotasiRebah: 86,  goyang: 20,  skala: 1.0 },
  { x: 84, panjang: 122, durasi: 10.2, jeda: 7.2, darat: 99.2, rotasiAwal: 32,  rotasiDarat: 230, rotasiRebah: 101, goyang: -14, skala: 0.87 },
];

/* Satu batang lidi bambu */
function BatangLidi({ id }: { id: number }) {
  const gid = `lidi-grad-${id}`;
  return (
    <svg viewBox="0 0 10 160" aria-hidden="true" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A88B5C" />
          <stop offset="0.35" stopColor="#D9C9A3" />
          <stop offset="0.7" stopColor="#C9B285" />
          <stop offset="1" stopColor="#8E7448" />
        </linearGradient>
      </defs>
      {/* badan lidi, ujungnya sedikit meruncing */}
      <path
        d="M5 1 C 6.4 1, 7.2 3, 7.2 6 L 7.2 154 C 7.2 157, 6.4 159, 5 159 C 3.6 159, 2.8 157, 2.8 154 L 2.8 6 C 2.8 3, 3.6 1, 5 1 Z"
        fill={`url(#${gid})`}
      />
      {/* kilau serat di sisi terang */}
      <rect x="4.1" y="6" width="0.9" height="148" rx="0.45" fill="#F3EDE0" opacity="0.4" />
      {/* dua ruas samar */}
      <rect x="2.6" y="52" width="4.8" height="1.6" rx="0.8" fill="#7A5C3E" opacity="0.55" />
      <rect x="2.6" y="112" width="4.8" height="1.6" rx="0.8" fill="#7A5C3E" opacity="0.55" />
    </svg>
  );
}

type Props = {
  /** Berapa lidi yang dijatuhkan. Maksimal 20. Default 16. */
  jumlah?: number;
  /** Ulangi terus-menerus. Default false, jadi hanya sekali saat halaman dibuka. */
  berulang?: boolean;
};

export default function HujanBiting({ jumlah = 16, berulang = false }: Props) {
  const lidi = DAFTAR_LIDI.slice(0, Math.min(jumlah, DAFTAR_LIDI.length));

  return (
    <div
      aria-hidden="true"
      className="hujan-biting pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      <style>{`
        /* Hormati preferensi perangkat: tidak ada yang jatuh sama sekali */
        @media (prefers-reduced-motion: reduce) {
          .hujan-biting { display: none; }
        }

        .biting-turun {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-name: biting-turun;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }
        .biting-putar {
          width: 100%;
          height: 100%;
          will-change: transform;
          animation-name: biting-putar;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }

        /* ---- Gerak turun ----
           Nilai translateY di sini adalah posisi TITIK TENGAH lidi,
           karena tiap lidi sudah digeser ke atas setengah panjangnya.
           0-20%   : melayang turun, makin cepat (percepatan gravitasi)
           20-31%  : menyentuh dasar, memantul dua kali lalu diam
           31-85%  : tergeletak diam (sekitar 5 detik)
           85-97%  : jatuh lagi menembus dasar layar sambil memudar     */
        @keyframes biting-turun {
          0% {
            transform: translate3d(0, -25vh, 0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55);
          }
          4% { opacity: 1; }
          20% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);
          }
          24% {
            /* pantulan pertama, cukup terasa */
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh - 26px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          27.5% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1);
          }
          29.5% {
            /* pantulan kedua, tinggal sisa tenaga */
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh - 7px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          31% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            animation-timing-function: linear;
          }
          85% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55);
          }
          97% {
            transform: translate3d(var(--goyang), 145vh, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(var(--goyang), 145vh, 0);
            opacity: 0;
          }
        }

        /* ---- Perputaran ----
           Berputar sambil melayang, lalu rebah dengan sudut yang
           berbeda-beda supaya lidi saling menyilang saat menumpuk. */
        @keyframes biting-putar {
          0% {
            transform: rotate(var(--rot-awal));
            animation-timing-function: linear;
          }
          20% {
            transform: rotate(var(--rot-darat));
            animation-timing-function: cubic-bezier(0.3, 0.9, 0.4, 1);
          }
          24% { transform: rotate(calc(var(--rot-rebah) + 11deg)); }
          28% { transform: rotate(calc(var(--rot-rebah) - 5deg)); }
          31% {
            transform: rotate(var(--rot-rebah));
            animation-timing-function: linear;
          }
          85% {
            transform: rotate(var(--rot-rebah));
            animation-timing-function: ease-in;
          }
          100% { transform: rotate(calc(var(--rot-rebah) + 46deg)); }
        }
      `}</style>

      {lidi.map((l, i) => (
        <div
          key={i}
          className="biting-turun"
          style={
            {
              left: `${l.x}%`,
              width: `${10 * l.skala}px`,
              height: `${l.panjang}px`,
              marginLeft: `${-5 * l.skala}px`,
              // digeser setengah panjang, supaya --darat menjadi posisi
              // titik tengah lidi (titik putarnya) dan tidak lagi
              // bergantung pada panjang tiap lidi
              marginTop: `${-l.panjang / 2}px`,
              "--dur": `${l.durasi}s`,
              "--jeda": `${l.jeda}s`,
              "--darat": l.darat,
              "--goyang": `${l.goyang}px`,
              "--ulang": berulang ? "infinite" : 1,
            } as React.CSSProperties
          }
        >
          <div
            className="biting-putar"
            style={
              {
                "--rot-awal": `${l.rotasiAwal}deg`,
                "--rot-darat": `${l.rotasiDarat}deg`,
                "--rot-rebah": `${l.rotasiRebah}deg`,
                "--dur": `${l.durasi}s`,
                "--jeda": `${l.jeda}s`,
                "--ulang": berulang ? "infinite" : 1,
              } as React.CSSProperties
            }
          >
            <BatangLidi id={i} />
          </div>
        </div>
      ))}
    </div>
  );
}