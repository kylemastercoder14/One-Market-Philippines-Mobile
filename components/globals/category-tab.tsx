import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Category } from "@/types/category";
import axios from "axios";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const CategoryTab = ({ slug }: { slug?: string | null }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); // Loading state
  const router = useRouter();

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

  const handleCategoryPress = (categorySlug: string, route: string) => {
    router.push(route);
  };

  const textColor = slug ? "text-black" : "text-white";
  const bgColor = slug ? "bg-black" : "bg-white";

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      {loading ? (
        <View className="mt-2 flex items-center justify-center">
          <ActivityIndicator size="small" color={bgColor} />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {/* "All" Tab */}
          <TouchableOpacity
            className="mr-3"
            onPress={() => handleCategoryPress("all", "/")}
          >
            <Text
              className={`${textColor} ${
                slug === undefined ? "font-bold" : ""
              }`}
            >
              All
            </Text>
            {slug === undefined && (
              <View className={`h-[2px] ${bgColor} w-full mt-1`} />
            )}
          </TouchableOpacity>

          {/* Dynamic Categories */}
          {categories.map((category) => {
            const isActive = slug === category.slug;

            return (
              <TouchableOpacity
                className="mr-3"
                key={category.id}
                onPress={() =>
                  handleCategoryPress(
                    category.slug,
                    `/categories/${category.slug}`
                  )
                }
              >
                <Text className={`${textColor} ${isActive ? "font-bold" : ""}`}>
                  {category.name}
                </Text>
                {isActive && (
                  <View className={`h-[2px] ${bgColor} w-full mt-1`} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </Animated.View>
  );
};

export default CategoryTab;
