import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "@/components/globals/search-bar";
import CategoryTab from "@/components/globals/category-tab";
import SubCategoryTag from "@/components/globals/sub-category-tab";
import ProductList from "@/components/globals/product-list";
import EncryptedBanner from "@/components/globals/encrypted-banner";

const Category = () => {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const categorySlug = Array.isArray(slug) ? slug[0] : slug;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/"); // Redirect to homepage
        return true; // Prevent default back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [router])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="h-[30vh] px-4">
          <View>
            <SearchBar />
            <CategoryTab slug={categorySlug} />
            <EncryptedBanner />
            <SubCategoryTag categorySlug={categorySlug} />
          </View>
        </View>
        <View className="mt-5">
          <ProductList categorySlug={categorySlug} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
