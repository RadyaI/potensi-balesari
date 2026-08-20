// src/components/animation/kerajinan.tsx
// Hujan batok: keping batok kelapa berjatuhan dari atas layar.
// Identitas animasi khas halaman /kerajinan-tangan, sejajar dengan
// HujanBiting (lidi bambu) di /biting dan AnimasiKopi (biji kopi) di /kopi.
//
// Ada dua perilaku, dipilih lewat prop "diamDiBawah" — pola yang sama
// persis dengan HujanBiting/AnimasiKopi, supaya ketiga animasi identitas
// potensi bisa dipakai berdampingan (mis. di hero /galeri) dengan rasa
// jatuh yang senada:
//   true  (default) : jatuh, mantul sekali, diam sebentar (~2.2 detik),
//                      lalu jatuh lagi sampai hilang. Ini perilaku ASLI
//                      yang sudah dipakai di /kerajinan-tangan — TIDAK
//                      berubah sama sekali dari sebelumnya.
//   false            : langsung jatuh menembus layar tanpa berhenti,
//                      tanpa mantul, seperti hujan — dipakai saat animasi
//                      ini digabung dengan HujanBiting/AnimasiKopi supaya
//                      ketiganya jatuh serentak dengan gerakan senada.
//
// Pakai di halaman /kerajinan-tangan (tidak berubah):
//   import HujanBatok from "@/components/animation/kerajinan";
//   ...
//   <HujanBatok />                 // default: jatuh, mantul sekali, diam sebentar, lalu hilang
//   <HujanBatok jumlah={8} />      // atur jumlah keping (maks 24, sengaja dibatasi ketat)
//
// Pakai mode jatuh-lurus (mis. digabung di hero /galeri):
//   <HujanBatok diamDiBawah={false} jumlah={6} />
//
// SOAL RASA JATUHNYA:
// Sama seperti HujanBiting/AnimasiKopi, jatuh bebas memakai kurva
// cubic-bezier(0.11, 0, 0.5, 0) yang meniru percepatan gravitasi.
// Bedanya di sini (mode diam): hold di dasar layar sengaja dipersingkat
// (~2.2 detik, bukan ~5 detik) supaya animasi terasa singkat & elegan,
// sesuai arahan "jangan terlalu ramai, jangan mengganggu, tetap premium".
//
// Catatan lain:
// - Murni CSS, tanpa state, jadi tetap bisa dipakai di server component.
// - Jumlah keping di layar sempit (mobile) otomatis dipangkas lewat
//   media query (nth-child), tanpa perlu JS/observer tambahan.
// - Lapisan ini pointer-events-none & (mode diam) berhenti di 58–78%
//   tinggi layar, jadi tidak pernah menutupi konten utama (CTA, teks, dsb).
// - Otomatis tidak tampil jika pengguna menyalakan "kurangi gerakan".

const MAKS_BATOK = 24;

type Batok = {
  x: number;
  ukuran: number;
  durasi: number;
  jeda: number;
  darat: number;
  rotasiAwal: number;
  rotasiDarat: number;
  goyang: number;
  gelap: number;
};

/* Pengacak bersumbu tetap (mulberry32) — hasil selalu sama di server & browser. */
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

function buatDaftarBatok(jumlah: number, diamDiBawah: boolean): Batok[] {
  const acak = pengacak(20260815);
  const antara = (min: number, maks: number) => min + acak() * (maks - min);

  return Array.from({ length: jumlah }, (_, i) => {
    // sebar merata sepanjang lebar layar, digeser sedikit acak supaya tidak berbaris
    const lebarJatah = 100 / jumlah;
    const x = Math.min(96, Math.max(4, (i + 0.5) * lebarJatah + antara(-lebarJatah * 0.4, lebarJatah * 0.4)));

    // Mode diam: durasi mencakup seluruh siklus (jatuh + diam + jatuh lagi).
    // Mode lewat: seluruh durasi habis untuk turun, jadi harus singkat (~1 detik).
    const durasi = diamDiBawah ? antara(3.6, 4.6) : antara(0.9, 1.3);
    const jeda = diamDiBawah ? antara(0, 1.4) + (acak() < 0.25 ? antara(0.6, 1.6) : 0) : antara(0, 2.6);

    return {
      x,
      ukuran: antara(26, 46), // variasi ukuran keping
      durasi,
      jeda,
      darat: antara(58, 78), // (mode diam) mendarat di 58–78% tinggi layar, jauh dari CTA/footer
      rotasiAwal: antara(-50, 50),
      rotasiDarat: diamDiBawah ? antara(70, 260) : antara(50, 150),
      goyang: (acak() < 0.5 ? -1 : 1) * antara(8, 18),
      gelap: antara(0.82, 1),
    };
  });
}

/* Satu keping batok kelapa — mangkuk terbelah, gradasi terracotta → walnut */
function KepingBatok({ id, gelap }: { id: number; gelap: number }) {
  const gid = `batok-jatuh-grad-${id}`;
  return (
    <svg viewBox="0 0 60 46" aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D08A55" />
          <stop offset="0.55" stopColor="#B86F4A" />
          <stop offset="1" stopColor="#50372B" />
        </linearGradient>
      </defs>
      <g opacity={gelap}>
        <path d="M2 18 Q 30 30 58 18 L 58 20 C 58 34 45 44 30 44 C 15 44 2 34 2 20 Z" fill={`url(#${gid})`} />
        <ellipse cx="30" cy="17" rx="27" ry="7" fill="#F1E7D5" opacity="0.3" />
        <path d="M12 26 q 4 10 10 14 M48 26 q -4 10 -10 14" stroke="#3F3027" strokeWidth="1.6" fill="none" opacity="0.4" />
        {/* serat halus khas tempurung */}
        <path d="M20 21 q 10 4 20 0" stroke="#3F3027" strokeWidth="1" fill="none" opacity="0.25" />
      </g>
    </svg>
  );
}

type Props = {
  /** Berapa keping batok yang dijatuhkan. Maksimal 24 (sengaja dibatasi, biar tidak ramai). Default 10. */
  jumlah?: number;
  /** Ulangi terus-menerus. Default false, jadi hanya sekali saat halaman dibuka. */
  berulang?: boolean;
  /**
   * true  : jatuh, mantul sekali, diam sebentar, lalu jatuh lagi sampai
   *         hilang. (default — perilaku asli, dipakai di /kerajinan-tangan)
   * false : langsung jatuh menembus layar tanpa berhenti, tanpa mantul.
   */
  diamDiBawah?: boolean;
};

export default function HujanBatok({ jumlah = 10, berulang = false, diamDiBawah = true }: Props) {
  const batok = buatDaftarBatok(Math.min(Math.max(jumlah, 1), MAKS_BATOK), diamDiBawah);

  // Nama animasi dipilih di sini; keyframes-nya ada dua set di bawah —
  // pola yang sama seperti HujanBiting/AnimasiKopi.
  const kelasTurun = diamDiBawah ? "batok-turun" : "batok-lewat";
  const kelasPutar = diamDiBawah ? "batok-putar" : "batok-putar-lewat";

  return (
    <div
      aria-hidden="true"
      className="hujan-batok pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      <style>{`
        /* Hormati preferensi perangkat: tidak ada yang jatuh sama sekali */
        @media (prefers-reduced-motion: reduce) {
          .hujan-batok { display: none; }
        }
        /* Layar sempit: separuh keping disembunyikan supaya tidak ramai & tidak
           mengganggu konten yang lebih padat di mobile. */
        @media (max-width: 640px) {
          .hujan-batok > *:nth-child(n + 7) { display: none; }
        }

        .batok-turun, .batok-lewat {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }
        .batok-putar, .batok-putar-lewat {
          width: 100%;
          height: 100%;
          will-change: transform;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }

        .batok-turun       { animation-name: batok-turun; }
        .batok-putar       { animation-name: batok-putar; }
        /* kurva gravitasi: percepatannya galak sejak awal */
        .batok-lewat       { animation-name: batok-lewat; animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0); }
        .batok-putar-lewat { animation-name: batok-putar-lewat; animation-timing-function: linear; }

        /* ================= MODE 1: mantul lalu diam (default, ASLI) =================
           0-16%   : JATUH dengan percepatan gravitasi (~0.6 detik)
           16-26%  : menyentuh "tanah", satu kali mantul kecil lalu diam
           26-78%  : diam sebentar (~2.2 detik) — singkat & elegan
           78-92%  : jatuh lagi menembus layar sambil memudar
           92-100% : jeda kosong sebelum baris berikutnya (jika berulang)   */
        @keyframes batok-turun {
          0% {
            transform: translate3d(0, -18vh, 0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          4% { opacity: 1; }
          16% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.16, 0.84, 0.44, 1);
          }
          21% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh - 10px), 0);
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          26% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: linear;
          }
          78% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.4, 0, 0.7, 0);
          }
          92%, 100% {
            transform: translate3d(var(--goyang), 118vh, 0);
            opacity: 0;
          }
        }

        @keyframes batok-putar {
          0% { transform: rotate(var(--rot-awal)); animation-timing-function: linear; }
          16% {
            transform: rotate(var(--rot-darat));
            animation-timing-function: cubic-bezier(0.3, 0.9, 0.4, 1);
          }
          21% { transform: rotate(calc(var(--rot-darat) - 8deg)); }
          26% { transform: rotate(var(--rot-darat)); animation-timing-function: linear; }
          78% {
            transform: rotate(var(--rot-darat));
            animation-timing-function: cubic-bezier(0.11, 0, 0.5, 0);
          }
          100% { transform: rotate(calc(var(--rot-darat) + 34deg)); }
        }

        /* ================= MODE 2: langsung jatuh =================
           Tanpa pantulan, tanpa berhenti — dipakai saat digabung dengan
           HujanBiting/AnimasiKopi supaya ketiganya senada.               */
        @keyframes batok-lewat {
          0% {
            transform: translate3d(0, -18vh, 0);
            opacity: 0;
          }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% {
            transform: translate3d(var(--goyang), 118vh, 0);
            opacity: 0;
          }
        }

        @keyframes batok-putar-lewat {
          0%   { transform: rotate(var(--rot-awal)); }
          100% { transform: rotate(calc(var(--rot-awal) + var(--rot-darat))); }
        }
      `}</style>

      {batok.map((b, i) => (
        <div
          key={i}
          className={kelasTurun}
          style={
            {
              left: `${b.x.toFixed(2)}%`,
              width: `${b.ukuran.toFixed(1)}px`,
              height: `${(b.ukuran * 0.77).toFixed(1)}px`,
              marginLeft: `${(-b.ukuran / 2).toFixed(1)}px`,
              "--dur": `${b.durasi.toFixed(2)}s`,
              "--jeda": `${b.jeda.toFixed(2)}s`,
              "--darat": b.darat.toFixed(2),
              "--goyang": `${b.goyang.toFixed(1)}px`,
              "--ulang": berulang ? "infinite" : 1,
            } as React.CSSProperties
          }
        >
          <div
            className={kelasPutar}
            style={
              {
                "--rot-awal": `${b.rotasiAwal.toFixed(1)}deg`,
                "--rot-darat": `${b.rotasiDarat.toFixed(1)}deg`,
                "--dur": `${b.durasi.toFixed(2)}s`,
                "--jeda": `${b.jeda.toFixed(2)}s`,
                "--ulang": berulang ? "infinite" : 1,
              } as React.CSSProperties
            }
          >
            <KepingBatok id={i} gelap={b.gelap} />
          </div>
        </div>
      ))}
    </div>
  );
}
