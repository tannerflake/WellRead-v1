export interface ShelvedBookInterface {
    id?: string;
    title: string;
    image: string;
    author: string;
    userId: number; // Foreign key to reference the User model
    isFavorite: boolean;
    isWantToRead: boolean;
    createdAt: Date;
    updatedAt: Date;
  }