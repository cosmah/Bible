import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Book, BookOpen, Bookmark, Calendar, Heart, MessageCircle, Search, Users } from 'lucide-react-native';

export default function BibleDashboard() {
  const navigationItems = [
    {
      title: 'Daily Reading',
      subtitle: 'Follow your daily scripture plan',
      icon: <Calendar size={32} color="#D97706" />,
      bgColor: '#FEF3C7',
    },
    {
      title: 'Bible Study',
      subtitle: 'Read and study the scripture',
      icon: <BookOpen size={32} color="#2563EB" />,
      bgColor: '#DBEAFE',
    },
    {
      title: 'Bookmarks',
      subtitle: 'Your saved verses and chapters',
      icon: <Bookmark size={32} color="#059669" />,
      bgColor: '#D1FAE5',
    },
    {
      title: 'Community',
      subtitle: 'Connect with other believers',
      icon: <Users size={32} color="#DC2626" />,
      bgColor: '#FECACA',
    },
    {
      title: 'Devotionals',
      subtitle: 'Daily inspiration and guidance',
      icon: <Heart size={32} color="#DB2777" />,
      bgColor: '#FCE7F3',
    },
    {
      title: 'Search',
      subtitle: 'Find verses and passages',
      icon: <Search size={32} color="#4F46E5" />,
      bgColor: '#E0E7FF',
    },
    {
      title: 'Study Plans',
      subtitle: 'Structured biblical learning',
      icon: <Book size={32} color="#0D9488" />,
      bgColor: '#CCFBF1',
    },
    {
      title: 'Discussion',
      subtitle: 'Share thoughts and insights',
      icon: <MessageCircle size={32} color="#EA580C" />,
      bgColor: '#FFEDD5',
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <Text style={styles.headerSubtitle}>Continue your spiritual journey</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {navigationItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: item.bgColor }]}
              onPress={() => console.log(`Navigating to ${item.title}`)}
            >
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});