import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
