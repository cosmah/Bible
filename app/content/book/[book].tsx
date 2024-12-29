import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Import all book content directly
import genesis from '../../../data/genesis.json';
// Import other books as needed...

// Define a type for books content
type BooksContent = {
  [key: string]: any;
};

// Create a books content map
const booksContent: BooksContent = {
  genesis,
  // Add other books here...
};

export default function Book() {
  const { book } = useLocalSearchParams();
  const [content, setContent] = useState(null);
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
        {Object.entries(content).map(([chapter, verses]) => (
          <View key={chapter} style={styles.chapter}>
            <Text style={styles.chapterHeader}>Chapter {chapter}</Text>
            <View style={styles.versesContainer}>
              {Object.entries(verses as { [key: string]: string }).map(([verse, text]) => (
                <View key={verse} style={styles.verse}>
                  <Text style={styles.verseNumber}>{verse}</Text>
                  <Text style={styles.verseText}>{text}</Text>
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