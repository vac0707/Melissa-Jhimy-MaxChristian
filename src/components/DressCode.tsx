import { motion } from "motion/react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function DressCode() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-center text-[#1B365D] flex flex-col justify-center items-center">
      {/* Floral corners frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Background soft ambient radial gold light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
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
            className="w-32 h-24 sm:w-40 sm:h-30 opacity-90 drop-shadow-sm"
          >
            {/* Elegant Dress on the left */}
            <path d="M 30 25 L 34 40 L 18 85 H 62 L 46 40 L 50 25" stroke="#1B365D" />
            <path d="M 30 25 Q 40 28, 50 25" stroke="#dfb559" />
            <path d="M 34 40 Q 40 41, 46 40" stroke="#dfb559" />
            <path d="M 34 40 C 32 55, 26 75, 25 85" stroke="#1B365D" />
            <path d="M 40 41 V 85" stroke="#1B365D" />
            <path d="M 46 40 C 48 55, 54 75, 55 85" stroke="#1B365D" />

            {/* Elegant Tie on the right */}
            <path d="M 78 25 H 90 L 87 33 H 81 Z" stroke="#dfb559" fill="#dfb559" fillOpacity="0.15" />
            <path d="M 81 33 L 80 72 L 84 78 L 88 72 L 87 33" stroke="#1B365D" />
            <line x1="84" y1="36" x2="84" y2="72" strokeWidth="0.8" stroke="#dfb559" />
          </svg>
        </motion.div>

        {/* Informative Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="w-full text-center flex flex-col items-center"
        >
          {/* Etiquette Tag */}
          <span className="font-sans text-[12px] sm:text-[13.5px] uppercase tracking-[0.25em] text-[#c5a059] font-bold mb-1.5">
            {t("dress_code.etiquette", "Etiqueta")}
          </span>

          {/* Header Title */}
          <h3 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] tracking-wide mb-2 select-none leading-[1.1] font-normal">
            {t("dress_code.title", "Código de Vestimenta")}
          </h3>

          {/* Subheading */}
          <span className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-bold uppercase tracking-[0.2em] text-center max-w-sm px-4 leading-snug">
            {lang === "es" ? "Formal / Elegante" : "Formal / Elegant Attire"}
          </span>

          <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mx-auto mt-3.5 mb-4" />

          {/* Body description card - Enlarged font for easy reading */}
          <div className="bg-white/95 border border-[#dfb559]/35 rounded-2xl p-5 sm:p-7 max-w-md w-full shadow-sm space-y-3.5 font-serif text-[16.5px] sm:text-[18px] text-[#1B365D] font-medium tracking-wide leading-relaxed">
            <p>
              {lang === "es" ? "Mujeres: Vestidos largos (Evitar el color blanco / marfil reservado para la novia)." : "Women: Formal long dresses (Please avoid white/ivory reserved for the bride)."}
            </p>
            <div className="w-full h-[0.5px] bg-[#dfb559]/25" />
            <p>
              {lang === "es" ? "Hombres: Traje formal elegante / terno." : "Men: Formal suit / elegant attire."}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
