import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import JobsScreen from './screens/JobsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const JobsStack = createStackNavigator();
const BookmarksStack = createStackNavigator();

function JobsStackNavigator() {
  return (
    <JobsStack.Navigator>
      <JobsStack.Screen 
        name="Jobs" 
        component={JobsScreen} 
        options={{ title: 'Jobs' }} // Optional, can be customized
      />
      <JobsStack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen} 
        options={{ title: 'Job Details' }} 
      />
    </JobsStack.Navigator>
  );
}

function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{ title: 'Bookmarks' }} // Optional, can be customized
      />
      <BookmarksStack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen} 
        options={{ title: 'Job Details' }} 
      />
    </BookmarksStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Jobs') {
              iconName = 'briefcase';
            } else if (route.name === 'Bookmarks') {
              iconName = 'bookmark';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            elevation: 0, // For Android shadow
            // Removed shadowOpacity; use boxShadow if targeting web
            // boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.2)' // Uncomment if using web
          },
          headerStyle: {
            backgroundColor: '#0d47a1',
          },
          headerTintColor: '#ffffff',
        })}
      >
        <Tab.Screen name="Jobs" component={JobsStackNavigator} />
        <Tab.Screen name="Bookmarks" component={BookmarksStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
