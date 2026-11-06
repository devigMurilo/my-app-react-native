import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/player-context';
import { SpotifyTheme } from '@/constants/spotify-theme';

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    positionMs,
    durationMs,
    isLiked,
    togglePlay,
    toggleLike,
    openFullPlayer,
  } = usePlayer();

  const progressPercent = durationMs > 0 ? (positionMs / durationMs) * 100 : 0;

  return (
    <Pressable
      onPress={openFullPlayer}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}>
      {/* Barra de Progresso Fina no Topo/Base */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.content}>
        {/* Capa do Álbum */}
        <Image
          source={{ uri: currentTrack.artwork }}
          style={styles.artwork}
          contentFit="cover"
          transition={200}
        />

        {/* Título e Artista */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>

        {/* Botão de Conectar Dispositivo (Ex: Alto-falante) */}
        <View style={styles.deviceIndicator}>
          <Ionicons name="hardware-chip-outline" size={18} color={SpotifyTheme.colors.primary} />
        </View>

        {/* Botão de Curtir / Favorito */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          hitSlop={12}
          style={styles.iconButton}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={22}
            color={isLiked ? SpotifyTheme.colors.primary : SpotifyTheme.colors.textSubdued}
          />
        </Pressable>

        {/* Botão de Play / Pause */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          hitSlop={12}
          style={styles.iconButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={SpotifyTheme.colors.text}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  progressBarBackground: {
    height: 2.5,
    width: '100%',
    backgroundColor: '#3E3E3E',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: SpotifyTheme.colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 10,
  },
  artwork: {
    width: 42,
    height: 42,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: SpotifyTheme.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  artist: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '400',
  },
  deviceIndicator: {
    marginRight: 2,
  },
  iconButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
