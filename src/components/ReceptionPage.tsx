import { motion } from "motion/react";
import { GlassWater, MapPin, Calendar, Clock, ExternalLink, Sparkles, Music } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function ReceptionPage() {
  const { lang } = useLanguage();

  const receptionMapUrl = "https://maps.google.com/?q=La+Floresta+de+Favio+Abancay";
  const receptionCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Recepci%C3%B3n+y+Fiesta:+Melissa+y+Jhimy&dates=20260907T213000Z/20260908T050000Z&details=Matrimonio+Civil+y+Gran+Recepci%C3%B3n+Social&location=La+Floresta+de+Favio,+Abancay";

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
          className="flex flex-col items-center mb-6"
        >
          {/* Vector Celebration Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#132742] border-2 border-[#dfb559] flex items-center justify-center text-[#dfb559] mb-3 shadow-lg">
            <GlassWater className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <span className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.25em] uppercase font-bold text-[#c5a059] mb-1">
            {lang === "es" ? "Celebración Social" : "Social Celebration"}
          </span>

          <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] leading-[1.1] mb-2 select-none font-normal">
            {lang === "es" ? "Recepción & Fiesta" : "Wedding Reception"}
          </h2>

          <div className="w-16 h-[0.5px] bg-[#dfb559]/50 mt-1 mb-4" />

          {/* Emotional Phrase */}
          <p className="font-serif text-[15px] sm:text-[16.5px] text-[#1B365D]/90 italic max-w-lg leading-relaxed font-medium px-4">
            “Después de la ceremonia, los esperamos para compartir una noche llena de amor, alegría y momentos inolvidables junto a nuestra familia y amigos.”
          </p>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full max-w-md bg-white/90 rounded-2xl p-6 sm:p-7 border border-[#dfb559]/40 shadow-sm relative overflow-hidden"
        >
          {/* Location & Time Rows */}
          <div className="space-y-4 text-center">
            {/* Times: Civil & Reception */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[11.5px] sm:text-[12.5px] uppercase tracking-widest font-bold">
                  {lang === "es" ? "Horario del Evento" : "Event Schedule"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B365D]">
                    04:30 PM
                  </p>
                  <span className="text-[11px] sm:text-[11.5px] text-[#c5a059] font-sans uppercase font-bold tracking-wider">
                    {lang === "es" ? "Matrimonio Civil" : "Civil Wedding"}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-[#dfb559]/30" />
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B365D]">
                    05:30 PM
                  </p>
                  <span className="text-[11px] sm:text-[11.5px] text-[#c5a059] font-sans uppercase font-bold tracking-wider">
                    {lang === "es" ? "Gran Recepción" : "Grand Reception"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[0.5px] bg-[#dfb559]/20" />

            {/* Place */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-[11.5px] sm:text-[12.5px] uppercase tracking-widest font-bold">
                  {lang === "es" ? "Local de Eventos" : "Event Venue"}
                </span>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B365D]">
                La Floresta de Favio
              </p>
              <span className="text-[13px] sm:text-[14px] text-[#1B365D]/80 font-serif italic">
                Abancay, Apurímac
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={receptionMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#132742] hover:bg-[#1B365D] text-[#dfb559] border border-[#dfb559]/40 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === "es" ? "Ver Ubicación" : "View Map"}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={receptionCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#1B365D] border border-[#dfb559]/50 text-xs sm:text-[13px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{lang === "es" ? "Agendar" : "Add Calendar"}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
