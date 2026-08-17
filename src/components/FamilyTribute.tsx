import { motion } from "motion/react";
import { Users, Heart, Church } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function FamilyTribute() {
  const { t, lang } = useLanguage();
  return (
    <section id="familias" className="relative py-28 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden text-center text-[#1B365D]">
      {/* Delicate upper linear gold border */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#dfb559]/40 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <Users className="w-5 h-5 text-[#dfb559] mb-4" />
            <span className="font-sans text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-bold">
              {t("family.blessing")}
            </span>
            <h2 className="font-great-vibes text-5.5xl sm:text-7xl text-[#1B365D] mt-2 mb-2 select-none font-normal">
              {t("family.title")}
            </h2>
            <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mt-4" />
          </motion.div>
        </div>

        {/* Editorial Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="space-y-12 max-w-4xl mx-auto"
        >
          {/* Parents Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-center border-b border-[#dfb559]/20 pb-12">
            {/* Bride Parents */}
            <div className="flex flex-col items-center px-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-4 block">
                {lang === "es" ? "Padres de la Novia" : "Bride's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-6" />
              <div className="space-y-3">
                <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                  Asunta Palomino López
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                    Mario Retamoso Ávalos
                  </p>
                  <span className="text-xs text-[#c5a059] font-serif italic" title="En memoria celestial">
                    (†)
                  </span>
                </div>
                <span className="text-[10px] text-[#c5a059] italic block mt-1 font-serif">
                  {lang === "es" ? "Siempre en nuestro corazón y bendición celestial" : "Forever in our hearts"}
                </span>
              </div>
            </div>

            {/* Groom Parents */}
            <div className="flex flex-col items-center px-4 md:border-l border-[#dfb559]/25">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-4 block">
                {lang === "es" ? "Padres del Novio" : "Groom's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-6" />
              <div className="space-y-3">
                <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                  Laura Espinoza Sánchez
                </p>
                <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                  Saúl Camacho Arias
                </p>
              </div>
            </div>
          </div>

          {/* Wedding Godparents Row */}
          <div className="flex flex-col items-center text-center border-b border-[#dfb559]/20 pb-12">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-2 block">
              {lang === "es" ? "Padrinos de Matrimonio Religioso y Civil" : "Wedding Godparents (Religious & Civil)"}
            </span>
            <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full">
              <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                Roger Paucar Quispe
              </p>
              <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium leading-relaxed tracking-wide">
                Yovana Quispe Conde
              </p>
            </div>
          </div>

          {/* Baptism Section */}
          <div className="flex flex-col items-center text-center pt-2">
            <div className="inline-flex items-center gap-2 mb-2">
              <Church className="w-4 h-4 text-[#c5a059]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1B365D] font-bold block">
                {lang === "es" ? "Bautizo y 1er Añito de nuestro amado hijo" : "Baptism & 1st Birthday of our son"}
              </span>
            </div>
            <p className="font-great-vibes text-4xl sm:text-6xl text-[#1B365D] mb-4">
              Max Christian
            </p>
            
            <div className="bg-white/80 border border-[#dfb559]/30 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-sm mt-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-3 block">
                {lang === "es" ? "Padrinos de Bautizo" : "Baptism Godparents"}
              </span>
              <div className="space-y-2">
                <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium">
                  Nilton Mario Retamoso Palomino
                </p>
                <p className="font-serif text-[17px] sm:text-[19px] text-[#1B365D] font-medium">
                  Endira Retamoso Palomino
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
