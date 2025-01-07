import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, ArrowLeft, Trash2, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';

type BookmarkItem = {
  book: string;
  chapter: number;
  verse?: number;
  timestamp: number;
};

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bible_bookmarks');
      if (savedBookmarks) {
        const parsedBookmarks: BookmarkItem[] = JSON.parse(savedBookmarks);
        const sortedBookmarks = parsedBookmarks.sort((a, b) => 
          b.timestamp - a.timestamp
        );
        setBookmarks(sortedBookmarks);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setLoading(false);
    }
  };

  const clearAllBookmarks = () => {
    Alert.alert(
      'Clear All Bookmarks',
      'Are you sure you want to remove all your bookmarks? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear All',
          onPress: async () => {
            try {
              await AsyncStorage.setItem('bible_bookmarks', JSON.stringify([]));
              setBookmarks([]);
            } catch (error) {
              console.error('Error clearing bookmarks:', error);
              Alert.alert('Error', 'Failed to clear bookmarks. Please try again.');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const deleteBookmark = async (bookmarkToDelete: BookmarkItem) => {
    try {
      const updatedBookmarks = bookmarks.filter(bookmark => 
        !(bookmark.book === bookmarkToDelete.book && 
          bookmark.chapter === bookmarkToDelete.chapter && 
          bookmark.verse === bookmarkToDelete.verse)
      );
      await AsyncStorage.setItem('bible_bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      Alert.alert('Error', 'Failed to delete bookmark. Please try again.');
    }
  };

  const confirmDelete = (bookmark: BookmarkItem) => {
    Alert.alert(
      'Delete Bookmark',
      `Are you sure you want to remove this bookmark from ${formatBookName(bookmark.book)} ${bookmark.chapter}${bookmark.verse ? `:${bookmark.verse}` : ''}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteBookmark(bookmark),
          style: 'destructive'
        }
      ]
    );
  };

  const formatBookName = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleBookmarkPress = (bookmark: BookmarkItem) => {
    router.push(`/content/book/${bookmark.book}`);
  };

  const renderBookmark = ({ item }: { item: BookmarkItem }) => (
    <Animated.View style={styles.bookmarkCard}>
      <TouchableOpacity
        style={styles.bookmarkContent}
        onPress={() => handleBookmarkPress(item)}
      >
        <Bookmark size={20} color="#059669" style={styles.bookmarkIcon} />
        <View>
          <Text style={styles.bookTitle}>{formatBookName(item.book)}</Text>
          <Text style={styles.bookmarkDetails}>
            Chapter {item.chapter}
            {item.verse ? `, Verse ${item.verse}` : ' (Entire Chapter)'}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHiddenItem = ({ item }: { item: BookmarkItem }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item)}
      >
        <X size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        {bookmarks.length > 0 && (
          <TouchableOpacity 
            onPress={clearAllBookmarks}
            style={styles.clearButton}
          >
            <Trash2 size={24} color="#DC2626" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : bookmarks.length > 0 ? (
        <SwipeListView
          data={bookmarks}
          renderItem={renderBookmark}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item) => 
            `${item.book}-${item.chapter}-${item.verse ?? 'chapter'}`
          }
          rightOpenValue={-75}
          disableRightSwipe
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Bookmark size={48} color="#9CA3AF" />
          <Text style={styles.emptyText}>No bookmarks yet</Text>
          <Text style={styles.emptySubtext}>
            Long press on any verse or chapter to bookmark it
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  clearButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  bookmarkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookmarkContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bookmarkIcon: {
    marginRight: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  bookmarkDetails: {
    fontSize: 16,
    color:'#4B5563',
   marginBottom :4
   },
   timestamp :{
     fontSize :14 ,
     color:'#6B7280'
   },
   emptyContainer:{
     flex :1 ,
     justifyContent:'center' ,
     alignItems:'center' ,
     padding :16
   },
   emptyText:{
     fontSize :18 ,
     fontWeight:'bold' ,
     color:'#4B5563' ,
     marginTop :16
   },
   emptySubtext:{
     fontSize :16 ,
     color:'#6B7280' ,
     textAlign:'center' ,
     marginTop :8
   },
   rowBack:{
     alignItems:'center' ,
     backgroundColor:'#DC2626' ,
     flex :1 ,
     flexDirection:'row' ,
     justifyContent:'flex-end' ,
     paddingLeft :15 ,
     marginBottom :12 ,
     borderRadius :12
   },
   deleteButton:{
     alignItems:'center' ,
     justifyContent:'center' ,
     width :75 ,
     height :'100%'
   }
});
