export enum OnlineStatus {
  Online = 'Online',
  Offline = 'Offline',
  Away = 'Away',
}

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  status: OnlineStatus;
  bio: string;
  interests: string[];
  galleryImages: string[];
  lookingFor: string[];
  relationshipStatus: string;
}

export interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
    date: Date;
    read?: boolean;
    saved?: boolean;
}