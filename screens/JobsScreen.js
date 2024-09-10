import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { fetchJobs } from "../utils/api";
import { saveBookmark, deleteBookmark, getBookmarks } from "../utils/appwrite";
import { useNavigation } from "@react-navigation/native";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadJobs();
    loadBookmarks();
  }, [page]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs(page);
      setJobs((prevJobs) => [...prevJobs, ...data]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Alert.alert("Error", "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    try {
      const { documents } = await getBookmarks();
      const bookmarks = {};
      documents.forEach((doc) => (bookmarks[doc.$id] = true));
      setBookmarkedJobs(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      Alert.alert("Error", "Failed to load bookmarks.");
    }
  };
  const handleBookmark = async (job) => {
    const isBookmarked = bookmarkedJobs[job.$id];
  
    try {
      if (isBookmarked) {
        Alert.alert("Removing Bookmark", `Deleting bookmark for job ID: ${job.$id}`);
        await deleteBookmark(job.$id);
        setBookmarkedJobs((prev) => {
          const updated = { ...prev };
          delete updated[job.$id];
          return updated;
        });
        Alert.alert("Bookmark Removed", "The job has been removed from your bookmarks.");
      } else {
        Alert.alert("Saving Bookmark", `Saving bookmark for job: ${job.title}`);
        await saveBookmark(job);
        setBookmarkedJobs((prev) => ({ ...prev, [job.$id]: true }));
        Alert.alert("Bookmark Saved", "The job has been added to your bookmarks.");
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
      Alert.alert("Error", "Failed to save or delete bookmark.");
    }
  };
  

  const renderJob = ({ item }) => {
    const primaryDetails = item.primary_details || {};
    const {
      Place = "Unknown Location",
      Salary = "Not Specified",
      Experience = "Not Specified",
      Job_Type = "Not Specified",
    } = primaryDetails;

    const isBookmarked = !!bookmarkedJobs[item.$id];

    return (
      <Pressable
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
          <Pressable
            onPress={() => handleBookmark(item)}
            style={styles.bookmarkButton}
          >
            <Text style={styles.bookmarkText}>{isBookmarked ? "★" : "☆"}</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const keyExtractor = (item, index) =>
    item.$id ? item.$id.toString() : index.toString();

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          horizontal
          data={jobs}
          pagingEnabled
          renderItem={renderJob}
          keyExtractor={keyExtractor}
          onEndReached={() => setPage((prevPage) => prevPage + 1)}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e3f2fd",
  },
  jobCard: {
    borderWidth: 1,
    borderColor: "#2196F3",
    padding: 16,
    marginRight: 10, // Adjust margin for horizontal scrolling
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // For web
    width: 300, // Set a fixed width for horizontal scroll
  },
  jobContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 4,
  },
  jobDetail: {
    fontSize: 16,
    color: "#1565c0",
    marginBottom: 4,
  },
  bookmarkButton: {
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkText: {
    fontSize: 24,
  },
});

export default JobsScreen;
