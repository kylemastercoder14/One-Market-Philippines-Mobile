import React from "react";
import { Pressable, Text, Dimensions } from "react-native";
import { Product } from "@/types/product";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "@/helpers/image";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH / 3 - 10; // Adjust for margins/padding

interface ProductCardCarouselProps {
  product: Product;
  index: number;
}

const ProductCardCarousel: React.FC<ProductCardCarouselProps> = ({
  product,
  index,
}) => {
  const router = useRouter();

  // Extract variant prices from `sellerProductVariants`
  const variantPrices = (product.sellerProductVariants ?? []).flatMap(
    (variant) =>
      (variant.sellerProductVariantsOptions ?? [])
        .map((option) => option.price)
        .filter((price): price is number => price !== undefined && price > 0)
  );

  const lowestPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : Infinity;

  const isThereAPrice = product.price !== undefined && product.price !== 0;
  const priceWithVariants =
    lowestPrice !== Infinity
      ? `Starts at ₱${lowestPrice.toFixed(2)}`
      : `₱${product.price?.toFixed(2) ?? "0.00"}`;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: CARD_WIDTH,
          marginHorizontal: 7, // Ensure spacing between items
        }}
        onPress={() => router.push(`/products/${product.slug}`)}
        className="flex justify-center mb-2 space-y-1"
      >
        <CachedImage
          uri={
            product.images?.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/200"
          }
          style={{
            width: "100%",
            height: 120, // Adjust height for balance
            borderRadius: 10,
          }}
          className="bg-black/5"
          alt={`${product.name} image`}
        />
        <Text className="font-semibold text-neutral-600" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-sm text-red-600">
          {isThereAPrice
            ? `₱${product.price?.toFixed(2) ?? "0.00"}`
            : priceWithVariants}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default ProductCardCarousel;
