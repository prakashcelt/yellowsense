import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getBookmarks } from '../utils/appwrite';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data.documents);
  };

  const renderBookmark = ({ item }) => (
    <View style={styles.bookmarkCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.detail}>{`Location: ${item.location}`}</Text>
      <Text style={styles.detail}>{`Salary: ${item.salary}`}</Text>
      <Text style={styles.detail}>{`Phone: ${item.phone}`}</Text>
    </View>
  );

  const keyExtractor = (item, index) => item.$id ? item.$id.toString() : index.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false} // Hide the scroll bar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e3f2fd',
  },
  bookmarkCard: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
});

export default BookmarksScreen;
