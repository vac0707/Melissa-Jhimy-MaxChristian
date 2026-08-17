export type PhotoCategory = 
  | "familia" 
  | "amigos" 
  | "ceremonia" 
  | "recepcion" 
  | "pastel" 
  | "fiesta";

export interface UploadedPhoto {
  id: string;
  url: string;
  category: PhotoCategory;
  uploaderName: string;
  caption?: string;
  likes: number;
  createdAt: string;
}

export interface CategoryInfo {
  id: PhotoCategory;
  label: string;
  iconName: string;
  description: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "familia",
    label: "Familia",
    iconName: "HeartHandshake",
    description: "Momentos entrañables con padres, padrinos e hijos",
    color: "#dfb559",
  },
  {
    id: "amigos",
    label: "Amigos",
    iconName: "Users",
    description: "Selfies, fotos grupales y recuerdos con amigos",
    color: "#1B365D",
  },
  {
    id: "ceremonia",
    label: "Ceremonia & Bautizo",
    iconName: "Church",
    description: "Misa sagrada, aros y bautizo de Max Christian",
    color: "#c5a059",
  },
  {
    id: "recepcion",
    label: "Recepción & Vals",
    iconName: "Music",
    description: "Entrada triunfal, primer vals y brindis de honor",
    color: "#132742",
  },
  {
    id: "pastel",
    label: "Pastel & 1er Añito",
    iconName: "Cake",
    description: "Corte de pastel y celebración de Max Christian",
    color: "#dfb559",
  },
  {
    id: "fiesta",
    label: "Fiesta & Diversión",
    iconName: "PartyPopper",
    description: "Pista de baile, hora loca y momentos divertidos",
    color: "#1B365D",
  },
];
