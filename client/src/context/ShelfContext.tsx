import React, { createContext, useState, ReactNode } from 'react';
import { Book } from '../interfaces/Book';

interface ShelfContextProps {
  shelf: Book[];
  addToShelf: (book: Book) => void;
  removeFromShelf: (bookId: string) => void;
}

export const ShelfContext = createContext<ShelfContextProps>({
  shelf: [],
  addToShelf: () => {},
  removeFromShelf: () => {},
});

export const ShelfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shelf, setShelf] = useState<Book[]>([]);

  const addToShelf = (book: Book) => {
    setShelf((prevShelf) => [...prevShelf, book]);
  };

  const removeFromShelf = (bookId: string) => {
    setShelf((prevShelf) => prevShelf.filter(book => book.id !== bookId));
  };

  return (
    <ShelfContext.Provider value={{ shelf, addToShelf, removeFromShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};