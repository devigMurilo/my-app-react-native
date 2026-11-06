import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/player-context';
import { SpotifyTheme } from '@/constants/spotify-theme';
import {
  MOCK_CATEGORIES,
  MOCK_TRACKS,
  Track,
} from '@/data/mock-tracks';

export default function SearchScreen() {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = searchQuery.trim()
    ? MOCK_TRACKS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header Fixo */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buscar</Text>
          <Pressable hitSlop={12} style={styles.cameraButton}>
            <Ionicons name="camera-outline" size={24} color={SpotifyTheme.colors.text} />
          </Pressable>
        </View>

        {/* Barra de Pesquisa Estilo Spotify */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000000" style={styles.searchIcon} />
          <TextInput
            placeholder="O que você quer ouvir?"
            placeholderTextColor="#535353"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color="#535353" />
            </Pressable>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {searchQuery.trim().length > 0 ? (
            /* Resultados da Busca */
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Músicas e Artistas</Text>
              {filteredTracks.length > 0 ? (
                filteredTracks.map((track) => {
                  const isCurrent = currentTrack.id === track.id;
                  return (
                    <Pressable
                      key={track.id}
                      onPress={() => playTrack(track)}
                      style={({ pressed }) => [
                        styles.trackRow,
                        pressed && styles.trackRowPressed,
                      ]}>
                      <Image
                        source={{ uri: track.artwork }}
                        style={styles.trackArtwork}
                        contentFit="cover"
                        transition={200}
                      />
                      <View style={styles.trackInfo}>
                        <Text
                          style={[
                            styles.trackTitleText,
                            isCurrent && { color: SpotifyTheme.colors.primary },
                          ]}
                          numberOfLines={1}>
                          {track.title}
                        </Text>
                        <Text style={styles.trackArtistText} numberOfLines={1}>
                          Música · {track.artist}
                        </Text>
                      </View>
                      <Pressable hitSlop={12} style={styles.trackRowMore}>
                        <Ionicons
                          name="ellipsis-horizontal"
                          size={18}
                          color={SpotifyTheme.colors.textSubdued}
                        />
                      </Pressable>
                    </Pressable>
                  );
                })
              ) : (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={48} color="#535353" />
                  <Text style={styles.emptyTitle}>Nenhum resultado encontrado</Text>
                  <Text style={styles.emptySubtitle}>
                    Tente verificar se a digitação está correta ou pesquise por outro artista.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            /* Grade de Categorias: "Navegar por todas as seções" */
            <View style={styles.categoriesSection}>
              <Text style={styles.categoriesTitle}>Navegar por todas as seções</Text>
              <View style={styles.categoryGrid}>
                {MOCK_CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={({ pressed }) => [
                      styles.categoryCard,
                      { backgroundColor: cat.color },
                      pressed && styles.categoryCardPressed,
                    ]}>
                    <Text style={styles.categoryCardTitle}>{cat.title}</Text>
                    {/* Imagem em ângulo característica do Spotify */}
                    <Image
                      source={{ uri: cat.artwork }}
                      style={styles.categoryCardImage}
                      contentFit="cover"
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          )}

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
  headerTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  cameraButton: {
    padding: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  resultsSection: {
    marginTop: 8,
  },
  resultsTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  trackRowPressed: {
    opacity: 0.7,
  },
  trackArtwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trackTitleText: {
    color: SpotifyTheme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  trackArtistText: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 12,
    marginTop: 3,
    fontWeight: '500',
  },
  trackRowMore: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
  categoriesSection: {
    marginTop: 4,
  },
  categoriesTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    height: 96,
    borderRadius: 6,
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  categoryCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  categoryCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    maxWidth: '75%',
    lineHeight: 20,
  },
  categoryCardImage: {
    position: 'absolute',
    right: -10,
    bottom: -6,
    width: 64,
    height: 64,
    borderRadius: 4,
    transform: [{ rotate: '25deg' }],
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
