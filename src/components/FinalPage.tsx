import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Share2, Check, Sparkles } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function FinalPage() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Boda & Bautizo: Melissa y Jhimy",
      text: "Te invitamos con mucha alegría a acompañarnos en nuestro matrimonio y bautizo de Max Christian este 7 de setiembre del 2026. ¡Confirma tu asistencia!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Sharing cancelled:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  const designerMsg = lang === "es"
    ? "Hola! Vi el hermoso diseño de la invitación de bodas y me gustaría cotizar una invitación virtual o servicios de diseño gráfico."
    : "Hello! I saw the beautiful wedding invitation design and I would like to quote a virtual invitation or graphic design services.";

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#11223B] text-white overflow-hidden flex flex-col justify-between items-center select-none">
      {/* Floral frame in dark theme */}
      <PageFloralFrame variant="dark" showBottomRight={true} />

      {/* Decorative Gold Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,181,89,0.15)_0%,rgba(17,34,59,1)_80%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto text-center relative z-10 flex flex-col items-center my-auto">
        {/* Family Final Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-[#dfb559] shadow-2xl mb-5 bg-[#132742] group"
        >
          <img
            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787082602/05.jpg"
            alt="Melissa, Jhimy y Max Christian"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#dfb559]/30 rounded-full pointer-events-none" />
        </motion.div>

        {/* Small Official Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-24 sm:w-28 h-auto mb-3 opacity-95 filter drop-shadow-md"
        >
          <img
            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787087671/log.png"
            alt="Logo Melissa & Jhimy"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Heart icon */}
        <Heart className="w-4 h-4 text-[#dfb559] mb-3 animate-pulse" />

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-[15px] sm:text-lg font-light text-[#FAF6F0] tracking-wide max-w-lg mb-3 leading-relaxed italic px-2"
        >
          “Gracias por ser parte de nuestra historia, de nuestro amor y de este nuevo capítulo como familia.”
        </motion.p>

        <p className="text-[#dfb559] text-[11px] sm:text-xs tracking-[0.25em] font-bold uppercase mb-5">
          Melissa & Jhimy • Max Christian — 7 de Setiembre 2026
        </p>

        {/* Share Invitation Button */}
        <div className="mb-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#dfb559]/60 bg-[#1B365D]/90 hover:bg-[#1B365D] text-[10.5px] font-bold text-gray-100 hover:text-white uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
            title="Compartir Invitación"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">{lang === "es" ? "¡Enlace Copiado!" : "Link Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#dfb559]" />
                <span className="font-bold">{lang === "es" ? "Compartir Invitación" : "Share Invitation"}</span>
              </>
            )}
          </button>
        </div>

        {/* Subtle separator */}
        <div className="w-20 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent mb-4" />

        {/* Location subtitle */}
        <p className="text-[9.5px] text-gray-300 uppercase tracking-[0.25em] font-light mb-4">
          Abancay, Perú | Todos los derechos reservados © 2026
        </p>

        {/* Designer Credits */}
        <div className="pt-4 border-t border-[#dfb559]/15 w-full max-w-md flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-1">
            {lang === "es" ? "Invitaciones Virtuales & Diseño Gráfico" : "Virtual Invitations & Graphic Design"}
          </span>
          <p className="font-serif text-xs text-gray-300 tracking-wide font-light mb-3">
            {lang === "es" ? "Creado con amor por " : "Created with love by "}
            <span className="text-white font-medium">VAC Creative</span>
          </p>

          {/* Social Media Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={`https://wa.me/51932350348?text=${encodeURIComponent(designerMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] text-[9.5px] font-bold uppercase tracking-wider transition-all"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.tiktok.com/@vaccreative?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-300 text-[9.5px] font-bold uppercase tracking-wider transition-all"
            >
              <span>TikTok</span>
            </a>

            <a
              href="https://www.facebook.com/VAC.Creativ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 text-[#1877F2] text-[9.5px] font-bold uppercase tracking-wider transition-all"
            >
              <span>Facebook</span>
            </a>

            <a
              href="https://www.youtube.com/@VACCreative"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000]/20 text-[#FF0000] text-[9.5px] font-bold uppercase tracking-wider transition-all"
            >
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
