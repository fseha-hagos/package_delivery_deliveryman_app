import { Ionicons } from "@expo/vector-icons";
import React, {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { isBackendAvailable } from "@/lib/utils";
import colors from "@/constants/Colors";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const handleCheckApi = async () => {
    setLoading(true);
    await isBackendAvailable();
    setLoading(false);
  };
  return (
    <View className="flex-1 flex-col items-center justify-center gap-12">
      <View className="items-center gap-[24px] ">
        <Ionicons
          size={48}
          style={{ color: colors.dark.primary }}
          name="alert-circle"
        />
        <View className="gap-6 w-full px-[50px]">
          <Text style={{ fontFamily: "mon-sb", fontSize: 17 }}>
            Could not connect to the server
          </Text>
          <Text style={{ fontFamily: "mon", fontSize: 14 }}>
            Please make sure that wifi or mobile data is turned on, and try
            again.{" "}
          </Text>
        </View>
      </View>
      <View className="flex-row p-[50px]">
        <TouchableOpacity
          onPress={handleCheckApi}
          className=" p-[16px] flex-row items-center gap-[10px]"
        >
          {loading ? (
            <ActivityIndicator size={48} color={"#000"} />
          ) : (
            <View className="justify-center items-center">
              <Ionicons
                name="reload"
                style={{
                  fontFamily: "mon",
                  fontSize: 30,
                  color: colors.dark.primary,
                }}
              />
              <View style={[{ backgroundColor: "#000" }]}></View>
              <Text style={{ fontFamily: "mon", fontSize: 14, color: "#000" }}>
                Try again
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Page;
