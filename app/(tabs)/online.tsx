import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

interface Delivery {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  distance: string;
  estimatedTime: string;
  payment: string;
  status: "pending" | "accepted" | "rejected";
}

interface DeliveryCardProps {
  delivery: Delivery;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

// Mock data for deliveries
const mockDeliveries: Delivery[] = [
  {
    id: "1",
    pickupAddress: "123 Main St, City",
    deliveryAddress: "456 Park Ave, City",
    distance: "2.5 km",
    estimatedTime: "15 mins",
    payment: "₹150",
    status: "pending",
  },
  {
    id: "2",
    pickupAddress: "789 Market St, City",
    deliveryAddress: "321 Lake View, City",
    distance: "3.8 km",
    estimatedTime: "20 mins",
    payment: "₹200",
    status: "pending",
  },
];

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery, onAccept, onReject }) => {
  return (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <View style={styles.deliveryInfo}>
          <Ionicons name="location" size={20} color="#34C759" />
          <Text style={styles.deliveryAddress}>{delivery.pickupAddress}</Text>
        </View>
        <View style={styles.deliveryInfo}>
          <Ionicons name="location-outline" size={20} color="#FF3B30" />
          <Text style={styles.deliveryAddress}>{delivery.deliveryAddress}</Text>
        </View>
      </View>

      <View style={styles.deliveryDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#8E8E93" />
          <Text style={styles.detailText}>{delivery.estimatedTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="navigate-outline" size={16} color="#8E8E93" />
          <Text style={styles.detailText}>{delivery.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="wallet-outline" size={16} color="#8E8E93" />
          <Text style={styles.detailText}>{delivery.payment}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => onReject(delivery.id)}
        >
          <Ionicons name="close-circle" size={24} color="#FF3B30" />
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => onAccept(delivery.id)}
        >
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OnlineScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(true);
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);

  const handleAccept = (deliveryId: string) => {
    setDeliveries(deliveries.filter(d => d.id !== deliveryId));
    Toast.show({
      type: "success",
      text1: "Delivery Accepted",
      text2: "You have accepted the delivery request",
    });
  };

  const handleReject = (deliveryId: string) => {
    setDeliveries(deliveries.filter(d => d.id !== deliveryId));
    Toast.show({
      type: "info",
      text1: "Delivery Rejected",
      text2: "You have rejected the delivery request",
    });
  };

  const handleToggleOnline = (value: boolean) => {
    setIsOnline(value);
    if (!value) {
      router.push("/offline" as any);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <BlurView intensity={100} style={styles.blurContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.onlineStatus}>
              <View style={[styles.statusDot, { backgroundColor: isOnline ? "#34C759" : "#FF3B30" }]} />
              <Text style={styles.statusText}>{isOnline ? "Online" : "Offline"}</Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={handleToggleOnline}
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={isOnline ? "#fff" : "#f4f3f4"}
            />
          </View>

          <FlatList
            data={deliveries}
            renderItem={({ item }) => (
              <DeliveryCard
                delivery={item}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.deliveryList}
          />
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  onlineStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deliveryList: {
    paddingBottom: 20,
  },
  deliveryCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  deliveryHeader: {
    marginBottom: 12,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  deliveryAddress: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  deliveryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    color: "#8E8E93",
    fontSize: 14,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: "rgba(52,199,89,0.1)",
  },
  rejectButton: {
    backgroundColor: "rgba(255,59,48,0.1)",
  },
  acceptButtonText: {
    color: "#34C759",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  rejectButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default OnlineScreen; 