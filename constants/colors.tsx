/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

//   primary: '#001A6E',
//   secondary: '#074799',

export const colors = {
  light: {
    primary: "#001A6E",
    secondary: "#074799",
    third: "#2563EB",
    tint: tintColorLight,
    green: "#059669",
    primaryMuted: "#93C5FD",
    secondaryMuted: "#6EE7B7",
    background: "#FFFFFF",
    text: "#1E293B",
    textMuted: "#64748B",
    border: "#E2E8F0",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    neutral: "#F1F5F9",
  },
  dark: {
    primary: "#001A6E",
    secondary: "#074799",
    third: "#2563EB",
    tint: tintColorDark,
    primaryMuted: "#60A5FA",
    secondaryMuted: "#34D399",
    background: "#0F172A",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    border: "#1E293B",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    neutral: "#1E293B",
  },
  text: {
    primary: "#IAIAIA", // Primary text
    secondary: "#757575", // Secondary text
    tertiary: "#AEAEAE", // Tertiary text
    inverse: "#FFFFFF", // Inverse text
  },
  statusColors: {
    delivered: "#ACAF50",
    inTransit: "#4A80F0",
    pending: "#03A9F4",
    failed: "#F44336",
    scheduled: "#9C2780",
  },
};
export default colors;
