import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/player-context';
import { SpotifyTheme } from '@/constants/spotify-theme';
import {
  MOCK_PLAYLISTS,
  MOCK_ARTISTS,
  MOCK_TRACKS,
} from '@/data/mock-tracks';

export default function LibraryScreen() {
  const { playTrack } = usePlayer();
  const [activeFilter, setActiveFilter] = useState<'tudo' | 'playlists' | 'artistas' | 'albuns'>('tudo');

  const filterOptions = [
    { id: 'tudo', label: 'Tudo' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artistas', label: 'Artistas' },
    { id: 'albuns', label: 'Álbuns' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>I</Text>
            </View>
            <Text style={styles.headerTitle}>Sua Biblioteca</Text>
          </View>

          <View style={styles.headerRight}>
            <Pressable hitSlop={12} style={styles.headerIcon}>
              <Ionicons name="search" size={22} color={SpotifyTheme.colors.text} />
            </Pressable>
            <Pressable hitSlop={12} style={styles.headerIcon}>
              <Ionicons name="add" size={26} color={SpotifyTheme.colors.text} />
            </Pressable>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.pillsRow}>
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setActiveFilter(opt.id as any)}
                style={[styles.pill, isActive && styles.pillActive]}>
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Linha de Ordenação */}
        <View style={styles.sortRow}>
          <Pressable style={styles.sortButton}>
            <Ionicons name="swap-vertical" size={16} color={SpotifyTheme.colors.textSubdued} />
            <Text style={styles.sortText}>Recentes</Text>
          </Pressable>

          <Pressable hitSlop={10}>
            <Ionicons name="grid-outline" size={18} color={SpotifyTheme.colors.textSubdued} />
          </Pressable>
        </View>

        {/* Lista de Playlists e Artistas */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Card Especial: Músicas Curtidas (Fixado) */}
          <Pressable
            onPress={() => playTrack(MOCK_TRACKS[0])}
            style={({ pressed }) => [styles.libraryRow, pressed && styles.rowPressed]}>
            <LinearGradient
              colors={['#450AF5', '#8E8EE5']}
              style={styles.likedSquare}>
              <Ionicons name="heart" size={28} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.libraryInfo}>
              <Text style={styles.itemTitle}>Músicas Curtidas</Text>
              <View style={styles.pinSubRow}>
                <Ionicons name="pin" size={12} color={SpotifyTheme.colors.primary} />
                <Text style={styles.itemSubtitle}>Playlist · 342 músicas</Text>
              </View>
            </View>
          </Pressable>

          {/* Playlists */}
          {(activeFilter === 'tudo' || activeFilter === 'playlists') &&
            MOCK_PLAYLISTS.slice(1).map((playlist) => (
              <Pressable
                key={playlist.id}
                onPress={() => {
                  const target = MOCK_TRACKS.find((t) => t.id === playlist.tracks[0]) || MOCK_TRACKS[0];
                  playTrack(target);
                }}
                style={({ pressed }) => [styles.libraryRow, pressed && styles.rowPressed]}>
                <Image
                  source={{ uri: playlist.artwork }}
                  style={styles.playlistThumb}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.libraryInfo}>
                  <Text style={styles.itemTitle}>{playlist.title}</Text>
                  <Text style={styles.itemSubtitle}>Playlist · Spotify</Text>
                </View>
              </Pressable>
            ))}

          {/* Artistas Seguidos */}
          {(activeFilter === 'tudo' || activeFilter === 'artistas') &&
            MOCK_ARTISTS.map((artist) => (
              <Pressable
                key={artist.id}
                onPress={() => {
                  const target = MOCK_TRACKS.find((t) => t.artist.toLowerCase().includes(artist.name.toLowerCase())) || MOCK_TRACKS[0];
                  playTrack(target);
                }}
                style={({ pressed }) => [styles.libraryRow, pressed && styles.rowPressed]}>
                <Image
                  source={{ uri: artist.artwork }}
                  style={styles.artistThumb}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.libraryInfo}>
                  <Text style={styles.itemTitle}>{artist.name}</Text>
                  <Text style={styles.itemSubtitle}>Artista · {artist.followers}</Text>
                </View>
              </Pressable>
            ))}

          <View style={{ height: 110 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SpotifyTheme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: SpotifyTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  headerTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  pill: {
    backgroundColor: '#282828',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: SpotifyTheme.colors.primary,
  },
  pillText: {
    color: SpotifyTheme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  libraryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 14,
  },
  rowPressed: {
    opacity: 0.7,
  },
  likedSquare: {
    width: 64,
    height: 64,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistThumb: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  artistThumb: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  libraryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  pinSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  itemSubtitle: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 13,
    fontWeight: '500',
  },
});
