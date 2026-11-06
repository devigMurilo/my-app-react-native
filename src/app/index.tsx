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
  MOCK_TRACKS,
  MOCK_PLAYLISTS,
  MOCK_ARTISTS,
  Track,
  Playlist,
} from '@/data/mock-tracks';

export default function HomeScreen() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const [activeFilter, setActiveFilter] = useState<'tudo' | 'musica' | 'podcasts'>('tudo');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handlePlayQuickItem = (trackId: string) => {
    const target = MOCK_TRACKS.find((t) => t.id === trackId) || MOCK_TRACKS[0];
    if (currentTrack.id === target.id) {
      togglePlay();
    } else {
      playTrack(target);
    }
  };

  const quickItems = [
    { id: 'liked-songs', title: 'Músicas Curtidas', trackId: 'let-it-happen', isLikedCard: true },
    { id: 'tame-impala', title: 'Tame Impala', trackId: 'let-it-happen', artwork: MOCK_TRACKS[0].artwork },
    { id: 'daily-mix-1', title: 'Daily Mix 1', trackId: 'the-less-i-know', artwork: MOCK_PLAYLISTS[1].artwork },
    { id: 'top-brasil', title: 'Top 50 - Brasil', trackId: 'blinding-lights', artwork: MOCK_PLAYLISTS[3].artwork },
    { id: 'the-weeknd', title: 'After Hours', trackId: 'blinding-lights', artwork: MOCK_TRACKS[1].artwork },
    { id: 'lofi-dark', title: 'Noite Dark & Lo-Fi', trackId: 'midnight-city', artwork: MOCK_PLAYLISTS[5].artwork },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A44', '#121212', '#121212']}
        style={styles.gradientHeader}
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Top Bar com Saudação e Ícones de Perfil/Config */}
          <View style={styles.topBar}>
            <View style={styles.avatarRow}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>I</Text>
              </View>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
            </View>

            <View style={styles.topIcons}>
              <Pressable hitSlop={10} style={styles.topIconButton}>
                <Ionicons name="notifications-outline" size={22} color={SpotifyTheme.colors.text} />
              </Pressable>
              <Pressable hitSlop={10} style={styles.topIconButton}>
                <Ionicons name="time-outline" size={22} color={SpotifyTheme.colors.text} />
              </Pressable>
              <Pressable hitSlop={10} style={styles.topIconButton}>
                <Ionicons name="settings-outline" size={22} color={SpotifyTheme.colors.text} />
              </Pressable>
            </View>
          </View>

          {/* Filtros em Cápsula (Pills): Tudo / Música / Podcasts */}
          <View style={styles.filterPillsRow}>
            {(['tudo', 'musica', 'podcasts'] as const).map((f) => {
              const label = f === 'tudo' ? 'Tudo' : f === 'musica' ? 'Música' : 'Podcasts';
              const isActive = activeFilter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setActiveFilter(f)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}>
                  <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Grade de 6 Acessos Rápidos (2 Colunas x 3 Linhas) */}
          <View style={styles.quickGrid}>
            {quickItems.map((item) => {
              const isCurrentPlayingThis = currentTrack.id === item.trackId && isPlaying;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handlePlayQuickItem(item.trackId)}
                  style={({ pressed }) => [styles.quickCard, pressed && styles.quickCardPressed]}>
                  {item.isLikedCard ? (
                    <LinearGradient
                      colors={['#450AF5', '#8E8EE5']}
                      style={styles.quickCardImagePlaceholder}>
                      <Ionicons name="heart" size={22} color="#FFFFFF" />
                    </LinearGradient>
                  ) : (
                    <Image
                      source={{ uri: item.artwork }}
                      style={styles.quickCardImage}
                      contentFit="cover"
                      transition={200}
                    />
                  )}

                  <Text style={styles.quickCardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>

                  {/* Play Button Flutuante verde */}
                  <View style={[styles.quickCardPlayBtn, isCurrentPlayingThis && styles.quickCardPlayBtnActive]}>
                    <Ionicons
                      name={isCurrentPlayingThis ? 'pause' : 'play'}
                      size={14}
                      color="#000000"
                      style={{ marginLeft: isCurrentPlayingThis ? 0 : 2 }}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Carrossel 1: Tocadas Recentemente */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tocadas recentemente</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}>
            {MOCK_TRACKS.map((track) => {
              const isThisTrack = currentTrack.id === track.id;
              return (
                <Pressable
                  key={track.id}
                  onPress={() => playTrack(track)}
                  style={styles.mediaCard}>
                  <Image
                    source={{ uri: track.artwork }}
                    style={styles.mediaCardImage}
                    contentFit="cover"
                    transition={200}
                  />
                  <Text
                    style={[styles.mediaCardTitle, isThisTrack && { color: SpotifyTheme.colors.primary }]}
                    numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text style={styles.mediaCardSubtitle} numberOfLines={1}>
                    {track.artist}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Carrossel 2: Feito para Você (Daily Mixes & Playlists) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Feito para você</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}>
            {MOCK_PLAYLISTS.map((playlist) => (
              <Pressable
                key={playlist.id}
                onPress={() => {
                  const targetTrack = MOCK_TRACKS.find((t) => t.id === playlist.tracks[0]) || MOCK_TRACKS[0];
                  playTrack(targetTrack);
                }}
                style={styles.mediaCard}>
                <Image
                  source={{ uri: playlist.artwork }}
                  style={styles.mediaCardImage}
                  contentFit="cover"
                  transition={200}
                />
                <Text style={styles.mediaCardTitle} numberOfLines={1}>
                  {playlist.title}
                </Text>
                <Text style={styles.mediaCardSubtitle} numberOfLines={2}>
                  {playlist.subtitle}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Carrossel 3: Seus Artistas Favoritos (Círculos) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seus artistas favoritos</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}>
            {MOCK_ARTISTS.map((artist) => (
              <Pressable
                key={artist.id}
                onPress={() => {
                  const t = MOCK_TRACKS.find((tk) => tk.artist.toLowerCase().includes(artist.name.toLowerCase())) || MOCK_TRACKS[0];
                  playTrack(t);
                }}
                style={styles.artistCard}>
                <Image
                  source={{ uri: artist.artwork }}
                  style={styles.artistImage}
                  contentFit="cover"
                  transition={200}
                />
                <Text style={styles.artistName} numberOfLines={1}>
                  {artist.name}
                </Text>
                <Text style={styles.artistTag}>Artista</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Espaçamento extra no fim para o MiniPlayer flutuante */}
          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SpotifyTheme.colors.background,
  },
  gradientHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatarRow: {
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
  greetingText: {
    color: SpotifyTheme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  topIconButton: {
    padding: 4,
  },
  filterPillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  filterPill: {
    backgroundColor: '#282828',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: SpotifyTheme.colors.primary,
  },
  filterPillText: {
    color: SpotifyTheme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 28,
  },
  quickCard: {
    width: '48.8%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 6,
    overflow: 'hidden',
    height: 56,
  },
  quickCardPressed: {
    opacity: 0.85,
    backgroundColor: '#383838',
  },
  quickCardImage: {
    width: 56,
    height: 56,
  },
  quickCardImagePlaceholder: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCardTitle: {
    flex: 1,
    color: SpotifyTheme.colors.text,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  quickCardPlayBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: SpotifyTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    opacity: 0.9,
  },
  quickCardPlayBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  carouselContainer: {
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 28,
  },
  mediaCard: {
    width: 146,
  },
  mediaCardImage: {
    width: 146,
    height: 146,
    borderRadius: 8,
    marginBottom: 8,
  },
  mediaCardTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  mediaCardSubtitle: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
    lineHeight: 15,
  },
  artistCard: {
    width: 130,
    alignItems: 'center',
  },
  artistImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 8,
  },
  artistName: {
    color: SpotifyTheme.colors.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  artistTag: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});
