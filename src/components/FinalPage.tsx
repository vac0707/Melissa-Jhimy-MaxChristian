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
    <section className="relative min-h-[100svh] w-full py-10 sm:py-14 px-3 sm:px-6 bg-[#11223B] text-white overflow-hidden flex flex-col justify-between items-center select-none">
      {/* Floral frame in dark theme */}
      <PageFloralFrame variant="dark" showBottomRight={true} />

      {/* Decorative Gold Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,181,89,0.15)_0%,rgba(17,34,59,1)_80%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto text-center relative z-10 flex flex-col items-center my-auto">
        {/* Family Final Photo - Large, Uncropped Full View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl mb-5 bg-[#0a1523] group"
        >
          {/* Ambient blurred backdrop behind photo for seamless display */}
          <img
            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787082602/05.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-30 pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Full uncropped high-resolution photo */}
          <img
            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787082602/05.jpg"
            alt="Melissa, Jhimy y Max Christian"
            className="relative z-[1] w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl pointer-events-none z-[2]" />
        </motion.div>

        {/* Official Logo with high-contrast IVORY background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <div className="px-5 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#dfb559]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)] inline-flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1787091649/LOGP_PF.png"
              alt="Logo Melissa & Jhimy"
              className="w-24 sm:w-28 h-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Heart icon */}
        <Heart className="w-5 h-5 text-[#dfb559] mb-3 animate-pulse" />

        {/* Main message - Enlarged font size */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-[17.5px] sm:text-[19.5px] font-normal text-[#FAF6F0] tracking-wide max-w-lg mb-3.5 leading-relaxed italic px-2"
        >
          “Gracias por ser parte de nuestra historia y por acompañarnos en este nuevo capitulo de nuestras vidas.”
        </motion.p>

        {/* Con cariño signature (separated in 2 distinct lines) */}
        <div className="mb-5 flex flex-col items-center gap-1">
          <p className="text-[#c5a059] text-[16.5px] sm:text-[18px] font-serif italic tracking-wider">
            Con cariño,
          </p>
          <p className="text-[#dfb559] text-[15px] sm:text-[17px] tracking-[0.22em] font-serif font-bold uppercase">
            Melissa, Jhimy y Max Christian
          </p>
        </div>

        {/* Share Invitation Button */}
        <div className="mb-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#dfb559]/60 bg-[#1B365D]/90 hover:bg-[#1B365D] text-[12.5px] sm:text-[13.5px] font-bold text-gray-100 hover:text-white uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
            title="Compartir Invitación"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">{lang === "es" ? "¡Enlace Copiado!" : "Link Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#dfb559]" />
                <span className="font-bold">{lang === "es" ? "Compartir Invitación" : "Share Invitation"}</span>
              </>
            )}
          </button>
        </div>

        {/* Subtle separator */}
        <div className="w-20 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent mb-4" />

        {/* Location subtitle */}
        <p className="text-[11px] sm:text-[12.5px] text-gray-300 uppercase tracking-[0.22em] font-medium mb-4">
          7 de Setiembre 2026 • Abancay, Perú | Todos los derechos reservados © 2026
        </p>

        {/* Designer Credits */}
        <div className="pt-4 border-t border-[#dfb559]/15 w-full max-w-md flex flex-col items-center">
          <span className="text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.28em] text-[#c5a059] font-bold mb-1">
            {lang === "es" ? "Invitaciones Virtuales & Diseño Gráfico" : "Virtual Invitations & Graphic Design"}
          </span>
          <p className="font-serif text-[13.5px] sm:text-base text-gray-300 tracking-wide font-light mb-3">
            {lang === "es" ? "Creado con amor por " : "Created with love by "}
            <span className="text-white font-semibold">VAC Creative</span>
          </p>

          {/* Social Media Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={`https://wa.me/51932350348?text=${encodeURIComponent(designerMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.tiktok.com/@vaccreative?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-200 text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <span>TikTok</span>
            </a>

            <a
              href="https://www.facebook.com/VAC.Creativ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2]/15 border border-[#1877F2]/40 hover:bg-[#1877F2]/30 text-[#4c97f8] text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <span>Facebook</span>
            </a>

            <a
              href="https://www.youtube.com/@VACCreative"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF0000]/15 border border-[#FF0000]/40 hover:bg-[#FF0000]/30 text-[#ff5757] text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
