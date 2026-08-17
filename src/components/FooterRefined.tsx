import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Share2, Check } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function FooterRefined() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: lang === "es" ? "Boda & Bautizo: Melissa y Jhimy" : "Wedding & Baptism: Melissa & Jhimy",
      text: lang === "es"
        ? "Te invitamos con mucha alegría a acompañarnos en nuestro matrimonio y bautizo de Max Christian este 7 de setiembre del 2026. ¡Confirma tu asistencia!"
        : "We joyfully invite you to join us on our wedding and baptism of Max Christian on September 7th, 2026. Confirm your attendance!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Sharing cancelled or blocked:", err);
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
    <footer className="relative bg-[#11223B] text-white py-20 px-6 overflow-hidden border-t border-[#dfb559]/20">
      {/* Decorative Gold Filigree Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#dfb559] rounded-2xl animate-spin" style={{ animationDuration: "120s" }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Monogram Box Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-[#dfb559]/50 bg-[#1B365D] mb-6 shadow-md"
        >
          <span className="font-serif text-xl font-bold text-[#dfb559] select-none">M & J</span>
          <div className="absolute inset-[-4px] rounded-2xl border border-[#dfb559]/20 animate-spin" style={{ animationDuration: "50s" }} />
        </motion.div>

        {/* Heart icon */}
        <Heart className="w-4 h-4 text-[#dfb559] mb-6 animate-pulse" />

        {/* Main message */}
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF6F0] tracking-wide max-w-xl mb-4 leading-relaxed whitespace-pre-line">
          {lang === "es"
            ? "\"Gracias por acompañarnos en el día más importante de nuestras vidas y bendecir nuestra unión y a nuestro amado hijo.\""
            : "\"Thank you for joining us on the most important day of our lives and blessing our union and our beloved child.\""}
        </h3>

        <p className="text-[#c5a059] text-xs tracking-widest font-bold uppercase mb-8">
          {lang === "es"
            ? "Melissa & Jhimy • Max Christian — 7 de Setiembre 2026"
            : "Melissa & Jhimy • Max Christian — September 7th, 2026"}
        </p>

        {/* Discreet Share Invitation Button */}
        <div className="mb-8">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#dfb559]/40 bg-[#1B365D]/80 hover:bg-[#1B365D] text-[10px] font-bold text-gray-200 hover:text-white uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
            title={lang === "es" ? "Copiar o compartir enlace de la invitación" : "Copy or share invitation link"}
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

        {/* Delicate divider and location */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent mb-6" />

        <p className="text-[10px] text-gray-300 uppercase tracking-[0.25em] font-light mb-8">
          {lang === "es"
            ? "Abancay, Perú | Todos los derechos reservados © 2026"
            : "Abancay, Peru | All rights reserved © 2026"}
        </p>

        {/* Designer Credits Section */}
        <div className="mt-4 pt-8 border-t border-[#dfb559]/15 w-full max-w-md flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-2">
            {lang === "es" ? "Invitaciones Virtuales & Diseño Gráfico" : "Virtual Invitations & Graphic Design"}
          </span>
          <p className="font-serif text-sm text-gray-300 tracking-wide font-light mb-5">
            {lang === "es" ? "Creado con amor por " : "Created with love by "}
            <span className="text-white hover:text-[#dfb559] transition-colors font-medium">VAC Creative</span>
          </p>
          
          {/* Social Media Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* WhatsApp with automatic pre-written message */}
            <a
              href={`https://wa.me/51932350348?text=${encodeURIComponent(designerMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              title={lang === "es" ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.885-6.968C16.58 1.905 14.102.88 11.47.882c-5.432 0-9.854 4.416-9.856 9.86-.001 1.705.452 3.37 1.312 4.837l-.991 3.618 3.712-.973zm11.367-7.31c-.305-.152-1.798-.887-2.078-.988-.28-.102-.483-.152-.686.152-.204.304-.787.988-.965 1.191-.177.203-.355.228-.659.076-.304-.152-1.284-.473-2.448-1.511-.905-.807-1.516-1.804-1.694-2.108-.178-.304-.019-.468.133-.619.136-.136.304-.355.457-.532.152-.178.203-.304.304-.508.102-.203.05-.38-.025-.532-.076-.152-.687-1.65-.941-2.26-.247-.591-.497-.512-.681-.522-.177-.008-.38-.01-.58-.01-.202 0-.531.075-.81.38-.278.304-1.062 1.039-1.062 2.536 0 1.497 1.088 2.943 1.24 3.146.152.203 2.14 3.268 5.185 4.58.724.311 1.29.497 1.734.638.728.23 1.39.198 1.912.12.582-.087 1.798-.735 2.052-1.444.253-.71.253-1.32.177-1.444-.075-.127-.278-.203-.583-.355z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@vaccreative?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-300 text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              title={lang === "es" ? "Sígueme en TikTok" : "Follow me on TikTok"}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.74-3.94-1.69-.22-.19-.44-.4-.64-.62v6.52c-.07 2.3-.99 4.64-2.84 6.04-1.87 1.42-4.43 1.83-6.68 1.2-2.3-.64-4.34-2.47-5.01-4.79-.76-2.58-.1-5.59 1.77-7.55 1.74-1.84 4.41-2.51 6.84-1.82V12.4c-1.54-.51-3.34-.14-4.49.99-.96.94-1.25 2.45-.77 3.69.49 1.25 1.83 2.08 3.16 1.96 1.45-.07 2.66-1.29 2.74-2.73v-16.3z" />
              </svg>
              <span>TikTok</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/VAC.Creativ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 text-[#1877F2] text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              title={lang === "es" ? "Sígueme en Facebook" : "Follow me on Facebook"}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@VACCreative"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000]/20 text-[#FF0000] text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              title={lang === "es" ? "Suscríbete en YouTube" : "Subscribe on YouTube"}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
