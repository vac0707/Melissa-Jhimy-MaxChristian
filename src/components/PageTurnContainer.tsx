import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  List, 
  X, 
  Home
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export interface BookPageItem {
  id: string;
  titleEs: string;
  titleEn: string;
  component: React.ReactNode;
  theme?: "light" | "dark";
}

interface PageTurnContainerProps {
  pages: BookPageItem[];
  currentPage: number;
  onPageChange: (pageIndex: number) => void;
}

// Critical images across the book to pre-cache in background for 60fps instant transitions
const PRELOAD_IMAGES = [
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_1000/v1786922670/PREBODA_01.jpg.jpg",
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_800/v1786922664/PREBODA_05_corregid.jpg.jpg",
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082811/01.png",
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787098120/ii.png",
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082601/03.jpg",
  "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082604/04.jpg",
  "https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png",
  "https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png",
  "https://res.cloudinary.com/lfwlqotz/image/upload/v1786990915/derecha_abajo.png",
];

export default function PageTurnContainer({
  pages,
  currentPage,
  onPageChange,
}: PageTurnContainerProps) {
  const { lang } = useLanguage();
  const [direction, setDirection] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalPages = pages.length;

  // Preload all critical book images on mount so flipping pages is instantaneous and smooth
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const goToPage = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= totalPages || newIndex === currentPage) return;
    setDirection(newIndex > currentPage ? 1 : -1);
    onPageChange(newIndex);
    window.scrollTo({ top: 0, behavior: "auto" });
    setIsMenuOpen(false);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // Touch swipe handling with directional threshold
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is significantly stronger than vertical scroll
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // 3-Second Cinematic 3D Virtual Book Page Flip Animation Variants
  const bookPageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 65 : -65,
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
      scale: 0.92,
      transformOrigin: dir > 0 ? "left center" : "right center",
      boxShadow: dir > 0 
        ? "-40px 0 60px rgba(0, 0, 0, 0.5), 0 25px 50px rgba(0, 0, 0, 0.35)" 
        : "40px 0 60px rgba(0, 0, 0, 0.5), 0 25px 50px rgba(0, 0, 0, 0.35)",
      zIndex: 2,
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
      transformOrigin: "center center",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25), 0 5px 15px rgba(0, 0, 0, 0.15)",
      transition: {
        rotateY: { duration: 3.0, ease: [0.25, 1, 0.4, 1] },
        x: { duration: 2.9, ease: [0.25, 1, 0.4, 1] },
        opacity: { duration: 2.2, ease: [0.25, 1, 0.4, 1] },
        scale: { duration: 2.9, ease: [0.25, 1, 0.4, 1] },
        boxShadow: { duration: 2.8 },
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -70 : 70,
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      scale: 0.91,
      zIndex: 1,
      transformOrigin: dir > 0 ? "left center" : "right center",
      boxShadow: dir > 0 
        ? "40px 0 60px rgba(0, 0, 0, 0.55)" 
        : "-40px 0 60px rgba(0, 0, 0, 0.55)",
      transition: {
        rotateY: { duration: 2.8, ease: [0.3, 0, 0.7, 1] },
        x: { duration: 2.8, ease: [0.3, 0, 0.7, 1] },
        opacity: { duration: 2.0, ease: [0.3, 0, 0.7, 1] },
        scale: { duration: 2.8 },
      },
    }),
  };

  const activePage = pages[currentPage];

  return (
    <div 
      className="relative min-h-[100svh] w-full bg-[#0d1b2e] overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: "2200px" }}
    >
      {/* Subtle Book Spine Center Ambience / Background Texture */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(27,54,93,0.4)_0%,rgba(10,20,35,0.95)_100%)] z-0" />

      {/* Top Floating Mini Header with Page Title & Index Menu Trigger */}
      <header className="fixed top-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none flex items-center justify-between max-w-5xl mx-auto">
        {/* Left: Quick Home / Cover button */}
        {currentPage > 0 ? (
          <button
            onClick={() => goToPage(0)}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132742]/85 text-[#dfb559] border border-[#dfb559]/40 shadow-lg backdrop-blur-md text-[10.5px] font-sans font-bold uppercase tracking-wider hover:bg-[#1B365D] hover:scale-105 transition-all cursor-pointer"
            title="Volver a la portada"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === "es" ? "Portada" : "Cover"}</span>
          </button>
        ) : (
          <div />
        )}

        {/* Right: Table of contents button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#132742]/90 text-[#FAF6F0] border border-[#dfb559]/50 shadow-lg backdrop-blur-md text-[10.5px] sm:text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#1B365D] hover:border-[#dfb559] hover:scale-105 transition-all cursor-pointer ml-auto"
        >
          <List className="w-3.5 h-3.5 text-[#dfb559]" />
          <span>{lang === "es" ? "Índice del Libro" : "Book Index"}</span>
        </button>
      </header>

      {/* Main 3D Animated Virtual Book Page Screen */}
      <main className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden z-10">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activePage?.id || currentPage}
            custom={direction}
            variants={bookPageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-[100svh] relative flex flex-col justify-center origin-center"
            style={{ 
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Smooth 3-second Content Reveal for Soft, Luxurious Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, delay: 0.3, ease: [0.25, 1, 0.4, 1] }}
              className="w-full h-full flex flex-col justify-center"
            >
              {activePage?.component}
            </motion.div>

            {/* Subtle Virtual Book Binding Spine Shadow on Side Edges */}
            <div className="absolute inset-y-0 left-0 w-6 sm:w-10 pointer-events-none bg-gradient-to-r from-black/15 via-black/5 to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-6 sm:w-10 pointer-events-none bg-gradient-to-l from-black/15 via-black/5 to-transparent z-20" />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Desktop Side Turn Page Click Zones (Left & Right Flaps) */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          aria-label="Página anterior"
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#132742]/80 hover:bg-[#132742] text-[#dfb559] border border-[#dfb559]/50 shadow-xl backdrop-blur-xs items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          aria-label="Página siguiente"
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#132742]/80 hover:bg-[#132742] text-[#dfb559] border border-[#dfb559]/50 shadow-xl backdrop-blur-xs items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Sticky Interactive Floating Navigation Bar */}
      <footer className="fixed bottom-3 inset-x-0 z-40 px-3 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#132742]/90 border border-[#dfb559]/50 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md py-1.5 px-2.5 sm:px-4 flex items-center gap-2 sm:gap-4 text-[#FAF6F0] max-w-md w-full justify-between">
          {/* Previous Page button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
              currentPage === 0
                ? "opacity-30 cursor-not-allowed text-gray-400"
                : "hover:bg-white/15 text-[#dfb559] cursor-pointer hover:scale-110 active:scale-95"
            }`}
            title="Página anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Current Page Title & Number Indicator */}
          <div 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors text-center overflow-hidden flex-1"
          >
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-serif font-bold text-[#dfb559] tracking-wider uppercase truncate max-w-[200px] sm:max-w-xs">
              <span>{lang === "es" ? activePage?.titleEs : activePage?.titleEn}</span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] sm:text-[10px] text-gray-300 font-sans tracking-widest uppercase">
                {currentPage + 1} / {totalPages}
              </span>
              <div className="w-12 sm:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfb559] transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Next Page button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
              currentPage === totalPages - 1
                ? "opacity-30 cursor-not-allowed text-gray-400"
                : "hover:bg-white/15 text-[#dfb559] cursor-pointer hover:scale-110 active:scale-95"
            }`}
            title="Página siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Fullscreen Table of Contents (Índice) Drawer / Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-[#132742] border-2 border-[#dfb559]/60 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#dfb559]/30 flex items-center justify-between bg-[#11223B]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#dfb559]" />
                  <div>
                    <h3 className="font-great-vibes text-3xl text-white leading-none">
                      {lang === "es" ? "Índice de la Invitación" : "Table of Contents"}
                    </h3>
                    <p className="text-[10px] text-[#dfb559] tracking-widest uppercase font-sans mt-0.5">
                      Melissa & Jhimy • Libro Digital
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pages Grid List */}
              <div className="p-4 overflow-y-auto space-y-2 max-h-[60vh]">
                {pages.map((page, idx) => {
                  const isCurrent = idx === currentPage;
                  return (
                    <button
                      key={page.id}
                      onClick={() => goToPage(idx)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                        isCurrent
                          ? "bg-[#dfb559]/20 border-[#dfb559] text-white shadow-md font-bold"
                          : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-[#dfb559]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCurrent
                            ? "bg-[#dfb559] text-[#132742]"
                            : "bg-white/10 text-[#dfb559]"
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-serif text-sm tracking-wide">
                            {lang === "es" ? page.titleEs : page.titleEn}
                          </p>
                          <span className="text-[10px] text-gray-400 font-sans">
                            {lang === "es" ? `Página ${idx + 1}` : `Page ${idx + 1}`}
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold text-[#dfb559] px-2 py-0.5 rounded-full bg-[#dfb559]/20 border border-[#dfb559]/40">
                          {lang === "es" ? "Actual" : "Current"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#dfb559]/30 bg-[#11223B] text-center">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfb559] text-[#132742] font-serif font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {lang === "es" ? "Cerrar Índice" : "Close Index"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
