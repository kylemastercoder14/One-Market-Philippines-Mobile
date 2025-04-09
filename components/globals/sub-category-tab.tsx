import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CachedImage from "@/helpers/image";

const SubCategoryTag = ({
  categorySlug,
  subCategorySlug,
}: {
  categorySlug?: string | null;
  subCategorySlug?: string | null;
}) => {
  const [subCategories, setSubCategories] = React.useState<
    { id: string; name: string; slug: string; image: string }[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activeSubCategory, setActiveSubCategory] = React.useState<
    string | null
  >(null);
  const router = useRouter();

  React.useEffect(() => {
    if (!categorySlug) return;

    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://onemp-api.onrender.com/api/v1/sub-categories/${categorySlug}`
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categorySlug]);

  const handleSubCategoryPress = (subCategorySlug: string) => {
    setActiveSubCategory(subCategorySlug);
    router.push(
      subCategorySlug === "all"
        ? `/categories/${categorySlug}`
        : `/categories/${categorySlug}/${subCategorySlug}`
    );
  };

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      {loading ? (
        <View className="flex items-center justify-center py-2">
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex items-center mt-2"
        >
          {/* Dynamic Subcategories */}
          {subCategories.map((subCategory) => {
            const isActive = subCategorySlug === subCategory.slug;
            const activeClass = isActive ? "border border-black" : "";
            return (
              <TouchableOpacity
                key={subCategory.id}
                className="flex items-center space-y-1"
                onPress={() => handleSubCategoryPress(subCategory.slug)}
              >
                <View className={`rounded-full p-1 ${activeClass}`}>
                  <CachedImage
                    uri={subCategory.image || "https://via.placeholder.com/150"}
                    style={{ width: hp(8), height: hp(8) }}
                    className="rounded-full"
                  />
                </View>
                <Text className="text-neutral-600 text-sm w-24 line-clamp-1 text-center">
                  {subCategory.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </Animated.View>
  );
};

export default SubCategoryTag;
