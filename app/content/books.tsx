import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import books from '../../data/books.json';

export default function Books() {
  const handleBookPress = (book: string) => {
    // Fix: Use the correct path format for Expo Router
    router.push({
      pathname: '/content/book/[book]',
      params: { book: book.toLowerCase() }
    });
  };

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