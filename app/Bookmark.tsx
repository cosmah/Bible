import { Bookmark } from '../types/types';

let bookmarks: Bookmark[] = [];

// Function to add a bookmark
export const addBookmark = (book: string, chapter: number, verse: number) => {
  const newBookmark: Bookmark = { book, chapter, verse };
  bookmarks.push(newBookmark);
  console.log(`Bookmark added: ${book} ${chapter}:${verse}`);
};

// Function to get all bookmarks
export const getBookmarks = (): Bookmark[] => {
  return bookmarks;
};

// Function to remove a bookmark
export const removeBookmark = (book: string, chapter: number, verse: number) => {
  bookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.book !== book ||
      bookmark.chapter !== chapter ||
      bookmark.verse !== verse
  );
  console.log(`Bookmark removed: ${book} ${chapter}:${verse}`);
};