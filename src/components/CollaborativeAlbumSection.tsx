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
import PageFloralFrame from "./PageFloralFrame";

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
    <section className="relative min-h-[100svh] w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF6F0] overflow-hidden select-none flex flex-col justify-center items-center">
      {/* Floral corners frame */}
      <PageFloralFrame variant="light" showBottomRight={true} />

      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#dfb559]/40 text-[#1B365D] text-[12px] sm:text-[13px] font-serif font-bold uppercase tracking-[0.25em] mb-2.5">
            <QrCode className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{lang === "es" ? "Álbum Colaborativo con QR" : "Collaborative QR Album"}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>

          <h2 className="font-great-vibes text-[50px] sm:text-[68px] md:text-[76px] text-[#1B365D] leading-none mb-3 font-normal select-none">
            {lang === "es" ? "Captura y Comparte Cada Momento" : "Capture & Share Every Moment"}
          </h2>

          <p className="font-serif text-[16px] sm:text-[18px] text-[#1B365D] max-w-xl mx-auto leading-relaxed font-normal italic px-2">
            {lang === "es"
              ? "Queremos ver nuestra boda y el bautizo de Max Christian a través de tus ojos. Escanea el código QR o haz clic abajo para subir tus fotos organizadas por categorías."
              : "We want to see our wedding and Max Christian's baptism through your eyes. Scan the QR code or click below to upload your photos organized by category."}
          </p>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#dfb559] to-transparent mx-auto mt-3.5" />
        </motion.div>

        {/* Main Interactive Card */}
        <div className="bg-white/90 rounded-2xl p-5 sm:p-7 shadow-[0_15px_40px_rgba(27,54,93,0.06)] border border-[#dfb559]/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Column: Scannable QR Code Frame */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative p-3.5 bg-[#FAF6F0] rounded-2xl border-2 border-[#dfb559]/70 shadow-md">
                <div ref={qrRef} className="bg-white p-2 rounded-xl shadow-inner border border-[#dfb559]/30">
                  {albumUrl ? (
                    <QRCodeSVG
                      value={albumUrl}
                      size={150}
                      level="H"
                      includeMargin={false}
                      fgColor="#132742"
                      bgColor="#ffffff"
                    />
                  ) : (
                    <div className="w-[150px] h-[150px] bg-gray-100 flex items-center justify-center text-xs">
                      Cargando QR...
                    </div>
                  )}
                </div>

                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11.5px] sm:text-xs font-serif font-bold text-[#1B365D] tracking-wider uppercase">
                  <Camera className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Escanea con tu cámara</span>
                </div>
              </div>

              {/* Action buttons for QR */}
              <div className="flex items-center gap-2 mt-3.5">
                <button
                  onClick={handleDownloadQR}
                  className="px-3.5 py-2 rounded-full bg-[#FAF6F0] hover:bg-[#1B365D] text-[#1B365D] hover:text-white border border-[#dfb559]/50 text-[12.5px] sm:text-[13.5px] font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Descargar QR</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-full bg-[#FAF6F0] hover:bg-[#1B365D] text-[#1B365D] hover:text-white border border-[#dfb559]/50 text-[12.5px] sm:text-[13.5px] font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
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
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1B365D]">
                  {lang === "es" ? "Categorías del Álbum" : "Album Categories"}
                </h3>
                <p className="text-[14px] sm:text-[15.5px] text-[#1B365D]/85 mt-1 font-medium">
                  {lang === "es"
                    ? "Tus fotos se organizarán automáticamente en las siguientes categorías:"
                    : "Your photos will be organized into categories:"}
                </p>
              </div>

              {/* Category Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-2.5 rounded-xl bg-[#FAF6F0]/80 border border-[#dfb559]/30 flex items-center gap-2 hover:border-[#dfb559] transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-[#1B365D] text-[#dfb559] flex-shrink-0">
                      {getCatIcon(cat.id)}
                    </div>
                    <p className="font-serif font-bold text-[13px] sm:text-[14.5px] text-[#1B365D] truncate">
                      {cat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live counter badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1B365D]/5 border border-[#dfb559]/30">
                <div className="w-9 h-9 rounded-full bg-[#1B365D] text-[#dfb559] flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {photoCount}
                </div>
                <div>
                  <p className="font-serif font-bold text-[14px] sm:text-[15.5px] text-[#1B365D]">
                    {photoCount} {lang === "es" ? "fotos compartidas" : "shared photos"}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-[#1B365D]/75">
                    {lang === "es" ? "¡Sé parte de este hermoso recuerdo!" : "Be part of this keepsake!"}
                  </p>
                </div>
              </div>

              {/* DIRECT BUTTON TO OPEN STANDALONE UPLOADER */}
              <div>
                <button
                  onClick={onOpenUploader}
                  className="w-full py-3.5 px-5 rounded-full bg-[#132742] hover:bg-[#1B365D] text-[#dfb559] border border-[#dfb559]/60 font-sans font-bold text-[13px] sm:text-[14.5px] uppercase tracking-[0.2em] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#dfb559]" />
                  <span>{lang === "es" ? "Subir Fotos por Categorías" : "Upload Photos by Category"}</span>
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
