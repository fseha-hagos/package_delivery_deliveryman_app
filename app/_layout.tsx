import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import ErrorBoundary from "./error-boundary";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import {
  getOnboardingSeen,
  isBackendAvailable,
  setupInternetConnectionListener,
} from "@/lib/utils";
import { ACCESS_TOKEN, USER_COOKIE } from "@/constants/constants";
import { useAuthStore } from "@/store/auth-store";

export const unstable_settings = {
  // Ensure that reloading on '/modal' keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", borderRadius: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15, borderRadius: 10 }}
      text1Style={{
        fontSize: 17,
        fontFamily: "mon-sb",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "mon",
        fontWeight: "500",
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4287f5", borderRadius: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15, borderRadius: 10 }}
      text1Style={{
        fontSize: 17,
        fontFamily: "mon-sb",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "mon",
        fontWeight: "500",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red", borderRadius: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15, borderRadius: 10 }}
      text1Style={{
        fontSize: 17,
        fontFamily: "Jakarta-Bold",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "Jakarta-Bold",
        fontWeight: "500",
      }}
    />
  ),
};

export default function RootLayout() {
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { auth } = useAuthStore();

  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const [isAppReady, setIsAppReady] = useState(false);
  const hasNavigated = useRef(false);
  const [isSplashHidden, setIsSplashHidden] = useState(false);
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Listen for internet connection changes
  useEffect(() => {
    const unsubscribe = setupInternetConnectionListener((isConnected) => {
      if (!isConnected) {
        alert("You are offline. Please check your internet connection.");
      } else {
        console.log("Internet connection restored.");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Check if the API is available
  useEffect(() => {
    const checkApi = async () => {
      try {
        const isAvailable = await isBackendAvailable();
        setApiAvailable(isAvailable);
        console.log("API Availability Checked:", isAvailable);
      } catch (error) {
        console.error("API Check Failed:", error);
        setApiAvailable(false);
      }
    };
    checkApi();
  }, []);

  // Check if the onboarding screen has been seen
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const seenStatus = await getOnboardingSeen();
      setHasSeenOnboarding(seenStatus);
    };
    checkOnboardingStatus();
  }, []);

  // Hide the splash screen when the app is ready
  useEffect(() => {
    if (
      loaded &&
      apiAvailable !== null &&
      hasSeenOnboarding !== null &&
      !isSplashHidden
    ) {
      console.log("Hiding splash screen...");
      SplashScreen.hideAsync();
      setIsSplashHidden(true);
      setIsAppReady(true);
    }
  }, [loaded, apiAvailable, hasSeenOnboarding]);

  useEffect(() => {
    if (!isAppReady || hasNavigated.current) return;
    const inAuthGroup = segments[0] === "(auth)";

    const loadToken = async () => {
      if (apiAvailable === false) {
        console.log("API is not available. Navigating to API Error screen...");
        hasNavigated.current = true;
        router.replace("/api-error");
      }

      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
      const user = await SecureStore.getItemAsync(USER_COOKIE);

      if (token && user && !inAuthGroup) {
        if (!auth.user) {
          auth.setUser(JSON.parse(user));
        }
        if (!auth.accessToken) {
          auth.setAccessToken(token);
        }

        try {
          router.replace("/home");
        } catch (err) {
          await SecureStore.deleteItemAsync(ACCESS_TOKEN);
          router.replace("/sign-in");
        }
      } else if (token && !user) {
        router.replace("/sign-in");
        // router.replace("/complete-profile");
      } else {
        router.replace("/sign-in");
        // router.replace(hasSeenOnboarding ? "/sign-in" : "/welcome");
        //  router.replace(hasSeenOnboarding ? "/(models)/modal" : "/(models)/modal");
      }
    };
    loadToken();
  }, [auth, isAppReady, apiAvailable, hasSeenOnboarding]);

  return (
    <Stack>
      <Stack.Screen
        name="apiError"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(models)/modal" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
