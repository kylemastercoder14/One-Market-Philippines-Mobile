import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchBar from "@/components/globals/search-bar";
import CategoryTab from "@/components/globals/category-tab";
import SubCategoryTag from "@/components/globals/sub-category-tab";
import ProductList from "@/components/globals/product-list";
import EncryptedBanner from '@/components/globals/encrypted-banner';

const SubCategoryPage = () => {
  const { slug, subSlug } = useLocalSearchParams();
  const categorySlug = Array.isArray(slug) ? slug[0] : slug;
  const subCategorySlug = Array.isArray(subSlug) ? subSlug[0] : subSlug;
  const router = useRouter();

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
        {/* Header Section with Category and Subcategory Tabs */}
        <View className="h-[30vh] px-4">
          <View className="flex-1">
            <SearchBar />
            <EncryptedBanner />
            <CategoryTab slug={categorySlug} />
          </View>
          <SubCategoryTag
            categorySlug={categorySlug}
            subCategorySlug={subCategorySlug}
          />
        </View>

        {/* Product List - Shows products based on category & subcategory */}
        <ProductList
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategoryPage;
