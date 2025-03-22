import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const OfflineScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoOnline = () => {
    router.push("/offline" as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <BlurView intensity={100} style={styles.blurContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="radio-button-off" size={80} color="#FF3B30" />
            <Text style={styles.title}>You're Offline</Text>
            <Text style={styles.subtitle}>
              Go online to start accepting deliveries
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Today's Deliveries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>₹0</Text>
              <Text style={styles.statLabel}>Today's Earnings</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.onlineButton}
            onPress={handleGoOnline}
          >
            <Ionicons name="radio-button-on" size={24} color="#fff" />
            <Text style={styles.onlineButtonText}>Go Online</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  blurContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  statCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: "45%",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  onlineButton: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  onlineButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default OfflineScreen; 