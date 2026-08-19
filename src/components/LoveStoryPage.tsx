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
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082811/01.png",
  },
  {
    id: 2,
    tag: "Primeros Pasos",
    text: "Nuestra historia no fue escrita de un solo momento, sino de pequeños instantes que, con el tiempo, se volvieron inolvidables.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787098120/ii.png",
  },
  {
    id: 3,
    tag: "La Decisión",
    text: "Algunas historias comienzan sin saber hacia dónde van. La nuestra comenzó con dos personas que, sin imaginar todo lo que vendría, decidieron elegirse y caminar juntas.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787098718/iii.png",
  },
  {
    id: 4,
    tag: "Construyendo el Camino",
    text: "Con los años llegaron los sueños compartidos, los momentos difíciles, las alegrías y cada uno de esos pequeños instantes que fueron construyendo nuestro camino.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787098885/iv.png",
  },
  {
    id: 5,
    tag: "Cómplices de Vida",
    text: "Aprendiendo a entendernos con una mirada, a sonreír juntos y a hacer de cada día una nueva aventura.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787099296/v.jpg",
  },
  {
    id: 6,
    tag: "Nuestro Mayor Regalo",
    text: "Y entonces llegó Max Christian, nuestro pequeño gran amor, quien convirtió nuestra historia en familia y nos enseñó que el amor podía crecer aún más.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787099302/vi.png",
  },
  {
    id: 7,
    tag: "Gratitud e Ilusión",
    text: "Hoy miramos hacia atrás con gratitud y hacia adelante con la más hermosa ilusión.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787099449/vii.jpg",
  },
  {
    id: 8,
    tag: "Bendición Familiar",
    text: "Tres corazones latiendo al mismo compás, guiados por Dios y rodeados de inmenso amor.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082601/03.jpg",
  },
  {
    id: 9,
    tag: "La Celebración",
    text: "Celebramos todo aquello que nos trajo hasta aquí: nuestro amor, nuestra familia y este nuevo capítulo que estamos por comenzar.",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg",
  },
  {
    id: 10,
    tag: "Por Escribirse",
    text: "Porque lo más bonito de nuestra historia todavía está por escribirse... ¡y queremos celebrarlo junto a ustedes!",
    image: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082604/04.jpg",
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
    <section className="relative min-h-[100svh] w-full py-8 sm:py-12 px-3 sm:px-6 bg-[#132742] text-[#FAF6F0] flex flex-col justify-center items-center overflow-hidden">
      {/* Floral frame in dark mode */}
      <PageFloralFrame variant="dark" showBottomRight={true} />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,181,89,0.12)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-3 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[#dfb559] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.3em] uppercase font-bold text-[#dfb559]">
              {lang === "es" ? "Historia de Amor" : "Our Love Story"}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-great-vibes text-[50px] sm:text-[66px] md:text-[74px] text-white select-none leading-none">
            {lang === "es" ? "Nuestros Momentos" : "Cinematic Memories"}
          </h2>
          <div className="w-16 h-[0.5px] bg-[#dfb559]/50 mt-1.5" />
        </motion.div>

        {/* Progress Bar Indicators */}
        <div className="flex gap-1.5 w-full max-w-md mb-2.5 px-2">
          {SCENES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className="h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all"
              title={`Ir a foto ${idx + 1}`}
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
          className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/3] max-h-[56vh] sm:max-h-[480px] rounded-2xl overflow-hidden border-2 border-[#dfb559]/40 shadow-2xl bg-[#0a1523] group select-none flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            >
              {/* 1. Ambient Blurred Backdrop */}
              <img
                src={scene.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-45 pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />

              {/* 2. Top & Bottom Subtle Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none z-[2]" />

              {/* 3. Main Foreground Photo */}
              <img
                src={scene.image}
                alt={scene.tag || "Historia de Amor"}
                className="relative z-[1] w-full h-full object-contain object-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
                referrerPolicy="no-referrer"
              />

              {/* Tag at Top Left */}
              {scene.tag && (
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#132742]/90 border border-[#dfb559]/60 text-[#dfb559] text-[11px] sm:text-[12.5px] font-sans font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
                    {scene.tag}
                  </span>
                </div>
              )}

              {/* Expand Fullscreen Button Top Right */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs shadow-md"
                title="Ampliar imagen completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Overlay Text Block at Bottom - Enhanced text readability & size */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-center flex flex-col items-center justify-end z-10 bg-gradient-to-t from-[#0a1523] via-[#0a1523]/85 to-transparent">
                {scene.title && (
                  <h3 className="font-serif text-[15px] sm:text-[17px] font-bold text-[#dfb559] tracking-wider uppercase mb-1">
                    {scene.title}
                  </h3>
                )}
                
                <p className="font-serif text-[15.5px] sm:text-[17.5px] text-[#FAF6F0] leading-relaxed italic max-w-md font-medium drop-shadow-md whitespace-pre-line px-2">
                  “{scene.text}”
                </p>

                <div className="flex items-center gap-1.5 text-[#dfb559] text-[12px] sm:text-[13px] mt-2 font-sans tracking-widest font-bold">
                  <Heart className="w-3 h-3 fill-[#dfb559]" />
                  <span>{currentIdx + 1} de {SCENES.length}</span>
                  <Heart className="w-3 h-3 fill-[#dfb559]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Nav Arrows inside the card */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#132742] text-white border border-[#dfb559]/50 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 backdrop-blur-xs shadow-md"
            title="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[#dfb559]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#132742] text-white border border-[#dfb559]/50 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 backdrop-blur-xs shadow-md"
            title="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-[#dfb559]" />
          </button>
        </div>

        {/* Play / Pause Controller */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#dfb559]/40 text-[#dfb559] text-[11.5px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
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
