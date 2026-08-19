import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CountdownTime } from "../types";
import { Sparkles, CalendarDays, Clock } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function CountdownPage() {
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
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
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
    <section className="relative min-h-[100svh] w-full py-10 sm:py-14 px-4 sm:px-6 bg-[#FAF6F0] flex flex-col justify-center items-center overflow-hidden">
      {/* Floral corners */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center my-auto">
        {/* Header styling */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.25em] uppercase font-bold text-[#c5a059]">
              {lang === "es" ? "Cada segundo cuenta" : "Every second counts"}
            </span>
          </div>

          <h3 className="font-great-vibes text-[56px] sm:text-[76px] md:text-[84px] text-[#1B365D] tracking-wide font-normal mb-1 leading-none select-none">
            {lang === "es" ? "Faltan" : "Countdown"}
          </h3>
          <div className="w-16 h-[0.5px] bg-[#dfb559]/50 mt-1" />
        </motion.div>

        {/* Real-time horizontal counter badge in Navy card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#132742] text-white rounded-2xl py-4.5 px-4 sm:px-6 border border-[#dfb559]/40 shadow-lg mb-6 relative overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center text-white">
            {/* DAYS */}
            <div className="flex flex-col items-center">
              <span className="font-sans text-3.5xl sm:text-4.5xl font-light tracking-tight select-none leading-none">
                {padZero(timeLeft.days)}
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#dfb559] uppercase mt-2 font-bold">
                {lang === "es" ? "DÍAS" : "DAYS"}
              </span>
            </div>

            {/* COLON */}
            <div className="flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-light text-white/30 select-none pb-3">:</span>
            </div>

            {/* HOURS */}
            <div className="flex flex-col items-center">
              <span className="font-sans text-3.5xl sm:text-4.5xl font-light tracking-tight select-none leading-none">
                {padZero(timeLeft.hours)}
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#dfb559] uppercase mt-2 font-bold">
                {lang === "es" ? "HORAS" : "HOURS"}
              </span>
            </div>

            {/* COLON */}
            <div className="flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-light text-white/30 select-none pb-3">:</span>
            </div>

            {/* MINUTES */}
            <div className="flex flex-col items-center">
              <span className="font-sans text-3.5xl sm:text-4.5xl font-light tracking-tight select-none leading-none">
                {padZero(timeLeft.minutes)}
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#dfb559] uppercase mt-2 font-bold">
                {lang === "es" ? "MIN" : "MIN"}
              </span>
            </div>

            {/* COLON */}
            <div className="flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-light text-white/30 select-none pb-3">:</span>
            </div>

            {/* SECONDS */}
            <div className="flex flex-col items-center">
              <span className="font-sans text-3.5xl sm:text-4.5xl font-light tracking-tight text-[#dfb559] select-none leading-none">
                {padZero(timeLeft.seconds)}
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#dfb559] uppercase mt-2 font-bold">
                {lang === "es" ? "SEG" : "SEC"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mini Calendar Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full max-w-sm mx-auto bg-white/90 rounded-2xl p-4.5 sm:p-5 shadow-[0_10px_30px_rgba(27,54,93,0.06)] border border-[#dfb559]/30 relative text-[#1B365D]"
        >
          {/* Month Header */}
          <div className="text-center mb-3">
            <h4 className="font-serif text-[15.5px] sm:text-[17px] text-[#1B365D] tracking-[0.2em] font-bold uppercase">
              {lang === "es" ? "SETIEMBRE 2026" : "SEPTEMBER 2026"}
            </h4>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center relative z-20 text-[12px] sm:text-[13px]">
            {/* Weekdays Header */}
            {(lang === "es"
              ? ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
              : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
            ).map((day, idx) => (
              <span
                key={idx}
                className="font-great-vibes text-[17px] text-[#c5a059] pb-1 font-semibold"
              >
                {day}
              </span>
            ))}

            {/* Days list */}
            {[
              { day: "", isPlaceholder: true },
              { day: "1", isWeddingDay: false },
              { day: "2", isWeddingDay: false },
              { day: "3", isWeddingDay: false },
              { day: "4", isWeddingDay: false },
              { day: "5", isWeddingDay: false },
              { day: "6", isWeddingDay: false },
              { day: "7", isWeddingDay: true }, // Monday Sep 7th
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
                    className="aspect-square flex items-center justify-center relative select-none"
                  >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg viewBox="0 0 24 24" fill="#1B365D" className="w-8.5 h-8.5 drop-shadow text-[#1B365D] animate-pulse">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>

                    <span className="relative z-10 text-[11px] font-extrabold text-[#FAF6F0] leading-none">
                      7
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="aspect-square flex items-center justify-center rounded-full text-[13px] font-serif text-[#1B365D]/85 font-medium"
                >
                  <span>{item.day}</span>
                </div>
              );
            })}
          </div>

          {/* Calendar Footer */}
          <div className="mt-3 pt-2.5 border-t border-[#dfb559]/30 text-center">
            <p className="font-serif text-[14px] sm:text-[15.5px] font-bold tracking-wide text-[#1B365D]">
              {lang === "es" ? "Lunes, 7 de Setiembre • 02:00 PM" : "Monday, September 7 • 02:00 PM"}
            </p>
            <p className="text-[10.5px] text-[#c5a059] uppercase tracking-[0.25em] font-bold mt-0.5 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#dfb559]" />
              <span>Catedral de Abancay</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
