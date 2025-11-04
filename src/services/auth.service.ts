import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { API_BASE_URL } from '@constants/config';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

class AuthService {
  private axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Request interceptor to add token
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

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              await AsyncStorage.setItem('auth_token', response.token);
              await AsyncStorage.setItem('refresh_token', response.refreshToken);
              originalRequest.headers.Authorization = `Bearer ${response.token}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            await this.clearTokens();
            // Navigate to login screen
            throw refreshError;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      const { token, refreshToken } = response.data;
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('refresh_token', refreshToken);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login fehlgeschlagen');
    }
  }

  async register(email: string, password: string, name: string): Promise<RegisterResponse> {
    try {
      const response = await this.axiosInstance.post<RegisterResponse>('/auth/register', {
        email,
        password,
        name,
      });

      const { token, refreshToken } = response.data;
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('refresh_token', refreshToken);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registrierung fehlgeschlagen');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await this.axiosInstance.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token-Aktualisierung fehlgeschlagen');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Zurücksetzen des Passworts');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Zurücksetzen des Passworts');
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Laden des Benutzerprofils');
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await this.axiosInstance.put<User>('/auth/profile', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Fehler beim Aktualisieren des Profils');
    }
  }

  private async clearTokens(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('refresh_token');
  }
}

export const authService = new AuthService();
