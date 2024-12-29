import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Book, BookOpen, Bookmark, Calendar, Heart, MessageCircle, Search, Users } from 'lucide-react-native';
import { Snackbar } from 'react-native-paper';
import { router } from 'expo-router';

export default function BibleDashboard() {
  const [visible, setVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const onToggleSnackBar = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setVisible(!visible);
  };

  const onDismissSnackBar = () => setVisible(false);

  const navigationItems = [
    {
      title: 'Daily Reading',
      subtitle: 'Follow your daily scripture right from where you left it',
      icon: <Calendar size={32} color="#D97706" />,
      bgColor: '#FEF3C7',
      onPress: () => { router.push('/content/lang') }
    },
    {
      title: 'Bible Study',
      subtitle: 'Read and study the scripture',
      icon: <BookOpen size={32} color="#2563EB" />,
      bgColor: '#DBEAFE',
      onPress: () => onToggleSnackBar('Bible Study coming soon, May the Grace follow you.')
    },
    {
      title: 'Bookmarks',
      subtitle: 'Your saved verses and chapters',
      icon: <Bookmark size={32} color="#059669" />,
      bgColor: '#D1FAE5',
      onPress: () => onToggleSnackBar('Bookmarks coming soon, May the Grace follow you.')
    },
    {
      title: 'Community',
      subtitle: 'Connect with other believers',
      icon: <Users size={32} color="#DC2626" />,
      bgColor: '#FECACA',
      onPress: () => onToggleSnackBar('Community coming soon, May the Grace follow you.')
    },
    {
      title: 'Devotionals',
      subtitle: 'Daily inspiration and guidance',
      icon: <Heart size={32} color="#DB2777" />,
      bgColor: '#FCE7F3',
      onPress: () => onToggleSnackBar('Devotionals coming soon, May the Grace follow you.')
    },
    {
      title: 'Search',
      subtitle: 'Find verses and passages',
      icon: <Search size={32} color="#4F46E5" />,
      bgColor: '#E0E7FF',
      onPress: () => onToggleSnackBar('Search coming soon, May the Grace follow you.')
    },
    {
      title: 'Study Plans',
      subtitle: 'Structured biblical learning',
      icon: <Book size={32} color="#0D9488" />,
      bgColor: '#CCFBF1',
      onPress: () => onToggleSnackBar('Study Plans coming soon, May the Grace follow you.')
    },
    {
      title: 'Discussion',
      subtitle: 'Share thoughts and insights',
      icon: <MessageCircle size={32} color="#EA580C" />,
      bgColor: '#FFEDD5',
      onPress: () => onToggleSnackBar('Discussion coming soon, May the Grace follow you.')
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
              onPress={item.onPress}
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
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