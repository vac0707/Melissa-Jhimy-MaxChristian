import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Music, MailOpen } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

interface WelcomeScreenProps {
  onOpen: () => void;
}

type CinematicPhase =
  | "initial"       // 1. Closed Envelope sitting on screen, floating gently
  | "pressing"      // 2. Clicked: Envelope elevates, gets 3D depth, prepares to open
  | "transforming"  // 3. Cinematic 3D flip/3D rotation: Closed envelope transforms into Open Envelope
  | "open"          // 4. Open Envelope sits briefly
  | "emerging"      // 5. Card with the romantic couple photo slides up slowly from inside the open envelope
  | "zooming"       // 6. Card performs zoom progressive scale, expanding to occupy full screen
  | "fading";       // 7. Elite fade out to reveal the main wedding page

export default function WelcomeScreen({ onOpen }: WelcomeScreenProps) {
  const { lang, t } = useLanguage();
  const [phase, setPhase] = useState<CinematicPhase>("initial");

  // Couple names for display
  const groom = "JHIMY";
  const bride = "MELISSA";

  // Control timeline of the cinematic animation sequence
  const startCinematicJourney = () => {
    if (phase !== "initial") return;

    // Step 1: Elevate and apply depth
    setPhase("pressing");

    // Step 2: Begin 3D transformation from closed to open (at 1.0s)
    setTimeout(() => {
      setPhase("transforming");
    }, 1000);

    // Step 3: Reveal open envelope (at 1.8s)
    setTimeout(() => {
      setPhase("open");
    }, 1800);

    // Step 4: Photo card starts emerging slowly from inside (at 2.2s)
    setTimeout(() => {
      setPhase("emerging");
    }, 2200);

    // Step 5: Card scales up fully and zooms to cover screen (at 4.8s)
    setTimeout(() => {
      setPhase("zooming");
    }, 4800);

    // Step 6: Fade out screen to unlock main layout (at 6.1s)
    setTimeout(() => {
      setPhase("fading");
    }, 6100);

    // Step 7: Final transition trigger to App.tsx (at 6.8s)
    setTimeout(() => {
      onOpen();
    }, 6800);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#F1E9DC] text-[#1B365D] overflow-hidden flex flex-col items-center justify-center font-sans select-none z-50">
      
      {/* 1. LUXURIOUS AMBIENT BACKDROP */}
      {/* Elegant very soft radial navy-gold glow on ivory canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,54,93,0.06)_0%,rgba(241,233,220,1)_85%)] leading-none pointer-events-none z-0" />
      
      {/* Absolute master luxury vignette for depth of field */}
      <div 
        className="absolute inset-0 bg-transparent transition-all duration-[2000ms] ease-out pointer-events-none z-10"
        style={{
          boxShadow: phase === "initial" || phase === "pressing"
            ? "inset 0 0 80px rgba(27, 54, 93, 0.05)"
            : "inset 0 0 140px rgba(27, 54, 93, 0.12)"
        }}
      />

      {/* Luxury double golden-filigree frame border around the screen */}
      <div className="absolute inset-4 sm:inset-6 border border-[#dfb559]/25 pointer-events-none z-20 transition-opacity duration-1000" />
      <div className="absolute inset-5 sm:inset-8 border border-[#dfb559]/10 pointer-events-none z-20 transition-opacity duration-1000" />

      {/* Floating high-end subtle gold micro-particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#dfb559]/40"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              width: `${Math.random() * 3.5 + 1.5}px`,
              height: `${Math.random() * 3.5 + 1.5}px`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `float-golden-sparks ${Math.random() * 6 + 6}s linear infinite`,
              animationDelay: `${Math.random() * -4}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {phase !== "fading" && (
          <>
            {/* Top-Right Floral Decoration (rosa.png) */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95, x: 30, y: -30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 30, y: -30, transition: { duration: 0.8 } }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png"
              alt="Decoración de rosas azul y dorada arriba derecha"
              className="fixed top-0 right-0 w-[150px] sm:w-[240px] md:w-[320px] h-auto object-contain z-40 pointer-events-none select-none origin-top-right"
              referrerPolicy="no-referrer"
            />

            {/* Bottom-Left Floral Decoration (izquierda_abajo.png) */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95, x: -30, y: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -30, y: 30, transition: { duration: 0.8 } }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png"
              alt="Decoración de rosas azul y dorada abajo izquierda"
              className="fixed bottom-0 left-0 w-[150px] sm:w-[240px] md:w-[320px] h-auto object-contain z-40 pointer-events-none select-none origin-bottom-left"
              referrerPolicy="no-referrer"
            />

            <motion.div
              key="cinematic-container"
              exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="relative w-full max-w-2xl px-4 flex flex-col items-center justify-center z-30"
            >
            {/* 3. CORE ENVELOPE 3D TRANSLATOR DECK */}
            <div className="relative flex flex-col items-center justify-center py-4 w-full [perspective:1400px]">
              
              {/* DYNAMIC BACKING SHADOW */}
              <motion.div
                className="absolute bg-black/15 filter blur-xl rounded-full z-10"
                style={{
                  bottom: -15,
                  width: "360px",
                  height: "28px",
                }}
                animate={
                  phase === "initial"
                    ? { scale: [1, 0.94, 1], opacity: [0.22, 0.14, 0.22], y: [0, 4, 0] }
                    : phase === "pressing"
                    ? { scale: 1.15, opacity: 0.28, y: 15, filter: "blur(20px)" }
                    : phase === "transforming"
                    ? { scale: [1.15, 0.9, 1.1], opacity: [0.28, 0.1, 0.25], rotateX: 30 }
                    : { scale: 1.25, opacity: 0.18, y: 35, filter: "blur(25px)" }
                }
                transition={
                  phase === "initial"
                    ? { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                    : { duration: 1.2, ease: "easeOut" }
                }
              />

              {/* STAGE A: CLOSED ENVELOPE (Fades / transforms / flips) */}
              <AnimatePresence>
                {(phase === "initial" || phase === "pressing" || phase === "transforming") && (
                  <motion.div
                    key="closed-envelope-card"
                    className="relative z-20 cursor-pointer w-[340px] sm:w-[440px] md:w-[480px] aspect-[4/3] flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                    animate={
                      phase === "initial"
                        ? {
                            scale: 1,
                            opacity: 1,
                            y: [0, -8, 0],
                            rotateX: [0, 2.5, 0],
                            rotateY: [0, -3.5, 0],
                          }
                        : phase === "pressing"
                        ? {
                            scale: 1.06,
                            opacity: 1,
                            y: -25,
                            rotateX: -15,
                            rotateY: 8,
                            z: 50,
                          }
                        : {
                            scale: 0.85,
                            opacity: 0,
                            y: -10,
                            rotateX: 75,
                            rotateY: -45,
                            rotateZ: 20,
                            filter: "blur(4px)",
                          }
                    }
                    exit={{ opacity: 0 }}
                    transition={
                      phase === "initial"
                        ? {
                            y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                            rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                            rotateY: { repeat: Infinity, duration: 5.2, ease: "easeInOut" },
                            default: { duration: 1.2 }
                          }
                        : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                    }
                    onClick={startCinematicJourney}
                  >
                    {/* Real high resolution Closed Envelope */}
                    <img
                      src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786934334/CERRADO.png"
                      alt="Sobre cerrado de matrimonio"
                      className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Highly aesthetic luxury wax seal indicator on top */}
                    {phase === "initial" && (
                      <>
                        <motion.div 
                          className="absolute w-20 h-20 rounded-full border-2 border-[#dfb559]/50 bg-amber-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                          style={{ top: "65%", left: "50%" }}
                          animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.7, 0, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        />
                        <div 
                          className="absolute pointer-events-none flex flex-col items-center justify-center select-none -translate-x-1/2"
                          style={{ 
                            top: "70%", 
                            left: "50%",
                          }}
                        >
                          <span 
                            className="font-serif text-[11px] sm:text-[13px] tracking-[0.28em] text-[#553c25] font-extrabold uppercase pointer-events-none select-none px-3 py-1 rounded-full bg-[#FAF6F0]/85 shadow-sm border border-[#dfb559]/40"
                            style={{
                              textShadow: "0.5px 0.5px 0.5px rgba(255, 255, 255, 0.8)",
                            }}
                          >
                            {lang === "es" ? "DESCUBRIR" : "DISCOVER"}
                          </span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE B: OPEN ENVELOPE & EMBRACING RHYTHMIC PORTRAIT */}
              <AnimatePresence>
                {(phase === "transforming" || phase === "open" || phase === "emerging" || phase === "zooming") && (
                  <motion.div
                    key="open-envelope-card"
                    className="absolute inset-0 mx-auto z-20 w-[340px] sm:w-[440px] md:w-[480px] aspect-[4/3] flex items-center justify-center [transform-style:preserve-3d]"
                    initial={{ scale: 0.75, opacity: 0, rotateX: -65, y: 30, filter: "blur(5px)" }}
                    animate={
                      phase === "transforming"
                        ? { scale: 0.95, opacity: 0.4, rotateX: -30, y: 10 }
                        : phase === "open"
                        ? { scale: 1.05, opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }
                        : phase === "emerging"
                        ? { scale: 1, opacity: 1, rotateX: 0, y: 15, z: 20 }
                        : { scale: 0.88, opacity: 0, rotateX: 25, y: -45, z: -100, filter: "blur(8px)" }
                    }
                    transition={{
                      duration: phase === "zooming" ? 1.4 : 1.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* THE OPENED ENVELOPE WRAPPER */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                      
                      {/* Open Envelope Backdrop Graphic */}
                      <img
                        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786934333/ABIERTO.png"
                        alt="Sobre abierto de gala"
                        className="w-full h-full object-contain z-20 pointer-events-none select-none relative"
                        style={{ filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.18))" }}
                        referrerPolicy="no-referrer"
                      />

                      {/* THE ELEGANT INTRODUCTORY CARD (Tucked inside, then rises upwards) */}
                      <motion.div
                        className="absolute bg-[#FAF6F0] rounded-xs border-2 border-[#dfb559]/50 shadow-2xl overflow-hidden flex flex-col justify-between"
                        style={{
                          width: "82%",
                          height: "105%",
                          bottom: "10%",
                          left: "9%",
                          zIndex: 10,
                        }}
                        initial={{ y: 70, scale: 0.9, opacity: 0 }}
                        animate={
                          phase === "open"
                            ? { y: 60, scale: 0.92, opacity: 0.3 }
                            : phase === "emerging"
                            ? { y: -105, scale: 1, opacity: 1, z: 60 }
                            : phase === "zooming"
                            ? { y: -105, scale: 1.05, opacity: 1, z: 80 }
                            : { y: 70, scale: 0.9, opacity: 0 }
                        }
                        transition={{
                          delay: phase === "emerging" ? 0.3 : 0,
                          duration: phase === "emerging" ? 2.5 : 1.2,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        {/* Elegant thin luxury gold border inside */}
                        <div className="absolute inset-1.5 border border-[#dfb559]/30 pointer-events-none rounded-xs" />
                        <div className="absolute inset-2.5 border border-dashed border-[#dfb559]/10 pointer-events-none rounded-xs" />

                        {/* Top Monogram */}
                        <div className="text-center pt-4 z-10">
                          <span className="font-sans text-[7px] uppercase tracking-[0.25em] text-[#1B365D] font-bold">
                            {lang === "es" ? "NUESTRA BODA & BAUTIZO" : "OUR WEDDING & BAPTISM"}
                          </span>
                          <div className="w-8 h-[1px] bg-[#dfb559]/30 mx-auto mt-1" />
                        </div>

                        {/* ROMANTIC WEDDING PORTRAIT PANEL */}
                        <div className="flex-grow flex flex-col items-center justify-center p-3 sm:p-5 z-10 mt-1">
                          
                          {/* Inner gold crest for the photo */}
                          <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] rounded-xs overflow-hidden border border-[#dfb559] shadow-md bg-[#1B365D]">
                            <img
                              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786983187/PREBODA_03.jpg.jpg"
                              alt="Melissa y Jhimy"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Cinematic shadow overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                          </div>

                          {/* Couple Names */}
                          <p className="font-great-vibes text-[#1B365D] text-3xl sm:text-4xl leading-none mt-3 select-none">
                            Melissa
                          </p>
                          <span className="font-wedding text-2xl text-[#c5a059] italic block my-1">y</span>
                          <p className="font-great-vibes text-[#1B365D] text-3xl sm:text-4xl leading-none mb-3 select-none">
                            Jhimy
                          </p>

                          {/* Gold Date Block */}
                          <div className="border-t border-b border-[#dfb559]/30 py-1 px-4 text-[#1B365D] font-sans font-bold tracking-[0.15em] text-[8px] uppercase block leading-none">
                            LUNES • 7 SETIEMBRE • 2026
                          </div>
                        </div>

                        {/* Small footer branding decoration */}
                        <div className="text-center pb-3 pt-1 z-10">
                          <span className="text-[6.5px] uppercase tracking-[0.2em] text-[#1B365D]/70 font-bold block leading-none">
                            {lang === "es" ? "MATRIMONIO, BAUTIZO Y 1ER AÑITO • ABANCAY" : "WEDDING, BAPTISM & 1ST BIRTHDAY • ABANCAY"}
                          </span>
                        </div>
                      </motion.div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE C: THE GRAND FULLSCREEN EXPANSION CARD (FLIES FORWARD) */}
              <AnimatePresence>
                {(phase === "zooming") && (
                  <motion.div
                    key="fullscreen-zoom-card"
                    className="fixed inset-0 xl:inset-x-[20%] xl:inset-y-[5%] z-50 p-4 flex items-center justify-center [perspective:1400px]"
                    initial={{ opacity: 0.1, scale: 0.65, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Full dimensions elite card paper */}
                    <div className="relative w-full max-w-lg h-[92vh] sm:h-[84vh] bg-[#FAF6F0]/98 rounded-xs shadow-2xl border-4 border-[#dfb559] overflow-hidden flex flex-col justify-between p-6 sm:p-10">
                      
                      {/* Triple gold visual lines */}
                      <div className="absolute inset-2 border border-[#dfb559]/30 rounded-xs pointer-events-none" />
                      <div className="absolute inset-3.5 border-2 border-dashed border-[#dfb559]/10 rounded-xs pointer-events-none" />

                      {/* Baroque styled corner lines */}
                      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#dfb559] opacity-80" />
                      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#dfb559] opacity-80" />
                      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#dfb559] opacity-80" />
                      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#dfb559] opacity-80" />

                      {/* Monogram header */}
                      <div className="flex flex-col items-center mt-6">
                        <span className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-[#1B365D] block">
                          {lang === "es" ? "NUESTRO SAGRADO VÍNCULO" : "OUR SACRED UNION"}
                        </span>
                        <div className="w-10 h-[10px] border-b border-[#dfb559]/40 mt-1" />
                      </div>

                      {/* Visual Central Portrait Area */}
                      <div className="text-center my-auto flex flex-col items-center w-full">
                        
                        {/* Perfect aspect picture */}
                        <div className="relative w-[190px] sm:w-[250px] aspect-[4/3] mb-5 sm:mb-6 rounded-xs overflow-hidden border-2 border-[#dfb559]/60 shadow-lg bg-[#1B365D]">
                          <img
                            src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg"
                            alt="Visual de Novios Melissa y Jhimy"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                          <div className="absolute inset-1 border border-white/20 rounded-xs pointer-events-none" />
                        </div>

                        {/* Typographic highlights */}
                        <h1 className="font-great-vibes text-[38px] sm:text-[48px] text-[#1B365D] leading-none mb-1 font-normal select-none">
                          Melissa
                        </h1>

                        <div className="flex items-center justify-center gap-3 my-2">
                          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#dfb559]/40" />
                          <span className="font-wedding text-3xl text-[#c5a059] italic font-light">y</span>
                          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#dfb559]/40" />
                        </div>

                        <h1 className="font-great-vibes text-[38px] sm:text-[48px] text-[#1B365D] leading-none mt-1 font-normal select-none">
                          Jhimy
                        </h1>

                        {/* Visual calendar tag */}
                        <div className="mt-4 sm:mt-6 border-t border-b border-[#dfb559]/20 py-2 px-6 sm:px-8 text-[#1B365D] font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                          LUNES • 7 SETIEMBRE • 2026
                        </div>

                        {/* Poem fragment quote */}
                        <p className="font-serif text-xs sm:text-sm italic text-[#1B365D]/80 leading-relaxed max-w-sm mt-4 sm:mt-6 px-4 text-center">
                          {lang === "es"
                            ? '"Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre" Mateo 19:6'
                            : '"What therefore God hath joined together, let not man put asunder" Matthew 19:6'}
                        </p>
                      </div>

                      {/* Loading visual banner */}
                      <div className="text-center mb-4 flex flex-col items-center gap-1">
                        <div className="w-8 h-[1px] bg-[#dfb559]/20 mb-1" />
                        <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#1B365D]/90 font-bold block">
                          Abancay • 2026
                        </span>
                        <span className="text-[7.5px] text-[#c5a059] uppercase tracking-[0.15em] font-bold mt-0.5 animate-pulse">
                          {lang === "es" ? "REVELANDO EXPERIENCIA DE LUJO..." : "REVEALING LUXURY EXPERIENCE..."}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Styled inline animation for the gorgeous floating elements */}
      <style>{`
        @keyframes float-golden-sparks {
          0% {
            transform: translateY(12vh) translateX(0) scale(0.65);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-8vh) translateX(30px) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
