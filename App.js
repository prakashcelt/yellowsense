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
      <JobsStack.Screen name="Jobs" component={JobsScreen} />
      <JobsStack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
    </JobsStack.Navigator>
  );
}

function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen name="Bookmarks" component={BookmarksScreen} />
      <BookmarksStack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
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

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            elevation: 0, // For Android shadow
            shadowOpacity: 0, // For iOS shadow
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
