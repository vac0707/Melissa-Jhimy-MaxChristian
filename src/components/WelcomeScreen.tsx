import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

interface WelcomeScreenProps {
  onOpen: () => void;
}

export default function WelcomeScreen({ onOpen }: WelcomeScreenProps) {
  const { lang } = useLanguage();

  const handleEnvelopeClick = () => {
    onOpen();
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-[#F1E9DC] text-[#1B365D] overflow-hidden flex flex-col items-center justify-center font-sans select-none z-50 cursor-pointer"
      onClick={handleEnvelopeClick}
    >
      {/* 1. LUXURIOUS AMBIENT BACKDROP */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,54,93,0.06)_0%,rgba(241,233,220,1)_85%)] leading-none pointer-events-none z-0" />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 bg-transparent pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 80px rgba(27, 54, 93, 0.05)"
        }}
      />

      {/* Luxury double golden-filigree frame border around the screen */}
      <div className="absolute inset-4 sm:inset-6 border border-[#dfb559]/25 pointer-events-none z-20" />
      <div className="absolute inset-5 sm:inset-8 border border-[#dfb559]/10 pointer-events-none z-20" />

      {/* Floating high-end subtle gold micro-particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#dfb559]/40"
            style={{
              top: `${(i * 17 + 10) % 80 + 10}%`,
              left: `${(i * 23 + 15) % 80 + 10}%`,
              width: `${(i % 3) * 1.2 + 2}px`,
              height: `${(i % 3) * 1.2 + 2}px`,
              opacity: 0.5,
              animation: `float-golden-sparks ${8 + (i % 4) * 2}s linear infinite`,
              animationDelay: `${-(i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Top-Right Floral Decoration (rosa.png) */}
      <motion.img
        initial={{ opacity: 0, scale: 0.95, x: 30, y: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png"
        alt="Decoración de rosas arriba derecha"
        className="fixed top-0 right-0 w-[150px] sm:w-[240px] md:w-[320px] h-auto object-contain z-40 pointer-events-none select-none origin-top-right"
        referrerPolicy="no-referrer"
      />

      {/* Bottom-Left Floral Decoration (izquierda_abajo.png) */}
      <motion.img
        initial={{ opacity: 0, scale: 0.95, x: -30, y: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png"
        alt="Decoración de rosas abajo izquierda"
        className="fixed bottom-0 left-0 w-[150px] sm:w-[240px] md:w-[320px] h-auto object-contain z-40 pointer-events-none select-none origin-bottom-left"
        referrerPolicy="no-referrer"
      />

      {/* MAIN CLOSED ENVELOPE CARD */}
      <div className="relative w-full max-w-2xl px-4 flex flex-col items-center justify-center z-30 pointer-events-auto">
        <div className="relative flex flex-col items-center justify-center py-4 w-full [perspective:1400px]">
          
          {/* Dynamic soft shadow */}
          <motion.div
            className="absolute bg-black/15 filter blur-xl rounded-full z-10"
            style={{
              bottom: -15,
              width: "360px",
              height: "28px",
            }}
            animate={{ scale: [1, 0.94, 1], opacity: [0.22, 0.14, 0.22], y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          />

          {/* Closed Envelope */}
          <motion.div
            key="closed-envelope-card"
            className="relative z-20 cursor-pointer w-[340px] sm:w-[440px] md:w-[480px] aspect-[4/3] flex items-center justify-center transition-transform hover:scale-[1.03] active:scale-[0.98]"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -8, 0],
              rotateX: [0, 2.5, 0],
              rotateY: [0, -3.5, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              rotateY: { repeat: Infinity, duration: 5.2, ease: "easeInOut" },
              default: { duration: 1.0 }
            }}
          >
            {/* Real high resolution Closed Envelope */}
            <img
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786934334/CERRADO.png"
              alt="Sobre cerrado de matrimonio"
              className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing seal indicator */}
            <motion.div 
              className="absolute w-20 h-20 rounded-full border-2 border-[#dfb559]/50 bg-amber-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ top: "65%", left: "50%" }}
              animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
            
            {/* "DESCUBRIR" tag */}
            <div 
              className="absolute pointer-events-none flex flex-col items-center justify-center select-none -translate-x-1/2"
              style={{ 
                top: "70%", 
                left: "50%",
              }}
            >
              <span 
                className="font-serif text-[11px] sm:text-[13px] tracking-[0.28em] text-[#553c25] font-extrabold uppercase pointer-events-none select-none px-4 py-1.5 rounded-full bg-[#FAF6F0]/90 shadow-md border border-[#dfb559]/50"
                style={{
                  textShadow: "0.5px 0.5px 0.5px rgba(255, 255, 255, 0.8)",
                }}
              >
                {lang === "es" ? "DESCUBRIR" : "DISCOVER"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styled inline animation for the gold sparks */}
      <style>{`
        @keyframes float-golden-sparks {
          0% {
            transform: translateY(12vh) translateX(0) scale(0.65);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-8vh) translateX(30px) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
