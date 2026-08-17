import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export default function DressCode() {
  const { lang, t } = useLanguage();

  return (
    <section id="codigo-vestimenta" className="relative py-28 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-center text-[#1B365D]">
      {/* Background soft ambient radial gold light for a luxurious glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_75%)] pointer-events-none" />

      {/* Decorative upper and lower linear thin borders */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Vector line art Dress and Tie in Navy & Gold */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 text-[#1B365D] hover:scale-105 transition-transform duration-500 ease-out select-none"
        >
          <svg
            viewBox="0 0 120 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-36 h-28 opacity-90 drop-shadow-sm"
          >
            {/* Elegant Dress on the left (centered around X=40) */}
            <path d="M 30 25 L 34 40 L 18 85 H 62 L 46 40 L 50 25" stroke="#1B365D" />
            <path d="M 30 25 Q 40 28, 50 25" stroke="#dfb559" />
            <path d="M 34 40 Q 40 41, 46 40" stroke="#dfb559" />
            <path d="M 34 40 C 32 55, 26 75, 25 85" stroke="#1B365D" />
            <path d="M 40 41 V 85" stroke="#1B365D" />
            <path d="M 46 40 C 48 55, 54 75, 55 85" stroke="#1B365D" />

            {/* Elegant Tie on the right (centered around X=84) */}
            <path d="M 78 25 H 90 L 87 33 H 81 Z" stroke="#dfb559" fill="#dfb559" fillOpacity="0.15" />
            <path d="M 81 33 L 80 72 L 84 78 L 88 72 L 87 33" stroke="#1B365D" />
            <line x1="84" y1="36" x2="84" y2="72" strokeWidth="0.8" stroke="#dfb559" />
          </svg>
        </motion.div>

        {/* Informative Text Block in luxurious layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="w-full text-center flex flex-col items-center"
        >
          {/* Etiquette Tag */}
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-2">
            {t("dress_code.etiquette", "Etiqueta")}
          </span>

          {/* Header Title */}
          <h3 className="font-great-vibes text-5xl sm:text-7xl text-[#1B365D] tracking-wide mb-3 select-none leading-none">
            {t("dress_code.title", "Código de Vestimenta")}
          </h3>

          {/* Subheading */}
          <span className="font-serif text-[13px] sm:text-[15px] text-[#1B365D] font-bold uppercase tracking-[0.2em] text-center max-w-sm px-4 leading-snug">
            {lang === "es" ? "Formal / Elegante" : "Formal / Elegant Attire"}
          </span>

          <div className="w-12 h-[0.5px] bg-[#dfb559]/40 mx-auto mt-5 mb-5" />

          {/* Body description */}
          <div className="space-y-3 font-serif text-[15px] sm:text-[16.5px] text-[#1B365D]/80 font-medium tracking-wide max-w-lg mx-auto leading-relaxed">
            <p>
              {lang === "es" ? "Mujeres: Vestidos largos (Evitar el color blanco / marfil reservado para la novia)." : "Women: Formal long dresses (Please avoid white/ivory reserved for the bride)."}
            </p>
            <p>
              {lang === "es" ? "Hombres: Traje formal elegante / terno." : "Men: Formal suit / elegant attire."}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
