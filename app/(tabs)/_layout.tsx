import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";

export default function Layout() {
  const router = useRouter();
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Jakarta",
        },
        tabBarStyle: {
          backgroundColor: colors.dark.neutral,
          paddingBottom: 5, // ios only
          height: 55,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="online"
        options={{
          title: "Online",
          headerShown: false,
          tabBarLabel: "Online",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Track",
          headerShown: false,
          tabBarLabel: "Track",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
