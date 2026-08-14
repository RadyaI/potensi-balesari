// src/components/animation/biting.tsx
// Hujan biting: lidi bambu berjatuhan dari atas layar.
//
// Ada dua perilaku, dipilih lewat prop "diamDiBawah":
//   true  (default) : memantul di dasar layar, rebah menumpuk, diam sekitar
//                     5 detik, lalu jatuh lagi sampai hilang
//   false           : langsung jatuh menembus layar tanpa berhenti
//
// Pakai di halaman /biting:
//   import HujanBiting from "@/components/animation/biting";
//   ...
//   <HujanBiting />                                  // mantul lalu diam
//   <HujanBiting diamDiBawah={false} berulang />     // hujan lidi terus-menerus
//   <HujanBiting jumlah={24} />
//
// SOAL RASA JATUHNYA:
// Jatuh bebas itu kuadratik, jaraknya sebanding waktu pangkat dua, jadi
// percepatannya harus galak sejak awal. Kurva GRAVITASI di bawah memakai
// cubic-bezier(0.11, 0, 0.5, 0) yang meniru easeInQuad. Kurva yang lebih
// lembut membuat bendanya seperti melayang di bulan.
// Benda jatuh setinggi layar di dunia nyata hanya butuh sekitar satu detik,
// jadi durasi jatuhnya memang harus sependek itu.
//
// Catatan lain:
// - Murni CSS, tanpa state, jadi tetap bisa dipakai di server component.
// - Perputaran memakai titik tengah lidi. Karena itu tiap lidi diberi
//   margin atas setengah panjangnya, supaya nilai --darat langsung
//   menjadi posisi batangnya, tidak lagi bergantung panjang lidi.
// - Sudut rebahnya sengaja bervariasi jauh dari 90 derajat agar lidi
//   saling menyilang seperti tumpukan sungguhan.
// - Nilai tiap lidi dibangkitkan dengan pengacak bersumbu tetap, jadi
//   hasilnya bervariasi tapi selalu sama antara server dan browser.
// - Lapisan ini pointer-events-none, jadi tidak menghalangi klik apa pun.
// - Otomatis tidak tampil jika pengguna menyalakan "kurangi gerakan".

const MAKS_LIDI = 60;

type Lidi = {
  x: number;
  panjang: number;
  durasi: number;
  jeda: number;
  darat: number;
  rotasiAwal: number;
  rotasiDarat: number;
  rotasiRebah: number;
  goyang: number;
  skala: number;
};

/* Pengacak bersumbu tetap (mulberry32). Dipakai supaya tiap lidi dapat
   nilai yang berbeda-beda, tapi urutannya selalu sama tiap kali dijalankan,
   sehingga render di server dan di browser tidak berselisih. */
function pengacak(sumbu: number) {
  let a = sumbu;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buatDaftarLidi(jumlah: number, diamDiBawah: boolean): Lidi[] {
  const acak = pengacak(20260814);
  const antara = (min: number, maks: number) => min + acak() * (maks - min);

  return Array.from({ length: jumlah }, (_, i) => {
    // sebar merata sepanjang lebar layar, lalu digeser sedikit acak
    const lebarJatah = 100 / jumlah;
    const x = Math.min(96, Math.max(4, (i + 0.5) * lebarJatah + antara(-lebarJatah * 0.35, lebarJatah * 0.35)));

    const panjang = antara(112, 172);

    /* Mode diam: durasi ini mencakup SELURUH siklus. Bagian jatuhnya
       hanya 11 persen pertama, jadi sekitar satu detik saja.
       Mode langsung: seluruh durasi habis untuk turun, maka angkanya
       memang harus sekitar satu detik. */
    const durasi = diamDiBawah
      ? antara(8.4, 10.2)
      : antara(0.85, 1.35) + (172 - panjang) * 0.0015;

    /* Jeda mulai. Untuk mode langsung, jedanya disebar cukup rapat
       supaya hujannya turun terus-menerus dan tidak menggerombol. */
    const jeda = diamDiBawah
      ? antara(0, Math.min(8, jumlah * 0.42))
      : antara(0, 3.0);

    return {
      x,
      panjang,
      durasi,
      jeda,
      darat: antara(96.0, 99.4),
      rotasiAwal: antara(-42, 42),
      // di mode langsung lidinya hanya sempat berputar sedikit,
      // karena jatuhnya cepat sekali
      rotasiDarat: diamDiBawah ? antara(118, 240) : antara(40, 130),
      // 90 derajat berarti mendatar sempurna; dijauhkan agar saling menyilang
      rotasiRebah: antara(58, 122),
      goyang: (acak() < 0.5 ? -1 : 1) * antara(12, 26),
      skala: antara(0.85, 1.1),
    };
  });
}

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
  /** Berapa lidi yang dijatuhkan. Maksimal 60. Default 16. */
  jumlah?: number;
  /** Ulangi terus-menerus. Default false, jadi hanya sekali saat halaman dibuka. */
  berulang?: boolean;
  /**
   * true  : memantul lalu rebah menumpuk dan diam sekitar 5 detik di dasar
   *         layar sebelum jatuh lagi dan hilang. (default)
   * false : langsung jatuh menembus layar tanpa berhenti, seperti hujan.
   */
  diamDiBawah?: boolean;
};

export default function HujanBiting({
  jumlah = 16,
  berulang = false,
  diamDiBawah = false,
}: Props) {
  const lidi = buatDaftarLidi(Math.min(Math.max(jumlah, 1), MAKS_LIDI), diamDiBawah);

  // Nama animasi dipilih di sini; keyframes-nya ada dua set di bawah.
  const kelasTurun = diamDiBawah ? "biting-turun" : "biting-lewat";
  const kelasPutar = diamDiBawah ? "biting-putar" : "biting-putar-lewat";

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

        .biting-turun, .biting-lewat {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }
        .biting-putar, .biting-putar-lewat {
          width: 100%;
          height: 100%;
          will-change: transform;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }

        .biting-turun       { animation-name: biting-turun; }
        .biting-putar       { animation-name: biting-putar; }
        /* kurva gravitasi sungguhan: percepatannya galak sejak awal */
        .biting-lewat       { animation-name: biting-lewat; animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0); }
        .biting-putar-lewat { animation-name: biting-putar-lewat; animation-timing-function: linear; }

        /* ================= MODE 1: mantul lalu diam =================
           Nilai translateY di sini adalah posisi TITIK TENGAH lidi,
           karena tiap lidi sudah digeser ke atas setengah panjangnya.
           0-11%   : JATUH, dengan percepatan gravitasi (sekitar 1 detik)
           11-23%  : menyentuh dasar, memantul dua kali lalu rebah
           23-80%  : tergeletak diam (sekitar 5 detik)
           80-91%  : jatuh lagi menembus dasar layar sambil memudar
           91-100% : jeda kosong sebelum putaran berikutnya              */
        @keyframes biting-turun {
          0% {
            transform: translate3d(0, -25vh, 0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          2% { opacity: 1; }
          11% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            /* memantul naik: melambat karena melawan gravitasi */
            animation-timing-function: cubic-bezier(0.16, 0.84, 0.44, 1);
          }
          14.5% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh - 26px), 0);
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          18% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.16, 0.84, 0.44, 1);
          }
          20% {
            /* pantulan kedua, tinggal sisa tenaga */
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh - 7px), 0);
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          23% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            animation-timing-function: linear;
          }
          80% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          91%, 100% {
            transform: translate3d(var(--goyang), 145vh, 0);
            opacity: 0;
          }
        }

        @keyframes biting-putar {
          0% {
            transform: rotate(var(--rot-awal));
            animation-timing-function: linear;
          }
          11% {
            transform: rotate(var(--rot-darat));
            animation-timing-function: cubic-bezier(0.3, 0.9, 0.4, 1);
          }
          14.5% { transform: rotate(calc(var(--rot-rebah) + 11deg)); }
          19%   { transform: rotate(calc(var(--rot-rebah) - 5deg)); }
          23% {
            transform: rotate(var(--rot-rebah));
            animation-timing-function: linear;
          }
          80% {
            transform: rotate(var(--rot-rebah));
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          100% { transform: rotate(calc(var(--rot-rebah) + 46deg)); }
        }

        /* ================= MODE 2: langsung jatuh =================
           Tanpa pantulan, tanpa berhenti. Percepatannya diatur lewat
           animation-timing-function di kelasnya, jadi keyframes ini
           cukup menyatakan titik awal dan titik akhir saja.            */
        @keyframes biting-lewat {
          0% {
            transform: translate3d(0, -25vh, 0);
            opacity: 0;
          }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% {
            transform: translate3d(var(--goyang), 132vh, 0);
            opacity: 0;
          }
        }

        @keyframes biting-putar-lewat {
          0%   { transform: rotate(var(--rot-awal)); }
          100% { transform: rotate(calc(var(--rot-awal) + var(--rot-darat))); }
        }
      `}</style>

      {lidi.map((l, i) => (
        <div
          key={i}
          className={kelasTurun}
          style={
            {
              left: `${l.x.toFixed(2)}%`,
              width: `${(10 * l.skala).toFixed(1)}px`,
              height: `${l.panjang.toFixed(0)}px`,
              marginLeft: `${(-5 * l.skala).toFixed(1)}px`,
              // digeser setengah panjang, supaya --darat menjadi posisi
              // titik tengah lidi (titik putarnya) dan tidak lagi
              // bergantung pada panjang tiap lidi
              marginTop: `${(-l.panjang / 2).toFixed(1)}px`,
              "--dur": `${l.durasi.toFixed(2)}s`,
              "--jeda": `${l.jeda.toFixed(2)}s`,
              "--darat": l.darat.toFixed(2),
              "--goyang": `${l.goyang.toFixed(1)}px`,
              "--ulang": berulang ? "infinite" : 1,
            } as React.CSSProperties
          }
        >
          <div
            className={kelasPutar}
            style={
              {
                "--rot-awal": `${l.rotasiAwal.toFixed(1)}deg`,
                "--rot-darat": `${l.rotasiDarat.toFixed(1)}deg`,
                "--rot-rebah": `${l.rotasiRebah.toFixed(1)}deg`,
                "--dur": `${l.durasi.toFixed(2)}s`,
                "--jeda": `${l.jeda.toFixed(2)}s`,
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