import { Book } from '../types/types';

export const loadBook = async (bookName: string): Promise<Book> => {
  const response = await fetch(`/path/to/json/files/${bookName}.json`);
  const bookData: Book = await response.json();
  return bookData;
};