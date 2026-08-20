import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Send, 
  Sparkles, 
  BookOpen, 
  Check, 
  MessageCircle, 
  Feather,
  Clock,
  Download,
  FileText,
  Globe
} from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";
import { db } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  increment, 
  query, 
  orderBy, 
  getDocs, 
  deleteDoc 
} from "firebase/firestore";

interface Signature {
  id: string;
  name: string;
  message: string;
  date: string;
  stamp: string;
  likes: number;
  createdAt?: number;
}

const STORAGE_KEY = "melissa_jhimy_guestbook_signatures_v2";

const STAMPS = [
  { emoji: "❤️", label: "Amor" },
  { emoji: "🕊️", label: "Bendición" },
  { emoji: "💍", label: "Matrimonio" },
  { emoji: "🎂", label: "1er Añito" },
  { emoji: "✨", label: "Felicidad" },
];

export default function GuestBook() {
  const { lang } = useLanguage();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStamp, setSelectedStamp] = useState("❤️");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isConnectedToCloud, setIsConnectedToCloud] = useState(false);

  // Real-time Firestore sync listener across the entire world
  useEffect(() => {
    // 1. Try local cache first for instant UI response
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setSignatures(parsed);
        }
      }
    } catch (e) {
      console.warn("Local storage cache read error", e);
    }

    // 2. Subscribe to Firestore collection in real time
    try {
      const sigsQuery = query(
        collection(db, "guestbook_signatures"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        sigsQuery,
        (snapshot) => {
          setIsConnectedToCloud(true);
          const liveSigs: Signature[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: data.name || "",
              message: data.message || "",
              date: data.date || "",
              stamp: data.stamp || "❤️",
              likes: typeof data.likes === "number" ? data.likes : 1,
              createdAt: data.createdAt || 0,
            };
          });

          setSignatures(liveSigs);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(liveSigs));
          } catch (e) {
            console.warn("Cache write error", e);
          }
        },
        (error) => {
          console.error("Firestore real-time listener error:", error);
          setIsConnectedToCloud(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up Firestore listener:", err);
    }
  }, []);

  const handleClearAll = async () => {
    if (window.confirm(lang === "es" ? "¿Deseas vaciar todas las firmas registradas en la nube para reiniciar la prueba?" : "Do you want to clear all cloud signatures for testing?")) {
      try {
        const sigsCollection = collection(db, "guestbook_signatures");
        const snapshot = await getDocs(sigsCollection);
        const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
        await Promise.all(deletePromises);
        setSignatures([]);
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Error clearing signatures:", e);
        // Fallback local clear
        setSignatures([]);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const handleDownloadTxt = () => {
    if (signatures.length === 0) {
      alert(lang === "es" ? "No hay dedicatorias registradas aún para descargar." : "There are no wishes to download yet.");
      return;
    }

    const title = "========================================================\n" +
                  "           LIBRO DE FIRMAS Y DEDICATORIAS\n" +
                  "      MATRIMONIO: MELISSA & JHIMY\n" +
                  "      BAUTIZO Y 1ER AÑO: MAX CHRISTIAN\n" +
                  "      FECHA DEL EVENTO: Lunes 7 de Setiembre de 2026\n" +
                  "      LUGAR: Abancay, Apurímac - Perú\n" +
                  "========================================================\n\n" +
                  `Total de dedicatorias registradas: ${signatures.length}\n` +
                  `Fecha de descarga: ${new Date().toLocaleString("es-PE")}\n\n` +
                  "========================================================\n" +
                  "                 MENSAJES DE LOS INVITADOS\n" +
                  "========================================================\n\n";

    const content = signatures.map((sig, index) => {
      return `--------------------------------------------------------\n` +
             `#${index + 1} | De: ${sig.name} [${sig.stamp}]\n` +
             `Fecha: ${sig.date}\n` +
             `Me gusta: ${sig.likes} ❤️\n\n` +
             `Dedicatoria:\n` +
             `"${sig.message}"\n`;
    }).join("\n");

    const footer = "\n========================================================\n" +
                   "      ¡Gracias a todos por sus hermosos deseos!\n" +
                   "              Con amor: Melissa, Jhimy & Max\n" +
                   "========================================================\n";

    const fullText = title + content + footer;
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Libro-de-Firmas-Melissa-y-Jhimy-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = lang === "es"
      ? `Hoy ${now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}`
      : `Today ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    const newSignatureData = {
      name: name.trim(),
      message: message.trim(),
      date: formattedDate,
      stamp: selectedStamp,
      likes: 1,
      createdAt: Date.now(),
    };

    try {
      // Save directly to Firebase Firestore for global instant visibility
      await addDoc(collection(db, "guestbook_signatures"), newSignatureData);
    } catch (error) {
      console.error("Error writing to Firestore, saving to local fallback:", error);
      // Fallback local save if offline
      const localSig: Signature = {
        id: "sig-" + Date.now(),
        ...newSignatureData,
      };
      const updated = [localSig, ...signatures];
      setSignatures(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const handleLike = async (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));

    // Optimistic local update
    setSignatures((prev) =>
      prev.map((sig) => (sig.id === id ? { ...sig, likes: sig.likes + 1 } : sig))
    );

    try {
      const docRef = doc(db, "guestbook_signatures", id);
      await updateDoc(docRef, {
        likes: increment(1),
      });
    } catch (e) {
      console.error("Error updating likes on Firestore:", e);
    }
  };

  const sendWishViaWhatsApp = (wishMsg: string, wishAuthor: string) => {
    const text = lang === "es"
      ? `💌 *Deseo para el Libro de Firmas* 💌\n\nDe: *${wishAuthor}*\n\n"${wishMsg}"\n\n¡Muchas felicidades Melissa y Jhimy en su Boda, y a Max Christian en su Bautizo y Primer Añito! 💍🕊️🎂✨`
      : `💌 *Guestbook Wish* 💌\n\nFrom: *${wishAuthor}*\n\n"${wishMsg}"\n\nCongratulations Melissa & Jhimy on your Wedding, and to Max Christian on his Baptism & 1st Birthday! 💍🕊️🎂✨`;
    window.open(`https://wa.me/51966740525?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-[#1B365D] flex flex-col justify-center items-center">
      {/* Floral Frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Soft Ambient Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto">
        {/* Header Title Block with soft animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/5 border border-[#dfb559]/30 mb-3">
            <Feather className="w-4 h-4 text-[#c5a059]" />
            <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-[#1B365D] font-bold">
              {lang === "es" ? "Dedicatorias & Buenos Deseos" : "Wishes & Signatures"}
            </span>
          </div>

          <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] mb-2 leading-tight select-none font-normal">
            {lang === "es" ? "Libro de Firmas" : "Guestbook"}
          </h2>

          <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] max-w-lg mx-auto leading-relaxed italic font-normal px-2">
            {lang === "es"
              ? '"Déjanos tus palabras de cariño, bendición y amor para recordar este día por siempre."'
              : '"Leave us your words of love and blessings to cherish forever."'}
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/60 to-transparent mt-3.5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Signature Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-[#dfb559]/50 p-6 sm:p-7 shadow-[0_10px_30px_rgba(27,54,93,0.06)] relative overflow-hidden"
          >
            {/* Subtle inner corner lines */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#dfb559]/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#dfb559]/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#dfb559]/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#dfb559]/40" />

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B365D]">
                {lang === "es" ? "Firmar el Libro" : "Sign the Guestbook"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12.5px] sm:text-[13.5px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Nombre y Familia" : "Your Name & Family"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "es" ? "Ej. Familia Mendoza Retamoso" : "e.g. The Smith Family"}
                  className="w-full px-4 py-3 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-[15.5px] sm:text-[16px] text-[#1B365D] placeholder:text-gray-400 transition-all font-serif"
                />
              </div>

              <div>
                <label className="block text-[12.5px] sm:text-[13.5px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Dedicatoria o Bendición" : "Your Message or Blessing"}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === "es" ? "Escribe aquí tus deseos más sinceros..." : "Write your warmest wishes here..."}
                  className="w-full px-4 py-3 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-[15.5px] sm:text-[16px] text-[#1B365D] placeholder:text-gray-400 transition-all font-serif resize-none"
                />
              </div>

              {/* Stamp / Reaction selector */}
              <div>
                <label className="block text-[12.5px] sm:text-[13.5px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Sello de Bendición" : "Blessing Stamp"}
                </label>
                <div className="flex gap-2">
                  {STAMPS.map((s) => (
                    <button
                      type="button"
                      key={s.emoji}
                      onClick={() => setSelectedStamp(s.emoji)}
                      className={`flex-1 py-2 rounded-xl text-lg border transition-all cursor-pointer ${
                        selectedStamp === s.emoji
                          ? "border-[#1B365D] bg-[#1B365D] text-white scale-105 shadow-sm"
                          : "border-[#dfb559]/30 bg-[#FAF6F0] hover:bg-white text-gray-700"
                      }`}
                      title={s.label}
                    >
                      {s.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1B365D] hover:bg-[#132742] text-[#dfb559] border border-[#dfb559]/60 font-sans font-bold text-[13px] sm:text-[14.5px] uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : submitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "es" ? "¡Firma Registrada!" : "Signed!"}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === "es" ? "Publicar Dedicatoria" : "Leave Wish"}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT: Wall of Signatures / Scrollable Parchment Wall */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="flex items-center justify-between px-1 mb-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[13px] sm:text-[14.5px] font-bold text-[#c5a059] uppercase tracking-wider">
                  {signatures.length} {lang === "es" ? "Dedicatorias registradas" : "Wishes registered"}
                </span>
                {signatures.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-[11px] text-gray-400 hover:text-rose-600 underline font-sans transition-colors cursor-pointer ml-1"
                    title={lang === "es" ? "Vaciar firmas para prueba" : "Clear for testing"}
                  >
                    {lang === "es" ? "(Limpiar)" : "(Clear)"}
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {signatures.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="px-2.5 py-1 rounded-full bg-[#1B365D] hover:bg-[#132742] text-[#dfb559] border border-[#dfb559]/50 text-[11.5px] sm:text-xs font-serif font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title={lang === "es" ? "Descargar todas las dedicatorias en archivo .txt" : "Download all wishes as .txt file"}
                  >
                    <Download className="w-3 h-3 text-[#dfb559]" />
                    <span>{lang === "es" ? "Descargar .TXT" : "Download .TXT"}</span>
                  </button>
                )}

                <span className="text-[11px] sm:text-[12px] text-[#1B365D]/75 flex items-center gap-1 font-serif">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" /> {lang === "es" ? "En vivo" : "Live"}
                </span>
              </div>
            </div>

            <div className="max-h-[460px] overflow-y-auto pr-1 space-y-3.5 custom-scrollbar min-h-[160px]">
              {signatures.length === 0 ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-white/75 border border-dashed border-[#dfb559]/50 text-center flex flex-col items-center justify-center space-y-2.5 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#1B365D]/5 border border-[#dfb559]/40 text-[#c5a059] flex items-center justify-center mb-1">
                    <Feather className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-[17px] sm:text-[18.5px] text-[#1B365D]">
                    {lang === "es" ? "El libro de firmas está listo" : "The guestbook is ready"}
                  </h4>
                  <p className="font-serif text-[14px] sm:text-[15px] text-[#1B365D]/75 max-w-sm italic leading-relaxed">
                    {lang === "es"
                      ? "Aún no hay dedicatorias. Sé el primero en escribir unas hermosas palabras para Melissa, Jhimy y Max Christian."
                      : "No wishes yet. Be the first to leave your warm words for Melissa, Jhimy & Max Christian."}
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {signatures.map((sig, idx) => (
                    <motion.div
                      key={sig.id}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                      className="p-4 sm:p-5 rounded-2xl bg-white/85 border border-[#dfb559]/40 shadow-xs hover:shadow-md transition-all duration-300 relative group"
                    >
                      {/* Top Row: Author & Stamp */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-full bg-[#1B365D]/10 border border-[#dfb559]/40 flex items-center justify-center text-lg">
                            {sig.stamp}
                          </span>
                          <div>
                            <h4 className="font-serif font-bold text-[#1B365D] text-[16px] sm:text-[17.5px] leading-tight">
                              {sig.name}
                            </h4>
                            <span className="text-[11px] sm:text-[12px] text-[#1B365D]/70 font-sans tracking-wide">
                              {sig.date}
                            </span>
                          </div>
                        </div>

                        {/* WhatsApp Share Button */}
                        <button
                          onClick={() => sendWishViaWhatsApp(sig.message, sig.name)}
                          className="opacity-70 hover:opacity-100 p-2 rounded-full hover:bg-emerald-50 text-emerald-600 transition-opacity"
                          title={lang === "es" ? "Reenviar a WhatsApp de los novios" : "Send to WhatsApp"}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Message Body */}
                      <p className="font-serif text-[15px] sm:text-[16.5px] text-[#1B365D] italic leading-relaxed pl-11 pr-2 font-medium">
                        "{sig.message}"
                      </p>

                      {/* Footer / Like Counter */}
                      <div className="mt-3 pt-2 border-t border-[#dfb559]/15 flex items-center justify-end">
                        <button
                          onClick={() => handleLike(sig.id)}
                          className={`flex items-center gap-1.5 text-xs font-serif px-3 py-1 rounded-full transition-all cursor-pointer ${
                            likedMap[sig.id]
                              ? "bg-rose-50 text-rose-600 font-bold"
                              : "text-[#1B365D]/80 hover:text-rose-600 hover:bg-rose-50/50"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedMap[sig.id] ? "fill-rose-500 text-rose-500 animate-pulse" : ""
                            }`}
                          />
                          <span className="text-[13px] font-bold">{sig.likes}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Bottom Export Bar when there are signatures */}
            {signatures.length > 0 && (
              <div className="p-3 rounded-xl bg-[#1B365D]/5 border border-[#dfb559]/40 flex items-center justify-between flex-wrap gap-2 mt-1">
                <div className="flex items-center gap-2 text-left">
                  <FileText className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  <p className="text-[12px] sm:text-[13px] text-[#1B365D] font-serif">
                    <span className="font-bold">{lang === "es" ? "Guardado seguro:" : "Safe storage:"}</span>{" "}
                    {lang === "es" 
                      ? "Descarga todo el libro en archivo de texto (.txt) como recuerdo." 
                      : "Download all wishes as a text file (.txt) keepsake."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="px-3.5 py-1.5 rounded-lg bg-[#132742] hover:bg-[#1B365D] text-[#dfb559] text-[12px] font-serif font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ml-auto"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfb559]" />
                  <span>{lang === "es" ? "Descargar Archivo .TXT" : "Download .TXT File"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
