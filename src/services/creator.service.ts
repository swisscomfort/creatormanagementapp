import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Creator, Content } from '@/types';
import { API_BASE_URL } from '@constants/config';

class CreatorService {
  private axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Längeres Timeout für Uploads
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // Creator CRUD Operations
  async getCreators(): Promise<Creator[]> {
    try {
      const response = await this.axiosInstance.get<Creator[]>('/creators');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden der Creator');
    }
  }

  async getCreatorById(id: string): Promise<Creator> {
    try {
      const response = await this.axiosInstance.get<Creator>(`/creators/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden des Creators');
    }
  }

  async createCreator(
    creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Creator> {
    try {
      const response = await this.axiosInstance.post<Creator>('/creators', creatorData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Erstellen des Creators');
    }
  }

  async updateCreator(id: string, creatorData: Partial<Creator>): Promise<Creator> {
    try {
      const response = await this.axiosInstance.put<Creator>(`/creators/${id}`, creatorData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Aktualisieren des Creators');
    }
  }

  async deleteCreator(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/creators/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Löschen des Creators');
    }
  }

  // Platform Integration
  async connectPlatform(
    creatorId: string,
    platform: string,
    accessToken: string,
  ): Promise<Creator> {
    try {
      const response = await this.axiosInstance.post<Creator>(
        `/creators/${creatorId}/platforms/${platform}/connect`,
        { accessToken },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Verbinden der Plattform');
    }
  }

  async disconnectPlatform(creatorId: string, platform: string): Promise<Creator> {
    try {
      const response = await this.axiosInstance.delete<Creator>(
        `/creators/${creatorId}/platforms/${platform}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Trennen der Plattform');
    }
  }

  async syncPlatformData(creatorId: string, platform: string): Promise<void> {
    try {
      await this.axiosInstance.post(`/creators/${creatorId}/platforms/${platform}/sync`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Synchronisieren der Plattform');
    }
  }

  // Content Management
  async getContents(creatorId: string): Promise<Content[]> {
    try {
      const response = await this.axiosInstance.get<Content[]>(`/creators/${creatorId}/contents`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden der Inhalte');
    }
  }

  async getContentById(contentId: string): Promise<Content> {
    try {
      const response = await this.axiosInstance.get<Content>(`/contents/${contentId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden des Inhalts');
    }
  }

  async uploadContent(creatorId: string, contentData: FormData): Promise<Content> {
    try {
      const response = await this.axiosInstance.post<Content>(
        `/creators/${creatorId}/contents`,
        contentData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Upload des Inhalts');
    }
  }

  async updateContent(contentId: string, contentData: Partial<Content>): Promise<Content> {
    try {
      const response = await this.axiosInstance.put<Content>(`/contents/${contentId}`, contentData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Aktualisieren des Inhalts');
    }
  }

  async deleteContent(contentId: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/contents/${contentId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Löschen des Inhalts');
    }
  }

  async scheduleContent(contentId: string, scheduledDate: Date): Promise<Content> {
    try {
      const response = await this.axiosInstance.post<Content>(`/contents/${contentId}/schedule`, {
        scheduledDate: scheduledDate.toISOString(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Planen des Inhalts');
    }
  }

  async publishContent(contentId: string, platforms: string[]): Promise<Content> {
    try {
      const response = await this.axiosInstance.post<Content>(`/contents/${contentId}/publish`, {
        platforms,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Veröffentlichen des Inhalts');
    }
  }

  // Analytics
  async getCreatorAnalytics(creatorId: string, period: string = 'month'): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/creators/${creatorId}/analytics`, {
        params: { period },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden der Analytics');
    }
  }

  async getContentAnalytics(contentId: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/contents/${contentId}/analytics`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden der Content-Analytics');
    }
  }

  // Subscribers
  async getSubscribers(creatorId: string): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get(`/creators/${creatorId}/subscribers`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden der Abonnenten');
    }
  }

  async exportSubscribers(creatorId: string, format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(`/creators/${creatorId}/subscribers/export`, {
        params: { format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Exportieren der Abonnenten');
    }
  }
}

export const creatorService = new CreatorService();
