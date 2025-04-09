import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRight, ShieldCheck } from "lucide-react-native";

const EncryptedBanner = () => {
  return (
    <TouchableOpacity className="bg-transparent border border-[#0A8800] mb-1 mt-4 flex-row justify-between items-center rounded-md px-2 py-2">
      <View className="flex-row items-center gap-2">
        <ShieldCheck size={20} color="#0A8800" />
        <Text className="text-[#0A8800] font-semibold">
          Why choose 1 Market Philippines?
        </Text>
      </View>
      <View>
        <ChevronRight size={20} color="#0A8800" />
      </View>
    </TouchableOpacity>
  );
};

export default EncryptedBanner;
