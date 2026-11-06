import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/player-context';
import { SpotifyTheme } from '@/constants/spotify-theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ARTWORK_SIZE = Math.min(SCREEN_WIDTH - 64, 340);

export function FullPlayerModal() {
  const {
    currentTrack,
    isPlaying,
    positionMs,
    durationMs,
    isLiked,
    isFullPlayerVisible,
    shuffle,
    repeat,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    closeFullPlayer,
    formatTime,
  } = usePlayer();

  const progressPercent = durationMs > 0 ? (positionMs / durationMs) * 100 : 0;

  const handleProgressBarPress = (e: any) => {
    const { locationX } = e.nativeEvent;
    const barWidth = SCREEN_WIDTH - 64;
    const clickRatio = Math.max(0, Math.min(locationX / barWidth, 1));
    seekTo(clickRatio * durationMs);
  };

  return (
    <Modal
      visible={isFullPlayerVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={closeFullPlayer}>
      <LinearGradient
        colors={['#3B1E54', '#1E1B2E', '#121212', '#121212']}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Header com Minimizar */}
            <View style={styles.header}>
              <Pressable onPress={closeFullPlayer} hitSlop={16} style={styles.headerButton}>
                <Ionicons name="chevron-down" size={28} color={SpotifyTheme.colors.text} />
              </Pressable>

              <View style={styles.headerInfo}>
                <Text style={styles.headerSubtitle}>TOCANDO DA SUA PLAYLIST</Text>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  {currentTrack.album}
                </Text>
              </View>

              <Pressable hitSlop={16} style={styles.headerButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color={SpotifyTheme.colors.text} />
              </Pressable>
            </View>

            {/* Capa do Álbum Grande */}
            <View style={styles.artworkContainer}>
              <Image
                source={{ uri: currentTrack.artwork }}
                style={styles.artwork}
                contentFit="cover"
                transition={300}
              />
            </View>

            {/* Linha de Título, Artista e Like */}
            <View style={styles.trackDetailsRow}>
              <View style={styles.trackDetailsText}>
                <Text style={styles.trackTitle} numberOfLines={1}>
                  {currentTrack.title}
                </Text>
                <Text style={styles.trackArtist} numberOfLines={1}>
                  {currentTrack.artist}
                </Text>
              </View>

              <Pressable onPress={() => toggleLike()} hitSlop={16} style={styles.likeButton}>
                <Ionicons
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={28}
                  color={isLiked ? SpotifyTheme.colors.primary : SpotifyTheme.colors.textSubdued}
                />
              </Pressable>
            </View>

            {/* Barra de Progresso com Scrubbing */}
            <View style={styles.progressSection}>
              <Pressable
                onPress={handleProgressBarPress}
                style={styles.progressBarTrackContainer}>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarActive, { width: `${progressPercent}%` }]} />
                  <View
                    style={[
                      styles.progressThumb,
                      { left: `${Math.max(0, Math.min(progressPercent, 98))}%` },
                    ]}
                  />
                </View>
              </Pressable>

              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(positionMs)}</Text>
                <Text style={styles.timeText}>{formatTime(durationMs)}</Text>
              </View>
            </View>

            {/* Controles Principais de Reprodução */}
            <View style={styles.controlsRow}>
              {/* Shuffle */}
              <Pressable onPress={toggleShuffle} hitSlop={14} style={styles.controlSubButton}>
                <Ionicons
                  name="shuffle"
                  size={24}
                  color={shuffle ? SpotifyTheme.colors.primary : SpotifyTheme.colors.textSubdued}
                />
                {shuffle && <View style={styles.activeDot} />}
              </Pressable>

              {/* Anterior */}
              <Pressable onPress={prevTrack} hitSlop={14} style={styles.controlSubButton}>
                <Ionicons name="play-skip-back" size={30} color={SpotifyTheme.colors.text} />
              </Pressable>

              {/* Play / Pause Principal Redondo */}
              <Pressable
                onPress={togglePlay}
                style={({ pressed }) => [
                  styles.playPauseCircle,
                  pressed && styles.playPausePressed,
                ]}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={34}
                  color="#000000"
                  style={{ marginLeft: isPlaying ? 0 : 3 }}
                />
              </Pressable>

              {/* Próxima */}
              <Pressable onPress={nextTrack} hitSlop={14} style={styles.controlSubButton}>
                <Ionicons name="play-skip-forward" size={30} color={SpotifyTheme.colors.text} />
              </Pressable>

              {/* Repetir */}
              <Pressable onPress={toggleRepeat} hitSlop={14} style={styles.controlSubButton}>
                <Ionicons
                  name={repeat === 'one' ? 'repeat-outline' : 'repeat'}
                  size={24}
                  color={repeat !== 'off' ? SpotifyTheme.colors.primary : SpotifyTheme.colors.textSubdued}
                />
                {repeat !== 'off' && <View style={styles.activeDot} />}
              </Pressable>
            </View>

            {/* Linha de Conexão com Dispositivo e Compartilhar */}
            <View style={styles.bottomBar}>
              <Pressable style={styles.devicePicker}>
                <Ionicons
                  name="hardware-chip-outline"
                  size={18}
                  color={SpotifyTheme.colors.primary}
                />
                <Text style={styles.deviceName}>Igor's MacBook Pro (Spotify Connect)</Text>
              </Pressable>

              <View style={styles.bottomRightIcons}>
                <Pressable hitSlop={12} style={styles.bottomIcon}>
                  <Ionicons name="share-social-outline" size={20} color={SpotifyTheme.colors.textSubdued} />
                </Pressable>
                <Pressable hitSlop={12} style={styles.bottomIcon}>
                  <Ionicons name="list" size={20} color={SpotifyTheme.colors.textSubdued} />
                </Pressable>
              </View>
            </View>

            {/* Card de Letras (Lyrics Card) */}
            {currentTrack.lyrics && (
              <View style={styles.lyricsCard}>
                <View style={styles.lyricsHeader}>
                  <Text style={styles.lyricsTitle}>Letras</Text>
                  <View style={styles.lyricsShareTag}>
                    <Text style={styles.lyricsShareText}>SINCRONIZADA</Text>
                  </View>
                </View>

                <View style={styles.lyricsLinesContainer}>
                  {currentTrack.lyrics.map((line, idx) => {
                    const isCurrentLine = idx === Math.floor((positionMs / 25000) % currentTrack.lyrics!.length);
                    return (
                      <Text
                        key={idx}
                        style={[
                          styles.lyricLine,
                          isCurrentLine && styles.lyricLineActive,
                        ]}>
                        {line}
                      </Text>
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerButton: {
    padding: 8,
  },
  headerInfo: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
  },
  headerSubtitle: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  artworkContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
  },
  trackDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  trackDetailsText: {
    flex: 1,
    paddingRight: 16,
  },
  trackTitle: {
    color: SpotifyTheme.colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  trackArtist: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  likeButton: {
    padding: 6,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressBarTrackContainer: {
    height: 30,
    justifyContent: 'center',
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: '#4D4D4D',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  timeText: {
    color: SpotifyTheme.colors.textSubdued,
    fontSize: 12,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  controlSubButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: SpotifyTheme.colors.primary,
  },
  playPauseCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  playPausePressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingVertical: 10,
  },
  devicePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceName: {
    color: SpotifyTheme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  bottomRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bottomIcon: {
    padding: 6,
  },
  lyricsCard: {
    backgroundColor: '#4C1D95',
    borderRadius: 18,
    padding: 20,
    marginTop: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  lyricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lyricsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  lyricsShareTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lyricsShareText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  lyricsLinesContainer: {
    gap: 12,
  },
  lyricLine: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  lyricLineActive: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
});
