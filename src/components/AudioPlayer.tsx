import { useEffect } from "react";
import { audioManager } from "../lib/audioManager";

interface AudioPlayerProps {
  systemUnlocked: boolean;
}

export default function AudioPlayer({ systemUnlocked }: AudioPlayerProps) {
  useEffect(() => {
    if (systemUnlocked) {
      audioManager.init(true);
    }
  }, [systemUnlocked]);

  return null;
}

