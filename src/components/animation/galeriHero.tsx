// src/components/animation/galeriHero.tsx
// Wrapper KHUSUS hero /galeri: menggabungkan tiga animasi identitas
// potensi yang SUDAH ADA — HujanBiting (biting.tsx), AnimasiKopi (kopi.tsx),
// HujanBatok (kerajinan.tsx) — supaya jatuh BERSAMAAN, sebagai satu animasi
// pembuka yang mewakili ketiga potensi Balesari sekaligus.
//
// PENTING: file ini TIDAK mengubah perilaku/kode tiga komponen aslinya.
// Ia hanya:
//   - memanggil ulang ketiganya dengan props yang sudah didukung
//     (jumlah lebih sedikit, diamDiBawah={false} supaya langsung jatuh
//     tanpa mantul — dipilih sesuai kebutuhan hero galeri),
//   - membungkus tiap lapisan dengan opacity lebih rendah supaya tidak
//     mengalahkan konten hero,
//   - tidak menyentuh apa pun yang dipakai /biting, /kopi, /kerajinan-tangan
//     (halaman itu memanggil langsung dari file aslinya, bukan lewat sini).
//
// Kenapa opacity dibungkus di sini, bukan lewat prop baru di komponen asli?
// Supaya perubahan "opacity lebih redup khusus untuk digabung" tidak perlu
// menambah prop baru ke tiga komponen yang sudah dipakai halaman lain.
// Pembungkus di bawah sengaja diberi ukuran eksplisit (fixed inset-0)
// SEBELUM opacity diterapkan, supaya elemen `position: fixed` di dalamnya
// tetap mengacu ke seluruh layar seperti biasa (opacity/transform pada
// elemen tetap membentuk containing block baru bagi anak fixed-nya; kalau
// pembungkus tidak diberi ukuran eksplisit lebih dulu, animasi di
// dalamnya bisa kolaps).
//
// Warna sudah otomatis berbeda tanpa perlu diatur manual, karena tiap
// komponen sudah punya gradasi warnanya sendiri:
//   HujanBiting → hijau/krem lidi bambu
//   AnimasiKopi → coklat biji kopi
//   HujanBatok  → terracotta/walnut batok kelapa

import AnimasiBiting from "./biting";
import AnimasiKopi from "./kopi";
import HujanBatok from "./kerajinan";

export default function AnimasiGaleriHero() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Biting Bambu — hijau, jatuh lurus tanpa mantul */}
      <div className="fixed inset-0 z-[45] opacity-55">
        <AnimasiBiting jumlah={5} diamDiBawah={false} />
      </div>

      {/* Kopi Balesari — coklat, jatuh lurus tanpa mantul */}
      <div className="fixed inset-0 z-[45] opacity-55">
        <AnimasiKopi jumlah={5} diamDiBawah={false} />
      </div>

      {/* Kerajinan Tangan — terracotta, jatuh lurus tanpa mantul */}
      <div className="fixed inset-0 z-[45] opacity-65">
        <HujanBatok jumlah={4} diamDiBawah={false} />
      </div>

      <style>{`
        /* Tablet ke bawah: kurangi jumlah elemen tiap lapisan supaya tidak ramai */
        @media (max-width: 1024px) {
          .hujan-biting > *:nth-child(n + 4),
          .hujan-kopi > *:nth-child(n + 4),
          .hujan-batok > *:nth-child(n + 3) { display: none; }
        }
        /* Mobile: sisakan sedikit saja per lapisan, tetap ada tapi jauh lebih jarang */
        @media (max-width: 640px) {
          .hujan-biting > *:nth-child(n + 3),
          .hujan-kopi > *:nth-child(n + 3),
          .hujan-batok > *:nth-child(n + 2) { display: none; }
        }
      `}</style>
    </div>
  );
}
