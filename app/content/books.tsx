import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import books from '../../data/books.json';

export default function Books() {
  const handleBookPress = async (book: string) => {
    try {
      await AsyncStorage.setItem('lastSelectedBook', book.toLowerCase());
      router.push({
        pathname: '/content/book/[book]',
        params: { book: book.toLowerCase() }
      });
    } catch (error) {
      console.error('Failed to save the book to storage', error);
    }
  };

  useEffect(() => {
    const checkLastSelectedBook = async () => {
      try {
        const lastSelectedBook = await AsyncStorage.getItem('lastSelectedBook');
        if (lastSelectedBook) {
          router.push({
            pathname: '/content/book/[book]',
            params: { book: lastSelectedBook }
          });
        }
      } catch (error) {
        console.error('Failed to load the last selected book from storage', error);
      }
    };

    checkLastSelectedBook();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books of the Bible</Text>
      <ScrollView style={styles.scrollView}>
        {books.books.map((book, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bookItem}
            onPress={() => handleBookPress(book)}
          >
            <Text style={styles.bookText}>{book}</Text>
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  bookItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  bookText: {
    fontSize: 18,
  },
});