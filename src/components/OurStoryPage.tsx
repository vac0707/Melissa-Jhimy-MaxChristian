import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

const STORY_PHOTOS = [
  {
    id: "story-1",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082811/01.png",
    alt: "Nuestra historia - Momento 1",
  },
  {
    id: "story-2",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787098120/ii.png",
    alt: "Nuestra historia - Momento 2",
  },
  {
    id: "story-3",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082601/03.jpg",
    alt: "Nuestra historia - Momento 3",
  },
  {
    id: "story-4",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/f_auto,q_auto,w_600/v1787082604/04.jpg",
    alt: "Nuestra historia - Momento 4",
  },
];

export default function OurStoryPage() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-8 bg-[#FAF6F0] text-[#1B365D] flex flex-col justify-between items-center overflow-hidden select-none">
      {/* Reusable floral frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Subtle ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,181,89,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6 sm:mb-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[12px] sm:text-[13px] tracking-[0.3em] uppercase font-bold text-[#c5a059]">
              {lang === "es" ? "Capítulo I" : "Chapter I"}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-great-vibes text-[54px] sm:text-[76px] md:text-[84px] text-[#1B365D] leading-none mb-2 select-none font-normal">
            {lang === "es" ? "Nuestra Historia" : "Our Story"}
          </h2>

          {/* Subtitle phrase with enlarged, comfortable reading size */}
          <p className="font-serif text-[16px] sm:text-[18px] text-[#1B365D] italic tracking-wide font-normal mt-0.5">
            {lang === "es" ? "Cada momento nos trajo hasta aquí" : "Every moment brought us here"}
          </p>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/60 to-transparent mt-3.5" />
        </motion.div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full max-w-2xl px-1 sm:px-2">
          {STORY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] sm:aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#dfb559]/50 shadow-md bg-[#132742] group"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                decoding="async"
                loading="eager"
              />
              {/* Subtle inner highlight border */}
              <div className="absolute inset-1 border border-white/20 rounded-lg pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Romantic Bottom Text */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-center max-w-xl px-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2.5 text-[#dfb559]">
            <div className="w-10 h-[0.5px] bg-[#dfb559]/50" />
            <Heart className="w-4 h-4 fill-[#dfb559] text-[#dfb559]" />
            <div className="w-10 h-[0.5px] bg-[#dfb559]/50" />
          </div>

          <p className="font-serif text-[17px] sm:text-[18.5px] md:text-[20px] text-[#1B365D] font-medium leading-relaxed italic">
            “El amor nos unió, Dios bendijo nuestro hogar y nuestra historia encontró su mayor regalo en nuestro hijo Max Christian.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
