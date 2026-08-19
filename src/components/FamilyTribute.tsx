import { motion } from "motion/react";
import { Users, Church, Sparkles, Heart } from "lucide-react";
import PageFloralFrame from "./PageFloralFrame";
import { useLanguage } from "../hooks/useLanguage";

export default function FamilyTribute() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative min-h-[100svh] w-full py-0 bg-[#FAF6F0] overflow-hidden text-center text-[#1B365D] flex flex-col justify-between items-center select-none">
      {/* Floral corners frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      <div className="w-full flex flex-col items-center">
        
        {/* 1. TOP PHOTO: PREBODA_01 (Edge-to-edge, sin marco, con desvanecido inferior suave) */}
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full">
            <img
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg"
              alt="Melissa y Jhimy - Nuestras Familias"
              className="w-full h-full object-cover object-[center_35%]"
              referrerPolicy="no-referrer"
            />
            {/* Smooth bottom gradient fade into parchment */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 2. TEXTO PRINCIPAL: Justo donde se desvanece la foto */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-10 mb-6 sm:mb-8 max-w-3xl w-full"
        >
          <div className="inline-flex items-center gap-1.5 text-[#c5a059] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.25em] uppercase font-bold text-[#c5a059]">
              {lang === "es" ? "Con la bendición de Dios y de" : "With the blessing of God and"}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-great-vibes text-[56px] sm:text-[76px] md:text-[84px] text-[#1B365D] leading-none mb-2 font-normal select-none">
            {t("family.title")}
          </h2>
          <div className="w-20 h-[0.5px] bg-[#dfb559]/60 mx-auto mt-2" />
        </motion.div>

        {/* 3. PARENTS & WEDDING GODPARENTS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="space-y-6 sm:space-y-8 max-w-3xl w-full px-4 sm:px-6 mx-auto mb-6"
        >
          {/* Parents Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-start text-center border-b border-[#dfb559]/30 pb-6 sm:pb-7">
            {/* Bride Parents */}
            <div className="flex flex-col items-center px-2">
              <span className="font-sans text-[11.5px] sm:text-[13px] uppercase tracking-[0.22em] text-[#1B365D] font-bold mb-2 block">
                {lang === "es" ? "Padres de la Novia" : "Bride's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-2.5" />
              <div className="space-y-1.5">
                <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Asunta Palomino López
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                    Mario Retamoso Ávalos
                  </p>
                  <span className="text-xs text-[#c5a059] font-serif italic" title="En memoria celestial">
                    (†)
                  </span>
                </div>
                <span className="text-[11.5px] sm:text-[12.5px] text-[#c5a059] italic block font-serif">
                  {lang === "es" ? "En nuestro corazón y bendición celestial" : "Forever in our hearts"}
                </span>
              </div>
            </div>

            {/* Groom Parents */}
            <div className="flex flex-col items-center px-2 md:border-l border-[#dfb559]/30">
              <span className="font-sans text-[11.5px] sm:text-[13px] uppercase tracking-[0.22em] text-[#1B365D] font-bold mb-2 block">
                {lang === "es" ? "Padres del Novio" : "Groom's Parents"}
              </span>
              <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-2.5" />
              <div className="space-y-1.5">
                <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Laura Espinoza Sánchez
                </p>
                <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold leading-relaxed tracking-wide">
                  Maxi Saúl Camacho Arias
                </p>
              </div>
            </div>
          </div>

          {/* Wedding Godparents Row */}
          <div className="flex flex-col items-center text-center">
            <span className="font-sans text-[11.5px] sm:text-[13px] uppercase tracking-[0.22em] text-[#1B365D] font-bold mb-1.5 block">
              {lang === "es" ? "Padrinos de Matrimonio Religioso y Civil" : "Wedding Godparents (Religious & Civil)"}
            </span>
            <div className="w-8 h-[0.5px] bg-[#dfb559]/40 mb-2.5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-md w-full">
              <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold tracking-wide">
                Roger Paucar Quispe
              </p>
              <p className="font-serif text-[16.5px] sm:text-[18.5px] text-[#1B365D] font-semibold tracking-wide">
                Yovana Quispe Conde
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4. FOTO DEL NIÑO: PREBODA_05_corregid (Encuadre perfecto en rostro completo, ojos y cuerpo del niño) */}
        <div className="relative w-full overflow-hidden mt-6">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[460px] w-full">
            <img
              src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg"
              alt="Max Christian - Bautizo"
              className="w-full h-full object-cover object-[center_42%]"
              referrerPolicy="no-referrer"
            />
            {/* Smooth bottom gradient fade so it seamlessly transitions into the baptism section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/60 via-30% to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 5. BAPTISM SECTION: Ubicado elegantemente donde desvanece la foto sin tapar el rostro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-10 pb-12 sm:pb-16 max-w-xl w-full"
        >
          <div className="inline-flex items-center gap-1.5 mb-1 text-[#c5a059]">
            <Church className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="font-sans text-[11px] sm:text-[12.5px] uppercase tracking-[0.22em] text-[#1B365D] font-bold block">
              {lang === "es" ? "Bautizo y 1er Añito de nuestro amado hijo" : "Baptism & 1st Birthday of our son"}
            </span>
            <Church className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>

          <h3 className="font-great-vibes text-[54px] sm:text-[76px] md:text-[84px] text-[#1B365D] mb-3 leading-none select-none font-normal">
            Max Christian
          </h3>

          <div className="bg-white/90 border border-[#dfb559]/50 rounded-2xl p-4 sm:p-5 max-w-md w-full shadow-sm mt-1">
            <span className="font-sans text-[10.5px] sm:text-[12px] uppercase tracking-[0.22em] text-[#c5a059] font-bold mb-2 block">
              {lang === "es" ? "Padrinos de Bautizo" : "Baptism Godparents"}
            </span>
            <div className="space-y-1.5">
              <p className="font-serif text-[16.5px] sm:text-[18px] text-[#1B365D] font-semibold">
                Nilton Mario Retamoso Palomino
              </p>
              <p className="font-serif text-[16.5px] sm:text-[18px] text-[#1B365D] font-semibold">
                Endira Retamoso Palomino
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
