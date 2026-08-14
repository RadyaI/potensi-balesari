// src/components/animation/kopi.tsx
// Hujan biji kopi: biji berjatuhan dari atas layar.
//
// Ada dua perilaku, dipilih lewat prop "diamDiBawah":
//   true  (default) : memantul di dasar layar, menggelinding sebentar,
//                     diam sekitar 5 detik, lalu jatuh lagi sampai hilang
//   false           : langsung jatuh menembus layar tanpa berhenti
//
// Pakai di halaman /kopi:
//   import AnimasiKopi from "@/components/animation/kopi";
//   ...
//   <AnimasiKopi />                                  // mantul lalu diam
//   <AnimasiKopi diamDiBawah={false} berulang />     // hujan terus-menerus
//   <AnimasiKopi jumlah={40} />
//
// Catatan:
// - Murni CSS, tanpa state, jadi tetap bisa dipakai di server component.
// - Karena bijinya membulat, geraknya dibuat berbeda dari lidi: pantulannya
//   tiga kali dan setelah mendarat ia masih menggelinding sambil berputar
//   sebelum benar-benar berhenti.
// - Perputaran memakai titik tengah biji, karena itu tiap biji diberi
//   margin atas setengah tingginya supaya --darat langsung menjadi posisi
//   bijinya, tidak bergantung ukuran.
// - Nilai tiap biji dibangkitkan dengan pengacak bersumbu tetap, jadi
//   hasilnya bervariasi tapi selalu sama antara server dan browser.
// - Lapisan ini pointer-events-none, jadi tidak menghalangi klik apa pun.
// - Otomatis tidak tampil jika pengguna menyalakan "kurangi gerakan".

const MAKS_BIJI = 60;

type Biji = {
  x: number;
  ukuran: number;
  durasi: number;
  jeda: number;
  darat: number;
  rotasiAwal: number;
  rotasiDarat: number;
  rotasiGulir: number;
  gulir: number;
  goyang: number;
  gelap: number;
};

/* Pengacak bersumbu tetap (mulberry32). Dipakai supaya tiap biji dapat
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

function buatDaftarBiji(jumlah: number, diamDiBawah: boolean): Biji[] {
  const acak = pengacak(20260814);
  const antara = (min: number, maks: number) => min + acak() * (maks - min);

  return Array.from({ length: jumlah }, (_, i) => {
    // sebar merata sepanjang lebar layar, lalu digeser sedikit acak
    const lebarJatah = 100 / jumlah;
    const x = Math.min(97, Math.max(3, (i + 0.5) * lebarJatah + antara(-lebarJatah * 0.35, lebarJatah * 0.35)));

    const ukuran = antara(20, 34);
    const gulir = (acak() < 0.5 ? -1 : 1) * antara(24, 46);

    /* Durasi dihitung berbeda per mode.
       Mode diam: nilai ini mencakup SELURUH siklus (jatuh, mantul,
       diam sekitar 5 detik, lalu keluar layar), sehingga jatuhnya
       sendiri hanya sekitar seperlima dari angka ini.
       Mode langsung: seluruh durasi habis untuk turun saja, jadi
       angkanya harus jauh lebih kecil agar kecepatannya setara. */
    const durasi = diamDiBawah
      ? antara(8.4, 10.2) + (34 - ukuran) * 0.02
      : antara(2.0, 3.6) + (34 - ukuran) * 0.05;

    /* Jeda mulai. Untuk mode langsung, jedanya disebar sepanjang satu
       durasi saja supaya hujannya turun merata dan tidak menggerombol. */
    const jeda = diamDiBawah
      ? antara(0, Math.min(8, jumlah * 0.32))
      : antara(0, 4.6);

    return {
      x,
      ukuran,
      durasi,
      jeda,
      darat: antara(96.4, 99.4),
      rotasiAwal: antara(-45, 45),
      rotasiDarat: antara(160, 330),
      gulir,
      // arah putaran mengikuti arah menggelinding
      rotasiGulir: gulir * antara(3.4, 4.4),
      goyang: (acak() < 0.5 ? -1 : 1) * antara(11, 24),
      gelap: antara(0.65, 1),
    };
  });
}

/* Satu biji kopi: bulat lonjong dengan belahan di tengah */
function BijiKopi({ id, gelap }: { id: number; gelap: number }) {
  const gid = `biji-grad-${id}`;
  return (
    <svg viewBox="0 0 40 54" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id={gid} x1="0.15" y1="0.1" x2="0.9" y2="0.95">
          <stop offset="0" stopColor="#B07A4E" />
          <stop offset="0.45" stopColor="#8B5E3C" />
          <stop offset="1" stopColor="#5C3A21" />
        </linearGradient>
      </defs>
      <g opacity={gelap}>
        <ellipse cx="20" cy="27" rx="18" ry="26" fill={`url(#${gid})`} />
        {/* belahan tengah yang khas */}
        <path
          d="M20 3 C 13 14, 13 40, 20 51 C 27 40, 27 14, 20 3 Z"
          fill="#3E2415"
          opacity="0.55"
        />
        <path d="M20 4 C 15 15, 15 39, 20 50" stroke="#2B1A0E" strokeWidth="1.6" fill="none" opacity="0.5" />
        {/* kilau tipis di sisi terang */}
        <ellipse cx="12" cy="16" rx="5" ry="9" fill="#F3EDE0" opacity="0.16" transform="rotate(-18 12 16)" />
      </g>
    </svg>
  );
}

type Props = {
  /** Berapa biji yang dijatuhkan. Maksimal 60. Default 30. */
  jumlah?: number;
  /** Ulangi terus-menerus. Default false, jadi hanya sekali saat halaman dibuka. */
  berulang?: boolean;
  /**
   * true  : memantul, menggelinding, lalu diam sekitar 5 detik di dasar
   *         layar sebelum jatuh lagi dan hilang. (default)
   * false : langsung jatuh menembus layar tanpa berhenti, seperti hujan.
   */
  diamDiBawah?: boolean;
};

export default function AnimasiKopi({
  jumlah = 30,
  berulang = false,
  diamDiBawah = true,
}: Props) {
  const biji = buatDaftarBiji(Math.min(Math.max(jumlah, 1), MAKS_BIJI), diamDiBawah);

  // Nama animasi dipilih di sini; keyframes-nya ada dua set di bawah.
  const kelasTurun = diamDiBawah ? "kopi-turun" : "kopi-lewat";
  const kelasPutar = diamDiBawah ? "kopi-putar" : "kopi-putar-lewat";

  return (
    <div
      aria-hidden="true"
      className="hujan-kopi pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      <style>{`
        /* Hormati preferensi perangkat: tidak ada yang jatuh sama sekali */
        @media (prefers-reduced-motion: reduce) {
          .hujan-kopi { display: none; }
        }

        .kopi-turun, .kopi-lewat {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }
        .kopi-putar, .kopi-putar-lewat {
          width: 100%;
          height: 100%;
          will-change: transform;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }

        .kopi-turun      { animation-name: kopi-turun; }
        .kopi-putar      { animation-name: kopi-putar; }
        .kopi-lewat      { animation-name: kopi-lewat; animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55); }
        .kopi-putar-lewat{ animation-name: kopi-putar-lewat; animation-timing-function: linear; }

        /* ================= MODE 1: mantul lalu diam =================
           Nilai translateY adalah posisi TITIK TENGAH biji, karena tiap
           biji sudah digeser ke atas setengah tingginya.
           0-18%   : melayang turun, makin cepat (percepatan gravitasi)
           18-34%  : memantul tiga kali sambil bergeser menggelinding
           34-85%  : diam tergeletak (sekitar 5 detik)
           85-97%  : jatuh lagi menembus dasar layar sambil memudar      */
        @keyframes kopi-turun {
          0% {
            transform: translate3d(0, -25vh, 0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55);
          }
          4% { opacity: 1; }
          18% {
            transform: translate3d(var(--goyang), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.15, 0.75, 0.4, 1);
          }
          22.5% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.42), calc(var(--darat) * 1vh - 42px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          26.5% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.68), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.15, 0.75, 0.4, 1);
          }
          29% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.82), calc(var(--darat) * 1vh - 16px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          31% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.92), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.15, 0.75, 0.4, 1);
          }
          32.5% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.97), calc(var(--darat) * 1vh - 5px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          34% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), calc(var(--darat) * 1vh), 0);
            animation-timing-function: linear;
          }
          85% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55);
          }
          97%, 100% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), 145vh, 0);
            opacity: 0;
          }
        }

        @keyframes kopi-putar {
          0% {
            transform: rotate(var(--rot-awal));
            animation-timing-function: linear;
          }
          18% {
            transform: rotate(var(--rot-darat));
            animation-timing-function: cubic-bezier(0.1, 0.7, 0.3, 1);
          }
          34% {
            transform: rotate(calc(var(--rot-darat) + var(--rot-gulir)));
            animation-timing-function: linear;
          }
          85% {
            transform: rotate(calc(var(--rot-darat) + var(--rot-gulir)));
            animation-timing-function: ease-in;
          }
          100% {
            transform: rotate(calc(var(--rot-darat) + var(--rot-gulir) + 190deg));
          }
        }

        /* ================= MODE 2: langsung jatuh =================
           Tanpa pantulan, tanpa berhenti. Bijinya melayang turun makin
           cepat sambil sedikit bergeser, lalu memudar di ujung bawah.   */
        @keyframes kopi-lewat {
          0% {
            transform: translate3d(0, -25vh, 0);
            opacity: 0;
          }
          6% { opacity: 1; }
          88% { opacity: 1; }
          100% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.5), 128vh, 0);
            opacity: 0;
          }
        }

        @keyframes kopi-putar-lewat {
          0%   { transform: rotate(var(--rot-awal)); }
          100% { transform: rotate(calc(var(--rot-awal) + var(--rot-darat) + var(--rot-gulir))); }
        }
      `}</style>

      {biji.map((b, i) => (
        <div
          key={i}
          className={kelasTurun}
          style={
            {
              left: `${b.x}%`,
              width: `${b.ukuran * 0.72}px`,
              height: `${b.ukuran}px`,
              marginLeft: `${(-b.ukuran * 0.72) / 2}px`,
              // digeser setengah tinggi, supaya --darat menjadi posisi
              // titik tengah biji (titik putarnya)
              marginTop: `${-b.ukuran / 2}px`,
              "--dur": `${b.durasi.toFixed(2)}s`,
              "--jeda": `${b.jeda.toFixed(2)}s`,
              "--darat": b.darat.toFixed(2),
              "--goyang": `${b.goyang.toFixed(1)}px`,
              "--gulir": `${b.gulir.toFixed(1)}px`,
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
                "--rot-gulir": `${b.rotasiGulir.toFixed(1)}deg`,
                "--dur": `${b.durasi.toFixed(2)}s`,
                "--jeda": `${b.jeda.toFixed(2)}s`,
                "--ulang": berulang ? "infinite" : 1,
              } as React.CSSProperties
            }
          >
            <BijiKopi id={i} gelap={b.gelap} />
          </div>
        </div>
      ))}
    </div>
  );
}