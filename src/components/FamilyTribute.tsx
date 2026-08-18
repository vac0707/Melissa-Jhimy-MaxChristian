import { motion } from "motion/react";
import { Users, Church } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function FamilyTribute() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-8 bg-[#FAF6F0] overflow-hidden text-center text-[#1B365D] flex flex-col justify-center items-center">
      {/* Floral corners frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto">
        {/* Elegant Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfb559] mb-2" />
            <span className="font-sans text-[9.5px] sm:text-[11px] tracking-[0.35em] text-[#c5a059] uppercase font-bold">
              {t("family.blessing")}
            </span>
            <h2 className="font-great-vibes text-5xl sm:text-7xl text-[#1B365D] mt-1 mb-2 select-none font-normal">
              {t("family.title")}
            </h2>
            <div className="w-16 h-[0.5px] bg-[#dfb559]/40 mt-2" />
          </motion.div>
        </div>

        {/* Editorial Layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="space-y-6 sm:space-y-8 max-w-3xl mx-auto"
        >
          {/* Parents Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start text-center border-b border-[#dfb559]/25 pb-6 sm:pb-8">
            {/* Bride Parents */}
            <div className="flex flex-col items-center px-2">
              <span className="font-sans text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-2 sm:mb-3 block">
                {lang === "es" ? "Padres de la Novia" : "Bride's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-3 sm:mb-4" />
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Asunta Palomino López
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                    Mario Retamoso Ávalos
                  </p>
                  <span className="text-xs text-[#c5a059] font-serif italic" title="En memoria celestial">
                    (†)
                  </span>
                </div>
                <span className="text-[10px] text-[#c5a059] italic block font-serif">
                  {lang === "es" ? "En nuestro corazón y bendición celestial" : "Forever in our hearts"}
                </span>
              </div>
            </div>

            {/* Groom Parents */}
            <div className="flex flex-col items-center px-2 md:border-l border-[#dfb559]/25">
              <span className="font-sans text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-2 sm:mb-3 block">
                {lang === "es" ? "Padres del Novio" : "Groom's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-3 sm:mb-4" />
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Laura Espinoza Sánchez
                </p>
                <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Saúl Camacho Arias
                </p>
              </div>
            </div>
          </div>

          {/* Wedding Godparents Row */}
          <div className="flex flex-col items-center text-center border-b border-[#dfb559]/25 pb-6 sm:pb-8">
            <span className="font-sans text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.25em] text-[#1B365D] font-bold mb-2 block">
              {lang === "es" ? "Padrinos de Matrimonio Religioso y Civil" : "Wedding Godparents (Religious & Civil)"}
            </span>
            <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-md w-full">
              <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold tracking-wide">
                Roger Paucar Quispe
              </p>
              <p className="font-serif text-[15px] sm:text-[17.5px] text-[#1B365D] font-semibold tracking-wide">
                Yovana Quispe Conde
              </p>
            </div>
          </div>

          {/* Baptism Section */}
          <div className="flex flex-col items-center text-center pt-1">
            <div className="inline-flex items-center gap-1.5 mb-1">
              <Church className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-sans text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.25em] text-[#1B365D] font-bold block">
                {lang === "es" ? "Bautizo y 1er Añito de nuestro amado hijo" : "Baptism & 1st Birthday of our son"}
              </span>
            </div>
            <p className="font-great-vibes text-4xl sm:text-5.5xl text-[#1B365D] mb-2 leading-none">
              Max Christian
            </p>

            <div className="bg-white/85 border border-[#dfb559]/40 rounded-xl p-4 sm:p-5 max-w-md w-full shadow-sm mt-1">
              <span className="font-sans text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-1.5 block">
                {lang === "es" ? "Padrinos de Bautizo" : "Baptism Godparents"}
              </span>
              <div className="space-y-1">
                <p className="font-serif text-[14.5px] sm:text-[16px] text-[#1B365D] font-semibold">
                  Nilton Mario Retamoso Palomino
                </p>
                <p className="font-serif text-[14.5px] sm:text-[16px] text-[#1B365D] font-semibold">
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
