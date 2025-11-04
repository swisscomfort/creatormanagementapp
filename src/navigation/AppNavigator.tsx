import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@store/authStore';

// Import Screens (werden später erstellt)
import LoginScreen from '@screens/auth/LoginScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import DashboardScreen from '@screens/dashboard/DashboardScreen';
import CreatorsScreen from '@screens/creators/CreatorsScreen';
import CreatorDetailScreen from '@screens/creators/CreatorDetailScreen';
import CreatorEditScreen from '@screens/creators/CreatorEditScreen';
import ContentScreen from '@screens/content/ContentScreen';
import ContentUploadScreen from '@screens/content/ContentUploadScreen';
import AnalyticsScreen from '@screens/analytics/AnalyticsScreen';
import ChatScreen from '@screens/chat/ChatScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';

import { RootStackParamList } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Creators':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Content':
              iconName = focused ? 'images' : 'images-outline';
              break;
            case 'Analytics':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen name="Creators" component={CreatorsScreen} options={{ tabBarLabel: 'Creator' }} />
      <Tab.Screen name="Content" component={ContentScreen} options={{ tabBarLabel: 'Content' }} />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Einstellungen' }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="CreatorDetail"
        component={CreatorDetailScreen}
        options={{ title: 'Creator Details' }}
      />
      <Stack.Screen
        name="CreatorEdit"
        component={CreatorEditScreen}
        options={{ title: 'Creator bearbeiten' }}
      />
      <Stack.Screen
        name="ContentUpload"
        component={ContentUploadScreen}
        options={{ title: 'Content hochladen' }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Chat' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mein Profil' }} />
    </Stack.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
