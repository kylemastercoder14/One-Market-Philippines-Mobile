import React from "react";
import axios from "axios";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/globals/search-bar";
import CategoryTab from '@/components/globals/category-tab';

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="bg-[#800020] h-[30vh] px-4">
          <View className="flex-1">
            <SearchBar />
            <CategoryTab />
          </View>
        </View>
        <View className="p-4">
          <Text>
            Content here later.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
