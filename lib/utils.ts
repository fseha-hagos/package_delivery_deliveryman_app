import { API_URL, ONBOARDING_KEY } from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

import Toast from "react-native-toast-message";

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}

export const setOnboardingSeen = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch (error) {
    console.error("Error setting onboarding seen:", error);
  }
};

export const getOnboardingSeen = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error getting onboarding seen:", error);
    return false;
  }
};

// Check if the device is connected to the internet
export const setupInternetConnectionListener = (
  callback: (isConnected: boolean) => void
) => {
  return NetInfo.addEventListener((state) => {
    const isConnected = state.isConnected && state.isInternetReachable;
    callback(isConnected!);
  });
};

export const isBackendAvailable = async () => {
  const controller = new AbortController(); // Create an AbortController
  const timeout = setTimeout(() => controller.abort(), 15000); // Set timeout after 10 seconds
  try {
    const { data } = await axios.get(`${API_URL}/api/packages`, {
      headers: {
        "Content-Type": "application/json",
      },
      // timeout: 5000, // Axios built-in timeout (no need for AbortController)
    });
    clearTimeout(timeout); // Clear timeout when request completes successfully
    console.log(data);
    return true;
  } catch (error: any) {
    clearTimeout(timeout); // Clear timeout if an error occurs
    if (axios.isCancel(error)) {
      Toast.show({
        type: "error",
        text1: "connection timeout",
        text2: "couldn't connect to the server.",
      });
      return false;
    } else {
      Toast.show({
        type: "error",
        text1: "connection timeout",
        text2: "couldn't connect to the server",
      });
      return false;
    }
  } finally {
    controller.abort(); // Release resources even if request completes before timeout
  }
};
