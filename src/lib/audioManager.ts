import { Track } from "../types";

export const PLAYLIST: Track[] = [
  {
    title: "Amor del Bueno",
    artist: "Reyli Barba",
    url: "https://res.cloudinary.com/lfwlqotz/video/upload/v1786932107/Reyli_Barba_-_Amor_del_Bueno.mp3",
  },
];

let globalAudio: HTMLAudioElement | null = null;
let currentTrackIndex = 0;
let isPlaying = false;
let volume = 0.55;
let isMuted = false;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export const audioManager = {
  getTrackIndex() {
    return currentTrackIndex;
  },
  getTrack() {
    return PLAYLIST[currentTrackIndex];
  },
  isPlaying() {
    return isPlaying;
  },
  getVolume() {
    return volume;
  },
  isMuted() {
    return isMuted;
  },
  init(systemUnlocked: boolean) {
    if (typeof window === "undefined") return;
    if (!globalAudio) {
      globalAudio = new Audio(PLAYLIST[currentTrackIndex].url);
      globalAudio.currentTime = 0;
      globalAudio.loop = true;
      globalAudio.volume = isMuted ? 0 : volume;

      globalAudio.addEventListener("ended", () => {
        this.next();
      });

      globalAudio.addEventListener("play", () => {
        isPlaying = true;
        notify();
      });

      globalAudio.addEventListener("pause", () => {
        isPlaying = false;
        notify();
      });
    }

    if (systemUnlocked && globalAudio && !isPlaying) {
      this.play();
    }
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  play() {
    if (!globalAudio) return;
    globalAudio.play().then(() => {
      isPlaying = true;
      notify();
    }).catch(err => {
      console.log("Audio play gesture pending user interaction:", err);
    });
  },
  pause() {
    if (!globalAudio) return;
    globalAudio.pause();
    isPlaying = false;
    notify();
  },
  togglePlay() {
    if (isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  setVolume(newVol: number) {
    volume = newVol;
    if (globalAudio) {
      globalAudio.volume = isMuted ? 0 : volume;
    }
    notify();
  },
  setMuted(muted: boolean) {
    isMuted = muted;
    if (globalAudio) {
      globalAudio.volume = isMuted ? 0 : volume;
    }
    notify();
  },
  changeTrack(index: number) {
    if (!globalAudio) return;
    const wasPlaying = isPlaying;
    globalAudio.pause();
    currentTrackIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    globalAudio.src = PLAYLIST[currentTrackIndex].url;
    globalAudio.load();
    if (wasPlaying) {
      this.play();
    } else {
      notify();
    }
  },
  next() {
    this.changeTrack(currentTrackIndex + 1);
  },
  prev() {
    this.changeTrack(currentTrackIndex - 1);
  }
};
