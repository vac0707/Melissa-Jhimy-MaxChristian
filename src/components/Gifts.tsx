import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, Gift } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Gifts() {
  const { lang, t } = useLanguage();
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      const cleanText = text.replace(/[^0-9]/g, "");
      await navigator.clipboard.writeText(cleanText);
      setCopiedValue(label);
      setTimeout(() => setCopiedValue(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const giftAccounts = [
    {
      owner: lang === "es" ? "Jhimy Camacho & Melissa Retamoso" : "Jhimy Camacho & Melissa Retamoso",
      items: [
        { label: "Yape / Plin", value: "966 740 525" },
        { label: "BCP Soles", value: "200 901 599 360 22" },
        { label: "CCI Interbancaria", value: "002 200 1901 599360 2247" }
      ]
    }
  ];

  return (
    <section id="regalos" className="relative py-24 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden">
      {/* Soft divider lines top/bottom */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <Gift className="w-5 h-5 text-[#dfb559] mx-auto mb-3" />
          <span className="font-sans text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-bold block mb-1">
            {lang === "es" ? "Muestra de Cariño" : "Token of Love"}
          </span>
          <h2 className="font-great-vibes text-6.5xl sm:text-8xl text-[#1B365D] select-none leading-none mb-4">
            {lang === "es" ? "Lluvia de Sobres / Regalos" : "Wedding Gifts"}
          </h2>
          <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mx-auto" />
        </motion.div>

        {/* Message Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-center mb-8 px-2"
        >
          <p className="font-serif text-[17px] sm:text-xl text-[#1B365D] leading-relaxed mb-3">
            {lang === "es" ? "¡Tu presencia es nuestro mejor regalo!" : "Your presence is our best gift!"}
          </p>
          <p className="font-serif text-[12.5px] sm:text-[14px] text-[#1B365D]/75 leading-relaxed font-light italic max-w-sm mx-auto">
            {lang === "es" 
              ? "Si deseas tener un detalle adicional con nosotros o con nuestro pequeño Max Christian, te dejamos nuestras opciones:" 
              : "If you wish to make a gift to us or our little Max Christian, here are our options:"}
          </p>
        </motion.div>

        {/* Dynamic Clipboard Notify Popup */}
        <AnimatePresence>
          {copiedValue && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#1B365D] text-[#FAF6F0] text-xs font-serif tracking-wider px-5 py-3 rounded-full shadow-xl border border-[#dfb559]/40 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#dfb559]" />
              <span>{lang === "es" ? `Copiado: ${copiedValue}` : `Copied: ${copiedValue}`}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Gift Box */}
        <div className="w-full space-y-6 px-2">
          {giftAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[460px] mx-auto border border-[#dfb559]/30 bg-white/90 p-7 sm:p-8 rounded-2xl shadow-sm text-center relative"
            >
              {/* Owner Header */}
              <h4 className="font-serif text-[15px] sm:text-[16.5px] font-bold text-[#1B365D] tracking-wide mb-5">
                {account.owner}
              </h4>

              {/* Bank Details Rows */}
              <div className="space-y-3 font-serif text-[13px] sm:text-[14px] text-[#1B365D]">
                {account.items.map((item, itemIdx) => {
                  return (
                    <div
                      key={itemIdx}
                      onClick={() => copyToClipboard(item.value, `${item.label} (${item.value})`)}
                      className="group cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 hover:bg-[#FAF6F0] p-2.5 rounded-lg border border-transparent hover:border-[#dfb559]/30 transition-all text-center"
                      title="Haz clic para copiar"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1B365D] tracking-normal">
                          {item.label}:
                        </span>
                        <span className="font-medium text-[#1B365D]/80 tracking-wider select-all">
                          {item.value}
                        </span>
                      </div>
                      
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-[#c5a059] font-bold flex items-center gap-1 sm:ml-1 uppercase tracking-wider">
                        <Copy className="w-3 h-3" />
                        <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
