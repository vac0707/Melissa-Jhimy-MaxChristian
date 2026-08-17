export interface Milestone {
  id: string;
  date: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export interface Track {
  title: string;
  artist: string;
  url: string;
}

