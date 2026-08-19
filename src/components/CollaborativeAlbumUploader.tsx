import { useState, useEffect, useRef, ChangeEvent, DragEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Upload, 
  Heart, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Share2, 
  Users, 
  Church, 
  Music, 
  Cake, 
  PartyPopper,
  Sparkles,
  HeartHandshake,
  Download,
  Filter,
  Layers
} from "lucide-react";
import confetti from "canvas-confetti";
import { PhotoCategory, CATEGORIES, UploadedPhoto } from "../types/album";
import { albumStorage } from "../lib/albumStorage";
import { useLanguage } from "../hooks/useLanguage";

interface UploaderProps {
  onBackToInvitation: () => void;
}

export default function CollaborativeAlbumUploader({ onBackToInvitation }: UploaderProps) {
  const { lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>("familia");
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [previewFiles, setPreviewFiles] = useState<Array<{ url: string; file: File }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Gallery tab filter
  const [galleryFilter, setGalleryFilter] = useState<PhotoCategory | "all">("all");
  const [photos, setPhotos] = useState<UploadedPhoto[]>(albumStorage.getPhotos());
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync photos
  useEffect(() => {
    return albumStorage.subscribe(() => {
      setPhotos(albumStorage.getPhotos());
    });
  }, []);

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;

    const newPreviews: Array<{ url: string; file: File }> = [];
    Array.from(filesList).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        newPreviews.push({ url: objectUrl, file });
      }
    });

    setPreviewFiles((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset file input so same file can be selected again
    if (e.target) e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemovePreview = (index: number) => {
    setPreviewFiles((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmitUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (previewFiles.length === 0) return;

    setIsUploading(true);

    // Convert preview files to permanent base64 data URLs for localStorage
    const convertedItems: Array<{
      url: string;
      category: PhotoCategory;
      uploaderName: string;
      caption?: string;
    }> = [];

    for (const item of previewFiles) {
      const base64Url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(item.file);
      });

      convertedItems.push({
        url: base64Url,
        category: selectedCategory,
        uploaderName: guestName || "Invitado Especial",
        caption: caption,
      });
    }

    await albumStorage.addPhotos(convertedItems);

    setIsUploading(false);
    setUploadSuccess(true);
    setPreviewFiles([]);
    setCaption("");

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#dfb559", "#1B365D", "#FAF6F0", "#ffffff"],
    });

    setTimeout(() => {
      setUploadSuccess(false);
    }, 4000);
  };

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + "?view=album";
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + window.location.pathname + "?view=album";
    const text = encodeURIComponent(
      `📸 ¡Sube tus fotos de la Boda y Bautizo de Melissa & Jhimy y Max Christian a nuestro Álbum Colaborativo! Enlace directo: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const getCategoryIcon = (catId: PhotoCategory) => {
    switch (catId) {
      case "familia":
        return <HeartHandshake className="w-5 h-5" />;
      case "amigos":
        return <Users className="w-5 h-5" />;
      case "ceremonia":
        return <Church className="w-5 h-5" />;
      case "recepcion":
        return <Music className="w-5 h-5" />;
      case "pastel":
        return <Cake className="w-5 h-5" />;
      case "fiesta":
        return <PartyPopper className="w-5 h-5" />;
    }
  };

  const filteredPhotos = galleryFilter === "all" 
    ? photos 
    : photos.filter((p) => p.category === galleryFilter);

  return (
    <div className="relative min-h-screen w-full bg-[#132742] text-[#FAF6F0] py-6 sm:py-10 px-3 sm:px-6 select-none overflow-x-hidden">
      {/* Background glow ambiance */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-4xl mx-auto flex items-center justify-between gap-3 pb-6 border-b border-[#dfb559]/30">
        <button
          onClick={onBackToInvitation}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B365D]/90 hover:bg-[#1B365D] border border-[#dfb559]/50 text-[#dfb559] font-serif text-xs sm:text-sm font-bold tracking-wider cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "es" ? "Volver a la Invitación" : "Back to Invitation"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full bg-[#1B365D]/80 hover:bg-[#1B365D] border border-[#dfb559]/40 text-[#dfb559] cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Copiar enlace de subida"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#20bd5a] transition-all cursor-pointer shadow-md"
          >
            <span>WhatsApp</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto mt-6">
        {/* Title Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfb559]/15 border border-[#dfb559]/40 text-[#dfb559] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Álbum Colaborativo en Vivo</span>
          </motion.div>

          <h1 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#dfb559] leading-tight">
            Nuestros Recuerdos Compartidos
          </h1>

          <p className="font-serif text-xs sm:text-sm text-[#FAF6F0]/85 max-w-lg mx-auto mt-2 leading-relaxed">
            {lang === "es"
              ? "Sube aquí tus fotos tomadas durante la boda, bautizo y primer añito de Max Christian. ¡Se guardarán en el álbum familiar!"
              : "Upload your photos taken during the wedding, baptism, and Max Christian's 1st birthday. They will be saved to our family album!"}
          </p>

          {copiedLink && (
            <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#dfb559] text-[#132742] text-xs font-bold animate-fade-in">
              ✓ ¡Enlace copiado al portapapeles!
            </div>
          )}
        </div>

        {/* SECTION 1: PHOTO UPLOAD FORM */}
        <section className="bg-[#FAF6F0] text-[#1B365D] rounded-2xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#dfb559]/60 relative overflow-hidden mb-12">
          {/* Subtle gold inner border */}
          <div className="absolute inset-1.5 border border-[#dfb559]/20 rounded-xl pointer-events-none" />

          <form onSubmit={handleSubmitUpload} className="relative z-10 space-y-6">
            {/* Step 1: Category Selector */}
            <div>
              <label className="block font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#1B365D] mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1B365D] text-[#dfb559] text-[11px] flex items-center justify-center font-sans">1</span>
                <span>Selecciona la Categoría de tus Fotos:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[85px] ${
                        isSelected
                          ? "bg-[#1B365D] text-[#FAF6F0] border-[#dfb559] shadow-md scale-[1.02]"
                          : "bg-white/80 hover:bg-white text-[#1B365D] border-[#dfb559]/30 hover:border-[#dfb559]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className={`p-1.5 rounded-lg ${isSelected ? "bg-[#132742] text-[#dfb559]" : "bg-[#FAF6F0] text-[#1B365D]"}`}>
                          {getCategoryIcon(cat.id)}
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#dfb559] animate-ping" />
                        )}
                      </div>
                      <div>
                        <p className="font-serif font-bold text-xs sm:text-sm tracking-tight leading-tight">
                          {cat.label}
                        </p>
                        <p className={`text-[9.5px] sm:text-[10px] leading-tight mt-0.5 truncate ${isSelected ? "text-[#FAF6F0]/75" : "text-[#1B365D]/70"}`}>
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Drag & Drop / File Input */}
            <div>
              <label className="block font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#1B365D] mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1B365D] text-[#dfb559] text-[11px] flex items-center justify-center font-sans">2</span>
                <span>Selecciona o Toma las Fotos:</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? "border-[#dfb559] bg-[#dfb559]/15 scale-[1.01]"
                    : "border-[#dfb559]/50 hover:border-[#dfb559] bg-white/70 hover:bg-white"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-full bg-[#1B365D]/10 flex items-center justify-center text-[#1B365D] mb-1">
                  <Upload className="w-7 h-7 text-[#1B365D]" />
                </div>

                <p className="font-serif font-bold text-sm sm:text-base text-[#1B365D]">
                  {lang === "es" ? "Haz clic para subir fotos o arrástralas aquí" : "Click to upload photos or drag them here"}
                </p>
                <p className="text-xs text-[#1B365D]/70 max-w-sm">
                  {lang === "es" ? "Puedes subir varias fotos a la vez (JPG, PNG, HEIC)" : "You can upload multiple photos at once"}
                </p>

                <div className="mt-2 flex items-center gap-2 text-[11px] text-[#c5a059] font-bold uppercase tracking-wider">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Compatible con cámara de celular</span>
                </div>
              </div>

              {/* Previews Grid */}
              {previewFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2">
                    Fotos seleccionadas ({previewFiles.length}):
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {previewFiles.map((item, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-[#dfb559]/50 shadow-sm bg-black">
                        <img
                          src={item.url}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePreview(idx);
                          }}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer hover:scale-110 shadow-md"
                          title="Quitar foto"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Guest info and message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-[0.16em] text-[#1B365D] mb-1.5">
                  Tu Nombre o Familia:
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej: Familia Quispe / Amigos del novio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb559]/40 bg-white focus:outline-none focus:border-[#1B365D] text-sm text-[#1B365D] placeholder-[#1B365D]/40"
                  required
                />
              </div>

              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-[0.16em] text-[#1B365D] mb-1.5">
                  Mensaje o Dedicatoria (Opcional):
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ej: ¡Hermoso momento con los novios!"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb559]/40 bg-white focus:outline-none focus:border-[#1B365D] text-sm text-[#1B365D] placeholder-[#1B365D]/40"
                />
              </div>
            </div>

            {/* Success Message Banner */}
            <AnimatePresence>
              {uploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-3 text-sm font-medium"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold">¡Fotos subidas con éxito!</p>
                    <p className="text-xs text-emerald-700">Tus fotos ya se encuentran disponibles en la galería de recuerdos.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={previewFiles.length === 0 || isUploading}
                className={`w-full py-4 rounded-full font-serif font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  previewFiles.length === 0 || isUploading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#1B365D] via-[#132742] to-[#1B365D] text-[#FAF6F0] hover:scale-[1.02] active:scale-[0.98] border border-[#dfb559]/60 shadow-[0_10px_25px_rgba(27,54,93,0.3)]"
                }`}
              >
                {isUploading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subiendo recuerdos...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-[#dfb559]" />
                    <span>Publicar Fotos en el Álbum ({previewFiles.length})</span>
                    <Sparkles className="w-4 h-4 text-[#dfb559]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* SECTION 2: LIVE GALLERY OF COLLABORATIVE PHOTOS */}
        <section className="mt-10 mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#dfb559] flex items-center gap-2">
                <Layers className="w-6 h-6" />
                <span>Galería de Fotos Subidas ({photos.length})</span>
              </h2>
              <p className="text-xs text-[#FAF6F0]/70 font-sans mt-0.5">
                Revive cada instante capturado por nuestros invitados especiales
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setGalleryFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  galleryFilter === "all"
                    ? "bg-[#dfb559] text-[#132742] shadow-md font-black"
                    : "bg-[#1B365D]/80 hover:bg-[#1B365D] text-[#FAF6F0]/80 border border-[#dfb559]/30"
                }`}
              >
                Todas ({photos.length})
              </button>

              {CATEGORIES.map((cat) => {
                const count = photos.filter((p) => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setGalleryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      galleryFilter === cat.id
                        ? "bg-[#dfb559] text-[#132742] shadow-md font-black"
                        : "bg-[#1B365D]/80 hover:bg-[#1B365D] text-[#FAF6F0]/80 border border-[#dfb559]/30"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Masonry Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#1B365D]/40 rounded-2xl border border-[#dfb559]/20">
              <Camera className="w-12 h-12 text-[#dfb559]/50 mx-auto mb-3" />
              <p className="font-serif text-base text-[#FAF6F0]">Aún no hay fotos en esta categoría</p>
              <p className="text-xs text-[#FAF6F0]/60 mt-1">¡Sé el primero en subir una foto usando el formulario de arriba!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-black/40 border border-[#dfb559]/30 shadow-md hover:shadow-xl hover:border-[#dfb559] transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || photo.uploaderName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#132742]/80 backdrop-blur-sm border border-[#dfb559]/50 text-[#dfb559] text-[9.5px] font-bold uppercase tracking-wider">
                    {CATEGORIES.find((c) => c.id === photo.category)?.label}
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      albumStorage.toggleLike(photo.id);
                    }}
                    className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-110"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{photo.likes}</span>
                  </button>

                  {/* Bottom details on hover */}
                  <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                    <p className="font-serif text-xs font-bold truncate text-[#FAF6F0]">
                      {photo.uploaderName}
                    </p>
                    {photo.caption && (
                      <p className="text-[10px] text-[#dfb559] italic truncate">
                        "{photo.caption}"
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#132742] rounded-2xl overflow-hidden border border-[#dfb559]/60 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || "Foto ampliada"}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#1B365D] text-[#FAF6F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#dfb559] text-[#132742] text-[10px] font-black uppercase">
                      {CATEGORIES.find((c) => c.id === selectedPhoto.category)?.label}
                    </span>
                    <span className="text-xs text-[#FAF6F0]/60">{selectedPhoto.createdAt}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base mt-1 text-[#FAF6F0]">
                    Subido por: {selectedPhoto.uploaderName}
                  </h3>
                  {selectedPhoto.caption && (
                    <p className="text-xs text-[#dfb559] italic mt-0.5">
                      "{selectedPhoto.caption}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => albumStorage.toggleLike(selectedPhoto.id)}
                    className="px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{selectedPhoto.likes} Me encanta</span>
                  </button>

                  <a
                    href={selectedPhoto.url}
                    download={`recuerdo-${selectedPhoto.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-[#dfb559] text-[#132742] cursor-pointer hover:scale-105 transition-all"
                    title="Descargar imagen"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
