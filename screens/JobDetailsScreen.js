import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${job.whatsapp_no}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.detail}>{`Location: ${job.primary_details.Place}`}</Text>
      <Text style={styles.detail}>{`Salary: ${job.primary_details.Salary}`}</Text>
      <Text style={styles.detail}>{`Experience: ${job.primary_details.Experience}`}</Text>
      <Text style={styles.detail}>{`Job Type: ${job.primary_details.Job_Type}`}</Text>
      <Text style={styles.detail}>{`Phone: ${job.whatsapp_no}`}</Text>
      {/* <Text style={styles.description}>{job.content}</Text> */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Text style={styles.callButtonText}>📞 Call HR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 8,
  },
  detail: {
    fontSize: 18,
    color: '#1565c0',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
  },
  callButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0d47a1',
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default JobDetailsScreen;
