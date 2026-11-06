import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Tabs, DarkTheme, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { PlayerProvider } from '@/context/player-context';
import { MiniPlayer } from '@/components/player/mini-player';
import { FullPlayerModal } from '@/components/player/full-player-modal';
import { SpotifyTheme } from '@/constants/spotify-theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <PlayerProvider>
        <StatusBar style="light" />
        <View style={{ flex: 1, backgroundColor: SpotifyTheme.colors.background }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#000000',
                borderTopColor: '#282828',
                borderTopWidth: 0.5,
                height: 60,
                paddingBottom: 8,
                paddingTop: 6,
              },
              tabBarActiveTintColor: '#FFFFFF',
              tabBarInactiveTintColor: '#B3B3B3',
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: '600',
              },
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Início',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color as string} />
                ),
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Buscar',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color as string} />
                ),
              }}
            />
            <Tabs.Screen
              name="library"
              options={{
                title: 'Sua Biblioteca',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'library' : 'library-outline'} size={24} color={color as string} />
                ),
              }}
            />
          </Tabs>

          {/* MiniPlayer flutuante acima da TabBar */}
          <View
            style={{
              position: 'absolute',
              bottom: 64,
              left: 0,
              right: 0,
              zIndex: 99,
            }}
            pointerEvents="box-none">
            <MiniPlayer />
          </View>

          {/* Modal Full Player com Arte Grande, Lyrics e Controles */}
          <FullPlayerModal />
        </View>
      </PlayerProvider>
    </ThemeProvider>
  );
}
