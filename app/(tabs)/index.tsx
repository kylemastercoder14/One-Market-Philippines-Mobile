import React from "react";
import axios from "axios";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "@/components/globals/search-bar";
import CategoryTab from "@/components/globals/category-tab";
import { ChevronRight, ShieldCheck, ZapIcon } from "lucide-react-native";
import { Link } from "expo-router";
import ProductCarousel from "@/components/globals/product-carousel";
import NavigationTab from "@/components/globals/navigation-tab";
import ProductList from "@/components/globals/product-list";
import images from "@/constants/images";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="bg-[#800020] relative h-[30vh]">
          <View className="px-4">
            <SearchBar />
            <CategoryTab />
          </View>
          <View className="flex-row gap-5 px-10 mt-3 justify-center items-center">
            <Image
              source={images.bg}
              className="w-32 h-32"
              resizeMode="contain"
            />
            <View className="flex-row">
              <View
                className="bg-white w-24 h-[100px] p-2"
                style={{ transform: [{ rotate: "-12deg" }] }}
              >
                <View className='bg-zinc-400 w-full h-full'></View>
              </View>
              <View
                className="bg-white w-24 h-[100px] p-2"
                style={{ transform: [{ rotate: "12deg" }] }}
              >
                <View className='bg-zinc-400 w-full h-full'></View>
              </View>
            </View>
          </View>
        </View>
        <View className="bg-white">
          <View className="pt-4 px-4 pb-2">
            <TouchableOpacity className="bg-[#0A8800] mb-3 mt-2 flex-row justify-between items-center rounded-md px-2 py-2">
              <View className="flex-row items-center gap-2">
                <ShieldCheck size={20} fill="#fff" color="#0A8800" />
                <Text className="text-white font-semibold">
                  Why choose 1 Market Philippines?
                </Text>
              </View>
              <View>
                <ChevronRight size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            <View className="flex-row mt-3 items-center justify-between">
              <View className="flex-row items-center">
                <ZapIcon fill="#111" />
                <Text className="font-semibold ml-2">Limited time offer</Text>
                <ChevronRight size={18} color="#111" />
              </View>
            </View>
            <ProductCarousel />
          </View>
        </View>
        <View className="bg-white mt-3">
          <View className="pt-4 px-5 pb-2">
            <NavigationTab />
            <ProductList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
