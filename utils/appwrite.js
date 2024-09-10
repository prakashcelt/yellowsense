// utils/appwrite.js
import { Client, Databases } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66bcede7000b52a65173');

export const databases = new Databases(client);
export const JOB_COLLECTION_ID = '66bcee46000f41463f90';
export const BOOKMARK_COLLECTION_ID = '66bcee500006b0616156';
export const DATABASE_ID = '66bcee01001047f8dbc4';

// Save a bookmark
 // Import uuid for unique IDs

// Save a bookmark
export const saveBookmark = async (job) => {
  const bookmark = {
    title: job.title || 'No Title',
    location: job.location || 'Unknown Location',
    salary: job.salary || 'N/A',
    phone: job.phone || 'N/A',
  };

  try {
    const documentId = job.$id ? job.$id.toString() : uuidv4(); // Use uuid for a unique ID
    console.log("Attempting to save bookmark:", bookmark);
    const response = await databases.createDocument(DATABASE_ID, BOOKMARK_COLLECTION_ID, documentId, bookmark);
    console.log("Save response:", response);
    return response;
  } catch (error) {
    console.error('Error saving bookmark:', error.message || error);
    alert("Failed to save bookmark.");
  }
};


// Delete a bookmark
export const deleteBookmark = async (id) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, BOOKMARK_COLLECTION_ID, id);
  } catch (error) {
    console.error('Error deleting bookmark:', error);
  }
};

// Fetch all bookmarks
export const getBookmarks = async () => {
  try {
    return await databases.listDocuments(DATABASE_ID, BOOKMARK_COLLECTION_ID);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
  }
};
