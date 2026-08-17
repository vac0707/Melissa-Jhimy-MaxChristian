import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryImage } from "../types";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function PhotoGallery() {
  const { t, lang } = useLanguage();
  const images: GalleryImage[] = [
    { id: "g1", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg" },
    { id: "g2", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_02.jpg.jpg" },
    { id: "g3", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922663/PREBODA_04_correcion.jpg.jpg" },
    { id: "g4", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg" },
    { id: "g5", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_06.jpg.jpg" },
    { id: "g6", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922689/PREBODA_07.jpg.jpg" },
    { id: "g7", url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922692/PREBODA_08.jpg.jpg" },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const el = carouselRef.current;
      if (el.scrollLeft <= 15) {
        el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -340, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const el = carouselRef.current;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 25) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 340, behavior: "smooth" });
      }
    }
  };

  // Automatic smooth scroll interval
  useEffect(() => {
    if (isHovered || lightboxIndex !== null) return;
    const interval = setInterval(() => {
      scrollRight();
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered, lightboxIndex]);

  return (
    <section id="galeria" className="relative py-28 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Box */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <Sparkles className="w-5 h-5 text-[#dfb559] mb-4 animate-[pulse_2s_infinite]" />
            <span className="font-sans text-xs tracking-[0.3em] text-[#c5a059] uppercase font-bold">
              {lang === "es" ? "Nuestros Recuerdos" : "Our Memories"}
            </span>
            <h2 className="font-great-vibes text-5xl sm:text-6.5xl text-[#1B365D] mt-2 mb-2 select-none font-normal">
              {lang === "es" ? "Galería de Fotos" : "Photo Gallery"}
            </h2>
            <div className="w-16 h-[1.5px] bg-[#dfb559]" />
            <p className="text-[#1B365D]/75 text-sm font-serif italic mt-5 max-w-sm leading-relaxed">
              {lang === "es"
                ? "Un hermoso recorrido por instantes y sonrisas que reafirman nuestro amor y familia."
                : "A beautiful photographic journey highlighting sweet moments together."}
            </p>
          </motion.div>
        </div>

        {/* Carousel Slider with Auto scroll support */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
        >
          {/* Carousel container with touch overflow scrolling */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory scrollbar-none scrollbar-hide px-2 sm:px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="flex-none w-[270px] sm:w-[330px] aspect-[4/5] snap-center rounded-2xl overflow-hidden bg-[#1B365D] border-2 border-[#dfb559]/30 hover:border-[#dfb559] shadow-lg cursor-pointer group relative transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt="Colección de amor Melissa y Jhimy"
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none transform transition-transform duration-[8000ms] group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />

                {/* Dark gradient base on list cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Maximize zoom floating button */}
                <div className="absolute bottom-4 right-4 p-3 rounded-full bg-[#FAF6F0] text-[#1B365D] border border-[#dfb559]/40 opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#dfb559]" />
                </div>
              </div>
            ))}
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full border border-[#dfb559]/40 bg-white text-[#1B365D] hover:text-[#FAF6F0] hover:bg-[#1B365D] shadow-md transition-all cursor-pointer hover:border-[#dfb559] active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 font-bold" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full border border-[#dfb559]/40 bg-white text-[#1B365D] hover:text-[#FAF6F0] hover:bg-[#1B365D] shadow-md transition-all cursor-pointer hover:border-[#dfb559] active:scale-95"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* Global Lightbox Popup with Gold corner detailing & slide paths */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none"
              onClick={closeLightbox}
            >
              {/* Decorative corner framing in full screen */}
              <div className="absolute inset-8 border border-white/5 pointer-events-none" />

              {/* Quick exit hook */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/10 cursor-pointer"
                title={lang === "es" ? "Cerrar" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Previous Image trigger */}
              <button
                onClick={showPrev}
                className="absolute left-4 p-4 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Expanded Image Card */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl max-h-[85vh] px-4 overflow-hidden relative flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[lightboxIndex].url}
                  alt="Expanded love memories"
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl border-2 border-[#dfb559]/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />

                <span className="text-[#dfb559] text-[10px] tracking-[0.25em] font-bold uppercase mt-6 select-none font-sans block text-center">
                  {lang === "es"
                    ? `Fotografía ${lightboxIndex + 1} de ${images.length}`
                    : `Photograph ${lightboxIndex + 1} of ${images.length}`}
                </span>
              </motion.div>

              {/* Next Image trigger */}
              <button
                onClick={showNext}
                className="absolute right-4 p-4 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
