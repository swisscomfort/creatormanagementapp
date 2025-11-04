// App Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.creatorapp.com';
export const WS_URL = process.env.EXPO_PUBLIC_WS_URL || 'wss://api.creatorapp.com';

// Firebase Configuration (für Production aus Environment Variables)
export const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'your-api-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-auth-domain',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-storage-bucket',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
};

// AWS S3 Configuration
export const S3_CONFIG = {
  region: process.env.EXPO_PUBLIC_AWS_REGION || 'eu-central-1',
  bucket: process.env.EXPO_PUBLIC_S3_BUCKET || 'creator-app-media',
};

// Platform OAuth Configuration
export const OAUTH_CONFIG = {
  youtube: {
    clientId: process.env.EXPO_PUBLIC_YOUTUBE_CLIENT_ID || '',
    redirectUrl: 'com.creatorapp://oauth/youtube',
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.upload',
    ],
  },
  instagram: {
    clientId: process.env.EXPO_PUBLIC_INSTAGRAM_CLIENT_ID || '',
    redirectUrl: 'com.creatorapp://oauth/instagram',
    scopes: ['user_profile', 'user_media'],
  },
  tiktok: {
    clientId: process.env.EXPO_PUBLIC_TIKTOK_CLIENT_ID || '',
    redirectUrl: 'com.creatorapp://oauth/tiktok',
    scopes: ['user.info.basic', 'video.list', 'video.upload'],
  },
};

// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiUrl: process.env.EXPO_PUBLIC_OPENAI_API_URL || 'https://api.creatorapp.com/ai',
  model: 'gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7,
};

// App Constants
export const APP_NAME = 'Creator Management';
export const APP_VERSION = '1.0.0';
export const SUPPORT_EMAIL = 'support@creatorapp.com';

// Pagination
export const PAGE_SIZE = 20;
export const INITIAL_PAGE = 1;

// Media Upload
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-matroska'];

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['1 Creator Account', '10 Posts pro Monat', 'Basis-Analytics', 'Community Support'],
  },
  basic: {
    name: 'Basic',
    price: 9.99,
    features: [
      '3 Creator Accounts',
      '100 Posts pro Monat',
      'Erweiterte Analytics',
      'Email Support',
      'Content Scheduling',
    ],
  },
  premium: {
    name: 'Premium',
    price: 29.99,
    features: [
      'Unbegrenzte Creator Accounts',
      'Unbegrenzte Posts',
      'Advanced Analytics & Reports',
      'Priority Support',
      'AI-Assistant',
      'Multi-Platform Integration',
      'Team Collaboration',
    ],
  },
};

// Platform Icons
export const PLATFORM_ICONS = {
  youtube: 'youtube',
  instagram: 'instagram',
  tiktok: 'music-note',
  twitch: 'game-controller',
  onlyfans: 'star',
};

// Chart Colors
export const CHART_COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#5AC8FA',
};

// Date Formats
export const DATE_FORMAT = 'DD.MM.YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm';

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Netzwerkfehler. Bitte überprüfe deine Internetverbindung.',
  unauthorized: 'Nicht autorisiert. Bitte melde dich erneut an.',
  server: 'Serverfehler. Bitte versuche es später erneut.',
  validation: 'Bitte überprüfe deine Eingaben.',
  unknown: 'Ein unbekannter Fehler ist aufgetreten.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  creatorCreated: 'Creator erfolgreich erstellt!',
  creatorUpdated: 'Creator erfolgreich aktualisiert!',
  creatorDeleted: 'Creator erfolgreich gelöscht!',
  contentUploaded: 'Inhalt erfolgreich hochgeladen!',
  contentScheduled: 'Inhalt erfolgreich geplant!',
  profileUpdated: 'Profil erfolgreich aktualisiert!',
};
