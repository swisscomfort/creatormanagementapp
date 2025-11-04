// Types für die gesamte App

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Creator {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  platforms: Platform[];
  followers: number;
  subscribers: number;
  monthlyRevenue: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  type: 'youtube' | 'instagram' | 'tiktok' | 'twitch' | 'onlyfans';
  username: string;
  followers: number;
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  lastSync?: Date;
}

export interface Content {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'text';
  mediaUrl?: string;
  thumbnailUrl?: string;
  platforms: string[];
  scheduledDate?: Date;
  publishedDate?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: ContentAnalytics;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentAnalytics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  revenue: number;
}

export interface ChatMessage {
  id: string;
  creatorId: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

export interface Subscription {
  id: string;
  creatorId: string;
  subscriberId: string;
  tier: 'free' | 'basic' | 'premium';
  price: number;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  billingCycle: 'monthly' | 'yearly';
}

export interface Analytics {
  creatorId: string;
  period: 'day' | 'week' | 'month' | 'year';
  date: Date;
  followers: number;
  newFollowers: number;
  unfollowers: number;
  revenue: number;
  views: number;
  engagement: number;
  topContent: Content[];
  platformBreakdown: {
    platform: string;
    followers: number;
    revenue: number;
    engagement: number;
  }[];
}

export type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  Dashboard: undefined;
  Creators: undefined;
  CreatorDetail: { creatorId: string };
  CreatorEdit: { creatorId?: string };
  Content: undefined;
  ContentDetail: { contentId: string };
  ContentUpload: { creatorId: string };
  Analytics: { creatorId?: string };
  Chat: { creatorId: string };
  Settings: undefined;
  Profile: undefined;
};
