import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { 
  Camera, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Share2, 
  Check, 
  Image as ImageIcon,
  Users,
  HeartHandshake,
  Church,
  Music,
  Cake,
  PartyPopper
} from "lucide-react";
import { CATEGORIES } from "../types/album";
import { albumStorage } from "../lib/albumStorage";
import { useLanguage } from "../hooks/useLanguage";

interface SectionProps {
  onOpenUploader: () => void;
}

export default function CollaborativeAlbumSection({ onOpenUploader }: SectionProps) {
  const { lang } = useLanguage();
  const [photoCount, setPhotoCount] = useState(albumStorage.getPhotos().length);
  const [copied, setCopied] = useState(false);
  const [albumUrl, setAlbumUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate absolute QR URL pointing directly to the album upload view
    const url = window.location.origin + window.location.pathname + "?view=album";
    setAlbumUrl(url);

    return albumStorage.subscribe(() => {
      setPhotoCount(albumStorage.getPhotos().length);
    });
  }, []);

  const handleCopyLink = () => {
    if (!albumUrl) return;
    navigator.clipboard.writeText(albumUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#FAF6F0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "QR-Album-Melissa-Jhimy.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const getCatIcon = (id: string) => {
    switch (id) {
      case "familia":
        return <HeartHandshake className="w-4 h-4" />;
      case "amigos":
        return <Users className="w-4 h-4" />;
      case "ceremonia":
        return <Church className="w-4 h-4" />;
      case "recepcion":
        return <Music className="w-4 h-4" />;
      case "pastel":
        return <Cake className="w-4 h-4" />;
      case "fiesta":
        return <PartyPopper className="w-4 h-4" />;
      default:
        return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <section id="album-colaborativo" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative floral corners */}
      <img
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png"
        alt="Decoración floral"
        className="absolute top-0 right-0 w-32 sm:w-48 pointer-events-none select-none opacity-40"
        referrerPolicy="no-referrer"
      />
      <img
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png"
        alt="Decoración floral"
        className="absolute bottom-0 left-0 w-36 sm:w-52 pointer-events-none select-none opacity-40"
        referrerPolicy="no-referrer"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#dfb559]/40 text-[#1B365D] text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.25em] mb-3">
            <QrCode className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{lang === "es" ? "Álbum Colaborativo con QR" : "Collaborative QR Album"}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>

          <h2 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#1B365D] leading-tight">
            Captura y Comparte Cada Momento
          </h2>

          <p className="font-serif text-xs sm:text-sm text-[#1B365D]/80 max-w-xl mx-auto mt-2 leading-relaxed font-medium">
            {lang === "es"
              ? "Queremos ver nuestra boda y el bautizo de Max Christian a través de tus ojos. Escanea el código QR o haz clic abajo para subir tus fotos organizadas por categorías."
              : "We want to see our wedding and Max Christian's baptism through your eyes. Scan the QR code or click below to upload your photos organized by category."}
          </p>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#dfb559] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Main Interactive Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(27,54,93,0.08)] border border-[#dfb559]/40 relative overflow-hidden">
          {/* Inner double line border */}
          <div className="absolute inset-2 border border-[#dfb559]/20 rounded-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Scannable QR Code Frame */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative p-4 sm:p-5 bg-[#FAF6F0] rounded-2xl border-2 border-[#dfb559]/70 shadow-lg group">
                {/* Decorative corner jewels */}
                <span className="absolute -top-1 -left-1 text-[#dfb559] text-xs">◆</span>
                <span className="absolute -top-1 -right-1 text-[#dfb559] text-xs">◆</span>
                <span className="absolute -bottom-1 -left-1 text-[#dfb559] text-xs">◆</span>
                <span className="absolute -bottom-1 -right-1 text-[#dfb559] text-xs">◆</span>

                <div ref={qrRef} className="bg-white p-3 rounded-xl shadow-inner border border-[#dfb559]/30">
                  {albumUrl ? (
                    <QRCodeSVG
                      value={albumUrl}
                      size={180}
                      level="H"
                      includeMargin={false}
                      fgColor="#132742"
                      bgColor="#ffffff"
                    />
                  ) : (
                    <div className="w-[180px] h-[180px] bg-gray-100 flex items-center justify-center text-xs">
                      Cargando QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-center gap-1 text-[10.5px] font-serif font-bold text-[#1B365D] tracking-wider uppercase">
                  <Camera className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Escanea con tu cámara</span>
                </div>
              </div>

              {/* Action buttons for QR */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleDownloadQR}
                  className="px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#1B365D] text-[#1B365D] hover:text-white border border-[#dfb559]/50 text-xs font-serif font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs"
                  title="Descargar QR para imprimir en mesas"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Descargar QR</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#1B365D] text-[#1B365D] hover:text-white border border-[#dfb559]/50 text-xs font-serif font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs"
                  title="Copiar enlace"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Copiar Enlace</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Information & Categories List */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-5">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1B365D] tracking-tight">
                  ¿Cómo funciona el Álbum de Recuerdos?
                </h3>
                <p className="text-xs sm:text-sm text-[#1B365D]/75 mt-1 font-medium">
                  Tus fotos se organizarán automáticamente en las siguientes categorías para que los novios puedan disfrutarlas:
                </p>
              </div>

              {/* Category Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-2.5 rounded-xl bg-[#FAF6F0]/80 border border-[#dfb559]/30 flex items-center gap-2 hover:border-[#dfb559] transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-[#1B365D] text-[#dfb559] flex-shrink-0">
                      {getCatIcon(cat.id)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-serif font-bold text-xs text-[#1B365D] truncate">
                        {cat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live counter badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1B365D]/5 border border-[#dfb559]/30">
                <div className="w-9 h-9 rounded-full bg-[#1B365D] text-[#dfb559] flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {photoCount}
                </div>
                <div>
                  <p className="font-serif font-bold text-xs text-[#1B365D]">
                    {photoCount} fotos compartidas en el álbum
                  </p>
                  <p className="text-[11px] text-[#1B365D]/70">
                    ¡Sé parte de este hermoso recuerdo familiar!
                  </p>
                </div>
              </div>

              {/* DIRECT BUTTON TO OPEN STANDALONE UPLOADER */}
              <div>
                <button
                  onClick={onOpenUploader}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1B365D] via-[#132742] to-[#1B365D] text-[#FAF6F0] font-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_25px_rgba(27,54,93,0.3)] hover:shadow-[0_15px_30px_rgba(27,54,93,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer border border-[#dfb559]/50"
                >
                  <Camera className="w-4 h-4 text-[#dfb559]" />
                  <span>Subir Fotos por Categorías</span>
                  <ArrowRight className="w-4 h-4 text-[#dfb559]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
