import { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";

interface LogoIntroProps {
  onComplete: () => void;
}

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  // Automatically transition after 3.8 seconds if user doesn't tap
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 w-full h-full bg-[#132742] text-[#FAF6F0] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden z-50"
    >
      {/* Background radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,181,89,0.18)_0%,rgba(19,39,66,1)_70%)] pointer-events-none" />

      {/* Luxury floral corners */}
      <PageFloralFrame variant="dark" showBottomRight={true} />

      {/* Center content container */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center justify-center text-center">
        {/* Subtle gold halo behind logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.85, 1.15, 1], opacity: [0.3, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#dfb559]/20 blur-3xl pointer-events-none"
        />

        {/* The Official Logo / Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[280px] sm:max-w-[340px] w-full aspect-square flex items-center justify-center filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        >
          <img
            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787091649/LOGP_PF.png"
            alt="Sello Oficial Melissa, Jhimy & Max Christian"
            className="w-full h-full object-contain pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Delicate golden divider and tap hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/60 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0]/10 border border-[#dfb559]/30 text-[#dfb559] text-[10px] sm:text-xs font-serif tracking-[0.25em] uppercase shadow-sm">
            <Sparkles className="w-3 h-3 text-[#dfb559] animate-pulse" />
            <span>Toca para abrir la invitación</span>
            <ArrowRight className="w-3 h-3 text-[#dfb559]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
