import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { fetchJobs } from "../utils/api";
import { saveBookmark, deleteBookmark, getBookmarks } from "../utils/appwrite";
import { useNavigation } from '@react-navigation/native';

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    loadJobs();
    loadBookmarks();
  }, [page]);

  const loadJobs = async () => {
    const data = await fetchJobs(page);
    setJobs((prevJobs) => [...prevJobs, ...data]);
  };

  const loadBookmarks = async () => {
    const { documents } = await getBookmarks();
    setBookmarkedJobs(documents.map(doc => doc.$id));
  };

  const handleBookmark = async (job) => {
    const isBookmarked = bookmarkedJobs.includes(job.$id);

    if (isBookmarked) {
      await deleteBookmark(job.$id);
      setBookmarkedJobs(prev => prev.filter(id => id !== job.$id));
    } else {
      await saveBookmark(job);
      setBookmarkedJobs(prev => [...prev, job.$id]);
    }
  };

  const renderJob = ({ item }) => {
    const primaryDetails = item.primary_details || {};
    const {
      Place = "Unknown Location",
      Salary = "Not Specified",
      Experience = "Not Specified",
      Job_Type = "Not Specified"
    } = primaryDetails;

    const isBookmarked = bookmarkedJobs.includes(item.$id);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
        style={({ pressed }) => [
          styles.jobCard,
          {
            backgroundColor: pressed ? "#e3f2fd" : "#ffffff",
            borderColor: pressed ? "#0d47a1" : "#2196F3",
          },
        ]}
      >
        <View style={styles.jobContent}>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDetail}>{`Location: ${Place}`}</Text>
            <Text style={styles.jobDetail}>{`Salary: ${Salary}`}</Text>
            <Text style={styles.jobDetail}>{`Experience: ${Experience}`}</Text>
            <Text style={styles.jobDetail}>{`Job Type: ${Job_Type}`}</Text>
            <Text style={styles.jobDetail}>{`Phone: ${item.whatsapp_no || "Not Provided"}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleBookmark(item)}
            style={styles.bookmarkButton}
          >
            <Text style={styles.bookmarkText}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) =>
    item.$id ? item.$id.toString() : index.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={keyExtractor}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
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
  jobCard: {
    borderWidth: 1,
    borderColor: '#2196F3',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  jobDetail: {
    fontSize: 16,
    color: '#1565c0',
    marginBottom: 4,
  },
  bookmarkButton: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    fontSize: 24,
  },
});

export default JobsScreen;
