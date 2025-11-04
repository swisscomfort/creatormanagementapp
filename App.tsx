import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/authStore';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

SplashScreen.preventAutoHideAsync().catch(() => {
  // ignore if already prevented
});

export default function App() {
  const { refreshSession } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await refreshSession();
      } catch (error) {
        console.log('Session refresh failed', error);
      } finally {
        setIsAppReady(true);
      }
    };

    prepare();
  }, [refreshSession]);

  const handleLayout = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }} onLayout={handleLayout}>
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </QueryClientProvider>
  );
}
