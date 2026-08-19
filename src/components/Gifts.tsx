import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Copy, Check, Gift, Sparkles, Building2, Smartphone } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function Gifts() {
  const { lang } = useLanguage();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bcpAccount = "20096500288018";
  const bcpCci = "00220019650028801848";
  const yapePlinPhone = "980 852 503";

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <section className="relative min-h-[100svh] py-14 sm:py-18 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-[#1B365D] flex flex-col justify-center items-center">
      {/* Floral Corners Frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Vector Line Art Envelope / Gift Icon in Gold */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mb-4 flex items-center justify-center select-none"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#132742] border-2 border-[#dfb559] flex items-center justify-center text-[#dfb559] shadow-lg">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-center w-full flex flex-col items-center mb-5 sm:mb-6"
        >
          {/* Subtitle Tag */}
          <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.25em] text-[#c5a059] font-bold mb-1">
            {lang === "es" ? "Muestra de Cariño" : "Token of Love"}
          </span>

          {/* Calligraphic Script Title */}
          <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] tracking-wide mb-2 select-none leading-[1.1] font-normal">
            {lang === "es" ? "Lluvia de Sobres" : "Envelope Shower"}
          </h2>

          <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mt-1 mb-3.5" />

          {/* Description - Enlarged font for clarity and comfort */}
          <p className="font-serif text-[16.5px] sm:text-[18px] text-[#1B365D] italic max-w-lg leading-relaxed font-medium px-4">
            {lang === "es"
              ? "Tu presencia y buenos deseos son nuestro mejor regalo. Si deseas tener un detalle con nosotros, dispondremos de un buzón en la recepción o puedes hacerlo a través de nuestras cuentas:"
              : "Your presence and warm wishes are our greatest gift. If you wish to give us a present, a mailbox will be available at the reception or via our bank details:"}
          </p>
        </motion.div>

        {/* Accounts Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full max-w-md bg-white/95 rounded-2xl p-5 sm:p-7 border border-[#dfb559]/40 shadow-sm space-y-4"
        >
          {/* BCP Soles */}
          <div className="bg-[#FAF6F0] rounded-xl p-3.5 sm:p-4 border border-[#dfb559]/25 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#132742] text-[#dfb559] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-left">
                <p className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-[#c5a059] uppercase tracking-wider">
                  BCP Soles
                </p>
                <p className="font-serif text-[17px] sm:text-[18.5px] font-bold text-[#1B365D] tracking-wide">
                  {bCPFormatter(bcpAccount)}
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#1B365D]/85 font-mono">
                  CCI: {bcpCci}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(bcpAccount, "bcp")}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-white hover:bg-[#FAF6F0] text-[#1B365D] border border-[#dfb559]/40 text-xs font-sans font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              title="Copiar número de cuenta"
            >
              {copiedAccount === "bcp" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-600">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#c5a059]" />
                  <span className="hidden sm:inline">Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Yape / Plin */}
          <div className="bg-[#FAF6F0] rounded-xl p-3.5 sm:p-4 border border-[#dfb559]/25 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#7209B7] to-[#4361EE] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-left">
                <p className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-[#7209B7] uppercase tracking-wider">
                  Yape / Plin
                </p>
                <p className="font-serif text-[18px] sm:text-[19.5px] font-bold text-[#1B365D] tracking-wide">
                  {yapePlinPhone}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy("980852503", "yape")}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-white hover:bg-[#FAF6F0] text-[#1B365D] border border-[#dfb559]/40 text-xs font-sans font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              title="Copiar número Yape / Plin"
            >
              {copiedAccount === "yape" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-600">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#c5a059]" />
                  <span className="hidden sm:inline">Copiar</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[13.5px] sm:text-[15px] text-center text-[#1B365D]/85 font-serif italic pt-1">
            ¡Muchas gracias por su amor y generosidad!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function bCPFormatter(val: string) {
  return val.replace(/(\d{3})(\d{8})(\d{3})/, "$1-$2-$3");
}
