import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import { useAuthStore } from "../../store/authStore";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  // const { signIn } = useAuthStore();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Toast.show({
        type: "error",
        text1: "Invalid phone number",
        text2: "Please enter a valid phone number",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement your API call to send OTP
      // await sendOtp(phoneNumber);
      setIsOtpSent(true);
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: "Please check your phone for the OTP",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement your API call to verify OTP
      // await verifyOtp(phoneNumber, otp);
      // await signIn();
      // router.replace("/(tabs)");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to verify OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar style="light" />
      <BlurView intensity={100} style={styles.blurContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              {isOtpSent ? "Enter the OTP sent to your phone" : "Enter your phone number to continue"}
            </Text>
          </View>

          <View style={styles.form}>
            {!isOtpSent ? (
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                  autoFocus
                />
              </View>
            ) : (
              <View style={styles.otpContainer}>
                <TextInput
                  style={styles.otpInput}
                  placeholder="Enter 6-digit OTP"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
                  autoFocus
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {isOtpSent ? "Verify OTP" : "Send OTP"}
                </Text>
              )}
            </TouchableOpacity>

            {isOtpSent && (
              <TouchableOpacity
                style={styles.resendButton}
                onPress={() => setIsOtpSent(false)}
              >
                <Text style={styles.resendText}>Change phone number</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>
    </KeyboardAvoidingView>
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
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#rgba(255,255,255,0.7)",
  },
  form: {
    gap: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.2)",
  },
  countryCodeText: {
    color: "#fff",
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },
  otpContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
  },
  otpInput: {
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    alignItems: "center",
    marginTop: 12,
  },
  resendText: {
    color: "#007AFF",
    fontSize: 14,
  },
});

export default SignIn;
