import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

const STORY_PHOTOS = [
  {
    id: "story-1",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082811/01.png",
    alt: "Nuestra historia - Momento 1",
  },
  {
    id: "story-2",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787098120/ii.png",
    alt: "Nuestra historia - Momento 2",
  },
  {
    id: "story-3",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082601/03.jpg",
    alt: "Nuestra historia - Momento 3",
  },
  {
    id: "story-4",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1787082604/04.jpg",
    alt: "Nuestra historia - Momento 4",
  },
];

export default function OurStoryPage() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-8 bg-[#FAF6F0] text-[#1B365D] flex flex-col justify-between items-center overflow-hidden">
      {/* Reusable floral frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Subtle ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,181,89,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-6 sm:mb-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.3em] uppercase font-bold text-[#c5a059]">
              {lang === "es" ? "Capítulo I" : "Chapter I"}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-great-vibes text-[54px] sm:text-[76px] md:text-[84px] text-[#1B365D] leading-none mb-2 select-none font-normal">
            {lang === "es" ? "Nuestra Historia" : "Our Story"}
          </h2>

          <p className="font-serif text-[13.5px] sm:text-[15px] text-[#1B365D]/85 italic tracking-wider font-normal">
            {lang === "es" ? "Cada momento nos trajo hasta aquí" : "Every moment brought us here"}
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559]/60 to-transparent mt-3" />
        </motion.div>

        {/* 4 Photos Grid (2x2 on desktop/tablet, elegant balanced 2x2 grid on mobile) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full max-w-2xl px-1 sm:px-2">
          {STORY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="relative aspect-[4/3] sm:aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#dfb559]/50 shadow-md bg-[#132742] group"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 sm:mt-8 text-center max-w-xl px-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-[#dfb559]">
            <div className="w-8 h-[0.5px] bg-[#dfb559]/50" />
            <Heart className="w-3.5 h-3.5 fill-[#dfb559] text-[#dfb559]" />
            <div className="w-8 h-[0.5px] bg-[#dfb559]/50" />
          </div>

          <p className="font-serif text-[15px] sm:text-[16.5px] md:text-[17px] text-[#1B365D] font-medium leading-relaxed italic">
            “El amor nos unió, Dios bendijo nuestro hogar y nuestra historia encontró su mayor regalo en nuestro hijo Max Christian.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
