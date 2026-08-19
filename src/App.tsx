import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import WelcomeScreen from "./components/WelcomeScreen";
import LogoIntro from "./components/LogoIntro";
import AudioPlayer from "./components/AudioPlayer";
import FloatingLeaves from "./components/FloatingLeaves";
import PageTurnContainer, { BookPageItem } from "./components/PageTurnContainer";

// Book Pages
import Hero from "./components/Hero";
import OurStoryPage from "./components/OurStoryPage";
import FamilyTribute from "./components/FamilyTribute";
import CountdownPage from "./components/CountdownPage";
import CeremonyPage from "./components/CeremonyPage";
import ReceptionPage from "./components/ReceptionPage";
import Schedule from "./components/Schedule";
import DressCode from "./components/DressCode";
import LoveStoryPage from "./components/LoveStoryPage";
import CollaborativeAlbumSection from "./components/CollaborativeAlbumSection";
import CollaborativeAlbumUploader from "./components/CollaborativeAlbumUploader";
import Gifts from "./components/Gifts";
import GuestBook from "./components/GuestBook";
import RSVPPage from "./components/RSVPPage";
import FinalPage from "./components/FinalPage";

export default function App() {
  const [appStage, setAppStage] = useState<"envelope" | "logo" | "book">("envelope");
  const [currentPage, setCurrentPage] = useState(0);
  const [isAlbumUploaderOpen, setIsAlbumUploaderOpen] = useState(false);

  // Check URL parameters for direct QR code scanner entry (e.g. ?view=album or #album-upload)
  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    if (searchParams.get("view") === "album" || hash === "#album-upload" || hash === "#album-subir") {
      setAppStage("book");
      setIsAlbumUploaderOpen(true);
    }
  }, []);

  const handleUnlock = () => {
    setAppStage("logo");
  };

  const handleLogoIntroComplete = () => {
    setAppStage("book");
    setCurrentPage(0);
  };

  const handleOpenUploader = () => {
    setIsAlbumUploaderOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseUploader = () => {
    setIsAlbumUploaderOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPageFromHero = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Define all 14 pages of the digital book
  const bookPages: BookPageItem[] = useMemo(() => [
    {
      id: "portada",
      titleEs: "Portada Principal",
      titleEn: "Main Cover",
      theme: "dark",
      component: <Hero onNextPage={handleNextPageFromHero} />,
    },
    {
      id: "nuestra-historia",
      titleEs: "Nuestra Historia",
      titleEn: "Our Story",
      theme: "light",
      component: <OurStoryPage />,
    },
    {
      id: "familia",
      titleEs: "Nuestra Familia",
      titleEn: "Our Family",
      theme: "light",
      component: <FamilyTribute />,
    },
    {
      id: "cuenta-regresiva",
      titleEs: "Cuenta Regresiva",
      titleEn: "Countdown & Date",
      theme: "light",
      component: <CountdownPage />,
    },
    {
      id: "ceremonia",
      titleEs: "Misa & Bautizo",
      titleEn: "Ceremony & Baptism",
      theme: "light",
      component: <CeremonyPage />,
    },
    {
      id: "recepcion",
      titleEs: "Recepción & Fiesta",
      titleEn: "Reception & Party",
      theme: "light",
      component: <ReceptionPage />,
    },
    {
      id: "itinerario",
      titleEs: "Itinerario del Día",
      titleEn: "Event Schedule",
      theme: "light",
      component: <Schedule />,
    },
    {
      id: "dress-code",
      titleEs: "Código de Vestimenta",
      titleEn: "Dress Code",
      theme: "light",
      component: <DressCode />,
    },
    {
      id: "historia-amor",
      titleEs: "Momentos de Amor",
      titleEn: "Love Story",
      theme: "dark",
      component: <LoveStoryPage />,
    },
    {
      id: "album",
      titleEs: "Álbum con QR",
      titleEn: "Shared QR Album",
      theme: "light",
      component: <CollaborativeAlbumSection onOpenUploader={handleOpenUploader} />,
    },
    {
      id: "regalos",
      titleEs: "Lluvia de Sobres",
      titleEn: "Gifts & Rain of Envelopes",
      theme: "light",
      component: <Gifts />,
    },
    {
      id: "firmas",
      titleEs: "Libro de Firmas",
      titleEn: "Guest Book",
      theme: "light",
      component: <GuestBook />,
    },
    {
      id: "rsvp",
      titleEs: "Confirmar Asistencia",
      titleEn: "RSVP",
      theme: "light",
      component: <RSVPPage />,
    },
    {
      id: "gracias",
      titleEs: "Agradecimiento Final",
      titleEn: "Gratitude & Credits",
      theme: "dark",
      component: <FinalPage />,
    },
  ], []);

  return (
    <div className="relative min-h-[100svh] w-full bg-[#11223B] overflow-x-hidden select-none">
      {/* Persistent Background Music Controller (Active once envelope is opened) */}
      <AudioPlayer systemUnlocked={appStage !== "envelope"} />

      {/* Unified sequential stage transitions */}
      <AnimatePresence mode="wait">
        {/* 1. Envelope Welcome Curtain */}
        {appStage === "envelope" && (
          <motion.div
            key="welcome-curtain"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <WelcomeScreen onOpen={handleUnlock} />
          </motion.div>
        )}

        {/* 2. Logo Cinematic Intro (Plays briefly after envelope, finishes completely before book mounts) */}
        {appStage === "logo" && (
          <motion.div
            key="logo-intro-curtain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <LogoIntro onComplete={handleLogoIntroComplete} />
          </motion.div>
        )}

        {/* 3. Main Digital Book Experience (Mounts ONLY after Logo finishes completely) */}
        {appStage === "book" && (
          <motion.div
            key="main-book-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-[100svh]"
          >
            {/* Subtle Ambient Falling Leaves */}
            <FloatingLeaves />

            {/* VIEW: EITHER COLLABORATIVE UPLOADER OR DIGITAL BOOK */}
            <AnimatePresence mode="wait">
              {isAlbumUploaderOpen ? (
                <motion.div
                  key="uploader-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full min-h-[100svh]"
                >
                  <CollaborativeAlbumUploader onBackToInvitation={handleCloseUploader} />
                </motion.div>
              ) : (
                <motion.div
                  key="book-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full min-h-[100svh]"
                >
                  <PageTurnContainer
                    pages={bookPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
