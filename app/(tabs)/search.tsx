import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import SearchBar from "@/components/globals/search-bar";
import { Category } from "@/types/category";
import axios from "axios";
import CachedImage from "@/helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const Search = () => {
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [subCategories, setSubCategories] = React.useState<
    { id: string; name: string; slug: string; image: string }[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    "home-supplies"
  );

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://onemp-api.onrender.com/api/v1/categories"
        );
        setCategories(response.data as Category[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://onemp-api.onrender.com/api/v1/sub-categories/${selectedCategory}`
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <View className="px-4">
        <SearchBar />
        <Text className="mt-3 font-semibold text-lg">Shop by category</Text>

        <View className="flex-row mt-5 h-[90vh]">
          <ScrollView
            className="bg-[#fff]"
            style={{ width: wp(60) }}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View className="mt-3">
                <ActivityIndicator />
              </View>
            ) : (
              categories.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.slug)}
                    className="p-2"
                    style={{
                      borderLeftWidth: isActive ? 3 : 0,
                      borderLeftColor: isActive ? "#800020" : "transparent",
                      backgroundColor: isActive ? "" : "transparent",
                      paddingVertical: 10,
                      paddingLeft: 8,
                    }}
                  >
                    <Text
                      className={`text-sm ${
                        isActive ? "font-bold text-black" : "text-gray-600"
                      }`}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
          <FlatList
            data={subCategories}
            numColumns={3}
            keyExtractor={(item) => item.id}
            className="p-3"
            style={{ width: wp(120) }}
            contentContainerStyle={{ gap: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push(`/categories/${selectedCategory}/${item.slug}`)} className="items-center mb-4">
                <View className="rounded-full p-1 bg-white">
                  <CachedImage
                    uri={item.image || "https://via.placeholder.com/150"}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                </View>
                <Text className="text-neutral-600 text-xs w-20 line-clamp-1 text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
