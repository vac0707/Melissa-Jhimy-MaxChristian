import { motion } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Clock, 
  Calendar, 
  Sparkles, 
  Gift, 
  Camera, 
  BookOpen, 
  MessageSquareHeart,
  Users,
  QrCode
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Heart;
  badge?: string;
}

export default function QuickNavIcons() {
  const { lang } = useLanguage();

  const navItems: NavItem[] = [
    {
      id: "familias",
      label: lang === "es" ? "Padres" : "Parents",
      icon: Users,
    },
    {
      id: "cuenta-regresiva",
      label: lang === "es" ? "Fecha" : "Date",
      icon: Calendar,
    },
    {
      id: "eventos",
      label: lang === "es" ? "Lugares" : "Venues",
      icon: MapPin,
    },
    {
      id: "itinerario",
      label: lang === "es" ? "Programa" : "Schedule",
      icon: Clock,
    },
    {
      id: "codigo-vestimenta",
      label: lang === "es" ? "Etiqueta" : "Dress Code",
      icon: Sparkles,
    },
    {
      id: "album-colaborativo",
      label: lang === "es" ? "Álbum QR" : "QR Album",
      icon: QrCode,
      badge: "★",
    },
    {
      id: "galeria",
      label: lang === "es" ? "Galería" : "Gallery",
      icon: Camera,
    },
    {
      id: "regalos",
      label: lang === "es" ? "Regalos" : "Gifts",
      icon: Gift,
    },
    {
      id: "libro-firmas",
      label: lang === "es" ? "Firmas" : "Guestbook",
      icon: BookOpen,
    },
    {
      id: "confirmacion",
      label: lang === "es" ? "Asistencia" : "RSVP",
      icon: MessageSquareHeart,
    },
  ];

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-8 px-3 sm:px-6 bg-[#FAF6F0] border-y border-[#dfb559]/30 overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_80%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Subtle romantic label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#1B365D] font-bold">
            {lang === "es" ? "— Accesos Directos a Nuestra Celebración —" : "— Quick Navigation —"}
          </span>
        </motion.div>

        {/* Scrollable / Responsive Icon Grid */}
        <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar scroll-smooth">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="group relative flex-shrink-0 flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/80 hover:bg-[#1B365D] border border-[#dfb559]/40 hover:border-[#dfb559] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer min-w-[70px] sm:min-w-[80px]"
              >
                {/* Badge if available */}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-[#dfb559] text-[#1B365D] text-[8px] font-black tracking-wider uppercase shadow-xs">
                    ★
                  </span>
                )}

                {/* Circular Icon Container */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#FAF6F0] group-hover:bg-[#132742] border border-[#dfb559]/30 group-hover:border-[#dfb559] text-[#1B365D] group-hover:text-[#dfb559] transition-colors duration-300 mb-1.5 shadow-inner">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Text Label */}
                <span className="text-[10px] sm:text-[11px] font-serif font-bold text-[#1B365D] group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
