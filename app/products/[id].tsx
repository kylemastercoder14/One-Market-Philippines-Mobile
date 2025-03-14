import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import CachedImage from "@/helpers/image";
import { Product } from "@/types/product";
import axios from "axios";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { width } = Dimensions.get("window");

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://onemp-api.onrender.com/api/v1/products/slug/${id}`
        );
        setProduct(response.data as Product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#ff4d4f" className="mt-10" />
          ) : product ? (
            <>
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={product.images}
                renderItem={({ item, index }) => (
                  <View
                    className="justify-center items-center gap-5"
                    style={{ width: width }}
                  >
                    <CachedImage
                      uri={item || "https://via.placeholder.com/200"}
                      className="w-full h-80"
                    />
                  </View>
                )}
              />

              <View className='px-3'>
                <Text className="text-lg font-semibold mt-2 line-clamp-2">
                  {product.name}
                </Text>
                <Text className="text-gray-500 mt-2">
                  {product.description}
                </Text>
                <Text className="text-red-600 text-xl font-bold mt-3">
                  {product.price
                    ? `₱${product.price.toFixed(2)}`
                    : "Price not available"}
                </Text>
              </View>
            </>
          ) : (
            <View className="flex items-center justify-center mt-10">
              <Text className="text-gray-500 text-lg">Product not found.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;
