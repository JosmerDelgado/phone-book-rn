import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/components/useColorScheme';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '@/src/amplifyconfiguration.json';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { ContactsProvider } from '@/components/ContactsContext';
Amplify.configure(amplifyconfig);

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(contacts)/index" options={{ title: "Phone Book", headerRight: () => (
            <Link href="/modal/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-plus"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}} />
        <Stack.Screen name="modal/index" options={{ presentation: 'modal', title: "New Contact" }} />
        <Stack.Screen name="modal/[contact_id]/index" options={{ presentation: 'modal', title: "New Contact" }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <ContactsProvider><RootLayoutNav /></ContactsProvider>;
}
