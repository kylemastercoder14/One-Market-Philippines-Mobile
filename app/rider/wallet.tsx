import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

const Wallet = () => {
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
          <Text className="text-2xl mb-5 font-bold">My Wallet</Text>
          <Card size="md" variant="elevated">
            <View className="flex-row items-center justify-between">
              <Heading size="md" className="mb-1">
                Total Earnings
              </Heading>
              <Button
                disabled
                size="sm"
                style={{ opacity: 20, backgroundColor: "#800020" }}
              >
                <ButtonText>Withdraw</ButtonText>
              </Button>
            </View>
            <Text className="text-4xl mb-2 mt-1 font-bold">₱30.00</Text>
            <Progress value={10} size="md" orientation="horizontal">
              <ProgressFilledTrack />
            </Progress>
            <View className="flex-row items-center justify-between mt-3">
              <Text>₱30.00 Balance</Text>
              <Text>₱300.00 Minimum</Text>
            </View>
            <Text className="mt-3 text-zinc-400 text-sm">
              You can withdraw your earnings once you reach the minimum amount
              of ₱300.00.
            </Text>
          </Card>
          <Text className="text-2xl mt-5 mb-5 font-bold">Earnings History</Text>
          <Card size="md" variant="elevated">
            <View className="flex-row items-center justify-between">
              <Heading size="md" className="mb-1">
                Earnings History
              </Heading>
            </View>
            <View className="flex-row items-center justify-between mt-3">
              <View className="flex-row items-center gap-2">
                <Badge variant="solid" size="sm" action="success">
                  <BadgeIcon as={CheckIcon} />
                  <BadgeText>Completed</BadgeText>
                </Badge>
                <Text className="text-sm">₱30.00</Text>
              </View>
              <Text className="text-xs text-[#800020] text-right whitespace-nowrap">
                04/09/2025 - 10:45 AM
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
