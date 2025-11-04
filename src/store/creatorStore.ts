import { create } from 'zustand';
import { Creator, Content } from '@/types';
import { creatorService } from '@services/creator.service';

interface CreatorState {
  creators: Creator[];
  selectedCreator: Creator | null;
  contents: Content[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCreators: () => Promise<void>;
  fetchCreatorById: (id: string) => Promise<void>;
  createCreator: (creator: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCreator: (id: string, creator: Partial<Creator>) => Promise<void>;
  deleteCreator: (id: string) => Promise<void>;
  selectCreator: (creator: Creator | null) => void;

  // Content Actions
  fetchContents: (creatorId: string) => Promise<void>;
  uploadContent: (creatorId: string, content: FormData) => Promise<void>;
  scheduleContent: (contentId: string, scheduledDate: Date) => Promise<void>;
  deleteContent: (contentId: string) => Promise<void>;

  clearError: () => void;
}

export const useCreatorStore = create<CreatorState>((set, _get) => ({
  creators: [],
  selectedCreator: null,
  contents: [],
  isLoading: false,
  error: null,

  fetchCreators: async () => {
    set({ isLoading: true, error: null });
    try {
      const creators = await creatorService.getCreators();
      set({ creators, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Laden der Creator',
        isLoading: false,
      });
    }
  },

  fetchCreatorById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const creator = await creatorService.getCreatorById(id);
      set({ selectedCreator: creator, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Laden des Creators',
        isLoading: false,
      });
    }
  },

  createCreator: async (creatorData) => {
    set({ isLoading: true, error: null });
    try {
      const newCreator = await creatorService.createCreator(creatorData);
      set((state) => ({
        creators: [newCreator, ...state.creators],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Erstellen des Creators',
        isLoading: false,
      });
      throw error;
    }
  },

  updateCreator: async (id, creatorData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCreator = await creatorService.updateCreator(id, creatorData);
      set((state) => ({
        creators: state.creators.map((c) => (c.id === id ? updatedCreator : c)),
        selectedCreator: state.selectedCreator?.id === id ? updatedCreator : state.selectedCreator,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Aktualisieren des Creators',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteCreator: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await creatorService.deleteCreator(id);
      set((state) => ({
        creators: state.creators.filter((c) => c.id !== id),
        selectedCreator: state.selectedCreator?.id === id ? null : state.selectedCreator,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Löschen des Creators',
        isLoading: false,
      });
      throw error;
    }
  },

  selectCreator: (creator) => {
    set({ selectedCreator: creator });
  },

  fetchContents: async (creatorId) => {
    set({ isLoading: true, error: null });
    try {
      const contents = await creatorService.getContents(creatorId);
      set({ contents, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Laden der Inhalte',
        isLoading: false,
      });
    }
  },

  uploadContent: async (creatorId, contentData) => {
    set({ isLoading: true, error: null });
    try {
      const newContent = await creatorService.uploadContent(creatorId, contentData);
      set((state) => ({
        contents: [newContent, ...state.contents],
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Upload des Inhalts',
        isLoading: false,
      });
      throw error;
    }
  },

  scheduleContent: async (contentId, scheduledDate) => {
    set({ isLoading: true, error: null });
    try {
      const updatedContent = await creatorService.scheduleContent(contentId, scheduledDate);
      set((state) => ({
        contents: state.contents.map((c) => (c.id === contentId ? updatedContent : c)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Planen des Inhalts',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteContent: async (contentId) => {
    set({ isLoading: true, error: null });
    try {
      await creatorService.deleteContent(contentId);
      set((state) => ({
        contents: state.contents.filter((c) => c.id !== contentId),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Löschen des Inhalts',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
