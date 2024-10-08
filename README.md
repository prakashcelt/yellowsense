# Job Search App - React Native

## Overview

This React Native application is designed as a job search platform that targets Android devices. It provides a seamless user experience with a bottom navigation UI featuring "Jobs" and "Bookmarks" sections. The application utilizes infinite scrolling to fetch job data and allows users to bookmark jobs for offline viewing. The backend is powered by Appwrite for managing bookmarks and job data.

## Video

I have provided a link showcasing the working of my app. Kindly check it out:

https://drive.google.com/file/d/1yl1yfBDXs91c3JptSGH0vIVBrooUaTXk/view?usp=sharing

## Functional Requirements

1. **Bottom Navigation UI**:
   - The app presents a bottom navigation bar with two sections: "Jobs" and "Bookmarks."

2. **Jobs Screen**:
   - Fetches job data from an API using an infinite scroll approach.
   - Displays job cards showing title, location, salary, and phone number.
   - Clicking a job card navigates to a detailed view of the job.

3. **Bookmarks Screen**:
   - Allows users to bookmark jobs.
   - Bookmarked jobs are stored in an Appwrite database for offline access.
   - Displays a list of bookmarked jobs.

4. **State Management**:
   - Handles loading, error, and empty states throughout the application.

## Technology Stack

- **React Native**: For building the cross-platform mobile application.
- **Appwrite**: For backend services, including storing and fetching bookmarks and job data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prakashcelt/yellowsense.git
