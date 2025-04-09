import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import CachedImage from "@/helpers/image";
import { Product } from "@/types/product";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Share,
  Star,
  StarHalf,
} from "lucide-react-native";
import RenderHtml from "react-native-render-html";
import TruckFast from "react-native-vector-icons/FontAwesome6";
import BagShopping from "react-native-vector-icons/FontAwesome6";
import ShieldCheck from "react-native-vector-icons/Ionicons";
import Question from "react-native-vector-icons/EvilIcons";
import ActionSheetComponent from "@/components/globals/action-sheet";
import ShareAction from "@/components/globals/share-action";
import VariantAction from "@/components/globals/variant-action";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isOpenShare, setIsOpenShare] = React.useState(false);
  const [isVariantOpen, setIsVariantOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

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

  // Extract variant prices from `sellerProductVariants`
  const variantPrices = (product?.sellerProductVariants ?? []).flatMap(
    (variant) =>
      (variant.sellerProductVariantsOptions ?? [])
        .map((option) => option.price)
        .filter((price): price is number => price !== undefined && price > 0) // Ensure valid prices
  );

  const lowestPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : Infinity;

  // Check if the product itself has a price
  const isThereAPrice = product?.price !== undefined && product?.price !== 0;

  // Determine the displayed price
  const priceWithVariants =
    lowestPrice !== Infinity
      ? `Starts at ₱${lowestPrice.toFixed(2)}`
      : `₱${product?.price?.toFixed(2) ?? "0.00"}`;

  return (
    <>
      <ActionSheetComponent
        isOpen={isOpenShare}
        onClose={() => setIsOpenShare(false)}
      >
        <ShareAction
          image={product?.images[0] ?? "https://via.placeholder.com/200"}
          name={product?.name ?? ""}
          id={product?.id ?? ""}
        />
      </ActionSheetComponent>
      <ActionSheetComponent
        isOpen={isVariantOpen}
        onClose={() => setIsVariantOpen(false)}
      >
        <VariantAction product={product} />
      </ActionSheetComponent>
      <SafeAreaView className="flex-1 bg-[#f5f5f5]">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#ff4d4f"
                className="mt-10"
              />
            ) : product ? (
              <>
                {/* Image Slider */}
                <View className="relative">
                  <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={product.images}
                    onScroll={(event) => {
                      const newIndex = Math.round(
                        event.nativeEvent.contentOffset.x / width
                      );
                      setActiveIndex(newIndex);
                    }}
                    renderItem={({ item }) => (
                      <CachedImage
                        uri={item || "https://via.placeholder.com/200"}
                        className="w-full h-80"
                        style={{ width: width }}
                      />
                    )}
                  />

                  {/* Fixed Top Icons */}
                  <View className="absolute top-2 inset-x-0 flex-row justify-between px-4">
                    {/* Left: Chevron */}
                    <TouchableOpacity
                      onPress={() => router.back()}
                      className="bg-zinc-900/50 rounded-full items-center justify-center size-10"
                    >
                      <ChevronLeft size={24} color="#fff" />
                    </TouchableOpacity>

                    {/* Right: Search & Share */}
                    <View className="flex-row gap-3">
                      <TouchableOpacity
                        onPress={() => router.push("/search")}
                        className="bg-zinc-900/50 rounded-full items-center justify-center size-10"
                      >
                        <Search size={18} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setIsOpenShare(true)}
                        className="bg-zinc-900/50 rounded-full items-center justify-center size-10"
                      >
                        <Share size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Fixed Image Index Indicator */}
                  <View className="absolute bottom-3 right-3 bg-zinc-900/50 px-2 py-1 rounded-md border border-white">
                    <Text className="text-white text-sm">
                      {activeIndex + 1}/{product.images.length}
                    </Text>
                  </View>
                </View>

                {/* Product Details */}
                <View className="px-3 bg-white">
                  <Text className="text-lg font-semibold mt-2 line-clamp-2">
                    {product.name}
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center gap-2">
                      <Text>12 sold</Text>
                      <Text className="text-zinc-500">|</Text>
                      <Pressable
                        onPress={() =>
                          router.push(`/store/${product.seller.id}`)
                        }
                        className="flex-row items-center gap-2"
                      >
                        <Text>Sold by</Text>
                        <View className="flex-row items-center gap-0.5">
                          {product.seller.image ? (
                            <CachedImage
                              uri={
                                product.seller.image ||
                                "https://via.placeholder.com/200"
                              }
                              className="size-5 rounded-full"
                            />
                          ) : (
                            <View className="rounded-full size-5 bg-slate-500 items-center justify-center">
                              <Text className="text-white text-sm">
                                {product.seller.name.charAt(0)}
                              </Text>
                            </View>
                          )}
                          <ChevronRight color="#111" size={17} />
                        </View>
                      </Pressable>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text>4.8</Text>
                      <View className="flex-row gap-0.5 items-center">
                        <Star size={17} fill="#111" />
                        <Star size={17} fill="#111" />
                        <Star size={17} fill="#111" />
                        <Star size={17} fill="#111" />
                        <StarHalf size={17} fill="#111" />
                      </View>
                    </View>
                  </View>
                  <Text className="text-xl font-bold mt-3">
                    {isThereAPrice
                      ? `₱${product.price?.toFixed(2) ?? "0.00"}`
                      : priceWithVariants}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsVariantOpen(true)}
                    className="border-2 mt-2 rounded-full flex-row items-center justify-between px-3 py-2"
                  >
                    <Text>
                      {product.sellerProductVariants
                        .map(
                          (variant) =>
                            `${variant.sellerProductVariantsOptions.length} ${
                              variant?.name?.toLowerCase() ?? ""
                            }s`
                        )
                        .join(", ")}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Text>Select</Text>
                      <ChevronRight size={16} color="#111" />
                    </View>
                  </TouchableOpacity>

                  <View>
                    <RenderHtml
                      contentWidth={width}
                      source={{ html: product.description }}
                    />
                  </View>
                </View>
                <View className="bg-white px-3 py-3 mt-3">
                  <TouchableOpacity>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <TruckFast
                          name="truck-fast"
                          size={16}
                          color="#0e8709"
                        />
                        <Text className="text-[#0e8709]">
                          Shipping for this item
                        </Text>
                      </View>
                      <ChevronRight size={20} color="#111" />
                    </View>
                    <View className="flex-row items-center mt-2 gap-1">
                      <Text className="text-zinc-500 ">Delivery: </Text>
                      <Text className="">
                        Dependent on the rider's availability.
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1 gap-1">
                      <Text className="text-zinc-500 ">Rider: </Text>
                      <Text className="">
                        Pedicab, tricycle, or motorcycle rider.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="bg-white px-3 py-3 mt-3">
                  <TouchableOpacity>
                    <View className="flex-row items-center">
                      <View className="flex-row items-center gap-2">
                        <BagShopping
                          name="bag-shopping"
                          size={16}
                          color="#0e8709"
                        />
                        <Text className="text-[#0e8709]">Cash on delivery</Text>
                      </View>
                      <View className="flex-row items-center gap-2 ml-2 mr-2.5">
                        <Text className="text-[#0e8709]">•</Text>
                        <Text className="text-[#0e8709]">Returns</Text>
                        <Text className="text-[#0e8709]">•</Text>
                        <Text className="text-[#0e8709]">Price adjustment</Text>
                      </View>
                      <ChevronRight size={20} color="#111" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="bg-white px-3 py-3 mt-3">
                  <TouchableOpacity>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <ShieldCheck
                          name="shield-checkmark"
                          size={16}
                          color="#0e8709"
                        />
                        <Text className="text-[#0e8709]">
                          Shopping security
                        </Text>
                      </View>
                      <ChevronRight size={20} color="#111" />
                    </View>
                    <View className="flex-row items-center mt-2 gap-3">
                      <Text className="text-zinc-500">
                        • Safe payment option
                      </Text>
                      <Text className="text-zinc-500">• Secure logistics</Text>
                    </View>
                    <View className="flex-row items-center mt-2 gap-14">
                      <Text className="text-zinc-500">• Secure privacy</Text>
                      <Text className="text-zinc-500">
                        • Purchase protection
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="bg-white px-3 py-3 mt-3">
                  <View className="flex-row items-center gap-1">
                    <Text className="font-semibold text-2xl mr-2">4.8</Text>
                    <View className="flex-row gap-0.5 items-center">
                      <Star size={20} fill="#111" />
                      <Star size={20} fill="#111" />
                      <Star size={20} fill="#111" />
                      <Star size={20} fill="#111" />
                      <StarHalf size={20} fill="#111" />
                    </View>
                    <Text>(339)</Text>
                    <Pressable>
                      <Question name="question" size={24} color="#111" />
                    </Pressable>
                  </View>
                </View>
              </>
            ) : (
              <View className="flex items-center justify-center mt-10">
                <Text className="text-gray-500 text-lg">
                  Product not found.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        {/* Fixed Bottom Bar */}
        <View className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4 flex-row justify-between items-center border-t border-gray-300">
          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={() => setIsVariantOpen(true)}
            className="bg-[#8D021F] w-full px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold text-center">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProductScreen;
