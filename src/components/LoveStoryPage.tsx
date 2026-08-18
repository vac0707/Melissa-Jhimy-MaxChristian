import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Play, 
  Pause,
  Maximize2,
  X
} from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

interface Scene {
  id: number;
  title?: string;
  text: string;
  image: string;
  tag?: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: "NUESTRA HISTORIA",
    tag: "Capítulo de Amor",
    text: "Cada instante, una promesa de amor.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg",
  },
  {
    id: 2,
    tag: "Primeros Pasos",
    text: "Nuestra historia no fue escrita de un solo momento, sino de pequeños instantes que, con el tiempo, se volvieron inolvidables.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_02.jpg.jpg",
  },
  {
    id: 3,
    tag: "La Decisión",
    text: "Algunas historias comienzan sin saber hacia dónde van. La nuestra comenzó con dos personas que, sin imaginar todo lo que vendría, decidieron elegirse y caminar juntas.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922663/PREBODA_04_correcion.jpg.jpg",
  },
  {
    id: 4,
    tag: "Construyendo el Camino",
    text: "Con los años llegaron los sueños compartidos, los momentos difíciles, las alegrías y cada uno de esos pequeños instantes que fueron construyendo nuestro camino.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg",
  },
  {
    id: 5,
    tag: "Nuestro Mayor Regalo",
    text: "Y entonces llegó Max Christian, nuestro pequeño gran amor, quien convirtió nuestra historia en familia y nos enseñó que el amor podía crecer aún más.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082602/02.jpg",
  },
  {
    id: 6,
    tag: "Gratitud e Ilusión",
    text: "Hoy miramos hacia atrás con gratitud y hacia adelante con ilusión.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_06.jpg.jpg",
  },
  {
    id: 7,
    tag: "La Celebración",
    text: "Celebramos todo aquello que nos trajo hasta aquí: nuestro amor, nuestra familia y este nuevo capítulo que estamos por comenzar.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922689/PREBODA_07.jpg.jpg",
  },
  {
    id: 8,
    tag: "Por Escribirse",
    text: "Porque lo más bonito de nuestra historia todavía está por escribirse.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922689/PREBODA_08.jpg.jpg",
  },
  {
    id: 9,
    tag: "Junto a Ustedes",
    text: "Y queremos escribir este capítulo junto a ustedes.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082602/05.jpg",
  },
];

export default function LoveStoryPage() {
  const { lang } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const scene = SCENES[currentIdx];

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIdx]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SCENES.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative min-h-[100svh] w-full py-10 sm:py-14 px-4 sm:px-6 bg-[#132742] text-[#FAF6F0] flex flex-col justify-center items-center overflow-hidden">
      {/* Floral frame in dark mode */}
      <PageFloralFrame variant="dark" showBottomRight={true} />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,181,89,0.12)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[#dfb559] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[9px] sm:text-[10.5px] tracking-[0.3em] uppercase font-bold text-[#dfb559]">
              {lang === "es" ? "Historia de Amor" : "Our Love Story"}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-great-vibes text-4xl sm:text-6xl text-white select-none leading-none">
            {lang === "es" ? "Nuestros Momentos" : "Cinematic Memories"}
          </h2>
          <div className="w-12 h-[0.5px] bg-[#dfb559]/40 mt-1" />
        </motion.div>

        {/* Progress Bar Indicators */}
        <div className="flex gap-1.5 w-full max-w-md mb-3 px-2">
          {SCENES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all"
              title={`Ir a escena ${idx + 1}`}
            >
              <div
                className={`h-full bg-[#dfb559] transition-all duration-300 ${
                  idx === currentIdx
                    ? "w-full"
                    : idx < currentIdx
                    ? "w-full opacity-60"
                    : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Main Cinematic Stage Card */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-xl aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#dfb559]/40 shadow-2xl bg-black group select-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Photo with smooth subtle Ken Burns */}
              <img
                src={scene.image}
                alt={scene.tag || "Historia de Amor"}
                className="w-full h-full object-cover animate-[zoomSlow_20s_infinite_alternate]"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Vignette over photo for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35 pointer-events-none" />

              {/* Tag at Top Left */}
              {scene.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#132742]/80 border border-[#dfb559]/40 text-[#dfb559] text-[9.5px] sm:text-[11px] font-sans font-bold uppercase tracking-widest backdrop-blur-xs">
                    {scene.tag}
                  </span>
                </div>
              )}

              {/* Expand Fullscreen Button Top Right */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
                title="Ampliar imagen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Overlay Text Block at Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-center flex flex-col items-center justify-end z-10">
                {scene.title && (
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#dfb559] tracking-wider uppercase mb-1">
                    {scene.title}
                  </h3>
                )}
                
                <p className="font-serif text-[13px] sm:text-[15.5px] text-[#FAF6F0] leading-relaxed italic max-w-lg font-light drop-shadow-md whitespace-pre-line">
                  “{scene.text}”
                </p>

                <div className="flex items-center gap-1.5 text-[#dfb559]/60 text-[10px] mt-2 font-sans tracking-widest">
                  <Heart className="w-2.5 h-2.5 fill-[#dfb559]/60" />
                  <span>{currentIdx + 1} de {SCENES.length}</span>
                  <Heart className="w-2.5 h-2.5 fill-[#dfb559]/60" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Nav Arrows inside the card */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#132742] text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[#dfb559]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#132742] text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-[#dfb559]" />
          </button>
        </div>

        {/* Play / Pause Controller */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-[#dfb559]/30 text-[#dfb559] text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Reproducir</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={scene.image}
              alt="Momento especial"
              className="max-w-full max-h-[90vh] object-contain rounded-xl border border-[#dfb559]/40 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
