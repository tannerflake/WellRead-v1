import React, { createContext, useState, ReactNode } from 'react';
import { Book } from '../interfaces/Book';

interface WantToReadContextProps {
  wantToRead: Book[];
  addToWantToRead: (book: Book) => void;
  removeFromWantToRead: (bookId: string) => void;
}

export const WantToReadContext = createContext<WantToReadContextProps>({
  wantToRead: [],
  addToWantToRead: () => {},
  removeFromWantToRead: () => {},
});

export const WantToReadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wantToRead, setWantToRead] = useState<Book[]>([]);

  const addToWantToRead = (book: Book) => {
    setWantToRead((prevList) => [...prevList, book]);
  };

  const removeFromWantToRead = (bookId: string) => {
    setWantToRead((prevList) => prevList.filter(book => book.id !== bookId));
  };

  return (
    <WantToReadContext.Provider value={{ wantToRead, addToWantToRead, removeFromWantToRead }}>
      {children}
    </WantToReadContext.Provider>
  );
};