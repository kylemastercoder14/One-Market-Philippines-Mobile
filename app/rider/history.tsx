import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { CheckIcon } from "@/components/ui/icon";

const History = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"completed" | "returned">(
    "completed"
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1); // Trigger re-render
    }, 3000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="p-5">
          <Text className="text-2xl font-bold">Order Histories</Text>
          {/* Tabs */}
          <View className="mt-5 flex-row border-b border-zinc-300">
            <Pressable
              onPress={() => setActiveTab("completed")}
              className={`flex-1 pb-2 ${
                activeTab === "completed" ? "border-b-2 border-black" : ""
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === "completed" ? "text-[#800020]" : "text-zinc-400"
                }`}
              >
                Completed
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveTab("returned")}
              className={`flex-1 pb-2 ${
                activeTab === "returned" ? "border-b-2 border-black" : ""
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === "returned" ? "text-[#800020]" : "text-zinc-400"
                }`}
              >
                Return & Refund
              </Text>
            </Pressable>
          </View>
          {/* Content */}
          <View className="mt-5">
            {activeTab === "completed" ? (
              <View className="mt-5 flex-row justify-between items-center bg-white p-3 rounded-lg shadow-md">
                <View className="flex-1">
                  <View className="flex-row items-center justify-between gap-2">
                    <Text className="flex-1 text-sm font-semibold truncate">
                      Order #: 1 Market Philippines-1744163579657
                    </Text>
                    <Text className="text-xs text-[#800020] text-right whitespace-nowrap">
                      04/09/2025 - 10:45 AM
                    </Text>
                  </View>
                  <View className="flex-row mt-3 items-end justify-between">
                    {/* Wrap content so it doesn't overflow */}
                    <View className="flex-row items-center gap-2 flex-1 pr-2">
                      <View className="w-14 h-14 rounded-md overflow-hidden">
                        <Image
                          alt="Product Image"
                          className="w-full h-full"
                          source={{
                            uri: "https://one-market-phil.s3.us-east-1.amazonaws.com/uploads/1743212815651_7793155f-53d5-4275-9411-09fe1a0aa18d.webp",
                          }}
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm line-clamp-2">
                        Men's Fashion Sneakers, Preppy Trendy Style, Solid Color, Lightweight
                        </Text>
                        <Text className="text-sm">x1</Text>
                      </View>
                    </View>

                    {/* Ensure price stays visible */}
                    <Text className="font-semibold text-sm text-nowrap ml-2">
                      ₱1,099.00
                    </Text>
                  </View>
                  <Badge
                    className="mt-3 w-32 text-center flex-row items-center justify-center"
                    size="md"
                    variant="solid"
                    action="success"
                  >
                    <BadgeText>Completed</BadgeText>
                    <BadgeIcon as={CheckIcon} className="ml-2" />
                  </Badge>
                </View>
              </View>
            ) : (
              <Text className="text-center text-zinc-500">
                Return & refund orders will appear here.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
