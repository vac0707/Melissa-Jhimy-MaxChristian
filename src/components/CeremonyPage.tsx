import { motion } from "motion/react";
import { Church, MapPin, Calendar, Clock, ExternalLink, Sparkles } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function CeremonyPage() {
  const { lang } = useLanguage();

  const churchMapUrl = "https://maps.google.com/?q=Catedral+de+la+Virgen+del+Rosario+Abancay";
  const churchCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+y+Bautizo:+Melissa+y+Jhimy&dates=20260907T190000Z/20260907T210000Z&details=Ceremonia+Religiosa+de+Matrimonio+y+Bautizo+de+Max+Christian&location=Catedral+de+Abancay,+Plaza+Mayor";

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF6F0] flex flex-col justify-center items-center overflow-hidden text-[#1B365D]">
      {/* Floral Frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center text-center my-auto">
        {/* Tag and Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center mb-5 sm:mb-6"
        >
          {/* Vector Church Line Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#132742] border-2 border-[#dfb559] flex items-center justify-center text-[#dfb559] mb-3 shadow-lg">
            <Church className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <span className="font-sans text-[12px] sm:text-[13px] tracking-[0.25em] uppercase font-bold text-[#c5a059] mb-1">
            {lang === "es" ? "Ceremonia Religiosa" : "Religious Ceremony"}
          </span>

          <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] leading-[1.1] mb-2 select-none font-normal">
            {lang === "es" ? "Misa de Matrimonio y Bautizo" : "Wedding & Baptism Mass"}
          </h2>

          <div className="w-16 h-[0.5px] bg-[#dfb559]/50 mt-1 mb-3.5" />

          {/* Emotional Phrase - Increased text size and readability */}
          <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] italic max-w-lg leading-relaxed font-medium px-4">
            “Acompáñanos en este momento tan especial donde unimos nuestras vidas ante Dios y presentamos a nuestro hijo en su bautizo.”
          </p>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full max-w-md bg-white/95 rounded-2xl p-6 sm:p-7 border border-[#dfb559]/40 shadow-sm relative overflow-hidden"
        >
          {/* Location & Time Rows */}
          <div className="space-y-4 text-center">
            {/* Time */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1.5">
                <Clock className="w-4 h-4" />
                <span className="text-[12px] sm:text-[13px] uppercase tracking-widest font-bold font-sans">
                  {lang === "es" ? "Hora Exacta" : "Exact Time"}
                </span>
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1B365D]">
                02:00 PM
              </p>
              <span className="text-[13.5px] sm:text-[15px] text-[#1B365D]/85 font-sans tracking-wide mt-0.5">
                {lang === "es" ? "Lunes, 7 de Setiembre del 2026" : "Monday, September 7, 2026"}
              </span>
            </div>

            <div className="w-full h-[0.5px] bg-[#dfb559]/25" />

            {/* Place */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-[12px] sm:text-[13px] uppercase tracking-widest font-bold font-sans">
                  {lang === "es" ? "Lugar Sagrado" : "Sacred Venue"}
                </span>
              </div>
              <p className="font-serif text-2xl sm:text-2.5xl font-bold text-[#1B365D]">
                Catedral de Abancay
              </p>
              <span className="text-[14.5px] sm:text-[16px] text-[#1B365D]/85 font-serif italic mt-0.5">
                Plaza Mayor de Abancay, Apurímac
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={churchMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#132742] hover:bg-[#1B365D] text-[#dfb559] border border-[#dfb559]/40 text-[12.5px] sm:text-[13.5px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{lang === "es" ? "Ver Ubicación" : "View Map"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>

              <a
                href={churchCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#1B365D] border border-[#dfb559]/50 text-[12.5px] sm:text-[13.5px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <span>{lang === "es" ? "Agendar" : "Add Calendar"}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
