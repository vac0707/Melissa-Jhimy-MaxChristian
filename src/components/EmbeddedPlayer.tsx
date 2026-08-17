import { useEffect, useState, ChangeEvent } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { audioManager } from "../lib/audioManager";
import { useLanguage } from "../hooks/useLanguage";

export default function EmbeddedPlayer() {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlaying());
  const [currentTrack, setCurrentTrack] = useState(audioManager.getTrack());
  const [volume, setVolume] = useState(audioManager.getVolume());
  const [isMuted, setIsMuted] = useState(audioManager.isMuted());

  // Listen to audioManager changes
  useEffect(() => {
    const handleSync = () => {
      setIsPlaying(audioManager.isPlaying());
      setCurrentTrack(audioManager.getTrack());
      setVolume(audioManager.getVolume());
      isMuted !== audioManager.isMuted() && setIsMuted(audioManager.isMuted());
    };

    // Initial load sync
    handleSync();

    // Subscribe to updates
    return audioManager.subscribe(handleSync);
  }, [isMuted]);

  const handlePlayPause = () => {
    audioManager.togglePlay();
  };

  const handleNext = () => {
    audioManager.next();
  };

  const handlePrev = () => {
    audioManager.prev();
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseFloat(e.target.value);
    setVolume(nextVolume);
    audioManager.setVolume(nextVolume);
  };

  const handleToggleMute = () => {
    audioManager.setMuted(!isMuted);
  };

  return (
    <div className="w-full relative max-w-xs sm:max-w-sm bg-white/95 border border-[#dfb559]/30 rounded-2xl p-4 my-5 shadow-[0_4px_16px_rgba(27,54,93,0.06)] select-none">
      {/* Decorative double-line gold trim border inside player */}
      <div className="absolute inset-1 border border-[#dfb559]/15 rounded-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Track Metadata */}
        <div className="text-center mb-2.5 w-full">
          <p className="font-sans text-[8.5px] uppercase tracking-[0.25em] text-[#c5a059] font-bold">
            {lang === "es" ? "Música de Fondo" : "Background Music"}
          </p>
          <p className="font-serif text-sm font-bold text-[#1B365D] tracking-wide mt-1 truncate max-w-[240px] mx-auto">
            {currentTrack.title}
          </p>
          <p className="font-serif text-[11px] italic text-[#1B365D]/70 truncate max-w-[200px] mx-auto leading-none mt-0.5">
            {currentTrack.artist}
          </p>
        </div>

        {/* Dynamic Equalizer Waves when playing */}
        <div className="h-4 flex items-center justify-center gap-0.5 mb-3.5">
          {isPlaying && !isMuted ? (
            <>
              <span className="w-[1.5px] h-2 bg-[#dfb559] animate-wave-sm rounded-sm" />
              <span className="w-[1.5px] h-3 bg-[#dfb559] animate-wave-md rounded-sm" style={{ animationDelay: "0.15s" }} />
              <span className="w-[1.5px] h-4 bg-[#dfb559] animate-wave-lg rounded-sm" style={{ animationDelay: "0.3s" }} />
              <span className="w-[1.5px] h-2.5 bg-[#dfb559] animate-wave-md rounded-sm" style={{ animationDelay: "0.45s" }} />
              <span className="w-[1.5px] h-1.5 bg-[#dfb559] animate-wave-sm rounded-sm" style={{ animationDelay: "0.6s" }} />
            </>
          ) : (
            <>
              <span className="w-[1.5px] h-1 bg-[#dfb559]/40 rounded-sm" />
              <span className="w-[1.5px] h-1 bg-[#dfb559]/40 rounded-sm" />
              <span className="w-[1.5px] h-1 bg-[#dfb559]/40 rounded-sm" />
              <span className="w-[1.5px] h-1 bg-[#dfb559]/40 rounded-sm" />
              <span className="w-[1.5px] h-1 bg-[#dfb559]/40 rounded-sm" />
            </>
          )}
        </div>

        {/* Buttons deck */}
        <div className="flex items-center justify-center gap-6 mb-3">
          {/* Skip Back */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-[#FAF6F0] border border-[#E5E1D8] text-[#1B365D] hover:text-[#1B365D] transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Anterior"
          >
            <SkipBack className="w-4 h-4 fill-current text-[#1B365D]/70 hover:text-[#1B365D]" />
          </button>

          {/* Core Central Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1B365D] hover:bg-[#152a48] text-white transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 relative group border border-[#dfb559]/40"
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border border-[#dfb559]/40 animate-ping pointer-events-none" />
            )}

            {isPlaying ? (
              <Pause className="w-5 h-5 text-[#FAF6F0] fill-current" />
            ) : (
              <Play className="w-5 h-5 text-[#FAF6F0] fill-current translate-x-0.5" />
            )}
          </button>

          {/* Skip Forward */}
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-[#FAF6F0] border border-[#E5E1D8] text-[#1B365D] hover:text-[#1B365D] transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Siguiente"
          >
            <SkipForward className="w-4 h-4 fill-current text-[#1B365D]/70 hover:text-[#1B365D]" />
          </button>
        </div>

        {/* Volume deck */}
        <div className="flex items-center gap-2.5 w-full max-w-[200px] px-2 mt-1">
          <button
            onClick={handleToggleMute}
            className="text-[#1B365D]/70 hover:text-[#c5a059] transition-colors cursor-pointer"
            title={isMuted ? "Quitar Silencio" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-[#dfb559]/20 rounded-lg appearance-none cursor-pointer accent-[#dfb559]"
          />
        </div>
      </div>

      <style>{`
        @keyframes wave-sm {
          0%, 100% { height: 4px; }
          50% { height: 10px; }
        }
        @keyframes wave-md {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
        @keyframes wave-lg {
          0%, 100% { height: 8px; }
          50% { height: 18px; }
        }
        .animate-wave-sm {
          animation: wave-sm 0.8s ease-in-out infinite alternate;
        }
        .animate-wave-md {
          animation: wave-md 1s ease-in-out infinite alternate;
        }
        .animate-wave-lg {
          animation: wave-lg 1.2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
