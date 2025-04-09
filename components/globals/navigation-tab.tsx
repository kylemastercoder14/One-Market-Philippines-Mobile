import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { usePathname, useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Star, ThumbsUp, ZapIcon } from "lucide-react-native";

const NavigationTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* "All" Tab */}
        <TouchableOpacity className="mr-7">
          <Text className={`text-black text-lg`}>All</Text>
          {pathname === "/" && (
            <View className={`h-[3px] rounded-md bg-black w-full mt-1`} />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <View className="flex-row items-center gap-2">
            <ZapIcon size={20} fill="#a1a1aa" />
            <Text className={`text-zinc-400 text-lg`}>Deals</Text>
          </View>
          {pathname === "/flash-deals" && (
            <View className={`h-[3px] rounded-md bg-black w-full mt-1`} />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <View className="flex-row items-center gap-2">
            <Star size={20} fill="#a1a1aa" />
            <Text className={`text-zinc-400 text-lg`}>5 Star Rated</Text>
          </View>
          {pathname === "/star-rated" && (
            <View className={`h-[3px] rounded-md bg-black w-full mt-1`} />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <View className="flex-row items-center gap-2">
            <ThumbsUp size={20} fill="#a1a1aa" />
            <Text className={`text-zinc-400 text-lg`}>Best Selling</Text>
          </View>
          {pathname === "/best-seller" && (
            <View className={`h-[3px] rounded-md bg-black w-full mt-1`} />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <View className="flex-row items-center gap-2">
            <View className="rounded-md bg-zinc-400 p-1">
              <Text className="text-[8px] text-white">New</Text>
            </View>
            <Text className={`text-zinc-400 text-lg`}>New Arrivals</Text>
          </View>
          {pathname === "/best-seller" && (
            <View className={`h-[3px] rounded-md bg-black w-full mt-1`} />
          )}
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

export default NavigationTab;
