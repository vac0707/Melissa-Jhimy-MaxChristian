import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, HelpCircle, Check, X, Send, Sparkles } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function RSVPPage() {
  const { lang } = useLanguage();
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState<"si" | "no">("si");
  const [asistentes, setAsistentes] = useState("1");
  const [manualAsistentes, setManualAsistentes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const phoneNum = "51966740525";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const numPases = asistencia === "si" 
      ? (asistentes === "manual" ? (manualAsistentes.trim() || "1") : asistentes)
      : "0";

    let msgTemplate = "";
    if (asistencia === "si") {
      msgTemplate = lang === "es"
        ? `¡Hola Melissa y Jhimy! ✨💍🕊️\n\n*CONFIRMACIÓN DE ASISTENCIA:*\n✅ *Estado:* ¡SÍ, ALLÍ ESTARÉ para celebrar su matrimonio y bautizo de Max Christian!\n👤 *Nombre:* ${nombre.trim()}\n👥 *Cantidad de pases:* ${numPases}\n\n¡Nos vemos este 7 de setiembre en Abancay! 🎉`
        : `Hello Melissa and Jhimy! ✨💍🕊️\n\n*RSVP CONFIRMATION:*\n✅ *Status:* YES, I WILL BE THERE to celebrate your wedding & baptism of Max Christian!\n👤 *Name:* ${nombre.trim()}\n👥 *Guests count:* ${numPases}\n\nSee you on September 7th! 🎉`;
    } else {
      msgTemplate = lang === "es"
        ? `¡Hola Melissa y Jhimy! ✨💍🕊️\n\n*CONFIRMACIÓN DE ASISTENCIA:*\n❌ *Estado:* Lamentablemente no podré asistir esta vez, pero les envío un fuerte abrazo y mis mejores bendiciones para ustedes y su pequeño Max Christian.\n👤 *Nombre:* ${nombre.trim()}`
        : `Hello Melissa and Jhimy! ✨💍🕊️\n\n*RSVP CONFIRMATION:*\n❌ *Status:* Unfortunately I will not be able to attend, but I send you my warmest blessings!\n👤 *Name:* ${nombre.trim()}`;
    }

    const encodedText = encodeURIComponent(msgTemplate);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodedText}`;

    setIsSuccess(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden flex flex-col justify-center items-center">
      {/* Floral frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-xl w-full mx-auto relative z-10 my-auto">
        {/* Header Title Block */}
        <div className="text-center mb-5 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#1B365D]/10 border border-[#dfb559]/40 text-[#1B365D] text-[10px] sm:text-xs font-serif font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{lang === "es" ? "Pase de Asistencia" : "RSVP Card"}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            </div>

            <h2 className="font-great-vibes text-4.5xl sm:text-6.5xl text-[#1B365D] leading-none mb-3 select-none font-normal">
              {lang === "es" ? "Confirma tu Asistencia" : "Confirm Attendance"}
            </h2>

            {/* UN MENSAJE PARA TI */}
            <div className="max-w-md w-full mx-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/85 border border-[#dfb559]/50 shadow-sm mb-2">
              <span className="block text-[10px] sm:text-[11px] font-sans font-bold text-[#c5a059] uppercase tracking-[0.25em] mb-1">
                {lang === "es" ? "UN MENSAJE PARA TI" : "A MESSAGE FOR YOU"}
              </span>
              <p className="text-[#1B365D] text-[13px] sm:text-[14.5px] font-serif italic leading-relaxed font-medium">
                “{lang === "es"
                  ? "Estamos muy emocionados de compartir este día tan importante con las personas que más queremos."
                  : "We are truly excited to share this meaningful day with the people we love most."}”
              </p>
            </div>

            <div className="w-16 h-[0.5px] bg-[#dfb559]/50 mt-2" />
          </motion.div>
        </div>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="bg-white/90 border-2 border-[#dfb559]/40 rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(27,54,93,0.06)] relative overflow-hidden"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-[#1B365D] rounded-full flex items-center justify-center mb-4 border-2 border-[#dfb559] shadow-lg">
                <CheckCircle2 className="w-7 h-7 text-[#dfb559]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1B365D] font-bold mb-2">
                {lang === "es" ? "¡Confirmación Enviada!" : "RSVP Sent!"}
              </h3>
              <p className="text-[#1B365D]/75 text-xs sm:text-sm font-light max-w-sm leading-relaxed mb-6 font-serif">
                {lang === "es"
                  ? "Gracias por enviarnos tu mensaje. ¡Esperamos con mucha ilusión compartir este gran día contigo!"
                  : "Thank you for confirming. We look forward to celebrating together!"}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs uppercase tracking-widest font-bold border-b border-[#dfb559] hover:text-[#c5a059] pb-1 transition-all cursor-pointer text-[#1B365D]"
              >
                {lang === "es" ? "Modificar o reenviar respuesta" : "Send another response"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
              {/* Field 1: Name and Surname */}
              <div>
                <label className="block text-[10.5px] uppercase tracking-[0.2em] font-bold text-[#1B365D] mb-1.5">
                  {lang === "es" ? "Nombres y Apellidos" : "Full Name"}
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder={lang === "es" ? "Escribe tu nombre completo" : "Enter your full name"}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white text-[#1B365D] text-xs sm:text-sm font-serif select-text outline-none transition-all focus:border-[#1B365D]"
                />
              </div>

              {/* Field 2: ¿Nos acompañas? Radio pills */}
              <div>
                <label className="block text-[10.5px] uppercase tracking-[0.2em] font-bold text-[#1B365D] mb-1.5">
                  {lang === "es" ? "¿Nos acompañas?" : "Will you join us?"}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAsistencia("si")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      asistencia === "si"
                        ? "bg-[#1B365D] text-[#dfb559] border-[#dfb559] shadow-sm"
                        : "bg-[#FAF6F0]/80 text-[#1B365D] border-[#dfb559]/30 hover:bg-white"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === "es" ? "SÍ, ALLÍ ESTARÉ" : "YES, ATTENDING"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAsistencia("no")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      asistencia === "no"
                        ? "bg-[#1B365D] text-[#dfb559] border-[#dfb559] shadow-sm"
                        : "bg-[#FAF6F0]/80 text-[#1B365D] border-[#dfb559]/30 hover:bg-white"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{lang === "es" ? "NO PODRÉ ASISTIR" : "CANNOT ATTEND"}</span>
                  </button>
                </div>
              </div>

              {/* Field 3: Companions Count (only if YES) */}
              {asistencia === "si" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <label className="block text-[10.5px] uppercase tracking-[0.2em] font-bold text-[#1B365D] mb-1">
                    {lang === "es" ? "Número de Asistentes / Pases" : "Number of Guests"}
                  </label>
                  <select
                    value={asistentes}
                    onChange={(e) => setAsistentes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white text-[#1B365D] text-xs sm:text-sm font-serif outline-none cursor-pointer"
                  >
                    <option value="1">{lang === "es" ? "1 Persona (Pase Individual)" : "1 Person"}</option>
                    <option value="2">{lang === "es" ? "2 Personas (Pase de Pareja)" : "2 People"}</option>
                    <option value="3">{lang === "es" ? "3 Personas" : "3 People"}</option>
                    <option value="4">{lang === "es" ? "4 Personas" : "4 People"}</option>
                    <option value="5">{lang === "es" ? "5 Personas" : "5 People"}</option>
                    <option value="manual">{lang === "es" ? "Otro (Ingresar cantidad manualmente)" : "Other count"}</option>
                  </select>

                  {asistentes === "manual" && (
                    <input
                      type="number"
                      min="1"
                      value={manualAsistentes}
                      onChange={(e) => setManualAsistentes(e.target.value)}
                      placeholder={lang === "es" ? "Cantidad exacta de personas" : "Exact guest count"}
                      className="w-full px-4 py-2 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 focus:bg-white text-[#1B365D] text-xs font-serif outline-none mt-2"
                    />
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b859] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.005 4.908A9.817 9.817 0 0 0 11.97 2c-5.434 0-9.858 4.42-9.86 9.855 0 1.737.454 3.433 1.316 4.925l-1.398 5.111 5.228-1.371a9.833 9.833 0 0 0 4.75 1.224h.004c5.434 0 9.858-4.42 9.861-9.856.002-2.633-1.02-5.112-2.866-6.98zM11.97 19.784a8.163 8.163 0 0 1-4.168-1.144l-.299-.178-3.1 1.135-.11.041.04-.112.812-2.969-.196-.312c-.815-1.294-1.244-2.793-1.242-4.327.003-4.484 3.65-8.128 8.134-8.128a8.114 8.114 0 0 1 5.753 2.383 8.118 8.118 0 0 1 2.382 5.751c-.003 4.484-3.65 8.13-8.134 8.13zm4.457-6.082c-.244-.122-1.442-.71-1.664-.792-.222-.08-.383-.12-.544.122-.162.242-.622.792-.763.953-.142.16-.283.18-.527.059-.244-.121-1.029-.379-1.96-1.21-.723-.645-1.212-1.441-1.353-1.684-.142-.243-.015-.374.107-.495.11-.11.244-.284.366-.426.121-.141.162-.242.243-.404.082-.162.04-.303-.021-.425-.06-.121-.544-1.311-.745-1.794-.195-.47-.393-.404-.544-.412l-.464-.009c-.161 0-.423.06-.644.303-.221.242-1.107 1.082-1.107 2.64 0 1.558 1.134 3.066 1.295 3.284.161.222 2.233 3.411 5.412 4.782.756.326 1.346.521 1.805.667.76.241 1.451.207 1.998.126.609-.09 1.87-.765 2.133-1.467.264-.702.264-1.303.185-1.425-.078-.121-.299-.202-.544-.323z" />
                  </svg>
                  <span>{lang === "es" ? "Confirmar por WhatsApp" : "Confirm via WhatsApp"}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
