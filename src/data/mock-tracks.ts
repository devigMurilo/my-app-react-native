export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  durationMs: number;
  lyrics?: string[];
}

export interface Playlist {
  id: string;
  title: string;
  subtitle: string;
  artwork: string;
  color?: string;
  trackCount: number;
  tracks: string[];
}

export interface Category {
  id: string;
  title: string;
  color: string;
  artwork: string;
}

export const MOCK_TRACKS: Track[] = [
  {
    id: "let-it-happen",
    title: "Let It Happen",
    artist: "Tame Impala",
    album: "Currents",
    artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    durationMs: 467000,
    lyrics: [
      "It's always around me, all this noise",
      "But not nearly as loud as the voice saying",
      "Let it happen, let it happen (It's gonna feel so good)",
      "Just let it happen, let it happen",
      "All this running around",
      "Trying to cover my shadow",
      "A notion in disguise",
      "Almost right before our eyes",
      "If you only knew the feeling...",
    ],
  },
  {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    durationMs: 200000,
    lyrics: [
      "I've been on my own for long enough",
      "Maybe you can show me how to love, maybe",
      "I'm going through withdrawals",
      "You don't even have to do too much",
      "You can turn me on with just a touch, baby",
      "I look around and Sin City's cold and empty",
      "No one's around to judge me",
      "I can't see clearly when you're gone",
      "I said, ooh, I'm blinded by the lights!",
    ],
  },
  {
    id: "the-less-i-know",
    title: "The Less I Know The Better",
    artist: "Tame Impala",
    album: "Currents",
    artwork: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    durationMs: 216000,
    lyrics: [
      "Someone said they left together",
      "I ran out the door to get her",
      "She was holding hands with Trevor",
      "Not the greatest feeling ever",
      "Said, 'Pull yourself together'",
      "You should try your luck with her",
      "Hope they're happy together...",
    ],
  },
  {
    id: "midnight-city",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    artwork: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    durationMs: 243000,
    lyrics: [
      "Waiting in a car",
      "Waiting for a ride in the dark",
      "The night city grows",
      "Look and see her eyes, they glow",
      "Waiting in a car",
      "Waiting for a ride in the dark",
      "The city is my church",
      "It wraps me in the blinding twilight",
    ],
  },
  {
    id: "do-i-wanna-know",
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    durationMs: 272000,
    lyrics: [
      "Have you got colour in your cheeks?",
      "Do you ever get that fear that you can't shift the type",
      "That sticks around like summat in your teeth?",
      "Are there some aces up your sleeve?",
      "Have you no idea that you're in deep?",
      "I dreamt about you nearly every night this week",
      "How many secrets can you keep?",
    ],
  },
  {
    id: "sweater-weather",
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    durationMs: 240000,
    lyrics: [
      "All I am is a man",
      "I want the world in my hands",
      "I hate the beach, but I stand in California with my toes in the sand",
      "Use the sleeves of my sweater",
      "Let's have an adventure",
      "Head in the clouds but my gravity centered",
      "Touch my neck and I'll touch yours",
      "You in those little high waisted shorts, oh",
    ],
  },
  {
    id: "as-it-was",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
    durationMs: 167000,
    lyrics: [
      "Hold on, as it was",
      "You know it's not the same as it was",
      "In this world, it's just us",
      "You know it's not the same as it was",
      "As it was, as it was...",
    ],
  },
  {
    id: "starboy",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=80",
    durationMs: 230000,
    lyrics: [
      "I'm tryna put you in the worst mood, ah",
      "P1 cleaner than your church shoes, ah",
      "Milli point two just to hurt you, ah",
      "All red Lamb' just to tease you, ah",
      "Look what you've done",
      "I'm a motherfuckin' starboy!",
    ],
  },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: "liked-songs",
    title: "Músicas Curtidas",
    subtitle: "Playlist · 342 músicas",
    artwork: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80",
    color: "#5B21B6",
    trackCount: 342,
    tracks: ["let-it-happen", "blinding-lights", "the-less-i-know", "do-i-wanna-know"],
  },
  {
    id: "daily-mix-1",
    title: "Daily Mix 1",
    subtitle: "Tame Impala, Arctic Monkeys e mais",
    artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80",
    color: "#1E3A8A",
    trackCount: 50,
    tracks: ["let-it-happen", "the-less-i-know", "do-i-wanna-know", "sweater-weather"],
  },
  {
    id: "daily-mix-2",
    title: "Daily Mix 2",
    subtitle: "The Weeknd, Daft Punk, M83",
    artwork: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
    color: "#831843",
    trackCount: 45,
    tracks: ["blinding-lights", "starboy", "midnight-city"],
  },
  {
    id: "top-brasil",
    title: "Top 50 - Brasil",
    subtitle: "Seu relatório diário das mais tocadas",
    artwork: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    color: "#065F46",
    trackCount: 50,
    tracks: ["blinding-lights", "as-it-was", "starboy"],
  },
  {
    id: "descobertas",
    title: "Descobertas da Semana",
    subtitle: "Sua mixtape semanal de músicas novas",
    artwork: "https://images.unsplash.com/photo-1520523839898-50712825e3a7?w=800&auto=format&fit=crop&q=80",
    color: "#78350F",
    trackCount: 30,
    tracks: ["midnight-city", "sweater-weather", "let-it-happen"],
  },
  {
    id: "lofi-dark",
    title: "Noite Dark & Lo-Fi",
    subtitle: "Batidas calmas para programar e relaxar",
    artwork: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    color: "#1E293B",
    trackCount: 80,
    tracks: ["let-it-happen", "midnight-city"],
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "pop", title: "Pop", color: "#EC4899", artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" },
  { id: "rock", title: "Rock", color: "#EF4444", artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80" },
  { id: "hip-hop", title: "Hip-Hop", color: "#F97316", artwork: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80" },
  { id: "indie", title: "Indie / Alt", color: "#10B981", artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
  { id: "eletronica", title: "Eletrônica", color: "#3B82F6", artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80" },
  { id: "funk", title: "Funk Brasil", color: "#8B5CF6", artwork: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80" },
  { id: "foco", title: "Foco & Trabalho", color: "#06B6D4", artwork: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" },
  { id: "treino", title: "Treino Pesado", color: "#EAB308", artwork: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80" },
  { id: "relax", title: "Relaxar & Dormir", color: "#64748B", artwork: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" },
  { id: "podcasts", title: "Podcasts", color: "#14B8A6", artwork: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80" },
];

export const MOCK_ARTISTS = [
  { id: "tame-impala", name: "Tame Impala", followers: "12.4M seguidores", artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
  { id: "the-weeknd", name: "The Weeknd", followers: "108M ouvintes mensais", artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" },
  { id: "arctic-monkeys", name: "Arctic Monkeys", followers: "44M ouvintes mensais", artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" },
  { id: "daft-punk", name: "Daft Punk", followers: "28M ouvintes mensais", artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80" },
  { id: "lana-del-rey", name: "Lana Del Rey", followers: "55M ouvintes mensais", artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80" },
];
