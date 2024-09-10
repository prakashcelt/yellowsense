import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { getBookmarks, deleteBookmark } from '../utils/appwrite';
import { useNavigation } from '@react-navigation/native';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data.documents);
  };

  const handlePress = (item) => {
    navigation.navigate('JobDetailsScreen', { job: item });
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.$id !== id));
  };

  const renderBookmark = ({ item }) => (
    <View style={styles.bookmarkCard}>
      <Pressable
        onPress={() => handlePress(item)}
        style={({ pressed }) => [
          styles.bookmarkContent,
          {
            backgroundColor: pressed ? '#e3f2fd' : '#ffffff',
            borderColor: pressed ? '#0d47a1' : '#2196F3',
          },
        ]}
      >
        <View style={styles.bookmarkInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.detail}>{`Location: ${item.location}`}</Text>
          <Text style={styles.detail}>{`Salary: ${item.salary}`}</Text>
          <Text style={styles.detail}>{`Phone: ${item.phone}`}</Text>
        </View>
        <Pressable
          onPress={() => handleDelete(item.$id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </Pressable>
      </Pressable>
    </View>
  );

  const keyExtractor = (item, index) =>
    item.$id ? item.$id.toString() : index.toString();

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={true} // Ensure the horizontal scroll bar is visible
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e3f2fd',
  },
  bookmarkCard: {
    borderWidth: 1,
    borderColor: '#2196F3',
    padding: 16,
    marginRight: 10, // Adjust margin for horizontal scrolling
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // For web
    width: 300, // Set a fixed width for horizontal scroll
  },
  bookmarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookmarkInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    color: '#1565c0',
    marginBottom: 2,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#d32f2f', // Red color for delete icon
  },
});

export default BookmarksScreen;
