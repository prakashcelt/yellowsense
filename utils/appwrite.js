// utils/appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66bcede7000b52a65173');

export const databases = new Databases(client);
export const JOB_COLLECTION_ID = '66bcee46000f41463f90';
export const BOOKMARK_COLLECTION_ID = '66bcee500006b0616156';
export const DATABASE_ID = '66bcee01001047f8dbc4';

// Save a bookmark
export const saveBookmark = async (job) => {
  const bookmark = {
    title: job.title || 'No Title',
    location: job.location || 'Unknown Location',
    salary: job.salary || 'N/A',
    phone: job.phone || 'N/A',
  };

  try {
    const documentId = job.$id ? job.$id.toString() : new Date().toISOString();
    alert("added to database");
    return await databases.createDocument(DATABASE_ID, BOOKMARK_COLLECTION_ID, documentId, bookmark);
  } catch (error) {
    console.error('Error saving bookmark:', error);
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
