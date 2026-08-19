import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, Gift } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import PageFloralFrame from "./PageFloralFrame";

export default function Gifts() {
  const { lang } = useLanguage();
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
      owner: "Jhimy Camacho & Melissa Retamoso",
      items: [
        { label: "Yape / Plin", value: "980 852 503" },
        { label: "BCP Soles", value: "20096500288018" },
        { label: "CCI Interbancaria", value: "00220019650028801848" }
      ]
    }
  ];

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden flex flex-col justify-center items-center">
      {/* Floral corners frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-4 sm:mb-6"
        >
          <Gift className="w-5 h-5 text-[#dfb559] mx-auto mb-2" />
          <span className="font-sans text-[9.5px] sm:text-[10.5px] tracking-[0.35em] text-[#c5a059] uppercase font-bold block mb-1">
            {lang === "es" ? "Muestra de Cariño" : "Token of Love"}
          </span>
          <h2 className="font-great-vibes text-5xl sm:text-7.5xl text-[#1B365D] select-none leading-none mb-2">
            {lang === "es" ? "Lluvia de Sobres / Regalos" : "Wedding Gifts"}
          </h2>
          <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mx-auto" />
        </motion.div>

        {/* Message Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-center mb-6 px-2"
        >
          <p className="font-serif text-[15px] sm:text-[17px] text-[#1B365D] leading-relaxed mb-1 font-semibold">
            {lang === "es" ? "¡Tu presencia es nuestro mejor regalo!" : "Your presence is our best gift!"}
          </p>
          <p className="font-serif text-[12px] sm:text-[13.5px] text-[#1B365D]/75 leading-relaxed font-light italic max-w-sm mx-auto">
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
        <div className="w-full space-y-4 px-2">
          {giftAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="w-full max-w-[460px] mx-auto border border-[#dfb559]/40 bg-white/90 p-5 sm:p-7 rounded-2xl shadow-sm text-center relative"
            >
              {/* Owner Header */}
              <h4 className="font-serif text-[14px] sm:text-[15.5px] font-bold text-[#1B365D] tracking-wide mb-4">
                {account.owner}
              </h4>

              {/* Bank Details Rows */}
              <div className="space-y-2.5 font-serif text-[12.5px] sm:text-[13.5px] text-[#1B365D]">
                {account.items.map((item, itemIdx) => {
                  return (
                    <div
                      key={itemIdx}
                      onClick={() => copyToClipboard(item.value, `${item.label} (${item.value})`)}
                      className="group cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 hover:bg-[#FAF6F0] p-2 sm:p-2.5 rounded-lg border border-transparent hover:border-[#dfb559]/30 transition-all text-center"
                      title="Haz clic para copiar"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-bold text-[#1B365D]">
                          {item.label}:
                        </span>
                        <span className="font-medium text-[#1B365D]/85 tracking-wider select-all">
                          {item.value}
                        </span>
                      </div>
                      
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-[9.5px] text-[#c5a059] font-bold flex items-center gap-1 sm:ml-1 uppercase tracking-wider">
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
