import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Book, BookOpen, Bookmark, Calendar, Heart, MessageCircle, Search, Users } from 'lucide-react';

export default function BibleDashboard() {
  const navigationItems = [
    {
      title: 'Daily Reading',
      subtitle: 'Follow your daily scripture plan',
      icon: <Calendar className="w-8 h-8 text-amber-600" />,
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Bible Study',
      subtitle: 'Read and study the scripture',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
  
    {
      title: 'Bookmarks',
      subtitle: 'Your saved verses and chapters',
      icon: <Bookmark className="w-8 h-8 text-green-600" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Community',
      subtitle: 'Connect with other believers',
      icon: <Users className="w-8 h-8 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Devotionals',
      subtitle: 'Daily inspiration and guidance',
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      bgColor: 'bg-pink-100',
    },
    {
      title: 'Search',
      subtitle: 'Find verses and passages',
      icon: <Search className="w-8 h-8 text-indigo-600" />,
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Study Plans',
      subtitle: 'Structured biblical learning',
      icon: <Book className="w-8 h-8 text-teal-600" />,
      bgColor: 'bg-teal-100',
    },
    {
      title: 'Discussion',
      subtitle: 'Share thoughts and insights',
      icon: <MessageCircle className="w-8 h-8 text-orange-600" />,
      bgColor: 'bg-orange-100',
    }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 py-6 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Welcome Back</Text>
        <Text className="text-gray-600">Continue your spiritual journey</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <View className="flex flex-row flex-wrap justify-between">
          {navigationItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`w-[48%] ${item.bgColor} rounded-xl p-4 mb-4`}
              onPress={() => console.log(`Navigating to ${item.title}`)}
            >
              <View className="flex-row items-center justify-between mb-2">
                {item.icon}
              </View>
              <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-sm text-gray-600">{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}