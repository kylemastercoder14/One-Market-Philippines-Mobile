import { View, Text, Image, FlatList, Dimensions } from "react-native";
import React from "react";
import ProductCardCarousel from "./product-card-carousel";
import axios from "axios";
import { Product } from "@/types/product";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH / 3 - 20;

const ProductCarousel = ({
  categorySlug,
  subCategorySlug,
}: {
  categorySlug?: string | null;
  subCategorySlug?: string | null;
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `https://onemp-api.onrender.com/api/v1/products`;

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, subCategorySlug]);

  return (
    <View className="mt-4 space-y-3">
      {loading ? (
        <Text className="text-center text-gray-500">Loading products...</Text>
      ) : products.length === 0 ? (
        // Empty State UI
        <View className="flex items-center justify-center mt-10">
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/personaapplication-b086b.appspot.com/o/7117861_3298067-removebg-preview.png?alt=media&token=efaeb45d-6abd-4436-94c2-cb504755fe9c",
            }}
            style={{ width: 300, height: 200, resizeMode: "contain" }}
          />
          <Text className="text-gray-600 mt-4 text-lg">
            No products found in this category.
          </Text>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ProductCardCarousel index={index} product={item} />
          )}
          contentContainerStyle={{
            alignItems: "center",
          }}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 10}
        />
      )}
    </View>
  );
};

export default ProductCarousel;
