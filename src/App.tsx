import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen } from "lucide-react";
import WelcomeScreen from "./components/WelcomeScreen";
import AudioPlayer from "./components/AudioPlayer";
import Hero from "./components/Hero";
import QuickNavIcons from "./components/QuickNavIcons";
import FamilyTribute from "./components/FamilyTribute";
import PhotoDivider from "./components/PhotoDivider";
import EventsAndMaps from "./components/EventsAndMaps";
import Schedule from "./components/Schedule";
import DressCode from "./components/DressCode";
import PhotoGallery from "./components/PhotoGallery";
import CollaborativeAlbumSection from "./components/CollaborativeAlbumSection";
import CollaborativeAlbumUploader from "./components/CollaborativeAlbumUploader";
import Gifts from "./components/Gifts";
import GuestBook from "./components/GuestBook";
import Countdown from "./components/Countdown";
import RSVPForm from "./components/RSVPForm";
import FloatingLeaves from "./components/FloatingLeaves";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import FooterRefined from "./components/FooterRefined";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState<"cover" | "content" | "album-uploader">("cover");

  // Check URL parameters for direct QR code scanner entry (e.g. ?view=album or #album-upload)
  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    if (searchParams.get("view") === "album" || hash === "#album-upload" || hash === "#album-subir") {
      setUnlocked(true);
      setActiveSection("album-uploader");
    }
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    setActiveSection("cover");
  };

  const handleGoToContent = () => {
    setActiveSection("content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToCover = () => {
    setActiveSection("cover");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenUploader = () => {
    setActiveSection("album-uploader");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#132742] overflow-x-hidden select-none">
      {/* 1. Envelope Welcome Curtain */}
      <AnimatePresence mode="wait">
        {!unlocked && (
          <motion.div
            key="welcome-curtain"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <WelcomeScreen onOpen={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience when Unlocked */}
      {unlocked && (
        <div className="relative w-full min-h-screen">
          {/* Subtle Ambient Falling Leaves */}
          <FloatingLeaves />

          {/* Persistent Background Music Controller across all views */}
          <AudioPlayer systemUnlocked={unlocked} />

          {/* Floating WhatsApp Quick Action Button */}
          <FloatingWhatsapp systemUnlocked={unlocked} />

          {/* 📖 Floating "Ver Portada" button when inside the content */}
          {activeSection === "content" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={handleGoToCover}
              className="fixed top-5 left-4 z-40 px-3.5 py-2 rounded-full bg-[#132742]/90 hover:bg-[#1B365D] text-[#dfb559] border border-[#dfb559]/50 shadow-[0_4px_15px_rgba(0,0,0,0.4)] backdrop-blur-md text-xs font-serif font-bold tracking-wider flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
              title="Volver a la portada principal"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Portada</span>
            </motion.button>
          )}

          {/* VIEW ROUTING: COVER / CONTENT / DEDICATED ALBUM UPLOADER */}
          <div className="relative w-full overflow-hidden" style={{ perspective: "2500px" }}>
            <AnimatePresence mode="wait">
              {activeSection === "cover" && (
                /* PAGE 1: STANDALONE PORTADA COVER */
                <motion.div
                  key="page-cover"
                  initial={{ opacity: 0, rotateY: 30, transformOrigin: "left center" }}
                  animate={{ opacity: 1, rotateY: 0, transformOrigin: "left center" }}
                  exit={{
                    rotateY: -90,
                    opacity: 0.1,
                    scale: 0.96,
                    transformOrigin: "left center",
                    filter: "brightness(0.7)",
                    transition: { duration: 1.1, ease: [0.645, 0.045, 0.355, 1.0] },
                  }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="w-full min-h-screen bg-[#132742]"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <Hero onNextPage={handleGoToContent} />
                </motion.div>
              )}

              {activeSection === "content" && (
                /* PAGE 2: COMPLETE INVITATION INTERIOR */
                <motion.main
                  key="page-content"
                  initial={{
                    rotateY: 90,
                    opacity: 0,
                    transformOrigin: "right center",
                    filter: "brightness(0.7)",
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                    transformOrigin: "right center",
                    filter: "brightness(1)",
                    transition: { duration: 1.1, ease: [0.215, 0.61, 0.355, 1.0] },
                  }}
                  exit={{
                    rotateY: 90,
                    opacity: 0,
                    transformOrigin: "right center",
                    transition: { duration: 0.9, ease: "easeInOut" },
                  }}
                  className="relative w-full bg-[#FAF6F0]"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  {/* Quick Navigation Icons */}
                  <QuickNavIcons />

                  {/* Elegant Wedding Portrait above families */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg"
                    alt="Melissa y Jhimy - Elegancia"
                  />

                  {/* Parents & Godparents Family Presentation */}
                  <FamilyTribute />

                  {/* Interleaved Image 1: Romantic Walk */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_02.jpg.jpg"
                    alt="Melissa y Jhimy juntos"
                  />

                  {/* Countdown Clock & Monthly Calendar Reference */}
                  <Countdown />

                  {/* Church and Banquet cards + Maps interactive Tab */}
                  <EventsAndMaps />

                  {/* Interleaved Image 2: Sunset Portrait */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922663/PREBODA_04_correcion.jpg.jpg"
                    alt="Sesión de fotos"
                  />

                  {/* Timeline Process of the Day */}
                  <Schedule />

                  {/* Interleaved Image 3: Vintage Portrait */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg"
                    alt="Momentos del amor"
                  />

                  {/* Attire Etiquette specifications */}
                  <DressCode />

                  {/* 📸 ÁLBUM COLABORATIVO CON QR SECTION */}
                  <CollaborativeAlbumSection onOpenUploader={handleOpenUploader} />

                  {/* Interleaved Image 4: Garden Embrace */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_06.jpg.jpg"
                    alt="Amor y Familia"
                  />

                  {/* Non-overlapping visual grid / touch slider */}
                  <PhotoGallery />

                  {/* Gift table / Cash Contributions options */}
                  <Gifts />

                  {/* Interleaved Image 5: Sunset Sparkle */}
                  <PhotoDivider
                    imageUrl="https://res.cloudinary.com/lfwlqotz/image/upload/v1786922689/PREBODA_07.jpg.jpg"
                    alt="La magia de nuestra unión"
                  />

                  {/* Guestbook / Libro de Firmas & Deseos */}
                  <GuestBook />

                  {/* Interactive registration book connected to WhatsApp */}
                  <RSVPForm />

                  {/* Cinematic End Banner */}
                  <FooterRefined />
                </motion.main>
              )}

              {activeSection === "album-uploader" && (
                /* 📸 DEDICATED CLEAN UPLOAD VIEW (Opened via QR scan or Direct Button) */
                <motion.div
                  key="page-uploader"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="w-full min-h-screen"
                >
                  <CollaborativeAlbumUploader onBackToInvitation={handleGoToContent} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
