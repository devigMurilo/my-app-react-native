import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_TRACKS, Track } from '@/data/mock-tracks';

interface PlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  likedTrackIds: Set<string>;
  isLiked: boolean;
  isFullPlayerVisible: boolean;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (ms: number) => void;
  toggleLike: (trackId?: string) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
  formatTime: (ms: number) => string;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]); // Default: Let It Happen - Tame Impala
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [positionMs, setPositionMs] = useState<number>(45000); // Começa em 0:45 para mostrar progresso
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(
    new Set(['let-it-happen', 'blinding-lights', 'the-less-i-know'])
  );
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');

  const durationMs = currentTrack.durationMs;
  const isLiked = likedTrackIds.has(currentTrack.id);

  // Simulação suave de reprodução
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPositionMs((prev) => {
        if (prev >= durationMs) {
          // Passa para a próxima música automaticamente
          nextTrack();
          return 0;
        }
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, durationMs, currentTrack.id]);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setPositionMs(0);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    const currentIndex = MOCK_TRACKS.findIndex((t) => t.id === currentTrack.id);
    let nextIndex = (currentIndex + 1) % MOCK_TRACKS.length;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * MOCK_TRACKS.length);
    }
    setCurrentTrack(MOCK_TRACKS[nextIndex]);
    setPositionMs(0);
    setIsPlaying(true);
  }, [currentTrack.id, shuffle]);

  const prevTrack = useCallback(() => {
    if (positionMs > 5000) {
      setPositionMs(0);
      return;
    }
    const currentIndex = MOCK_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length;
    setCurrentTrack(MOCK_TRACKS[prevIndex]);
    setPositionMs(0);
    setIsPlaying(true);
  }, [currentTrack.id, positionMs]);

  const seekTo = useCallback((ms: number) => {
    setPositionMs(Math.max(0, Math.min(ms, durationMs)));
  }, [durationMs]);

  const toggleLike = useCallback((trackId?: string) => {
    const targetId = trackId || currentTrack.id;
    setLikedTrackIds((prev) => {
      const next = new Set(prev);
      if (next.has(targetId)) {
        next.delete(targetId);
      } else {
        next.add(targetId);
      }
      return next;
    });
  }, [currentTrack.id]);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const openFullPlayer = useCallback(() => {
    setIsFullPlayerVisible(true);
  }, []);

  const closeFullPlayer = useCallback(() => {
    setIsFullPlayerVisible(false);
  }, []);

  const formatTime = useCallback((ms: number): string => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      positionMs,
      durationMs,
      likedTrackIds,
      isLiked,
      isFullPlayerVisible,
      shuffle,
      repeat,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seekTo,
      toggleLike,
      toggleShuffle,
      toggleRepeat,
      openFullPlayer,
      closeFullPlayer,
      formatTime,
    }),
    [
      currentTrack,
      isPlaying,
      positionMs,
      durationMs,
      likedTrackIds,
      isLiked,
      isFullPlayerVisible,
      shuffle,
      repeat,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seekTo,
      toggleLike,
      toggleShuffle,
      toggleRepeat,
      openFullPlayer,
      closeFullPlayer,
      formatTime,
    ]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
