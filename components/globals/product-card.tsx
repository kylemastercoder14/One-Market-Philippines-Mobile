import React from "react";
import { Pressable, Text } from "react-native";
import { Product } from "@/types/product";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "@/helpers/image";
import { useRouter } from 'expo-router';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const isEven = index % 2 === 0;
  const router = useRouter();

  // Extract variant prices from `sellerProductVariants`
  const variantPrices = (product.sellerProductVariants ?? []).flatMap(
    (variant) =>
      (variant.sellerProductVariantsOptions ?? [])
        .map((option) => option.price)
        .filter((price): price is number => price !== undefined && price > 0) // Ensure valid prices
  );

  const lowestPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : Infinity;

  // Check if the product itself has a price
  const isThereAPrice = product.price !== undefined && product.price !== 0;

  // Determine the displayed price
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
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() => router.push(`/products/${product.slug}`)}
        className="flex justify-center mb-4 space-y-1"
      >
        <CachedImage
          uri={
            product.images?.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/200"
          }
          style={{
            width: "100%",
            height: index % 3 === 0 ? 200 : 250,
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

export default ProductCard;
