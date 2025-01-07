export type Verse = {
    verse: string;
    text: string;
  };
  
  export type Chapter = {
    chapter: string;
    verses: Verse[];
  };
  
  export type Book = {
    book: string;
    chapters: Chapter[];
  };
  
  export type Bookmark = {
    book: string;
    chapter: number;
    verse: number;
  };