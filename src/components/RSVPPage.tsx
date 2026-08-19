import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Check, X, Send, Sparkles, UserCheck, CalendarCheck, CheckCircle2 } from "lucide-react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const totalPersonas = asistentes === "otro" ? manualAsistentes.trim() || "1" : asistentes;
    
    let mensaje = "";
    if (lang === "es") {
      if (asistencia === "si") {
        mensaje = `💍🕊️ *CONFIRMACIÓN DE ASISTENCIA* 🕊️💍\n*Boda de Melissa & Jhimy y Bautizo de Max Christian*\n📅 *Fecha:* Lunes, 7 de Setiembre 2026\n📍 *Lugar:* Abancay, Perú\n\n✨ *¡Hola Melissa y Jhimy!* ✨\nCon mucha alegría y emoción confirmo mi asistencia para celebrar juntos este día tan bendecido y especial. 🥂🎉\n\n📋 *DETALLES:* \n👤 *Invitado(s):* ${nombre.trim()}\n👥 *Pases / Asistentes:* ${totalPersonas} persona(s)\n✅ *Estado:* ¡Confirmado con mucha alegría!\n\n¡Nos vemos pronto para celebrar su amor y bendición! 💖✨🍾`;
      } else {
        mensaje = `💍🕊️ *RESPUESTA DE ASISTENCIA* 🕊️💍\n*Boda de Melissa & Jhimy y Bautizo de Max Christian*\n\n✨ *¡Hola Melissa y Jhimy!* ✨\nMuchas gracias por la hermosa invitación. Lamentablemente no podré acompañarlos en esta ocasión, pero les envío todo mi cariño y mejores deseos. 🤍🙏\n\n📋 *DATOS:* \n👤 *Nombre:* ${nombre.trim()}\n❌ *Estado:* No podré asistir\n\n¡Que Dios bendiga siempre su unión y el bautizo de Max Christian con mucho amor y felicidad! 🕊️💖✨`;
      }
    } else {
      if (asistencia === "si") {
        mensaje = `💍🕊️ *RSVP CONFIRMATION* 🕊️💍\n*Melissa & Jhimy's Wedding & Max Christian's Baptism*\n📅 *Date:* Monday, September 7, 2026\n📍 *Location:* Abancay, Peru\n\n✨ *Hello Melissa & Jhimy!* ✨\nI am thrilled to confirm my attendance to celebrate this wonderful and blessed day together! 🥂🎉\n\n📋 *DETAILS:* \n👤 *Guest Name:* ${nombre.trim()}\n👥 *Passes / Attendees:* ${totalPersonas} person(s)\n✅ *Status:* Confirmed!\n\nSee you soon to celebrate together! 💖✨🍾`;
      } else {
        mensaje = `💍🕊️ *RSVP RESPONSE* 🕊️💍\n*Melissa & Jhimy's Wedding & Max Christian's Baptism*\n\n✨ *Hello Melissa & Jhimy!* ✨\nThank you so much for the lovely invitation. Unfortunately I won't be able to attend, but I send you all my love and best wishes. 🤍🙏\n\n📋 *DETAILS:* \n👤 *Name:* ${nombre.trim()}\n❌ *Status:* Cannot attend\n\nMay God bless your union and Max Christian's baptism with immense love and happiness! 🕊️💖✨`;
      }
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsSuccess(true);
  };

  return (
    <section className="relative min-h-[100svh] py-14 sm:py-18 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-[#1B365D] flex flex-col justify-center items-center">
      {/* Floral Frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-5 sm:mb-6 flex flex-col items-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#132742] border-2 border-[#dfb559] flex items-center justify-center text-[#dfb559] mb-3 shadow-lg select-none">
            <UserCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.25em] text-[#c5a059] font-bold mb-1">
            {lang === "es" ? "Pase de Asistencia" : "RSVP"}
          </span>

          <h2 className="font-great-vibes text-[48px] sm:text-[66px] md:text-[76px] text-[#1B365D] tracking-wide mb-2 select-none leading-[1.1] font-normal">
            {lang === "es" ? "Confirma tu Asistencia" : "Confirm Attendance"}
          </h2>

          <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mt-1 mb-3.5" />

          {/* Description - Increased font size for easy reading on mobile */}
          <p className="font-serif text-[16.5px] sm:text-[18px] text-[#1B365D] italic max-w-md leading-relaxed font-medium px-4">
            {lang === "es"
              ? "Por favor confírmanos hasta el 31 de Agosto del 2026 para reservar tu lugar en este día tan especial."
              : "Please RSVP until August 31, 2026 to save your seat on this special day."}
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full bg-white/95 rounded-2xl p-5 sm:p-7 border border-[#dfb559]/40 shadow-sm relative overflow-hidden"
        >
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B365D]">
                {lang === "es" ? "¡Gracias por responder!" : "Thank you for responding!"}
              </h3>
              <p className="font-serif text-[16px] sm:text-[17px] text-[#1B365D]/85">
                {lang === "es"
                  ? "Hemos recibido tu confirmación mediante WhatsApp."
                  : "We have received your RSVP via WhatsApp."}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#132742] text-[#dfb559] text-[13px] font-sans font-bold uppercase tracking-wider cursor-pointer"
              >
                {lang === "es" ? "Enviar otra respuesta" : "Submit another response"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name */}
              <div>
                <label className="block font-sans text-[12.5px] sm:text-[13.5px] font-bold text-[#c5a059] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Nombres y Apellidos:" : "Full Name:"}
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={lang === "es" ? "Ej. Familia Camacho Arias o Juan Pérez" : "Ex. John Doe"}
                  className="w-full px-4 py-3 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 text-[#1B365D] placeholder-[#1B365D]/40 font-serif text-[16px] focus:outline-none focus:ring-2 focus:ring-[#dfb559]/50"
                />
              </div>

              {/* Attendance question */}
              <div>
                <label className="block font-sans text-[12.5px] sm:text-[13.5px] font-bold text-[#c5a059] uppercase tracking-wider mb-2">
                  {lang === "es" ? "¿Podrás acompañarnos?" : "Will you attend?"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAsistencia("si")}
                    className={`py-3 px-3 rounded-xl border font-sans text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      asistencia === "si"
                        ? "bg-[#132742] text-[#dfb559] border-[#dfb559] shadow-sm"
                        : "bg-[#FAF6F0]/60 text-[#1B365D]/70 border-[#dfb559]/30 hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{lang === "es" ? "¡Sí, asistiré!" : "Yes, I will!"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAsistencia("no")}
                    className={`py-3 px-3 rounded-xl border font-sans text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      asistencia === "no"
                        ? "bg-[#132742] text-[#dfb559] border-[#dfb559] shadow-sm"
                        : "bg-[#FAF6F0]/60 text-[#1B365D]/70 border-[#dfb559]/30 hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>{lang === "es" ? "No podré" : "Cannot attend"}</span>
                  </button>
                </div>
              </div>

              {/* Number of attendees if 'si' */}
              {asistencia === "si" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1.5"
                >
                  <label className="block font-sans text-[12.5px] sm:text-[13.5px] font-bold text-[#c5a059] uppercase tracking-wider mb-1">
                    {lang === "es" ? "Número de Asistentes:" : "Number of Guests:"}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "otro"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAsistentes(opt)}
                        className={`py-2.5 rounded-xl border font-sans text-xs sm:text-[13px] font-bold uppercase transition-all cursor-pointer ${
                          asistentes === opt
                            ? "bg-[#132742] text-[#dfb559] border-[#dfb559]"
                            : "bg-[#FAF6F0]/60 text-[#1B365D]/70 border-[#dfb559]/30"
                        }`}
                      >
                        {opt === "otro" ? (lang === "es" ? "Más" : "More") : opt}
                      </button>
                    ))}
                  </div>

                  {asistentes === "otro" && (
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={manualAsistentes}
                      onChange={(e) => setManualAsistentes(e.target.value)}
                      placeholder="Indica la cantidad exacta"
                      className="w-full mt-2 px-4 py-2.5 rounded-xl border border-[#dfb559]/40 bg-[#FAF6F0]/60 text-[#1B365D] font-serif text-[16px] focus:outline-none focus:ring-2 focus:ring-[#dfb559]/50"
                    />
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#dfb559] to-[#c5a059] text-[#132742] font-sans font-bold text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{lang === "es" ? "Confirmar por WhatsApp" : "Confirm via WhatsApp"}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
