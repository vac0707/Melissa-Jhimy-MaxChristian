import { UploadedPhoto, PhotoCategory } from "../types/album";

const STORAGE_KEY = "melissa_jhimy_collaborative_album_v1";

const INITIAL_PHOTOS: UploadedPhoto[] = [
  {
    id: "seed-1",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922670/PREBODA_01.jpg.jpg",
    category: "recepcion",
    uploaderName: "Melissa & Jhimy",
    caption: "¡Bienvenidos a nuestro día especial!",
    likes: 18,
    createdAt: "17 Ago 2026",
  },
  {
    id: "seed-2",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_02.jpg.jpg",
    category: "familia",
    uploaderName: "Familia Curi & Huamán",
    caption: "Junto a nuestro amado Max Christian",
    likes: 24,
    createdAt: "17 Ago 2026",
  },
  {
    id: "seed-3",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922663/PREBODA_04_correcion.jpg.jpg",
    category: "ceremonia",
    uploaderName: "Padrinos de Boda",
    caption: "Que Dios bendiga su sagrada unión",
    likes: 15,
    createdAt: "17 Ago 2026",
  },
  {
    id: "seed-4",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922664/PREBODA_05_corregid.jpg.jpg",
    category: "amigos",
    uploaderName: "Promoción de Amigos",
    caption: "¡Felicidades a los novios más lindos!",
    likes: 21,
    createdAt: "17 Ago 2026",
  },
  {
    id: "seed-5",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922666/PREBODA_06.jpg.jpg",
    category: "pastel",
    uploaderName: "Tíos y Primos",
    caption: "Feliz primer añito Max Christian ♥",
    likes: 29,
    createdAt: "17 Ago 2026",
  },
  {
    id: "seed-6",
    url: "https://res.cloudinary.com/lfwlqotz/image/upload/v1786922689/PREBODA_07.jpg.jpg",
    category: "fiesta",
    uploaderName: "Amigos de Abancay",
    caption: "¡A celebrar hasta el amanecer!",
    likes: 33,
    createdAt: "17 Ago 2026",
  },
];

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((cb) => cb());
}

export const albumStorage = {
  getPhotos(): UploadedPhoto[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PHOTOS;
  },

  addPhotos(
    newItems: Array<{
      url: string;
      category: PhotoCategory;
      uploaderName: string;
      caption?: string;
    }>
  ): void {
    const current = this.getPhotos();
    const formatted: UploadedPhoto[] = newItems.map((item, idx) => ({
      id: `photo-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      url: item.url,
      category: item.category,
      uploaderName: item.uploaderName.trim() || "Invitado Especial",
      caption: item.caption?.trim() || "",
      likes: 0,
      createdAt: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    const updated = [...formatted, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage quota warning:", e);
    }
    notify();
  },

  toggleLike(id: string): void {
    const current = this.getPhotos();
    const updated = current.map((photo) => {
      if (photo.id === id) {
        return { ...photo, likes: photo.likes + 1 };
      }
      return photo;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    notify();
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
