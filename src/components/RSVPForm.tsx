import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function RSVPForm() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: "",
    asistentes: "1",
    manualAsistentes: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const phoneNum = "51966740525";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim()) return;

    // Get the final count of attendees
    const numAsistentes = formData.asistentes === "manual"
      ? (formData.manualAsistentes.trim() || "1")
      : formData.asistentes;

    // Elegant message formatting for direct delivery on WhatsApp
    const msgTemplate = lang === "es"
      ? `¡Hola Melissa y Jhimy! ✨💍🕊️\n\nConfirmo con mucha alegría mi asistencia a su matrimonio y bautizo de Max Christian este lunes 7 de setiembre del 2026.\n\n*Detalles de Confirmación:*\n👤 *Nombre:* ${formData.nombre.trim()}\n👥 *Pases/Asistentes:* ${numAsistentes}\n\n¡Nos vemos pronto para celebrar juntos! 🎉`
      : `Hello Melissa and Jhimy! ✨💍🕊️\n\nI am very happy to confirm my attendance to your wedding and Max Christian's baptism this Monday, September 7th, 2026.\n\n*Confirmation Details:*\n👤 *Name:* ${formData.nombre.trim()}\n👥 *Guests:* ${numAsistentes}\n\nSee you soon to celebrate together! 🎉`;

    const encodedText = encodeURIComponent(msgTemplate);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodedText}`;

    setIsSuccess(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="confirmacion" className="relative py-28 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header Title Block */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <HelpCircle className="w-5 h-5 text-[#dfb559] mb-3 animate-pulse" />
            <span className="font-sans text-[12px] sm:text-[13px] tracking-[0.3em] text-[#c5a059] uppercase font-bold">
              {t("rsvp.tag")}
            </span>
            <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] mt-2 mb-2 select-none font-normal">
              {t("rsvp.title")}
            </h2>
            <div className="w-16 h-[1.5px] bg-[#dfb559]" />
            <p className="text-[#1B365D] text-[16px] sm:text-[18px] font-serif italic mt-4 max-w-md leading-relaxed font-normal">
              {t("rsvp.desc")}
            </p>
          </motion.div>
        </div>

        {/* RSVP Form Card with double gold framing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white border-2 border-[#dfb559]/30 rounded-2xl p-7 sm:p-11 shadow-[0_15px_45px_rgba(27,54,93,0.06)] relative overflow-hidden"
        >
          {/* Internal Geometric Outline */}
          <div className="absolute inset-1.5 border border-[#dfb559]/15 rounded-xl pointer-events-none" />

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-[#1B365D] rounded-full flex items-center justify-center mb-6 border-2 border-[#dfb559] shadow-xl">
                <CheckCircle2 className="w-7 h-7 text-[#dfb559]" />
              </div>
              <h3 className="font-serif text-2xl text-[#1B365D] font-bold mb-3">
                {t("rsvp.success_title")}
              </h3>
              <p className="text-[#1B365D]/85 text-sm sm:text-base font-light max-w-sm leading-relaxed mb-8">
                {t("rsvp.success_desc")}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs uppercase tracking-widest font-bold border-b border-[#dfb559] hover:text-[#c5a059] pb-1 transition-all cursor-pointer text-[#1B365D] bg-transparent"
              >
                {t("rsvp.resend")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
              {/* Field 1: Name and Surname */}
              <div>
                <label htmlFor="nombre" className="block text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.18em] font-bold text-[#1B365D] mb-2">
                  {lang === "es" ? "Nombres y Apellidos" : "Full Name"}
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder={lang === "es" ? "Escribe tu nombre completo" : "Enter your full name"}
                  className="w-full px-4.5 py-3.5 rounded-xl border border-[#E5E1D8] bg-[#FAF6F0] focus:bg-white text-[#1B365D] text-[15.5px] sm:text-[16px] font-serif select-text outline-none transition-all focus:border-[#dfb559] focus:ring-0"
                />
              </div>

              {/* Field 2: Companions Count */}
              <div>
                <label htmlFor="asistentes" className="block text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.18em] font-bold text-[#1B365D] mb-2">
                  {t("rsvp.guests_label")}
                </label>
                <div className="relative">
                  <select
                    id="asistentes"
                    name="asistentes"
                    value={formData.asistentes}
                    onChange={handleChange}
                    className="w-full px-4.5 py-3.5 rounded-xl border border-[#E5E1D8] bg-[#FAF6F0] focus:bg-white text-[#1B365D] text-[15.5px] sm:text-[16px] font-serif outline-none transition-all cursor-pointer focus:border-[#dfb559] focus:ring-0 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23dfb559%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.4c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%25.4%2012.8%25.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_1.25rem_center] bg-no-repeat"
                  >
                    <option value="1">
                      {lang === "es" ? "1 Persona (Pase Individual)" : "1 Person (Individual Pass)"}
                    </option>
                    <option value="2">
                      {lang === "es" ? "2 Personas (Pase de Pareja)" : "2 People (Couple Pass)"}
                    </option>
                    <option value="3">
                      {lang === "es" ? "3 Personas" : "3 People"}
                    </option>
                    <option value="4">
                      {lang === "es" ? "4 Personas" : "4 People"}
                    </option>
                    <option value="5">
                      {lang === "es" ? "5 Personas" : "5 People"}
                    </option>
                    <option value="manual">
                      {lang === "es" ? "Otro (Ingresar cantidad manualmente)" : "Other (Enter manual count)"}
                    </option>
                  </select>
                </div>

                {/* Conditionally reveal manual count input field */}
                {formData.asistentes === "manual" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3.5"
                  >
                    <label htmlFor="manualAsistentes" className="block text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.18em] font-bold text-[#1B365D] mb-2">
                      {lang === "es" ? "Especificar cantidad de asistentes" : "Specify number of guests"}
                    </label>
                    <input
                      type="number"
                      id="manualAsistentes"
                      name="manualAsistentes"
                      min="1"
                      value={formData.manualAsistentes}
                      onChange={handleChange}
                      required
                      placeholder={lang === "es" ? "Ej. 6" : "E.g. 6"}
                      className="w-full px-4.5 py-3.5 rounded-xl border border-[#E5E1D8] bg-[#FAF6F0] focus:bg-white text-[#1B365D] text-[15.5px] sm:text-[16px] font-serif select-text outline-none transition-all focus:border-[#dfb559] focus:ring-0"
                    />
                  </motion.div>
                )}
              </div>

              {/* Centered WhatsApp Pulse Circle Button */}
              <div className="flex flex-col items-center justify-center pt-6 select-none">
                <button
                  type="submit"
                  className="relative group flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366] hover:bg-[#22c35e] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none" />
                  <span className="absolute -inset-2 rounded-full border-2 border-[#25D366]/20 group-hover:border-[#25D366]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-9 h-9 drop-shadow-md relative z-10"
                  >
                    <path d="M19.005 4.908A9.817 9.817 0 0 0 11.97 2c-5.434 0-9.858 4.42-9.86 9.855 0 1.737.454 3.433 1.316 4.925l-1.398 5.111 5.228-1.371a9.833 9.833 0 0 0 4.75 1.224h.004c5.434 0 9.858-4.42 9.861-9.856.002-2.633-1.02-5.112-2.866-6.98zM11.97 19.784a8.163 8.163 0 0 1-4.168-1.144l-.299-.178-3.1 1.135-.11.041.04-.112.812-2.969-.196-.312c-.815-1.294-1.244-2.793-1.242-4.327.003-4.484 3.65-8.128 8.134-8.128a8.114 8.114 0 0 1 5.753 2.383 8.118 8.118 0 0 1 2.382 5.751c-.003 4.484-3.65 8.13-8.134 8.13zm4.457-6.082c-.244-.122-1.442-.71-1.664-.792-.222-.08-.383-.12-.544.122-.162.242-.622.792-.763.953-.142.16-.283.18-.527.059-.244-.121-1.029-.379-1.96-1.21-.723-.645-1.212-1.441-1.353-1.684-.142-.243-.015-.374.107-.495.11-.11.244-.284.366-.426.121-.141.162-.242.243-.404.082-.162.04-.303-.021-.425-.06-.121-.544-1.311-.745-1.794-.195-.47-.393-.404-.544-.412l-.464-.009c-.161 0-.423.06-.644.303-.221.242-1.107 1.082-1.107 2.64 0 1.558 1.134 3.066 1.295 3.284.161.222 2.233 3.411 5.412 4.782.756.326 1.346.521 1.805.667.76.241 1.451.207 1.998.126.609-.09 1.87-.765 2.133-1.467.264-.702.264-1.303.185-1.425-.078-.121-.299-.202-.544-.323z" />
                  </svg>
                </button>
                <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.18em] font-bold text-[#1B365D] mt-4 text-center">
                  {lang === "es" ? "Confirmar Asistencia por WhatsApp" : "Confirm Attendance on WhatsApp"}
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
