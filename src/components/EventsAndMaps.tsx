import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Check, Church, GlassWater, HeartHandshake } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function EventsAndMaps() {
  const { lang, t } = useLanguage();
  const [showNotify, setShowNotify] = useState<string | null>(null);

  // External URLs provided by user
  const churchNavUrl = "https://maps.app.goo.gl/mYP2TWxoMG3EWs9x6"; // Catedral de Abancay
  const receptionNavUrl = "https://maps.app.goo.gl/KHrCMcegMAjsjPjK9"; // La Floresta de Favio

  // Google Calendar Templates for 7 de Septiembre 2026
  const calendarChurchUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio%20Melissa%20y%20Jhimy%20-%20Misa%20y%20Bautizo%20Max%20Christian&dates=20260907T190000Z/20260907T210000Z&details=Ceremonia%20Religiosa%20y%20Bautizo%20de%20Max%20Christian%20en%20la%20Catedral%20de%20Abancay.&location=Catedral%20de%20Abancay%2C%20Abancay";
  const calendarReceptionUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio%20Melissa%20y%20Jhimy%20-%20Ceremonia%20Civil%20y%20Recepci%C3%B3n&dates=20260907T213000Z/20260908T070000Z&details=Ceremonia%20Civil%204%3A30%20pm%20y%20Recepci%C3%B3n%20en%20La%20Floresta%20de%20Favio.&location=La%20Floresta%20de%20Favio%2C%20Abancay";

  const triggerCalendarNotify = (label: string) => {
    setShowNotify(label);
    setTimeout(() => setShowNotify(null), 3000);
  };

  return (
    <section id="eventos" className="relative py-28 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden">
      {/* Delicate horizontal divider lines */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      {/* Floating Notification for Calendar */}
      <AnimatePresence>
        {showNotify && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#1B365D] text-[#FAF6F0] text-xs font-serif tracking-wider px-6 py-3.5 rounded-full shadow-2xl border border-[#dfb559]/50 flex items-center gap-2.5"
          >
            <Check className="w-4 h-4 text-[#dfb559]" />
            <span>{showNotify}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <MapPin className="w-5 h-5 text-[#dfb559] mb-4" />
            <span className="font-sans text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-bold">
              {lang === "es" ? "Lugares y Horarios" : "Locations & Schedule"}
            </span>
            <h2 className="font-great-vibes text-5.5xl sm:text-7xl text-[#1B365D] mt-2 mb-2 select-none font-normal">
              {lang === "es" ? "¿Dónde y Cuándo?" : "Where & When?"}
            </h2>
            <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mt-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 w-full items-stretch">
          
          {/* ========================================== */}
          {/* LOCATION 1: CEREMONIA RELIGIOSA Y BAUTIZO */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white/90 border border-[#dfb559]/30 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center justify-between"
          >
            <div className="flex flex-col items-center">
              {/* Church Line Art */}
              <div className="relative mb-5 text-[#1B365D] hover:scale-105 transition-transform duration-500 ease-out select-none">
                <svg
                  viewBox="0 0 120 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-32 h-28 opacity-90 filter drop-shadow-sm"
                >
                  <line x1="8" y1="92" x2="112" y2="92" strokeWidth="1" />
                  <path d="M12 92 V68 Q12 64, 16 64 H32 V92" />
                  <path d="M22 74 H26" strokeWidth="0.8" />
                  <path d="M24 74 V82" strokeWidth="0.8" />
                  <path d="M88 92 V68 Q88 64, 92 64 H108 V92" />
                  <path d="M98 74 H102" strokeWidth="0.8" />
                  <path d="M100 74 V82" strokeWidth="0.8" />
                  <path d="M32 92 V48 L60 22 L88 48 V92" />
                  <path d="M32 48 H88" strokeWidth="0.8" />
                  <path d="M50 92 V76 C50 70, 70 70, 70 76 V92" />
                  <line x1="60" y1="70" x2="60" y2="92" strokeWidth="0.8" />
                  <path d="M52 28 V10 C52 8, 68 8, 68 10 V28" />
                  <path d="M52 10 L60 2 L68 10" />
                  <line x1="60" y1="2" x2="60" y2="-10" strokeWidth="1.3" />
                  <line x1="55" y1="-6" x2="65" y2="-6" strokeWidth="1.3" />
                  <circle cx="60" cy="40" r="7" strokeWidth="1" />
                  <path d="M42 56 V64" strokeWidth="1" />
                  <path d="M78 56 V64" strokeWidth="1" />
                </svg>
              </div>

              <span className="font-sans text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-bold mb-1">
                {lang === "es" ? "Misa de Matrimonio & Bautizo" : "Wedding Mass & Baptism"}
              </span>

              <h3 className="font-great-vibes text-4.5xl sm:text-5xl text-[#1B365D] tracking-wide mb-3 select-none leading-tight">
                Catedral de Abancay
              </h3>

              <div className="space-y-1.5 mb-6">
                <span className="font-serif text-[15px] text-[#1B365D] font-bold tracking-wide block">
                  02:00 PM
                </span>
                <span className="text-xs text-[#1B365D]/75 font-sans block">
                  Plaza Mayor de Abancay
                </span>
                <span className="text-[11px] text-[#c5a059] italic block font-serif">
                  {lang === "es" ? "Misa y Bautizo de Max Christian" : "Mass & Baptism of Max Christian"}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col items-center gap-3 pt-4 border-t border-[#dfb559]/20">
              <a
                href={churchNavUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs py-3 bg-[#1B365D] hover:bg-[#152a48] text-white font-serif text-[11px] font-bold uppercase tracking-[0.25em] shadow-md transition-all active:scale-97 cursor-pointer hover:shadow-lg rounded-lg flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#dfb559]" />
                <span>{lang === "es" ? "Ver Ubicación" : "View Map"}</span>
              </a>
              
              <a
                href={calendarChurchUrl}
                onClick={() => triggerCalendarNotify(lang === "es" ? "Misa agendada en calendario" : "Mass added to calendar")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B365D] hover:text-[#c5a059] text-[10.5px] uppercase tracking-widest font-bold underline decoration-dotted underline-offset-4 flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{lang === "es" ? "Agendar Ceremonia" : "Add to Calendar"}</span>
              </a>
            </div>
          </motion.div>


          {/* ========================================== */}
          {/* LOCATION 2: CIVIL & RECEPCIÓN */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="bg-white/90 border border-[#dfb559]/30 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center justify-between"
          >
            <div className="flex flex-col items-center">
              {/* Cake / Glass Line Art */}
              <div className="relative mb-5 text-[#1B365D] hover:scale-105 transition-transform duration-500 ease-out select-none">
                <svg
                  viewBox="0 0 120 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-32 h-28 opacity-90 filter drop-shadow-sm"
                >
                  <path d="M22 110 C22 107, 98 107, 98 110" />
                  <path d="M22 110 V113 C22 115, 98 115, 98 113 V110" />
                  <path d="M42 113 L45 117 H75 L78 113" />
                  <path d="M28 88 C28 80, 92 80, 92 88" />
                  <path d="M28 88 V106 C28 110, 92 110, 92 106 V88" />
                  <path d="M37 63 C37 56, 83 56, 83 63" />
                  <path d="M37 63 V82 C37 86, 83 86, 83 82 V63" />
                  <path d="M46 38 C46 33, 74 33, 74 38" />
                  <path d="M46 38 V57 C46 61, 74 61, 74 57 V38" />
                  <circle cx="60" cy="33" r="2.5" />
                  <path d="M57 33 C56 31, 59 29, 60 31 C61 29, 64 31, 63 33" strokeWidth="0.8" />
                  <circle cx="34" cy="100" r="4.5" />
                  <path d="M34 100 Q36 94, 30 96 Q26 100, 31 104 Q37 104, 34 100 Z" strokeWidth="0.7" />
                </svg>
              </div>

              <span className="font-sans text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-bold mb-1">
                {lang === "es" ? "Ceremonia Civil & Recepción" : "Civil Ceremony & Reception"}
              </span>

              <h3 className="font-great-vibes text-4.5xl sm:text-5xl text-[#1B365D] tracking-wide mb-3 select-none leading-tight">
                La Floresta de Favio
              </h3>

              <div className="space-y-1.5 mb-6">
                <span className="font-serif text-[15px] text-[#1B365D] font-bold tracking-wide block">
                  04:30 PM (Civil) & 05:30 PM (Recepción)
                </span>
                <span className="text-xs text-[#1B365D]/75 font-sans block">
                  Abancay, Apurímac
                </span>
                <span className="text-[11px] text-[#c5a059] italic block font-serif">
                  {lang === "es" ? "Ceremonia Civil, Cena & Gran Fiesta" : "Civil Ceremony, Dinner & Party"}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col items-center gap-3 pt-4 border-t border-[#dfb559]/20">
              <a
                href={receptionNavUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs py-3 bg-[#1B365D] hover:bg-[#152a48] text-white font-serif text-[11px] font-bold uppercase tracking-[0.25em] shadow-md transition-all active:scale-97 cursor-pointer hover:shadow-lg rounded-lg flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#dfb559]" />
                <span>{lang === "es" ? "Ver Ubicación" : "View Map"}</span>
              </a>

              <a
                href={calendarReceptionUrl}
                onClick={() => triggerCalendarNotify(lang === "es" ? "Recepción agendada en calendario" : "Reception added to calendar")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B365D] hover:text-[#c5a059] text-[10.5px] uppercase tracking-widest font-bold underline decoration-dotted underline-offset-4 flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{lang === "es" ? "Agendar Recepción" : "Add to Calendar"}</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
