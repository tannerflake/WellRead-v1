export interface ShelvedBookInterface {
    id?: string;
    title: string;
    image: string;
    authors: string;
    description: string;
    userId: number; // Foreign key to reference the User model
    isFavorite: boolean;
    isWantToRead: boolean;
  }