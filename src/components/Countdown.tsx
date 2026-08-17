import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CountdownTime } from "../types";
import { Sparkles, CalendarDays } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Countdown() {
  const { t, lang } = useLanguage();
  const targetDate = new Date("2026-09-07T14:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const padZero = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <>
      {/* 1. SEPARATED COUNTDOWN CLOCK SECTION */}
      <section 
        id="cuenta-regresiva" 
        className="relative py-24 px-4 sm:px-6 bg-[#132742] flex flex-col items-center overflow-hidden"
      >
        {/* Background radial gold glow vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
          {/* Elegant header styling */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center mb-8"
          >
            <h3 className="font-great-vibes text-7xl sm:text-8xl text-white tracking-wide font-normal mb-1 leading-none antialiased select-none">
              {lang === "es" ? "Faltan" : "Countdown"}
            </h3>
            <div className="w-12 h-[0.5px] bg-[#dfb559]/40 mt-2" />
          </motion.div>

          {timeLeft.isCompleted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-dark border-2 border-[#dfb559]/30 rounded-sm py-12 px-10 max-w-xl mx-auto shadow-2xl relative"
            >
              <div className="absolute inset-1 border border-[#dfb559]/10" />
              <p className="font-serif text-3xl text-[#dfb559] tracking-wider font-light">
                {t("countdown.completed_title")}
              </p>
              <p className="text-[#c5a059] text-xs font-light mt-3 uppercase tracking-widest">
                {t("countdown.completed_subtitle")}
              </p>
            </motion.div>
          ) : (
            /* Elegant, high-fidelity horizontal countdown with inline colons */
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mx-auto py-2"
            >
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start text-white">
                {/* DAYS */}
                <div className="flex flex-col items-center">
                  <span className="font-sans text-5xl sm:text-7xl md:text-8xl font-light tracking-tight select-none leading-none">
                    {padZero(timeLeft.days)}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#dfb559] uppercase mt-3 font-semibold">
                    {lang === "es" ? "DÍAS" : "DAYS"}
                  </span>
                </div>

                {/* COLON */}
                <div className="flex items-center justify-center h-[3rem] sm:h-[4.5rem] md:h-[6rem]">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/30 select-none leading-none">:</span>
                </div>

                {/* HOURS */}
                <div className="flex flex-col items-center">
                  <span className="font-sans text-5xl sm:text-7xl md:text-8xl font-light tracking-tight select-none leading-none">
                    {padZero(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#dfb559] uppercase mt-3 font-semibold">
                    {lang === "es" ? "HORAS" : "HOURS"}
                  </span>
                </div>

                {/* COLON */}
                <div className="flex items-center justify-center h-[3rem] sm:h-[4.5rem] md:h-[6rem]">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/30 select-none leading-none">:</span>
                </div>

                {/* MINUTES */}
                <div className="flex flex-col items-center">
                  <span className="font-sans text-5xl sm:text-7xl md:text-8xl font-light tracking-tight select-none leading-none">
                    {padZero(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#dfb559] uppercase mt-3 font-semibold">
                    {lang === "es" ? "MINUTOS" : "MINUTES"}
                  </span>
                </div>

                {/* COLON */}
                <div className="flex items-center justify-center h-[3rem] sm:h-[4.5rem] md:h-[6rem]">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/30 select-none leading-none">:</span>
                </div>

                {/* SECONDS */}
                <div className="flex flex-col items-center">
                  <span className="font-sans text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#dfb559] select-none leading-none">
                    {padZero(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#dfb559] uppercase mt-3 font-semibold">
                    {lang === "es" ? "SEGUNDOS" : "SECONDS"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 2. SPECIFIC SEPARATED CALENDAR SECTION */}
      <section 
        id="calendario" 
        className="relative py-24 px-4 sm:px-6 bg-[#FAF6F0] flex flex-col items-center overflow-hidden"
      >
        {/* Soft elegant gradient divider lines at boundaries */}
        <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/30 to-transparent" />

        <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
          <h4 className="font-great-vibes text-5.5xl sm:text-7xl text-[#1B365D] tracking-normal mb-8 select-none leading-none">
            {lang === "es" ? "Reserva la fecha" : "Save the Date"}
          </h4>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="w-full max-w-sm mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(27,54,93,0.1)] border border-[#dfb559]/30 relative overflow-hidden text-[#1B365D]"
          >
            {/* Top-Right Flower Corner Decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none select-none z-10">
              <img 
                src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png" 
                alt="Decoración superior" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-right-top"
              />
            </div>

            {/* Bottom-Left Flower Corner Decoration */}
            <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none select-none z-10">
              <img 
                src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png" 
                alt="Decoración inferior" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-left-bottom"
              />
            </div>

            {/* Month Header */}
            <div className="text-center mb-8 mt-2">
              <h4 className="font-serif text-[18px] sm:text-[21px] text-[#1B365D] tracking-[0.25em] font-bold uppercase">
                {lang === "es" ? "SETIEMBRE 2026" : "SEPTEMBER 2026"}
              </h4>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center relative z-20">
              {/* Weekdays Header */}
              {(lang === "es" 
                ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] 
                : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
              ).map((day, idx) => (
                <span
                  key={idx}
                  className="font-great-vibes text-[17px] sm:text-[19px] text-[#c5a059] pb-3 font-semibold"
                >
                  {day}
                </span>
              ))}

              {/* Days list (September 2026 starts on Tuesday, has 30 days) */}
              {[
                { day: "", isPlaceholder: true }, // Monday Aug 31
                { day: "1", isWeddingDay: false },
                { day: "2", isWeddingDay: false },
                { day: "3", isWeddingDay: false },
                { day: "4", isWeddingDay: false },
                { day: "5", isWeddingDay: false },
                { day: "6", isWeddingDay: false },
                { day: "7", isWeddingDay: true }, // Monday Sep 7th (Celebration Day)
                { day: "8", isWeddingDay: false },
                { day: "9", isWeddingDay: false },
                { day: "10", isWeddingDay: false },
                { day: "11", isWeddingDay: false },
                { day: "12", isWeddingDay: false },
                { day: "13", isWeddingDay: false },
                { day: "14", isWeddingDay: false },
                { day: "15", isWeddingDay: false },
                { day: "16", isWeddingDay: false },
                { day: "17", isWeddingDay: false },
                { day: "18", isWeddingDay: false },
                { day: "19", isWeddingDay: false },
                { day: "20", isWeddingDay: false },
                { day: "21", isWeddingDay: false },
                { day: "22", isWeddingDay: false },
                { day: "23", isWeddingDay: false },
                { day: "24", isWeddingDay: false },
                { day: "25", isWeddingDay: false },
                { day: "26", isWeddingDay: false },
                { day: "27", isWeddingDay: false },
                { day: "28", isWeddingDay: false },
                { day: "29", isWeddingDay: false },
                { day: "30", isWeddingDay: false },
              ].map((item, idx) => {
                if (item.isPlaceholder) {
                  return <div key={idx} className="aspect-square" />;
                }

                if (item.isWeddingDay) {
                  return (
                    <div
                      key={idx}
                      className="aspect-square flex items-center justify-center relative select-none cursor-default"
                    >
                      {/* Navy Blue solid heart with "7" inside */}
                      <div className="absolute inset-0.5 flex items-center justify-center pointer-events-none scale-105">
                        <svg viewBox="0 0 24 24" fill="#1B365D" className="w-10 h-10 drop-shadow-md text-[#1B365D] animate-[pulse_2s_infinite]">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>

                      <span className="relative z-10 text-[12px] sm:text-sm font-extrabold text-[#F1E9DC] leading-none tracking-normal font-sans pt-0.5">
                        7
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="aspect-square flex items-center justify-center rounded-full text-[13px] sm:text-sm font-light text-[#1B365D]/80 font-serif hover:bg-[#F1E9DC] transition-all cursor-default select-none relative"
                  >
                    <span>{item.day}</span>
                  </div>
                );
              })}
            </div>

            {/* Calendar Footer Info */}
            <div className="mt-8 pt-4 border-t border-[#dfb559]/30 text-center relative z-20">
              <p className="font-serif text-[13.5px] sm:text-[14.5px] font-bold tracking-wide text-[#1B365D] leading-normal">
                {lang === "es" ? "Lunes, 7 de Setiembre • 02:00 PM" : "Monday, September 7 • 02:00 PM"}
              </p>
              <p className="text-[10px] text-[#c5a059] uppercase tracking-[0.25em] font-bold mt-1 inline-flex items-center gap-1.5 justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb559]" />
                <span>Catedral de Abancay</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
