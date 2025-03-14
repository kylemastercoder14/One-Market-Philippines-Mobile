import { View, Text, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import ProductCard from "./product-card";
import axios from "axios";
import { Product } from "@/types/product";

const ProductList = ({
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
        let url = `https://onemp-api.onrender.com/api/v1/products/categories/${categorySlug}`;

        if (subCategorySlug) {
          url += `/sub-categories/${subCategorySlug}`;
        }

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
    <View className="mt-5 mx-4 space-y-3 px-2">
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
        <View>
          <MasonryList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            renderItem={({ item, i }: { item: unknown; i: number }) => (
              <ProductCard product={item as Product} index={i} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ProductList;
