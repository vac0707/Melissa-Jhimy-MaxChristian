import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Sparkles } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import EmbeddedPlayer from "./EmbeddedPlayer";

interface HeroProps {
  onNextPage?: () => void;
}

export default function Hero({ onNextPage }: HeroProps) {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="inicio"
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-between py-6 sm:py-10 px-3 sm:px-6 bg-[#132742] overflow-hidden select-none"
      style={{ perspective: "2000px" }}
    >
      {/* Ambient background glow on deep midnight navy */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* Floating subtle gold dust particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-[15%] left-[8%] w-1.5 h-1.5 bg-[#dfb559]/70 rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-2 h-2 bg-[#dfb559]/50 rounded-full animate-pulse" style={{ animationDuration: "3.5s" }} />
        <div className="absolute top-[45%] right-[15%] w-1 h-1 bg-[#dfb559]/60 rounded-full animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute bottom-[40%] left-[12%] w-1.5 h-1.5 bg-[#dfb559]/50 rounded-full animate-pulse" style={{ animationDuration: "4s" }} />
      </div>

      {/* MAIN INVITATION CARD CONTAINER WITH FIXED ASPECT RATIO (1086 / 1448) */}
      <div className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-[1086/1448] bg-[#FAF6F0] rounded-[6px] border border-[#dfb559]/70 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden z-10 my-auto">
        {/* FULL HIGH-RESOLUTION BOTANICAL & FAMILY BACKGROUND (pirt.png) */}
        <img
          src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786988478/pirt.png"
          alt="Invitación de Boda Melissa y Jhimy"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 select-none"
          referrerPolicy="no-referrer"
        />

        {/* 1. TOP-RIGHT FLORAL ACCENT (rosa.png) */}
        <img
          src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png"
          alt="Decoración floral superior derecha"
          className="absolute top-0 right-0 w-[40%] sm:w-[38%] max-w-[210px] pointer-events-none z-[5] select-none object-contain"
          referrerPolicy="no-referrer"
        />

        {/* 2. BOTTOM-LEFT FLORAL ACCENT (izquierda_abajo.png) */}
        <img
          src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png"
          alt="Decoración floral inferior izquierda"
          className="absolute bottom-0 left-0 w-[48%] sm:w-[46%] max-w-[245px] pointer-events-none z-[5] select-none object-contain"
          referrerPolicy="no-referrer"
        />

        {/* 3. BOTTOM-RIGHT FLORAL ACCENT (derecha_abajo.png) */}
        <img
          src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990915/derecha_abajo.png"
          alt="Decoración floral inferior derecha"
          className="absolute bottom-0 right-0 w-[46%] sm:w-[44%] max-w-[235px] pointer-events-none z-[5] select-none object-contain"
          referrerPolicy="no-referrer"
        />

        {/* TOP-RIGHT INVITATION TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute top-[14%] sm:top-[15%] right-[2.5%] sm:right-[3.5%] w-[39%] sm:w-[37%] max-w-[190px] flex flex-col items-center text-center z-10 select-none"
        >
          <span className="font-serif text-[10px] sm:text-[11.5px] md:text-[12.5px] tracking-[0.2em] text-[#112542] uppercase font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            {lang === "es" ? "CON INMENSA" : "WITH IMMENSE"}
          </span>

          {/* Flourished cursive script */}
          <div className="relative my-0 sm:my-0.5">
            <span className="font-great-vibes text-[38px] sm:text-5xl md:text-6xl text-[#112542] leading-none block select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
              {lang === "es" ? "alegría" : "joy"}
            </span>
            <div className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-[#dfb559] to-transparent mt-0.5 mx-auto" />
          </div>

          <p className="font-serif text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.14em] text-[#112542] uppercase leading-[1.35] sm:leading-[1.45] font-bold mt-1 sm:mt-1.5 px-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
            {lang === "es"
              ? "TE INVITAMOS A COMPARTIR EL DÍA MÁS IMPORTANTE DE NUESTRA FAMILIA"
              : "WE INVITE YOU TO SHARE THE MOST IMPORTANT DAY OF OUR FAMILY"}
          </p>

          <div className="mt-1 sm:mt-1.5 text-[#c5a059] text-[10px] sm:text-xs">
            ♥
          </div>
        </motion.div>

        {/* LOWER SECTION: BRIDE & GROOM NAMES + SON */}
        <div className="absolute top-[49%] sm:top-[50%] inset-x-0 flex flex-col items-center text-center px-4 z-10 select-none">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap"
          >
            <h1 className="font-great-vibes text-[38px] sm:text-[54px] md:text-[62px] text-[#1B365D] leading-tight select-none tracking-tight">
              Melissa <span className="text-[#c5a059] font-normal text-3xl sm:text-4xl">&</span> Jhimy
            </h1>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1B365D" 
              strokeWidth="1.6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 sm:w-7 sm:h-7 text-[#1B365D] inline-block -rotate-12 mb-1.5 sm:mb-3"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.div>

          <div className="text-[#c5a059] text-[9px] sm:text-xs -mt-1 mb-1">
            ♥
          </div>

          <span className="font-serif text-[9px] sm:text-[11px] md:text-[12px] tracking-[0.25em] text-[#1B365D] uppercase font-bold block mb-0.5">
            {lang === "es" ? "JUNTO A NUESTRO HIJO" : "TOGETHER WITH OUR SON"}
          </span>

          <h2 className="font-serif text-[22px] sm:text-[30px] md:text-[36px] text-[#c5a059] font-bold tracking-[0.16em] uppercase select-none drop-shadow-[0_1px_2px_rgba(223,181,89,0.2)]">
            MAX CHRISTIAN
          </h2>

          {/* ORNAMENTAL DIVIDER */}
          <div className="w-[75%] sm:w-[70%] flex items-center justify-center gap-2 my-1.5 sm:my-2.5">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#dfb559]/70 to-[#dfb559]" />
            <div className="flex items-center gap-1 text-[#dfb559]">
              <span className="text-[8px] sm:text-[10px]">♦</span>
              <span className="text-xs sm:text-sm font-serif">❧</span>
              <span className="text-[8px] sm:text-[10px]">♦</span>
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-[#dfb559]/70 to-[#dfb559]" />
          </div>

          {/* THREE PILLARS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="w-full max-w-md grid grid-cols-3 gap-1 sm:gap-2 text-center mt-1"
          >
            {/* PILLAR 1 */}
            <div className="flex flex-col items-center px-0.5 sm:px-1">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center mb-0.5 sm:mb-1">
                <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 text-[#c5a059]">
                  <circle cx="26" cy="36" r="14" stroke="#dfb559" strokeWidth="2.4" />
                  <circle cx="26" cy="36" r="11" stroke="#dfb559" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                  <circle cx="38" cy="36" r="14" stroke="#c5a059" strokeWidth="2.4" />
                  <circle cx="38" cy="36" r="11" stroke="#c5a059" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                  <path 
                    d="M32 20 C32 20 28 15 28 12 C28 9.5 30 7.5 32 9.5 C34 7.5 36 9.5 36 12 C36 15 32 20 32 20 Z" 
                    fill="#dfb559" 
                  />
                </svg>
              </div>
              <span className="font-serif text-[8px] sm:text-[10px] md:text-[11px] font-bold text-[#1B365D] uppercase tracking-[0.12em] leading-tight">
                {lang === "es" ? "NUESTRO MATRIMONIO" : "OUR WEDDING"}
              </span>
            </div>

            {/* PILLAR 2 */}
            <div className="flex flex-col items-center px-0.5 sm:px-1 border-l border-r border-[#dfb559]/35">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center mb-0.5 sm:mb-1">
                <svg viewBox="0 0 64 64" fill="none" stroke="#dfb559" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
                  <path d="M44 26 C46 22 50 20 54 21 C52 24 50 26 50 29 C50 33 46 36 41 37 C36 38 31 43 27 48 C25 45 23 41 21 38 C17 38 12 37 9 35 C14 33 19 32 24 33 C26 27 30 19 37 14 C39 18 39 23 37 28 Z" fill="#dfb559" fillOpacity="0.1" />
                  <path d="M54 21 Q58 17 61 17 Q58 21 54 21 Z" fill="#dfb559" />
                  <circle cx="48" cy="24" r="1.2" fill="#1B365D" />
                </svg>
              </div>
              <span className="font-serif text-[8px] sm:text-[10px] md:text-[11px] font-bold text-[#1B365D] uppercase tracking-[0.12em] leading-tight">
                {lang === "es" ? "EL BAUTIZO DE NUESTRO HIJO" : "OUR SON'S BAPTISM"}
              </span>
            </div>

            {/* PILLAR 3 */}
            <div className="flex flex-col items-center px-0.5 sm:px-1">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center mb-0.5 sm:mb-1">
                <svg viewBox="0 0 64 64" fill="none" stroke="#dfb559" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
                  <rect x="14" y="40" width="36" height="15" rx="2" fill="#dfb559" fillOpacity="0.1" />
                  <path d="M14 45 C20 48, 26 42, 32 45 C38 48, 44 42, 50 45" strokeWidth="1.5" />
                  <rect x="20" y="26" width="24" height="14" rx="2" fill="#dfb559" fillOpacity="0.15" />
                  <path d="M20 31 C24 33, 28 29, 32 31 C36 33, 40 29, 44 31" strokeWidth="1.5" />
                  <line x1="32" y1="26" x2="32" y2="18" strokeWidth="2" stroke="#1B365D" />
                  <path d="M32 18 C30.5 15, 30.5 12, 32 9 C33.5 12, 33.5 15, 32 18 Z" fill="#dfb559" stroke="#c5a059" strokeWidth="1" />
                </svg>
              </div>
              <span className="font-serif text-[8px] sm:text-[10px] md:text-[11px] font-bold text-[#1B365D] uppercase tracking-[0.12em] leading-tight">
                {lang === "es" ? "SU PRIMER CUMPLEAÑOS" : "HIS FIRST BIRTHDAY"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Realistic paper corner curl hint in bottom right */}
        {onNextPage && (
          <div 
            onClick={onNextPage}
            className="absolute bottom-0 right-0 w-12 h-12 z-20 cursor-pointer overflow-hidden group"
            title={lang === "es" ? "Pasar página" : "Turn page"}
          >
            <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-b-[32px] border-l-[32px] border-b-[#dfb559]/40 border-l-transparent group-hover:border-b-[#dfb559] group-hover:border-b-[42px] group-hover:border-l-[42px] transition-all duration-300 shadow-md" />
          </div>
        )}
      </div>

      {/* DATE TAG, EMBEDDED PLAYER & INTERACTIVE 3D PAGE TURN BUTTON */}
      <div className="w-full max-w-[460px] sm:max-w-[520px] flex flex-col items-center mt-3 sm:mt-4 z-20">
        <div className="border-t border-b border-[#dfb559]/40 py-2 px-6 sm:px-10 font-sans font-bold tracking-[0.22em] text-[#FAF6F0] text-[10.5px] sm:text-xs uppercase bg-[#1B365D]/60 backdrop-blur-sm shadow-md rounded-xs">
          LUNES • 7 SETIEMBRE • 2026 • ABANCAY
        </div>

        {/* Embedded Ambient Player */}
        <div className="mt-2.5 w-full flex justify-center">
          <EmbeddedPlayer />
        </div>

        {/* 📖 PROMINENT 3D PAGE TURN ACTION BUTTON */}
        {onNextPage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-3 flex flex-col items-center w-full"
          >
            <button
              onClick={onNextPage}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#dfb559] to-[#c5a059] text-[#132742] font-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_25px_rgba(223,181,89,0.45)] hover:shadow-[0_15px_35px_rgba(223,181,89,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer border border-[#FFF8E7]/50"
            >
              {/* Pulsing ring indicator */}
              <span className="absolute -inset-1 rounded-full border border-[#dfb559]/60 animate-ping pointer-events-none opacity-60" />

              <BookOpen className="w-4 h-4 text-[#132742] animate-pulse" />
              <span>{lang === "es" ? "Pasar Página • Ver Invitación" : "Turn Page • View Invitation"}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#132742]" />
            </button>

            {/* Elegant sub-hint */}
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#FAF6F0]/70 font-semibold mt-2 flex items-center gap-1">
              {lang === "es" ? "Toca para abrir el interior de la invitación" : "Tap to open invitation details"}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
