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
  Clock
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

interface Signature {
  id: string;
  name: string;
  message: string;
  date: string;
  stamp: string;
  likes: number;
}

const INITIAL_SIGNATURES: Signature[] = [
  {
    id: "sig-1",
    name: "Familia Retamoso Palomino",
    message: "¡Que Dios bendiga infinitamente su sagrada unión y a nuestro adorado Max Christian! Los amamos con todo el corazón.",
    date: "Hace un momento",
    stamp: "🕊️",
    likes: 12,
  },
  {
    id: "sig-2",
    name: "Familia Camacho Espinoza",
    message: "Felicidades Melissa y Jhimy en este triple festejo tan especial. Que el amor y la prosperidad colmen su hogar siempre.",
    date: "Hace unos minutos",
    stamp: "💍",
    likes: 9,
  },
  {
    id: "sig-3",
    name: "Padrinos Roger & Yovana",
    message: "Un honor inmenso acompañarlos como padrinos. Cuenten siempre con nosotros en este hermoso camino de vida.",
    date: "Hoy",
    stamp: "✨",
    likes: 15,
  },
];

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

  // Load from localStorage or initial state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("melissa_jhimy_guestbook_signatures");
      if (saved) {
        setSignatures(JSON.parse(saved));
      } else {
        setSignatures(INITIAL_SIGNATURES);
      }
    } catch {
      setSignatures(INITIAL_SIGNATURES);
    }
  }, []);

  const saveSignatures = (newSigs: Signature[]) => {
    setSignatures(newSigs);
    try {
      localStorage.setItem("melissa_jhimy_guestbook_signatures", JSON.stringify(newSigs));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newSignature: Signature = {
      id: "sig-" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: lang === "es" ? "Recién firmado" : "Just signed",
      stamp: selectedStamp,
      likes: 1,
    };

    setTimeout(() => {
      const updated = [newSignature, ...signatures];
      saveSignatures(updated);
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 4000);
    }, 400);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    const updated = signatures.map((sig) => {
      if (sig.id === id) {
        return { ...sig, likes: sig.likes + 1 };
      }
      return sig;
    });
    saveSignatures(updated);
  };

  const sendWishViaWhatsApp = (wishMsg: string, wishAuthor: string) => {
    const text = lang === "es"
      ? `💌 *Deseo para el Libro de Firmas* 💌\n\nDe: *${wishAuthor}*\n\n"${wishMsg}"\n\n¡Muchas felicidades Melissa, Jhimy y Max Christian! 💍✨`
      : `💌 *Guestbook Wish* 💌\n\nFrom: *${wishAuthor}*\n\n"${wishMsg}"\n\nCongratulations Melissa, Jhimy & Max Christian! 💍✨`;
    window.open(`https://wa.me/51966740525?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="libro-firmas" className="relative py-24 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-[#1B365D]">
      {/* Soft Ambient Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative Borders */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Title Block with soft animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/5 border border-[#dfb559]/30 mb-3">
            <Feather className="w-4 h-4 text-[#c5a059]" />
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#1B365D] font-bold">
              {lang === "es" ? "Dedicatorias & Buenos Deseos" : "Wishes & Signatures"}
            </span>
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-7xl text-[#1B365D] mb-3 leading-tight select-none">
            {lang === "es" ? "Libro de Firmas" : "Guestbook"}
          </h2>

          <p className="font-serif text-sm sm:text-base text-[#1B365D]/80 max-w-lg mx-auto leading-relaxed italic">
            {lang === "es"
              ? '"Déjanos tus palabras de cariño, bendición y amor para recordar este día por siempre."'
              : '"Leave us your words of love and blessings to cherish forever."'}
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/60 to-transparent mt-4" />
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
              <h3 className="font-serif text-lg font-bold text-[#1B365D]">
                {lang === "es" ? "Firmar el Libro" : "Sign the Guestbook"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Nombre y Familia" : "Your Name & Family"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "es" ? "Ej. Familia Mendoza Retamoso" : "e.g. The Smith Family"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-sm text-[#1B365D] placeholder:text-gray-400 transition-all font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Dedicatoria o Bendición" : "Your Message or Blessing"}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === "es" ? "Escribe aquí tus deseos más sinceros..." : "Write your warmest wishes here..."}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-sm text-[#1B365D] placeholder:text-gray-400 transition-all font-serif resize-none"
                />
              </div>

              {/* Stamp / Reaction selector */}
              <div>
                <label className="block text-[11px] font-bold text-[#1B365D] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Sello de Bendición" : "Blessing Stamp"}
                </label>
                <div className="flex gap-2">
                  {STAMPS.map((s) => (
                    <button
                      type="button"
                      key={s.emoji}
                      onClick={() => setSelectedStamp(s.emoji)}
                      className={`flex-1 py-1.5 rounded-xl text-base border transition-all cursor-pointer ${
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
                className="w-full py-3 px-4 rounded-xl bg-[#1B365D] hover:bg-[#132742] text-[#dfb559] border border-[#dfb559]/60 font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 mt-2"
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
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="font-serif text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {signatures.length} {lang === "es" ? "Dedicatorias registradas" : "Wishes registered"}
              </span>
              <span className="text-[10px] text-[#1B365D]/60 flex items-center gap-1 font-serif">
                <Clock className="w-3 h-3 text-[#c5a059]" /> {lang === "es" ? "Actualizado en vivo" : "Live updates"}
              </span>
            </div>

            <div className="max-h-[460px] overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
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
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#1B365D]/10 border border-[#dfb559]/40 flex items-center justify-center text-base">
                          {sig.stamp}
                        </span>
                        <div>
                          <h4 className="font-serif font-bold text-[#1B365D] text-sm sm:text-base leading-tight">
                            {sig.name}
                          </h4>
                          <span className="text-[10px] text-[#1B365D]/60 font-sans tracking-wide">
                            {sig.date}
                          </span>
                        </div>
                      </div>

                      {/* WhatsApp Share Button */}
                      <button
                        onClick={() => sendWishViaWhatsApp(sig.message, sig.name)}
                        className="opacity-60 hover:opacity-100 p-1.5 rounded-full hover:bg-emerald-50 text-emerald-600 transition-opacity"
                        title={lang === "es" ? "Reenviar a WhatsApp de los novios" : "Send to WhatsApp"}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Message Body */}
                    <p className="font-serif text-[13px] sm:text-sm text-[#1B365D]/90 italic leading-relaxed pl-10 pr-2">
                      "{sig.message}"
                    </p>

                    {/* Footer / Like Counter */}
                    <div className="mt-3 pt-2 border-t border-[#dfb559]/15 flex items-center justify-end">
                      <button
                        onClick={() => handleLike(sig.id)}
                        className={`flex items-center gap-1.5 text-xs font-serif px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                          likedMap[sig.id]
                            ? "bg-rose-50 text-rose-600 font-bold"
                            : "text-[#1B365D]/70 hover:text-rose-600 hover:bg-rose-50/50"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            likedMap[sig.id] ? "fill-rose-500 text-rose-500 animate-pulse" : ""
                          }`}
                        />
                        <span>{sig.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
