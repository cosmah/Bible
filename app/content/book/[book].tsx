import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bookmark } from "lucide-react-native";
// Import all book content directly
import genesis from "../../../data/genesis.json";
import exodus from "../../../data/Exodus.json";
import leviticus from "../../../data/Leviticus.json";
import numbers from "../../../data/Numbers.json";
import deuteronomy from "../../../data/Deuteronomy.json";
import joshua from "../../../data/Joshua.json";
import judges from "../../../data/Judges.json";
import ruth from "../../../data/Ruth.json";
import samuel1 from "../../../data/1Samuel.json";
import samuel2 from "../../../data/2Samuel.json";
import kings1 from "../../../data/1Kings.json";
import kings2 from "../../../data/2Kings.json";
import chronicles1 from "../../../data/1Chronicles.json";
import chronicles2 from "../../../data/2Chronicles.json";
import ezra from "../../../data/Ezra.json";
import nehemiah from "../../../data/Nehemiah.json";
import esther from "../../../data/Esther.json";
import job from "../../../data/Job.json";
import psalms from "../../../data/Psalms.json";
import proverbs from "../../../data/Proverbs.json";
import ecclesiastes from "../../../data/Ecclesiastes.json";
import songofsolomon from "../../../data/SongofSolomon.json";
import isaiah from "../../../data/Isaiah.json";
import jeremiah from "../../../data/Jeremiah.json";
import lamentations from "../../../data/Lamentations.json";
import ezekiel from "../../../data/Ezekiel.json";
import daniel from "../../../data/Daniel.json";
import hosea from "../../../data/Hosea.json";
import joel from "../../../data/Joel.json";
import amos from "../../../data/Amos.json";
import obadiah from "../../../data/Obadiah.json";
import jonah from "../../../data/Jonah.json";
import micah from "../../../data/Micah.json";
import nahum from "../../../data/Nahum.json";
import habakkuk from "../../../data/Habakkuk.json";
import zephaniah from "../../../data/Zephaniah.json";
import haggai from "../../../data/Haggai.json";
import zechariah from "../../../data/Zechariah.json";
import malachi from "../../../data/Malachi.json";
import matthew from "../../../data/Matthew.json";
import mark from "../../../data/Mark.json";
import luke from "../../../data/Luke.json";
import john from "../../../data/John.json";
import acts from "../../../data/Acts.json";
import romans from "../../../data/Romans.json";
import corinthians1 from "../../../data/1Corinthians.json";
import corinthians2 from "../../../data/2Corinthians.json";
import galatians from "../../../data/Galatians.json";
import ephesians from "../../../data/Ephesians.json";
import philippians from "../../../data/Philippians.json";
import colossians from "../../../data/Colossians.json";
import thessalonians1 from "../../../data/1Thessalonians.json";
import thessalonians2 from "../../../data/2Thessalonians.json";
import timothy1 from "../../../data/1Timothy.json";
import timothy2 from "../../../data/2Timothy.json";
import titus from "../../../data/Titus.json";
import philemon from "../../../data/Philemon.json";
import hebrews from "../../../data/Hebrews.json";
import james from "../../../data/James.json";
import peter1 from "../../../data/1Peter.json";
import peter2 from "../../../data/2Peter.json";
import john1 from "../../../data/1John.json";
import john2 from "../../../data/2John.json";
import john3 from "../../../data/3John.json";
import jude from "../../../data/Jude.json";
import revelation from "../../../data/Revelation.json";

// Define a type for books content
type BooksContent = {
  [key: string]: any;
};

type Bookmark = {
  book: string;
  chapter: number;
  verse?: number;
  timestamp: number;
};

// Create a books content map
const booksContent: BooksContent = {
  genesis,
  exodus,
  leviticus,
  numbers,
  deuteronomy,
  joshua,
  judges,
  ruth,
  samuel1,
  samuel2,
  kings1,
  kings2,
  chronicles1,
  chronicles2,
  ezra,
  nehemiah,
  esther,
  job,
  psalms,
  proverbs,
  ecclesiastes,
  songofsolomon,
  isaiah,
  jeremiah,
  lamentations,
  ezekiel,
  daniel,
  hosea,
  joel,
  amos,
  obadiah,
  jonah,
  micah,
  nahum,
  habakkuk,
  zephaniah,
  haggai,
  zechariah,
  malachi,
  matthew,
  mark,
  luke,
  john,
  acts,
  romans,
  corinthians1,
  corinthians2,
  galatians,
  ephesians,
  philippians,
  colossians,
  thessalonians1,
  thessalonians2,
  timothy1,
  timothy2,
  titus,
  philemon,
  hebrews,
  james,
  peter1,
  peter2,
  john1,
  john2,
  john3,
  jude,
  revelation,
};

// Create a mapping object for numbered books
const bookNameMapping: { [key: string]: string } = {
  "1 samuel": "samuel1",
  "2 samuel": "samuel2",
  "1 kings": "kings1",
  "2 kings": "kings2",
  "1 chronicles": "chronicles1",
  "2 chronicles": "chronicles2",
  "1 corinthians": "corinthians1",
  "2 corinthians": "corinthians2",
  "1 thessalonians": "thessalonians1",
  "2 thessalonians": "thessalonians2",
  "1 timothy": "timothy1",
  "2 timothy": "timothy2",
  "1 peter": "peter1",
  "2 peter": "peter2",
  "1 john": "john1",
  "2 john": "john2",
  "3 john": "john3",
  // Add other mappings as needed...
};

export default function Book() {
  const { book } = useLocalSearchParams();
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRead, setLastRead] = useState<{
    chapter: number;
    verse: number;
  } | null>(null);
  const [isInitialScroll, setIsInitialScroll] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const loadBookContent = async () => {
      try {
        if (!book) {
          setError("No book specified");
          return;
        }

        let bookName = decodeURIComponent(
          Array.isArray(book) ? book[0].toLowerCase() : book.toLowerCase()
        );
        bookName = bookNameMapping[bookName] || bookName;
        const bookContent = booksContent[bookName];

        if (!bookContent) {
          setError(`Book content not found for ${bookName}`);
          return;
        }

        setContent(bookContent);

        // Load last read position
        const lastReadData = await AsyncStorage.getItem(`lastRead_${bookName}`);
        if (lastReadData) {
          const parsedData = JSON.parse(lastReadData);
          setLastRead(parsedData);
        }

        await AsyncStorage.setItem("lastSelectedBook", bookName);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Error loading book content: ${err.message}`
            : "Error loading book content"
        );
      }
    };

    loadBookContent();
  }, [book]);

  useEffect(() => {
    if (lastRead && content && isInitialScroll) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      // Add validation to ensure chapter index is valid
      const chapterIndex = lastRead.chapter - 1;
      if (chapterIndex >= 0 && chapterIndex < content.chapters.length) {
        // Set a timeout to ensure the FlatList has properly rendered
        timeoutRef.current = setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: chapterIndex,
              animated: true,
              viewPosition: 0
            });
            
            // After initial scroll, set isInitialScroll to false
            setIsInitialScroll(false);
          }
        }, 500);
      }
    }
  
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lastRead, content, isInitialScroll]);
  const handleVersePress = async (chapterIndex: number, verseIndex: number) => {
    if (!book) return;

    let bookName = decodeURIComponent(
      Array.isArray(book) ? book[0].toLowerCase() : book.toLowerCase()
    );
    bookName = bookNameMapping[bookName] || bookName;

    const lastReadData = { chapter: chapterIndex + 1, verse: verseIndex + 1 };
    await AsyncStorage.setItem(
      `lastRead_${bookName}`,
      JSON.stringify(lastReadData)
    );
    setLastRead(lastReadData);
  };

  // Add with other useEffects
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("bible_bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  const saveBookmarks = async (newBookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem(
        "bible_bookmarks",
        JSON.stringify(newBookmarks)
      );
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  };

  // Add this near your other const declarations
const getItemLayout = (data: any, index: number) => ({
  length: 200, // Estimated height of each chapter item
  offset: 200 * index,
  index,
});

// Add this handler for scroll failures
const onScrollToIndexFailed = (info: {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}) => {
  if (flatListRef.current) {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0,
      });
    }, 100);
  }
};

  const toggleVerseBookmark = async (
    chapterIndex: number,
    verseIndex: number
  ) => {
    console.log(`Long-pressed verse: Chapter ${chapterIndex + 1}, Verse ${verseIndex + 1}`);
    if (!book) return;
    const bookName = Array.isArray(book)
      ? book[0].toLowerCase()
      : book.toLowerCase();
    const newBookmark: Bookmark = {
      book: bookName,
      chapter: chapterIndex + 1,
      verse: verseIndex + 1,
      timestamp: Date.now(),
    };

    const existingBookmarkIndex = bookmarks.findIndex(
      (b) =>
        b.book === bookName &&
        b.chapter === chapterIndex + 1 &&
        b.verse === verseIndex + 1
    );

    let newBookmarks: Bookmark[];
    if (existingBookmarkIndex >= 0) {
      newBookmarks = bookmarks.filter(
        (_, index) => index !== existingBookmarkIndex
      );
    } else {
      newBookmarks = [...bookmarks, newBookmark];
    }

    await saveBookmarks(newBookmarks);
  };

  const toggleChapterBookmark = async (chapterIndex: number) => {
    if (!book) return;
    const bookName = Array.isArray(book)
      ? book[0].toLowerCase()
      : book.toLowerCase();
    const newBookmark: Bookmark = {
      book: bookName,
      chapter: chapterIndex + 1,
      timestamp: Date.now(),
    };

    const existingBookmarkIndex = bookmarks.findIndex(
      (b) => b.book === bookName && b.chapter === chapterIndex + 1 && !b.verse
    );

    let newBookmarks: Bookmark[];
    if (existingBookmarkIndex >= 0) {
      newBookmarks = bookmarks.filter(
        (_, index) => index !== existingBookmarkIndex
      );
    } else {
      newBookmarks = [...bookmarks, newBookmark];
    }

    await saveBookmarks(newBookmarks);
  };

  const isVerseBookmarked = (chapterIndex: number, verseIndex: number) => {
    if (!book) return false;
    const bookName = Array.isArray(book)
      ? book[0].toLowerCase()
      : book.toLowerCase();
    return bookmarks.some(
      (b) =>
        b.book === bookName &&
        b.chapter === chapterIndex + 1 &&
        b.verse === verseIndex + 1
    );
  };

  const isChapterBookmarked = (chapterIndex: number) => {
    if (!book) return false;
    const bookName = Array.isArray(book)
      ? book[0].toLowerCase()
      : book.toLowerCase();
    return bookmarks.some(
      (b) => b.book === bookName && b.chapter === chapterIndex + 1 && !b.verse
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading book content...</Text>
      </View>
    );
  }

  const formatBookName = (name: string | string[]) => {
    const bookName = Array.isArray(name) ? name[0] : name;
    return bookName.charAt(0).toUpperCase() + bookName.slice(1).toLowerCase();
  };

  const renderVerse = ({ item, index }: { item: any; index: number }, chapterIndex: number) => (
    <TouchableOpacity
      onPress={() => handleVersePress(chapterIndex, index)}
      onLongPress={() => toggleVerseBookmark(chapterIndex, index)}
    >
      <View style={styles.verse}>
        <Text style={styles.verseNumber}>{item.verse}</Text>
        <Text style={styles.verseText}>{item.text}</Text>
        {isVerseBookmarked(chapterIndex, index) && (
          <Bookmark size={16} color="#4B5563" style={styles.bookmarkIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderChapter = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.chapter}>
      <TouchableOpacity
        onPress={() => toggleChapterBookmark(index)}
        style={styles.chapterHeaderContainer}
      >
        <Text style={styles.chapterHeader}>Chapter {item.chapter}</Text>
        {isChapterBookmarked(index) && <Bookmark size={20} color="#4B5563" />}
      </TouchableOpacity>
      // In your verses FlatList inside renderChapter:
<FlatList
  data={item.verses}
  renderItem={({ item, index }) => renderVerse({ item, index }, index)}
  keyExtractor={(verse: any) => verse.verse.toString()}
  contentContainerStyle={styles.versesContainer}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={10}
  windowSize={5}
/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formatBookName(book)}</Text>
      <FlatList
  ref={flatListRef}
  data={content.chapters}
  renderItem={renderChapter}
  keyExtractor={(chapter: any) => chapter.chapter.toString()}
  contentContainerStyle={styles.scrollView}
  getItemLayout={getItemLayout}
  onScrollToIndexFailed={onScrollToIndexFailed}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  chapterHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bookmarkIcon: {
    marginLeft: 8,
    backgroundColor: "#ed670e",
  },
  scrollView: {
    flexGrow: 1,
  },
  chapter: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chapterHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1F2937",
  },
  versesContainer: {
    gap: 8,
  },
  verse: {
    flexDirection: "row",
    gap: 8,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563",
    minWidth: 30,
  },
  verseText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
  },
});
