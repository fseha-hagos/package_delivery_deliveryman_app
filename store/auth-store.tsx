import { ACCESS_TOKEN, USER_COOKIE } from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export interface AuthUser {
  accountNo?: string;
  name: string;
  phoneNumber: string;
  image?: string;
  role?: string;
  exp?: number;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    user: null,
    accessToken: "",

    setUser: async (user) => {
      await SecureStore.setItemAsync(USER_COOKIE, JSON.stringify(user));
      // await AsyncStorage.setItem(USER_COOKIE, JSON.stringify(user));
      set((state) => ({ ...state, auth: { ...state.auth, user } }));
    },

    setAccessToken: async (accessToken) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
      // await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      set((state) => ({ ...state, auth: { ...state.auth, accessToken } }));
    },

    resetAccessToken: async () => {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      // await AsyncStorage.removeItem(ACCESS_TOKEN);
      set((state) => ({ ...state, auth: { ...state.auth, accessToken: "" } }));
    },

    reset: async () => {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(USER_COOKIE);
      // await AsyncStorage.multiRemove([ACCESS_TOKEN, USER_COOKIE]);
      set((state) => ({
        ...state,
        auth: {
          ...state.auth, // Preserve the methods
          user: null,
          accessToken: "",
        },
      }));
    },
  },
}));

export const useAuth = () => useAuthStore((state) => state.auth);
