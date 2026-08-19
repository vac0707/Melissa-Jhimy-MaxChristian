import { motion } from "motion/react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function Schedule() {
  const { lang } = useLanguage();

  // Schedule items matching the user's event schedule
  const scheduleItems = [
    {
      id: "1",
      side: "right" as const,
      time: "02:00 PM",
      titleEs: "MISA & BAUTIZO",
      titleEn: "CEREMONY & BAPTISM",
      descEs: "Catedral de Abancay",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <line x1="10" y1="90" x2="90" y2="90" strokeWidth="1" />
          <path d="M35 90 V50 L50 30 L65 50 V90" />
          <path d="M35 50 H65" strokeWidth="0.8" />
          <path d="M15 90 V65 L35 50" />
          <path d="M65 50 L85 65 V90" />
          <path d="M44 90 V75 C44 70, 56 70, 56 75 V90" />
          <line x1="50" y1="70" x2="50" y2="90" strokeWidth="0.8" />
          <path d="M47 34 V15 H53 V34" />
          <path d="M47 15 L50 5 L53 15" />
          <path d="M42 58 V66" strokeWidth="0.8" />
          <path d="M58 58 V66" strokeWidth="0.8" />
          <line x1="50" y1="5" x2="50" y2="-5" strokeWidth="1.3" />
          <line x1="46" y1="-1" x2="54" y2="-1" strokeWidth="1.3" />
        </svg>
      )
    },
    {
      id: "2",
      side: "left" as const,
      time: "03:30 PM",
      titleEs: "SESIÓN DE FOTOS",
      titleEn: "PHOTOS",
      descEs: "Recuerdos inolvidables",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <rect x="20" y="35" width="60" height="42" rx="4" />
          <path d="M35 35 V28 H45 V35" />
          <circle cx="68" cy="27" r="4" />
          <rect x="27" y="42" width="10" height="6" rx="1" />
          <circle cx="50" cy="56" r="17" />
          <path d="M50 62 L46.5 58.5 C41 53.5 39.5 50 42 47 C44 44.5 47.5 44.5 50 47.5 C52.5 44.5 56 44.5 58 47 C60.5 50 59 53.5 53.5 58.5 Z" fill="#1B365D" opacity="0.12" />
          <path d="M50 62 L46.5 58.5 C41 53.5 39.5 50 42 47 C44 44.5 47.5 44.5 50 47.5 C52.5 44.5 56 44.5 58 47 C60.5 50 59 53.5 53.5 58.5 Z" stroke="#1B365D" strokeWidth="1.1" />
        </svg>
      )
    },
    {
      id: "3",
      side: "right" as const,
      time: "04:30 PM",
      titleEs: "CEREMONIA CIVIL",
      titleEn: "CIVIL CEREMONY",
      descEs: "La Floresta de Favio",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <line x1="15" y1="90" x2="85" y2="90" strokeWidth="1" />
          <path d="M28 90 V55 C28 35, 72 35, 72 55 V90" />
          <path d="M50 35 L47.5 32.5 C43 28, 41 25, 43 22 C45 19, 48 19, 50 21.5 C52 19, 55 19, 57 22 C59 25, 57 28, 52.5 32.5 Z" stroke="#1B365D" strokeWidth="1.2" />
          <path d="M34 72 H66" />
          <path d="M38 72 V90" />
          <path d="M62 72 V90" />
          <path d="M46 63 H50 V72 H46 Z" />
          <path d="M50 63 H54 V72 H50 Z" />
        </svg>
      )
    },
    {
      id: "4",
      side: "left" as const,
      time: "05:30 PM",
      titleEs: "RECEPCIÓN Y BRINDIS",
      titleEn: "RECEPTION & TOAST",
      descEs: "Copa de bienvenida",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <g transform="translate(42, 54) rotate(18) translate(-42, -54)">
            <path d="M30 35 L42 35 L44 55 C44 60, 36 60, 36 55 Z" fill="#1B365D" opacity="0.1" />
            <path d="M30 35 L42 35 L44 55 C44 60, 36 60, 36 55 Z" />
            <line x1="40" y1="58" x2="40" y2="78" />
            <ellipse cx="40" cy="78" rx="8" ry="1.5" />
          </g>
          <g transform="translate(58, 54) rotate(-18) translate(-58, -54)">
            <path d="M70 35 L58 35 L56 55 C56 60, 64 60, 64 55 Z" fill="#1B365D" opacity="0.1" />
            <path d="M70 35 L58 35 L56 55 C56 60, 64 60, 64 55 Z" />
            <line x1="60" y1="58" x2="60" y2="78" />
            <ellipse cx="60" cy="78" rx="8" ry="1.5" />
          </g>
          <path d="M50 31 L50 24" />
          <path d="M43 37 L38 33" />
          <path d="M57 37 L62 33" />
          <circle cx="49" cy="39" r="1" fill="#1B365D" />
          <circle cx="51" cy="44" r="0.8" fill="#1B365D" />
          <circle cx="46" cy="45" r="0.8" fill="#1B365D" />
        </svg>
      )
    },
    {
      id: "5",
      side: "right" as const,
      time: "06:30 PM",
      titleEs: "BAILE DE HONOR",
      titleEn: "WALTZ DANCE",
      descEs: "Vals con los novios",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <circle cx="43" cy="24" r="4.5" />
          <path d="M39 23 C34 26, 32 35, 34 50 L38 48" />
          <circle cx="55" cy="22" r="4.5" />
          <path d="M62 30 C58 29, 52 32, 49 35" />
          <path d="M55 26.5 V48 L48 64" />
          <path d="M43 28.5 C38 32, 34 38, 32 46 C35 56, 31 70, 26 82 C34 86, 62 86, 74 80 C68 70, 56 46, 47 38" fill="#1B365D" opacity="0.1" />
          <path d="M43 28.5 C38 32, 34 38, 32 46 C35 56, 31 70, 26 82 C34 86, 62 86, 74 80 C68 70, 56 46, 47 38" />
          <path d="M38 52 C42 60, 48 68, 56 75" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <path d="M32 38 Q35 34, 38 38" />
        </svg>
      )
    },
    {
      id: "6",
      side: "left" as const,
      time: "07:30 PM",
      titleEs: "1ER AÑITO & PASTEL",
      titleEn: "1ST BIRTHDAY & CAKE",
      descEs: "Celebrando a Max Christian",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <path d="M22 62 C22 62, 25 88, 50 88 C75 88, 78 62, 78 62" />
          <path d="M16 62 H84 L78 88 H22 Z" fill="#1B365D" opacity="0.08" />
          <ellipse cx="50" cy="62" rx="34" ry="5" />
          <line x1="50" y1="62" x2="50" y2="44" strokeWidth="1.5" />
          <path d="M44 48 C44 48, 44 53, 50 53 C56 53, 56 48, 56 48" />
          <line x1="44" y1="48" x2="44" y2="43" />
          <line x1="56" y1="48" x2="56" y2="43" />
          <circle cx="44" cy="40" r="1.2" fill="#dfb559" />
          <circle cx="50" cy="36" r="1.5" fill="#dfb559" />
          <circle cx="56" cy="40" r="1.2" fill="#dfb559" />
          <ellipse cx="30" cy="62" rx="4" ry="1.2" />
          <ellipse cx="70" cy="62" rx="4" ry="1.2" />
        </svg>
      )
    },
    {
      id: "7",
      side: "right" as const,
      time: "08:30 PM",
      titleEs: "FIESTA Y MÚSICA",
      titleEn: "PARTY & MUSIC",
      descEs: "Celebración y diversión",
      icon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="#1B365D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(27,54,93,0.1)]">
          <path d="M30 65 V30 L65 22 V55" />
          <path d="M30 40 L65 32" strokeWidth="1.2" />
          <path d="M30 30 L65 22" strokeWidth="2" />
          <g transform="rotate(-15, 30, 65)">
            <ellipse cx="23" cy="65" rx="7" ry="4.5" fill="#1B365D" />
          </g>
          <g transform="rotate(-15, 65, 55)">
            <ellipse cx="58" cy="55" rx="7" ry="4.5" fill="#1B365D" />
          </g>
          <path d="M72 45 V25 Q78 28, 85 27" strokeWidth="0.8" />
          <circle cx="72" cy="45" r="3" fill="#1B365D" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative min-h-[100svh] py-14 sm:py-18 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden flex flex-col justify-center items-center">
      {/* Floral Frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-2xl w-full mx-auto relative z-10 my-auto">
        
        {/* Title "Itinerario" in Calligraphy Script */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-great-vibes text-[56px] sm:text-[76px] md:text-[84px] text-[#1B365D] select-none leading-none mb-2 font-normal">
              {lang === "es" ? "Itinerario" : "Schedule"}
            </h2>
            {/* Center line small floral flourish */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-[0.5px] bg-[#dfb559]/50" />
              <svg viewBox="0 0 24 24" fill="none" stroke="#dfb559" strokeWidth="1" className="w-4 h-4 opacity-70">
                <path d="M12 2 Q14 8, 20 12 Q14 16, 12 22 Q10 16, 4 12 Q10 8, 12 2 Z" />
              </svg>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/50" />
            </div>
          </motion.div>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pb-16">
          {/* Centered Solid Vertical Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[1.5px] bg-[#dfb559]/60" />

          {/* Timeline Grid Rows */}
          <div className="space-y-12 sm:space-y-16">
            {scheduleItems.map((item) => {
              const isLeft = item.side === "left";

              return (
                <div key={item.id} className="relative grid grid-cols-2 gap-x-8 sm:gap-x-12 items-center w-full min-h-[70px]">
                  
                  {/* Left Side Column */}
                  <div className="w-full">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-end gap-3.5 sm:gap-5 text-right w-full relative"
                      >
                        {/* Information texts: Time & Title */}
                        <div className="flex flex-col">
                          <span className="font-serif text-[13px] sm:text-[14px] tracking-wider text-[#c5a059] font-bold leading-none mb-1">
                            {item.time}
                          </span>
                          <span className="font-serif font-bold text-[14.5px] sm:text-[16.5px] uppercase tracking-[0.16em] text-[#1B365D] leading-tight">
                            {lang === "es" ? item.titleEs : item.titleEn}
                          </span>
                          {item.descEs && (
                            <span className="text-[12px] sm:text-[13px] text-[#1B365D]/85 font-sans mt-0.5">
                              {item.descEs}
                            </span>
                          )}
                        </div>

                        {/* Hand Sketched Icon inside clean box */}
                        <div className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-sm border border-[#dfb559]/40 bg-white shadow-sm flex items-center justify-center flex-shrink-0 relative">
                          {item.icon}
                        </div>

                        {/* Direct Horizontal connector line to the central line */}
                        <div className="absolute right-[-16px] sm:right-[-24px] top-1/2 -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-[#dfb559]/60" />
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Column */}
                  <div className="w-full">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-start gap-3.5 sm:gap-5 text-left w-full relative"
                      >
                        {/* Direct Horizontal connector line to the central line */}
                        <div className="absolute left-[-16px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-[#dfb559]/60" />

                        {/* Hand Sketched Icon inside clean box */}
                        <div className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-sm border border-[#dfb559]/40 bg-white shadow-sm flex items-center justify-center flex-shrink-0 relative">
                          {item.icon}
                        </div>

                        {/* Information texts: Time & Title */}
                        <div className="flex flex-col">
                          <span className="font-serif text-[13px] sm:text-[14px] tracking-wider text-[#c5a059] font-bold leading-none mb-1">
                            {item.time}
                          </span>
                          <span className="font-serif font-bold text-[14.5px] sm:text-[16.5px] uppercase tracking-[0.16em] text-[#1B365D] leading-tight">
                            {lang === "es" ? item.titleEs : item.titleEn}
                          </span>
                          {item.descEs && (
                            <span className="text-[12px] sm:text-[13px] text-[#1B365D]/85 font-sans mt-0.5">
                              {item.descEs}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Center alignment Bottom caption block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mt-6 flex flex-col items-center"
        >
          <div className="w-16 h-[0.7px] bg-[#dfb559]/40 mb-5" />

          <h3 className="font-serif text-[15.5px] sm:text-[18px] font-bold text-[#1B365D] uppercase tracking-[0.2em] select-none">
            {lang === "es" ? "¡CELEBRACIÓN Y FIESTA INOLVIDABLE!" : "¡UNFORGETTABLE CELEBRATION!"}
          </h3>

          <div className="flex gap-2.5 mt-4 select-none opacity-60">
            <svg viewBox="0 0 24 24" fill="none" stroke="#dfb559" strokeWidth="1.2" className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]">
              <path d="M12 2 C13 7, 18 11, 22 12 C18 13, 13 17, 12 22 C11 17, 6 13, 2 12 C6 11, 11 7, 12 2 Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="#dfb559" strokeWidth="1.2" className="w-3.5 h-3.5 animate-[spin_15s_linear_infinite]">
              <path d="M12 2 C13 7, 18 11, 22 12 C18 13, 13 17, 12 22 C11 17, 6 13, 2 12 C6 11, 11 7, 12 2 Z" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
