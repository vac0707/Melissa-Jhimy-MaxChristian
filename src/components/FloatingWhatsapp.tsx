import { useState, useEffect } from "react";
import { MessageSquareDot } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

interface FloatingProps {
  systemUnlocked: boolean;
}

export default function FloatingWhatsapp({ systemUnlocked }: FloatingProps) {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!systemUnlocked) return;

    // Show the button after 2.5 seconds of unlocking to prevent visual clutter
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [systemUnlocked]);

  if (!systemUnlocked || !isVisible) return null;

  const phoneNum = "51966740525";
  const defaultText = lang === "es"
    ? "¡Hola Melissa y Jhimy! 💍🕊️🎂 Acabo de abrir su hermosa invitación de matrimonio, bautizo y primer año de Max Christian. ¡Qué alegría tan grande compartir con ustedes esta triple celebración!"
    : "Hello Melissa & Jhimy! 💍🕊️🎂 I just opened your beautiful wedding, baptism and 1st birthday invitation for Max Christian. How exciting to celebrate with you!";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <a
        id="btn-whatsapp-flotante"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center p-3.5 rounded-full border border-emerald-400 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce cursor-pointer hover:border-emerald-300"
        style={{ animationDuration: "3s" }}
        title={lang === "es" ? "Consultas por WhatsApp" : "Inquiries via WhatsApp"}
      >
        {/* Radar Ring Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-60 pointer-events-none" />

        {/* Whatsapp Symbol / Custom Icon with Notification Badge */}
        <div className="relative">
          <MessageSquareDot className="w-5 h-5 text-white" />
          {/* Notification Indicator Dot */}
          <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfb559] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dfb559]" />
          </span>
        </div>
      </a>
    </div>
  );
}
