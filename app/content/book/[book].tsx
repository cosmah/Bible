import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Import all book content directly
import genesis from '../../../data/genesis.json';
import exodus from '../../../data/Exodus.json';
import leviticus from '../../../data/Leviticus.json';
import numbers from '../../../data/Numbers.json';
import deuteronomy from '../../../data/Deuteronomy.json';
import joshua from '../../../data/Joshua.json';
import judges from '../../../data/Judges.json';
import ruth from '../../../data/Ruth.json';
import samuel1 from '../../../data/1Samuel.json';
import samuel2 from '../../../data/2Samuel.json';
import kings1 from '../../../data/1Kings.json';
import kings2 from '../../../data/2Kings.json';
import chronicles1 from '../../../data/1Chronicles.json';
import chronicles2 from '../../../data/2Chronicles.json';
import ezra from '../../../data/Ezra.json';
import nehemiah from '../../../data/Nehemiah.json';
import esther from '../../../data/Esther.json';
import job from '../../../data/Job.json';
import psalms from '../../../data/Psalms.json';
import proverbs from '../../../data/Proverbs.json';
import ecclesiastes from '../../../data/Ecclesiastes.json';
import songofsolomon from '../../../data/SongofSolomon.json';
import isaiah from '../../../data/Isaiah.json';
import jeremiah from '../../../data/Jeremiah.json'; 
import lamentations from '../../../data/Lamentations.json';
import ezekiel from '../../../data/Ezekiel.json';
import daniel from '../../../data/Daniel.json';
import hosea from '../../../data/Hosea.json';
import joel from '../../../data/Joel.json';
import amos from '../../../data/Amos.json';
import obadiah from '../../../data/Obadiah.json';
import jonah from '../../../data/Jonah.json';
import micah from '../../../data/Micah.json';
import nahum from '../../../data/Nahum.json';
import habakkuk from '../../../data/Habakkuk.json';
import zephaniah from '../../../data/Zephaniah.json';
import haggai from '../../../data/Haggai.json';
import zechariah from '../../../data/Zechariah.json';
import malachi from '../../../data/Malachi.json';
import matthew from '../../../data/Matthew.json';
import mark from '../../../data/Mark.json';
import luke from '../../../data/Luke.json';
import john from '../../../data/John.json';
import acts from '../../../data/Acts.json';
import romans from '../../../data/Romans.json';
import corinthians1 from '../../../data/1Corinthians.json';
import corinthians2 from '../../../data/2Corinthians.json';
import galatians from '../../../data/Galatians.json';
import ephesians from '../../../data/Ephesians.json';
import philippians from '../../../data/Philippians.json';
import colossians from '../../../data/Colossians.json';
import thessalonians1 from '../../../data/1Thessalonians.json';
import thessalonians2 from '../../../data/2Thessalonians.json';
import timothy1 from '../../../data/1Timothy.json';
import timothy2 from '../../../data/2Timothy.json';
import titus from '../../../data/Titus.json';
import philemon from '../../../data/Philemon.json';
import hebrews from '../../../data/Hebrews.json';
import james from '../../../data/James.json';
import peter1 from '../../../data/1Peter.json';
import peter2 from '../../../data/2Peter.json';
import john1 from '../../../data/1John.json';
import john2 from '../../../data/2John.json';
import john3 from '../../../data/3John.json';
import jude from '../../../data/Jude.json';
import revelation from '../../../data/Revelation.json';

// Import other books as needed...

// Define a type for books content
type BooksContent = {
  [key: string]: any;
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

  // Add other books here...
};

export default function Book() {
  const { book } = useLocalSearchParams();
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Ensure book parameter exists
      if (!book) {
        setError('No book specified');
        return;
      }

      const bookName = decodeURIComponent(
        Array.isArray(book) ? book[0].toLowerCase() : book.toLowerCase()
      );

      // Get content from our books map
      const bookContent = booksContent[bookName];

      if (!bookContent) {
        setError(`Book content not found for ${bookName}`);
        return;
      }

      setContent(bookContent);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error loading book content: ${err.message}`);
      } else {
        setError('Error loading book content');
      }
    }
  }, [book]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formatBookName(book)}</Text>
      <ScrollView style={styles.scrollView}>
        {content.chapters.map((chapter: any, chapterIndex: number) => (
          <View key={chapterIndex} style={styles.chapter}>
            <Text style={styles.chapterHeader}>Chapter {chapter.chapter}</Text>
            <View style={styles.versesContainer}>
              {chapter.verses.map((verse: any, verseIndex: number) => (
                <View key={verseIndex} style={styles.verse}>
                  <Text style={styles.verseNumber}>{verse.verse}</Text>
                  <Text style={styles.verseText}>{verse.text}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  chapter: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  versesContainer: {
    gap: 8,
  },
  verse: {
    flexDirection: 'row',
    gap: 8,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
    minWidth: 30,
  },
  verseText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
});