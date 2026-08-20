// src/components/BotChat.tsx
// Widget chat AI mengambang di pojok kanan bawah.
// Dipakai di semua halaman, tiap halaman mengirim systemPrompt sendiri
// supaya jawabannya nyambung dengan konteks halaman yang sedang dibuka.
//
// Pakai:
//   <BotChat
//     systemPrompt="Kamu asisten ..."
//     sapaan="Halo! Mau tanya apa soal biting?"
//     saran={["Berapa harga per kg?", "Ukurannya apa saja?"]}
//   />
//
// Catatan:
// - Endpoint tidak streaming, jadi balasan muncul sekaligus setelah selesai.
// - Riwayat dipangkas otomatis (endpoint batasi 20 pesan / 15.000 karakter).
// - Riwayat tidak disimpan; refresh halaman = obrolan mulai dari awal.
// - Butuh: npm i motion lucide-react

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Leaf, MessageCircleMore, SendHorizontal, Sprout, X } from "lucide-react";

const ENDPOINT = "https://radya.my.id/api/chat/groq";

/* Endpoint membatasi 20 pesan & 15.000 karakter.
   Ambil aman di bawahnya supaya tidak pernah kena tolak. */
const MAKS_PESAN_DIKIRIM = 16;
const MAKS_KARAKTER = 12_000;
const MAKS_PANJANG_INPUT = 500;

type Peran = "user" | "model";

type Pesan = {
  id: string;
  role: Peran;
  text: string;
};

type Props = {
  /** Konteks halaman untuk AI. Wajib, dan beda-beda tiap halaman. */
  systemPrompt: string;
  /** Sapaan pembuka dari bot sebelum pengguna mengetik apa pun */
  sapaan?: string;
  /** Pertanyaan siap klik, biar pengguna tidak perlu mengetik */
  saran?: string[];
  /** Judul di kepala panel */
  judul?: string;
  /** Label yang muncul di samping tombol saat disorot */
  labelTombol?: string;
};

const idBaru = () => Math.random().toString(36).slice(2, 10);

/* Pangkas riwayat dari pesan terbaru ke belakang sampai muat
   dalam batas endpoint. */
function siapkanRiwayat(pesan: Pesan[]) {
  const potong = pesan.slice(-MAKS_PESAN_DIKIRIM);
  const hasil: { role: Peran; text: string }[] = [];
  let total = 0;

  for (let i = potong.length - 1; i >= 0; i--) {
    total += potong[i].text.length;
    if (total > MAKS_KARAKTER) break;
    hasil.unshift({ role: potong[i].role, text: potong[i].text });
  }

  return hasil;
}

export default function BotChat({
  systemPrompt,
  sapaan = "Halo! Ada yang mau ditanyakan soal Desa Balesari?",
  saran = [],
  judul = "Tanya Balesari",
  labelTombol = "Tanya soal desa",
}: Props) {
  const [terbuka, setTerbuka] = useState(false);
  const [pesan, setPesan] = useState<Pesan[]>([]);
  const [input, setInput] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);

  const kurangiGerakan = useReducedMotion();
  const akhirRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const batalRef = useRef<AbortController | null>(null);

  /* Gulir ke pesan terbaru */
  useEffect(() => {
    akhirRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [pesan, memuat]);

  /* Fokus ke kolom ketik saat panel dibuka */
  useEffect(() => {
    if (terbuka) inputRef.current?.focus();
  }, [terbuka]);

  /* Tutup dengan tombol Escape */
  useEffect(() => {
    if (!terbuka) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerbuka(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terbuka]);

  /* Batalkan permintaan yang masih jalan saat komponen dilepas */
  useEffect(() => () => batalRef.current?.abort(), []);

  async function kirim(teks: string) {
    const isi = teks.trim();
    if (!isi || memuat) return;

    const pesanUser: Pesan = { id: idBaru(), role: "user", text: isi };
    const riwayatBaru = [...pesan, pesanUser];

    setPesan(riwayatBaru);
    setInput("");
    setGalat(null);
    setMemuat(true);

    batalRef.current?.abort();
    const controller = new AbortController();
    batalRef.current = controller;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: siapkanRiwayat(riwayatBaru),
          systemPrompt: `
            Kamu asisten ramah website Potensi Balesari, profil 
            jawab dengan excited dan bersahabat (ga perlu pake format bold/italic/underline/list readme dan semacamnya, pure teks aja)
            UMKM Dusun Segelan, Desa Balesari, Kecamatan Ngajum, Kabupaten Malang, di lereng timur Gunung Kawi. 
            Desa ini punya tiga potensi utama: biting bambu (lidi untuk tusuk pentol, sempol, sate, dan rangka dupa), kopi, serta olahan batok kelapa. 
            Pengunjung sedang membuka halaman utama. 
            Jawab singkat tapi excited dalam bahasa Indonesia yang santai dan sopan, maksimal 3 kalimat. 
            Jika ditanya harga, arahkan menghubungi WhatsApp karena harga berubah-ubah. 
            Jika ditanya di luar topik desa, tolak dengan halus dan kembalikan ke topik desa. 
            For fun:
            Kalau user menanyakan tentang Radya/Iwan/Ridwan, jawab dia adalah salah satu mahasiswa kkn yang mengembangkan website yang keren ini
            Kalau user menanyakan tentang 
            Heri, jawab "CEO BITING BAMBU" dengan excited dan kaget
            (Anam, fathan, Nana/Hasna, Bila), jawab dia adalah Divisi Keamanan dan Kesehatan
            (Alda, ama) jawab dia adalah Program dan Pengabdian
            (Najwa, Nadin/Nadine) jawab dia adalah sekretaris yang bekerja keras
            (Dhiji/diji, tasya) jawab dia adalah bendahara yang bekerja keras
            (Ocid, Hilda, Yunita, iyass/iyas) jawab dia adalah Keagamaan dan Kemasyarakatan lalu jawab Sholatlah sebelum disholati, keagamaan selalu di hati
            (Mia, Silfia/Silvia, Sultan, Nafis, Estwo/estu/s.two) jawab dia adalah PDD spesial yang sangat bekerja keras dan ucapkan terima kasih atas dedikasinya di kkn ini dan puji dia
            (Wildan, Aul, Firda, Zahra, Chelsea) jawab dia adalah HUMAS terus jawab ga iri ga panas HUMAASS
            Kopong, jawab dia adalah wakil koordinator desa (Wakordes)
            Elga, jawab dia adalah Koordinator Desa (Kordes)
            Intinya apresiasi sebesar besarnya dan berikan pujian
          `,
        }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setGalat("Terlalu banyak pertanyaan beruntun. Coba lagi sebentar lagi ya.");
        return;
      }

      if (!res.ok) {
        setGalat("Maaf, asistennya sedang bermasalah. Coba beberapa saat lagi.");
        return;
      }

      const data = await res.json();
      const jawaban = (data?.text ?? "").trim();

      if (!jawaban) {
        setGalat("Balasannya kosong. Coba tanya dengan kalimat lain.");
        return;
      }

      setPesan((sebelumnya) => [
        ...sebelumnya,
        { id: idBaru(), role: "model", text: jawaban },
      ]);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setGalat("Gagal terhubung. Periksa koneksi internetmu, lalu coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  const belumAdaObrolan = pesan.length === 0;

  /* Transisi pegas: terasa hidup, tapi tetap singkat */
  const pegas = kurangiGerakan
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.8 };

  return (
    <>
      {/* ---------- Tombol mengambang ---------- */}
      <div className="fixed right-5 bottom-5 z-[60] sm:right-7 sm:bottom-7">
        {/* cincin denyut, menarik perhatian tanpa berisik */}
        {!terbuka && !kurangiGerakan && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#4E7248]"
            animate={{ scale: [1, 1.35, 1.35], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.button
          type="button"
          onClick={() => setTerbuka((v) => !v)}
          aria-expanded={terbuka}
          aria-controls="panel-botchat"
          aria-label={terbuka ? "Tutup obrolan" : `${labelTombol}, buka obrolan`}
          whileHover={kurangiGerakan ? undefined : { scale: 1.06 }}
          whileTap={kurangiGerakan ? undefined : { scale: 0.94 }}
          transition={pegas}
          className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#4E7248] to-[#22331F] text-[#F3EDE0] shadow-[0_10px_30px_-6px_rgba(34,51,31,0.6)] ring-2 ring-[#F3EDE0]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E4230]"
        >
          {/* daun samar sebagai tekstur tombol */}
          <Leaf aria-hidden="true" strokeWidth={1.5} className="pointer-events-none absolute -right-2 -bottom-2 h-9 w-9 rotate-12 text-[#9DBE85]/30" />
          <Leaf aria-hidden="true" strokeWidth={1.5} className="pointer-events-none absolute -top-2 -left-2 h-7 w-7 -rotate-[150deg] text-[#9DBE85]/20" />

          <AnimatePresence mode="wait" initial={false}>
            {terbuka ? (
              <motion.span
                key="tutup"
                className="relative flex"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: kurangiGerakan ? 0 : 0.18 }}
              >
                <X aria-hidden="true" className="h-6 w-6" strokeWidth={2.2} />
              </motion.span>
            ) : (
              <motion.span
                key="buka"
                className="relative flex"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: kurangiGerakan ? 0 : 0.18 }}
              >
                <MessageCircleMore aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* label muncul saat tombol disorot (layar lebar saja) */}
        {!terbuka && (
          <span className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] hidden -translate-y-1/2 rounded-full bg-[#2E4230] px-3.5 py-2 text-xs font-medium whitespace-nowrap text-[#F3EDE0] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
            {labelTombol}
          </span>
        )}
      </div>

      {/* ---------- Panel obrolan ---------- */}
      <AnimatePresence>
        {terbuka && (
          <motion.div
            id="panel-botchat"
            role="dialog"
            aria-modal="false"
            aria-label={judul}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={pegas}
            style={{ transformOrigin: "bottom right" }}
            className="fixed right-3 bottom-26 z-[60] flex max-h-[min(680px,calc(100dvh-9rem))] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-3xl border border-[#3A2E22]/15 bg-[#F8F4EA] shadow-[0_24px_60px_-12px_rgba(34,51,31,0.5)] sm:right-7 sm:bottom-28 sm:w-[420px]"
          >
            {/* kepala */}
            <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-[#2E4230] to-[#22331F] px-5 py-4 text-[#F3EDE0]">
              <Leaf aria-hidden="true" strokeWidth={1.5} className="pointer-events-none absolute -top-3 right-6 h-14 w-14 rotate-[24deg] text-[#9DBE85]/15" />

              <span aria-hidden="true" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4E7248] ring-2 ring-[#9DBE85]/40">
                <Sprout className="h-5 w-5 text-[#F3EDE0]" strokeWidth={1.8} />
              </span>

              <div className="relative min-w-0">
                <p className="font-display truncate text-[15px] font-semibold">{judul}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-[#F3EDE0]/70">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9DBE85]" />
                  Asisten otomatis
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTerbuka(false)}
                aria-label="Tutup obrolan"
                className="relative ml-auto rounded-full p-1.5 transition hover:bg-[#F3EDE0]/15"
              >
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
              </button>
            </div>

            {/* daftar pesan */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {/* sapaan pembuka */}
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#EAE1CD] px-4 py-2.5 text-sm leading-relaxed text-[#3A2E22]">
                {sapaan}
              </div>

              <AnimatePresence initial={false}>
                {pesan.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: kurangiGerakan ? 0 : 0.26 }}
                    className={
                      p.role === "user"
                        ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#2E4230] px-4 py-2.5 text-sm leading-relaxed text-[#F3EDE0]"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm bg-[#EAE1CD] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-[#3A2E22]"
                    }
                  >
                    {p.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {memuat && (
                <div className="flex max-w-[85%] gap-1.5 rounded-2xl rounded-tl-sm bg-[#EAE1CD] px-4 py-3.5">
                  <span className="sr-only">Sedang mengetik</span>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#7A5C3E]/60"
                      animate={kurangiGerakan ? undefined : { y: [0, -5, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {galat && (
                <p role="alert" className="rounded-2xl bg-[#C2410C]/10 px-4 py-2.5 text-sm text-[#9A3412]">
                  {galat}
                </p>
              )}

              <div ref={akhirRef} />
            </div>

            {/* pertanyaan siap klik */}
            <AnimatePresence>
              {saran.length > 0 && belumAdaObrolan && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: kurangiGerakan ? 0 : 0.24 }}
                  className="overflow-hidden border-t border-[#3A2E22]/10 bg-[#F3EDE0]/60"
                >
                  <div className="px-4 py-3">
                    <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7A5C3E]">
                      Pertanyaan cepat
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {saran.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onClick={() => kirim(s)}
                            disabled={memuat}
                            className="rounded-full border border-[#4E7248]/30 bg-[#4E7248]/10 px-3 py-1.5 text-xs font-medium text-[#2E4230] transition hover:-translate-y-0.5 hover:bg-[#4E7248]/20 disabled:opacity-50 motion-reduce:hover:translate-y-0"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* kolom ketik */}
            <div className="flex items-end gap-2 border-t border-[#3A2E22]/10 bg-[#F3EDE0] px-3 py-3">
              <label htmlFor="input-botchat" className="sr-only">
                Tulis pertanyaan
              </label>
              <textarea
                id="input-botchat"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAKS_PANJANG_INPUT}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    kirim(input);
                  }
                }}
                placeholder="Tulis pertanyaan..."
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-[#3A2E22]/15 bg-[#F8F4EA] px-4 py-3 text-sm text-[#3A2E22] placeholder:text-[#7A5C3E]/60 focus:border-[#4E7248] focus:outline-none"
              />
              <motion.button
                type="button"
                onClick={() => kirim(input)}
                disabled={memuat || !input.trim()}
                aria-label="Kirim pertanyaan"
                whileTap={kurangiGerakan ? undefined : { scale: 0.9 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4E7248] to-[#2E4230] text-[#F3EDE0] shadow-md transition disabled:opacity-40 disabled:shadow-none"
              >
                <SendHorizontal aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}