// src/components/animation/kopi.tsx
// Hujan biji kopi: biji berjatuhan dari atas layar, memantul beberapa kali
// di dasar layar, menggelinding sebentar, diam sekitar 5 detik, lalu jatuh
// lagi sampai hilang.
//
// Pakai di halaman /kopi:
//   import HujanKopi from "@/components/animation/kopi";
//   ...
//   <HujanKopi />
//   <HujanKopi jumlah={12} berulang />
//
// Catatan:
// - Murni CSS, tanpa state, jadi tetap bisa dipakai di server component.
// - Karena bijinya membulat, geraknya dibuat berbeda dari lidi: pantulannya
//   lebih banyak (tiga kali) dan setelah mendarat ia masih menggelinding
//   ke samping sambil berputar sebelum benar-benar berhenti.
// - Perputaran memakai titik tengah biji, karena itu tiap biji diberi
//   margin atas setengah tingginya supaya --darat langsung menjadi posisi
//   bijinya, tidak bergantung ukuran.
// - Nilai tiap biji ditulis tetap (bukan acak) supaya hasil render di
//   server dan di browser selalu sama.
// - Lapisan ini pointer-events-none, jadi tidak menghalangi klik apa pun.
// - Otomatis tidak tampil jika pengguna menyalakan "kurangi gerakan".

type Biji = {
  /** Posisi mendatar, persen dari lebar layar */
  x: number;
  /** Tinggi biji dalam piksel (lebarnya sekitar 0.72 kali nilai ini) */
  ukuran: number;
  /** Lama satu putaran animasi, detik */
  durasi: number;
  /** Jeda sebelum biji ini mulai jatuh, detik */
  jeda: number;
  /** Ketinggian biji saat berhenti, vh dari atas (100 = tepat dasar) */
  darat: number;
  /** Sudut awal saat masih di atas */
  rotasiAwal: number;
  /** Sudut saat menyentuh dasar (setelah berjungkir balik) */
  rotasiDarat: number;
  /** Tambahan putaran selama menggelinding. Searah dengan gulir. */
  rotasiGulir: number;
  /** Jarak menggelinding ke samping setelah memantul, piksel */
  gulir: number;
  /** Geser mendatar selama melayang, piksel */
  goyang: number;
  /** Kepekatan warna, 0 sampai 1 */
  gelap: number;
};

/* Disusun manual supaya sebarannya rata dan hasil akhirnya terlihat wajar.
   Biji yang lebih kecil dibuat jatuh sedikit lebih lambat dan menggelinding
   lebih jauh, seolah lebih ringan. */
const DAFTAR_BIJI: Biji[] = [
  { x: 5, ukuran: 30, durasi: 9.0, jeda: 0.0, darat: 97.6, rotasiAwal: -22, rotasiDarat: 214, rotasiGulir: 128, gulir: 34, goyang: 18, gelap: 0.9 },
  { x: 12, ukuran: 22, durasi: 9.9, jeda: 1.2, darat: 98.6, rotasiAwal: 38, rotasiDarat: 302, rotasiGulir: -164, gulir: -42, goyang: -14, gelap: 0.7 },
  { x: 19, ukuran: 34, durasi: 8.5, jeda: 0.6, darat: 96.8, rotasiAwal: -8, rotasiDarat: 178, rotasiGulir: 96, gulir: 26, goyang: 22, gelap: 1.0 },
  { x: 26, ukuran: 26, durasi: 9.5, jeda: 2.1, darat: 98.2, rotasiAwal: 16, rotasiDarat: 256, rotasiGulir: 142, gulir: 38, goyang: -20, gelap: 0.8 },
  { x: 33, ukuran: 32, durasi: 8.8, jeda: 0.3, darat: 97.2, rotasiAwal: -34, rotasiDarat: 196, rotasiGulir: -108, gulir: -29, goyang: 16, gelap: 0.95 },
  { x: 40, ukuran: 20, durasi: 10.2, jeda: 3.0, darat: 99.0, rotasiAwal: 10, rotasiDarat: 324, rotasiGulir: 178, gulir: 46, goyang: -11, gelap: 0.65 },
  { x: 47, ukuran: 33, durasi: 8.4, jeda: 1.7, darat: 96.6, rotasiAwal: -18, rotasiDarat: 168, rotasiGulir: 88, gulir: 24, goyang: 24, gelap: 1.0 },
  { x: 54, ukuran: 24, durasi: 9.7, jeda: 0.8, darat: 98.8, rotasiAwal: 44, rotasiDarat: 288, rotasiGulir: -152, gulir: -40, goyang: -17, gelap: 0.75 },
  { x: 61, ukuran: 28, durasi: 9.2, jeda: 2.6, darat: 97.8, rotasiAwal: -14, rotasiDarat: 232, rotasiGulir: 118, gulir: 31, goyang: 13, gelap: 0.85 },
  { x: 68, ukuran: 31, durasi: 8.7, jeda: 1.0, darat: 97.0, rotasiAwal: 26, rotasiDarat: 186, rotasiGulir: -102, gulir: -27, goyang: -22, gelap: 0.95 },
  { x: 75, ukuran: 21, durasi: 10.0, jeda: 3.5, darat: 99.2, rotasiAwal: -40, rotasiDarat: 312, rotasiGulir: 172, gulir: 44, goyang: 12, gelap: 0.7 },
  { x: 82, ukuran: 29, durasi: 8.9, jeda: 0.2, darat: 97.4, rotasiAwal: 6, rotasiDarat: 204, rotasiGulir: 124, gulir: 33, goyang: -15, gelap: 0.9 },
  { x: 89, ukuran: 25, durasi: 9.6, jeda: 1.9, darat: 98.4, rotasiAwal: -26, rotasiDarat: 268, rotasiGulir: -136, gulir: -36, goyang: 19, gelap: 0.8 },
  { x: 95, ukuran: 33, durasi: 8.6, jeda: 1.5, darat: 96.4, rotasiAwal: 20, rotasiDarat: 174, rotasiGulir: -92, gulir: -25, goyang: -13, gelap: 1.0 },
  { x: 9, ukuran: 23, durasi: 9.8, jeda: 4.0, darat: 98.9, rotasiAwal: -10, rotasiDarat: 296, rotasiGulir: 158, gulir: 41, goyang: 16, gelap: 0.75 },
  { x: 58, ukuran: 27, durasi: 9.3, jeda: 4.6, darat: 97.9, rotasiAwal: 30, rotasiDarat: 226, rotasiGulir: 114, gulir: 30, goyang: -18, gelap: 0.85 },
  { x: 30, ukuran: 24, durasi: 9.7, jeda: 5.2, darat: 98.5, rotasiAwal: -30, rotasiDarat: 278, rotasiGulir: -146, gulir: -39, goyang: 11, gelap: 0.8 },
  { x: 72, ukuran: 30, durasi: 8.9, jeda: 5.8, darat: 97.3, rotasiAwal: 14, rotasiDarat: 192, rotasiGulir: 106, gulir: 28, goyang: -20, gelap: 0.9 },
  { x: 16, ukuran: 32, durasi: 9.1, jeda: 6.4, darat: 96.9, rotasiAwal: -16, rotasiDarat: 208, rotasiGulir: -98, gulir: -26, goyang: 21, gelap: 0.95 },
  { x: 85, ukuran: 22, durasi: 10.1, jeda: 7.0, darat: 99.1, rotasiAwal: 36, rotasiDarat: 316, rotasiGulir: 168, gulir: 43, goyang: -12, gelap: 0.7 },

  { x: 3, ukuran: 27, durasi: 9.4, jeda: 7.5, darat: 98.1, rotasiAwal: -28, rotasiDarat: 242, rotasiGulir: 132, gulir: 35, goyang: 17, gelap: 0.85 },
  { x: 7, ukuran: 31, durasi: 8.8, jeda: 8.1, darat: 97.0, rotasiAwal: 18, rotasiDarat: 188, rotasiGulir: -104, gulir: -28, goyang: -19, gelap: 0.95 },
  { x: 14, ukuran: 19, durasi: 10.4, jeda: 7.8, darat: 99.3, rotasiAwal: -36, rotasiDarat: 328, rotasiGulir: 182, gulir: 48, goyang: 10, gelap: 0.65 },
  { x: 18, ukuran: 28, durasi: 9.2, jeda: 8.7, darat: 97.7, rotasiAwal: 12, rotasiDarat: 218, rotasiGulir: 108, gulir: 29, goyang: -16, gelap: 0.9 },
  { x: 23, ukuran: 25, durasi: 9.8, jeda: 9.2, darat: 98.7, rotasiAwal: -20, rotasiDarat: 284, rotasiGulir: -154, gulir: -41, goyang: 20, gelap: 0.75 },
  { x: 29, ukuran: 33, durasi: 8.6, jeda: 8.9, darat: 96.5, rotasiAwal: 34, rotasiDarat: 166, rotasiGulir: 92, gulir: 25, goyang: -14, gelap: 1.0 },
  { x: 35, ukuran: 21, durasi: 10.0, jeda: 9.8, darat: 99.0, rotasiAwal: -6, rotasiDarat: 306, rotasiGulir: -170, gulir: -45, goyang: 15, gelap: 0.7 },
  { x: 42, ukuran: 30, durasi: 9.0, jeda: 10.3, darat: 97.5, rotasiAwal: 24, rotasiDarat: 224, rotasiGulir: 120, gulir: 32, goyang: -21, gelap: 0.9 },
  { x: 49, ukuran: 23, durasi: 9.9, jeda: 9.5, darat: 98.6, rotasiAwal: -32, rotasiDarat: 292, rotasiGulir: 160, gulir: 42, goyang: 12, gelap: 0.75 },
  { x: 56, ukuran: 34, durasi: 8.5, jeda: 10.8, darat: 96.7, rotasiAwal: 8, rotasiDarat: 182, rotasiGulir: -96, gulir: -27, goyang: -18, gelap: 1.0 },
  { x: 63, ukuran: 26, durasi: 9.5, jeda: 11.2, darat: 98.3, rotasiAwal: -18, rotasiDarat: 262, rotasiGulir: 138, gulir: 37, goyang: 22, gelap: 0.8 },
  { x: 70, ukuran: 29, durasi: 9.1, jeda: 10.6, darat: 97.6, rotasiAwal: 40, rotasiDarat: 198, rotasiGulir: -112, gulir: -30, goyang: -11, gelap: 0.9 },
  { x: 77, ukuran: 20, durasi: 10.3, jeda: 11.8, darat: 99.2, rotasiAwal: -12, rotasiDarat: 318, rotasiGulir: 176, gulir: 46, goyang: 16, gelap: 0.65 },
  { x: 84, ukuran: 32, durasi: 8.7, jeda: 12.1, darat: 96.9, rotasiAwal: 28, rotasiDarat: 172, rotasiGulir: 86, gulir: 23, goyang: -23, gelap: 0.95 },
  { x: 91, ukuran: 24, durasi: 9.7, jeda: 11.5, darat: 98.8, rotasiAwal: -24, rotasiDarat: 274, rotasiGulir: -148, gulir: -39, goyang: 14, gelap: 0.8 },
  { x: 97, ukuran: 28, durasi: 9.3, jeda: 12.6, darat: 97.9, rotasiAwal: 16, rotasiDarat: 236, rotasiGulir: 126, gulir: 34, goyang: -17, gelap: 0.85 },

  { x: 6, ukuran: 24, durasi: 9.8, jeda: 13.0, darat: 98.5, rotasiAwal: 32, rotasiDarat: 286, rotasiGulir: -142, gulir: -38, goyang: 19, gelap: 0.8 },
  { x: 11, ukuran: 30, durasi: 8.9, jeda: 13.7, darat: 97.3, rotasiAwal: -14, rotasiDarat: 206, rotasiGulir: 116, gulir: 31, goyang: -12, gelap: 0.9 },
  { x: 17, ukuran: 22, durasi: 10.1, jeda: 14.2, darat: 99.0, rotasiAwal: 20, rotasiDarat: 310, rotasiGulir: 170, gulir: 44, goyang: 16, gelap: 0.7 },
  { x: 21, ukuran: 33, durasi: 8.5, jeda: 13.4, darat: 96.6, rotasiAwal: -38, rotasiDarat: 176, rotasiGulir: -90, gulir: -24, goyang: -20, gelap: 1.0 },
  { x: 27, ukuran: 27, durasi: 9.4, jeda: 14.8, darat: 98.0, rotasiAwal: 6, rotasiDarat: 248, rotasiGulir: 134, gulir: 36, goyang: 21, gelap: 0.85 },
  { x: 32, ukuran: 20, durasi: 10.5, jeda: 15.2, darat: 99.3, rotasiAwal: -26, rotasiDarat: 326, rotasiGulir: 184, gulir: 49, goyang: -13, gelap: 0.65 },
  { x: 38, ukuran: 31, durasi: 8.8, jeda: 14.5, darat: 97.1, rotasiAwal: 14, rotasiDarat: 194, rotasiGulir: -106, gulir: -29, goyang: 18, gelap: 0.95 },
  { x: 44, ukuran: 25, durasi: 9.6, jeda: 15.7, darat: 98.7, rotasiAwal: -10, rotasiDarat: 270, rotasiGulir: 152, gulir: 40, goyang: -16, gelap: 0.75 },
  { x: 51, ukuran: 29, durasi: 9.1, jeda: 16.1, darat: 97.8, rotasiAwal: 36, rotasiDarat: 216, rotasiGulir: -118, gulir: -32, goyang: 11, gelap: 0.9 },
  { x: 57, ukuran: 23, durasi: 10.0, jeda: 15.4, darat: 98.9, rotasiAwal: -18, rotasiDarat: 298, rotasiGulir: 164, gulir: 43, goyang: -22, gelap: 0.7 },
  { x: 64, ukuran: 34, durasi: 8.4, jeda: 16.6, darat: 96.4, rotasiAwal: 10, rotasiDarat: 162, rotasiGulir: 82, gulir: 22, goyang: 17, gelap: 1.0 },
  { x: 69, ukuran: 26, durasi: 9.5, jeda: 17.0, darat: 98.2, rotasiAwal: -34, rotasiDarat: 258, rotasiGulir: -140, gulir: -37, goyang: -15, gelap: 0.8 },
  { x: 74, ukuran: 21, durasi: 10.2, jeda: 16.3, darat: 99.1, rotasiAwal: 24, rotasiDarat: 320, rotasiGulir: 174, gulir: 45, goyang: 20, gelap: 0.7 },
  { x: 80, ukuran: 32, durasi: 8.7, jeda: 17.5, darat: 96.8, rotasiAwal: -8, rotasiDarat: 184, rotasiGulir: -100, gulir: -27, goyang: -18, gelap: 0.95 },
  { x: 87, ukuran: 28, durasi: 9.2, jeda: 18.0, darat: 97.7, rotasiAwal: 18, rotasiDarat: 230, rotasiGulir: 122, gulir: 33, goyang: 13, gelap: 0.85 },
  { x: 93, ukuran: 24, durasi: 9.8, jeda: 17.2, darat: 98.6, rotasiAwal: -22, rotasiDarat: 280, rotasiGulir: -156, gulir: -41, goyang: -21, gelap: 0.75 },

  { x: 2, ukuran: 29, durasi: 9.0, jeda: 18.5, darat: 97.4, rotasiAwal: 30, rotasiDarat: 202, rotasiGulir: 110, gulir: 30, goyang: 16, gelap: 0.9 },
  { x: 8, ukuran: 20, durasi: 10.4, jeda: 19.1, darat: 99.2, rotasiAwal: -16, rotasiDarat: 314, rotasiGulir: -172, gulir: -46, goyang: -12, gelap: 0.65 },
  { x: 15, ukuran: 32, durasi: 8.6, jeda: 18.8, darat: 96.7, rotasiAwal: 8, rotasiDarat: 190, rotasiGulir: 98, gulir: 26, goyang: 22, gelap: 1.0 },
  { x: 20, ukuran: 26, durasi: 9.6, jeda: 19.7, darat: 98.3, rotasiAwal: -28, rotasiDarat: 266, rotasiGulir: -130, gulir: -35, goyang: -17, gelap: 0.8 },
  { x: 25, ukuran: 23, durasi: 9.9, jeda: 20.2, darat: 98.9, rotasiAwal: 42, rotasiDarat: 304, rotasiGulir: 166, gulir: 43, goyang: 14, gelap: 0.75 },
  { x: 31, ukuran: 34, durasi: 8.3, jeda: 19.5, darat: 96.3, rotasiAwal: -12, rotasiDarat: 170, rotasiGulir: -86, gulir: -23, goyang: -20, gelap: 1.0 },
  { x: 36, ukuran: 27, durasi: 9.3, jeda: 20.8, darat: 97.9, rotasiAwal: 16, rotasiDarat: 238, rotasiGulir: 128, gulir: 34, goyang: 18, gelap: 0.85 },
  { x: 43, ukuran: 21, durasi: 10.1, jeda: 21.4, darat: 99.1, rotasiAwal: -36, rotasiDarat: 322, rotasiGulir: 180, gulir: 47, goyang: -14, gelap: 0.7 },
  { x: 48, ukuran: 30, durasi: 8.9, jeda: 20.6, darat: 97.2, rotasiAwal: 22, rotasiDarat: 212, rotasiGulir: -114, gulir: -31, goyang: -19, gelap: 0.9 },
  { x: 53, ukuran: 25, durasi: 9.7, jeda: 21.9, darat: 98.5, rotasiAwal: -6, rotasiDarat: 276, rotasiGulir: 144, gulir: 38, goyang: 12, gelap: 0.8 },
  { x: 59, ukuran: 33, durasi: 8.5, jeda: 22.3, darat: 96.6, rotasiAwal: 34, rotasiDarat: 164, rotasiGulir: 90, gulir: 24, goyang: -16, gelap: 0.95 },
  { x: 65, ukuran: 22, durasi: 10.0, jeda: 21.7, darat: 99.0, rotasiAwal: -24, rotasiDarat: 300, rotasiGulir: -160, gulir: -42, goyang: 21, gelap: 0.7 },
  { x: 71, ukuran: 28, durasi: 9.2, jeda: 22.8, darat: 97.6, rotasiAwal: 12, rotasiDarat: 228, rotasiGulir: 118, gulir: 32, goyang: -13, gelap: 0.85 },
  { x: 78, ukuran: 31, durasi: 8.8, jeda: 23.4, darat: 97.0, rotasiAwal: -18, rotasiDarat: 198, rotasiGulir: -108, gulir: -29, goyang: 17, gelap: 0.95 },
  { x: 83, ukuran: 24, durasi: 9.8, jeda: 22.6, darat: 98.7, rotasiAwal: 28, rotasiDarat: 290, rotasiGulir: 156, gulir: 41, goyang: -22, gelap: 0.75 },
  { x: 90, ukuran: 20, durasi: 10.3, jeda: 23.9, darat: 99.3, rotasiAwal: -30, rotasiDarat: 326, rotasiGulir: -176, gulir: -47, goyang: 11, gelap: 0.65 },
  { x: 96, ukuran: 32, durasi: 8.6, jeda: 24.3, darat: 96.5, rotasiAwal: 6, rotasiDarat: 186, rotasiGulir: 104, gulir: 28, goyang: -18, gelap: 1.0 },

  { x: 4, ukuran: 26, durasi: 9.5, jeda: 25.0, darat: 98.1, rotasiAwal: 18, rotasiDarat: 254, rotasiGulir: -134, gulir: -36, goyang: 15, gelap: 0.8 },
  { x: 10, ukuran: 33, durasi: 8.4, jeda: 25.7, darat: 96.4, rotasiAwal: -20, rotasiDarat: 172, rotasiGulir: 94, gulir: 25, goyang: -21, gelap: 1.0 },
  { x: 13, ukuran: 22, durasi: 10.2, jeda: 26.3, darat: 99.0, rotasiAwal: 36, rotasiDarat: 308, rotasiGulir: 162, gulir: 44, goyang: 13, gelap: 0.7 },
  { x: 24, ukuran: 29, durasi: 9.0, jeda: 25.5, darat: 97.5, rotasiAwal: -14, rotasiDarat: 220, rotasiGulir: -120, gulir: -33, goyang: -17, gelap: 0.9 },
  { x: 34, ukuran: 19, durasi: 10.5, jeda: 26.9, darat: 99.4, rotasiAwal: 10, rotasiDarat: 330, rotasiGulir: 186, gulir: 49, goyang: 20, gelap: 0.65 },
  { x: 39, ukuran: 31, durasi: 8.7, jeda: 27.4, darat: 96.9, rotasiAwal: -32, rotasiDarat: 192, rotasiGulir: -102, gulir: -28, goyang: -12, gelap: 0.95 },
  { x: 46, ukuran: 25, durasi: 9.6, jeda: 26.8, darat: 98.4, rotasiAwal: 24, rotasiDarat: 282, rotasiGulir: 146, gulir: 39, goyang: 18, gelap: 0.8 },
  { x: 52, ukuran: 28, durasi: 9.1, jeda: 27.9, darat: 97.8, rotasiAwal: -8, rotasiDarat: 210, rotasiGulir: 112, gulir: 30, goyang: -20, gelap: 0.85 },
  { x: 60, ukuran: 23, durasi: 9.9, jeda: 28.3, darat: 98.9, rotasiAwal: 40, rotasiDarat: 294, rotasiGulir: -158, gulir: -43, goyang: 16, gelap: 0.75 },
  { x: 67, ukuran: 34, durasi: 8.3, jeda: 27.6, darat: 96.2, rotasiAwal: -18, rotasiDarat: 160, rotasiGulir: 84, gulir: 22, goyang: -14, gelap: 1.0 },
  { x: 73, ukuran: 27, durasi: 9.4, jeda: 28.8, darat: 98.0, rotasiAwal: 14, rotasiDarat: 244, rotasiGulir: -126, gulir: -34, goyang: 21, gelap: 0.85 },
  { x: 79, ukuran: 21, durasi: 10.1, jeda: 29.2, darat: 99.2, rotasiAwal: -26, rotasiDarat: 318, rotasiGulir: 172, gulir: 46, goyang: -11, gelap: 0.7 },
  { x: 86, ukuran: 30, durasi: 8.8, jeda: 28.5, darat: 97.1, rotasiAwal: 32, rotasiDarat: 200, rotasiGulir: -110, gulir: -30, goyang: 19, gelap: 0.9 },
  { x: 94, ukuran: 24, durasi: 9.7, jeda: 29.7, darat: 98.6, rotasiAwal: -12, rotasiDarat: 272, rotasiGulir: 140, gulir: 37, goyang: -18, gelap: 0.75 },

  { x: 1, ukuran: 32, durasi: 8.6, jeda: 30.2, darat: 96.7, rotasiAwal: 20, rotasiDarat: 180, rotasiGulir: 100, gulir: 27, goyang: 14, gelap: 0.95 },
  { x: 22, ukuran: 28, durasi: 9.3, jeda: 30.8, darat: 97.9, rotasiAwal: -34, rotasiDarat: 236, rotasiGulir: -124, gulir: -33, goyang: -16, gelap: 0.85 },
  { x: 37, ukuran: 23, durasi: 10.0, jeda: 31.5, darat: 98.8, rotasiAwal: 8, rotasiDarat: 298, rotasiGulir: 154, gulir: 41, goyang: 22, gelap: 0.75 },
  { x: 45, ukuran: 30, durasi: 8.9, jeda: 32.1, darat: 97.3, rotasiAwal: -22, rotasiDarat: 214, rotasiGulir: -116, gulir: -31, goyang: -13, gelap: 0.9 },
  { x: 55, ukuran: 20, durasi: 10.3, jeda: 31.7, darat: 99.3, rotasiAwal: 34, rotasiDarat: 324, rotasiGulir: 178, gulir: 47, goyang: 17, gelap: 0.65 },
  { x: 62, ukuran: 33, durasi: 8.5, jeda: 32.8, darat: 96.5, rotasiAwal: -6, rotasiDarat: 168, rotasiGulir: 88, gulir: 24, goyang: -22, gelap: 1.0 },
  { x: 76, ukuran: 26, durasi: 9.6, jeda: 33.4, darat: 98.2, rotasiAwal: 16, rotasiDarat: 260, rotasiGulir: -136, gulir: -37, goyang: 12, gelap: 0.8 },
  { x: 81, ukuran: 29, durasi: 9.1, jeda: 32.6, darat: 97.7, rotasiAwal: -28, rotasiDarat: 224, rotasiGulir: 118, gulir: 32, goyang: -19, gelap: 0.9 },
  { x: 88, ukuran: 22, durasi: 10.1, jeda: 33.9, darat: 99.1, rotasiAwal: 12, rotasiDarat: 312, rotasiGulir: -166, gulir: -44, goyang: 16, gelap: 0.7 },
  { x: 98, ukuran: 31, durasi: 8.7, jeda: 34.5, darat: 96.9, rotasiAwal: -16, rotasiDarat: 196, rotasiGulir: 106, gulir: 29, goyang: -15, gelap: 0.95 },
];

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
  /** Berapa biji yang dijatuhkan. Maksimal 20. Default 16. */
  jumlah?: number;
  /** Ulangi terus-menerus. Default false, jadi hanya sekali saat halaman dibuka. */
  berulang?: boolean;
};

export default function AnimasiKopi({ jumlah = 30, berulang = false }: Props) {
  const biji = DAFTAR_BIJI.slice(0, Math.min(jumlah, DAFTAR_BIJI.length));

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

        .kopi-turun {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-name: kopi-turun;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }
        .kopi-putar {
          width: 100%;
          height: 100%;
          will-change: transform;
          animation-name: kopi-putar;
          animation-duration: var(--dur);
          animation-delay: var(--jeda);
          animation-fill-mode: both;
          animation-iteration-count: var(--ulang, 1);
        }

        /* ---- Gerak turun ----
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
            /* pantulan pertama, paling tinggi */
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.42), calc(var(--darat) * 1vh - 42px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          26.5% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.68), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.15, 0.75, 0.4, 1);
          }
          29% {
            /* pantulan kedua */
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.82), calc(var(--darat) * 1vh - 16px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          31% {
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.92), calc(var(--darat) * 1vh), 0);
            animation-timing-function: cubic-bezier(0.15, 0.75, 0.4, 1);
          }
          32.5% {
            /* pantulan ketiga, tinggal sisa tenaga */
            transform: translate3d(calc(var(--goyang) + var(--gulir) * 0.97), calc(var(--darat) * 1vh - 5px), 0);
            animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
          }
          34% {
            /* berhenti menggelinding */
            transform: translate3d(calc(var(--goyang) + var(--gulir)), calc(var(--darat) * 1vh), 0);
            animation-timing-function: linear;
          }
          85% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), calc(var(--darat) * 1vh), 0);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55);
          }
          97% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), 145vh, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(calc(var(--goyang) + var(--gulir)), 145vh, 0);
            opacity: 0;
          }
        }

        /* ---- Perputaran ----
           Berjungkir balik selama melayang, lalu terus berputar sementara
           masih menggelinding, dan melambat sampai berhenti. */
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
      `}</style>

      {biji.map((b, i) => (
        <div
          key={i}
          className="kopi-turun"
          style={
            {
              left: `${b.x}%`,
              width: `${b.ukuran * 0.72}px`,
              height: `${b.ukuran}px`,
              marginLeft: `${(-b.ukuran * 0.72) / 2}px`,
              // digeser setengah tinggi, supaya --darat menjadi posisi
              // titik tengah biji (titik putarnya)
              marginTop: `${-b.ukuran / 2}px`,
              "--dur": `${b.durasi}s`,
              "--jeda": `${b.jeda}s`,
              "--darat": b.darat,
              "--goyang": `${b.goyang}px`,
              "--gulir": `${b.gulir}px`,
              "--ulang": berulang ? "infinite" : 1,
            } as React.CSSProperties
          }
        >
          <div
            className="kopi-putar"
            style={
              {
                "--rot-awal": `${b.rotasiAwal}deg`,
                "--rot-darat": `${b.rotasiDarat}deg`,
                "--rot-gulir": `${b.rotasiGulir}deg`,
                "--dur": `${b.durasi}s`,
                "--jeda": `${b.jeda}s`,
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