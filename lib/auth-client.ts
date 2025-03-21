/* eslint-disable no-console */

import { useAuthStore } from "@/store/auth-store";
import { createAuthClient } from "better-auth/dist/client";

import { phoneNumberClient } from "better-auth/dist/client/plugins";
import { adminClient } from "better-auth/dist/client/plugins"; // Ensure this is compatible with Expo
import { inferAdditionalFields } from "better-auth/dist/client/plugins"; // Ensure this is compatible with Expo
export const authClient = createAuthClient({
  //  baseURL: "http://192.168.137.1:3000/", // Updated to use the API_URL
  baseURL: "https://courier-server-q8dx.onrender.com", // Updated to use the API_URL
  // baseURL: "http://192.168.43.164:3000/", // Updated to use the API_URL

  plugins: [
    phoneNumberClient(),
    adminClient(),
    inferAdditionalFields({
      user: {
        vehicles: {
          type: "string[]",
        },
        deliveries: {
          type: "string[]",
        },
      },
    }),
  ],
  // fetchOptions: {
  //     onSuccess: (ctx) => {
  //         // Consider removing or modifying this for mobile compatibility
  //         console.log("onSuccess: ", ctx);
  //     },
  //     onResponse(context) {
  //         // Log the response body for debugging
  //         context.response.text().then(text => {
  //             console.log("Response Body: ", text);
  //         });
  //         console.log("onResponse: ", context.response.headers.entries());
  //         console.log("authStore token: ", useAuthStore.getState().auth.accessToken); // Get the token from useAuthStore
  //     },
  // },
  auth: {
    type: "Bearer",
    token: () => useAuthStore.getState().auth.accessToken || "", // Get the token from useAuthStore
  },
});
