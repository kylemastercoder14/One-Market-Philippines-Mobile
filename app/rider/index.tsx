import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
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
          <Text className="text-xl font-semibold">Hi there,</Text>
          <Text className="text-zinc-400">Welcome back</Text>
          <Text className="mt-10 text-2xl font-bold">All Orders</Text>
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
                        uri: "https://one-market-phil.s3.us-east-1.amazonaws.com/uploads/1743216193803_aaaf39cd-edbb-4cb7-bdc8-8e932e848a33.webp",
                      }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm line-clamp-2">
                      Print Midi Dress with Belt - Crew Neck, Short Sleeve,
                      Non-Stretch Polyester, Perfect for All Seasons
                    </Text>
                    <Text className="text-sm">x2</Text>
                  </View>
                </View>

                {/* Ensure price stays visible */}
                <Text className="font-semibold text-sm text-nowrap ml-2">
                  ₱950.00
                </Text>
              </View>
              <Divider className="mt-3" />
              <View className="mt-3">
                <View className="flex-row items-center gap-2">
                  <View className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      alt="Customer"
                      className="w-full h-full"
                      source={{
                        uri: "https://one-market-phil.s3.us-east-1.amazonaws.com/uploads/1744170802694_355086315_1692432394540485_6811051794186492284_n.jpg",
                      }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold">Kyle Andre Lim</Text>
                    <Text className="text-xs text-zinc-600">
                      Block 111 Lot 4 Ruby Street, Barangay Santa Lucia -
                      +639152479693
                    </Text>
                    <Text className="text-[#800020] font-semibold text-xs">
                      Not yet paid (Cash on Delivery)
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                onPress={() => router.push("/order/3")}
                className="mt-3 bg-[#800020]"
                size="md"
                variant="solid"
                action="primary"
              >
                <ButtonText>Pickup Order</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
