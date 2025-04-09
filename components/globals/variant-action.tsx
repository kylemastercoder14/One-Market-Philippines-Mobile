import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Product } from "@/types/product";
import CachedImage from "@/helpers/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/helpers/cart-store";
import { addToCart } from "@/helpers/cart-reducer";

const VariantAction = ({ product }: { product: Product | null }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleSelectOption = (variantName: string, optionName: string) => {
    setSelectedOptions((prev) => ({ ...prev, [variantName]: optionName }));
  };

  // Extract variant prices from `sellerProductVariants`
  const variantPrices = (product?.sellerProductVariants ?? []).flatMap(
    (variant) =>
      (variant.sellerProductVariantsOptions ?? [])
        .map((option) => option.price)
        .filter((price): price is number => price !== undefined && price > 0)
  );

  const lowestPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : Infinity;

  // Check if the product itself has a price
  const isThereAPrice = product?.price !== undefined && product?.price !== 0;

  // Get selected variant price dynamically
  const getSelectedVariantPrice = () => {
    let selectedPrice = 0;

    product?.sellerProductVariants.forEach((variant) => {
      const selectedOptionName = selectedOptions[variant.name!];
      const selectedOption = variant.sellerProductVariantsOptions.find(
        (option) => option.name === selectedOptionName
      );

      if (selectedOption) {
        console.log(
          `Variant: ${variant.name}, Selected Option: ${selectedOption.name}, Price: ${selectedOption.price}`
        );
        selectedPrice += selectedOption.price ?? 0;
      }
    });

    console.log("Final Calculated Price:", selectedPrice);

    return selectedPrice > 0 ? selectedPrice : product?.price || 0;
  };

  // Check if user has selected all required variants
  const allVariantsSelected =
    product?.sellerProductVariants.every(
      (variant) => selectedOptions[variant.name!] !== undefined
    ) ?? false;

  // Determine which price to show
  const displayPrice = allVariantsSelected
    ? `₱${getSelectedVariantPrice().toFixed(2)}`
    : lowestPrice !== Infinity
    ? `Starts at ₱${lowestPrice.toFixed(2)}`
    : `₱${product?.price?.toFixed(2) ?? "0.00"}`;

  const addItemToCart = () => {
    if (product) {
      const selectedVariantsString = Object.values(selectedOptions).join(", ");
      const selectedVariantPrice = getSelectedVariantPrice();
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: selectedVariantPrice,
          quantity,
          image: product.images[0] || "https://via.placeholder.com/200",
          selectedVariants: selectedVariantsString,
        })
      );
    }
    ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
  };

  return (
    <View className="h-[60vh] pb-20 relative">
      <ScrollView>
        <View className="flex-row mt-3 px-5 items-center gap-3">
          <CachedImage
            uri={product?.images[0] || "https://via.placeholder.com/200"}
            className="w-20 h-20 rounded-xl"
          />
          <View>
            <Text className="w-60 font-semibold line-clamp-1">
              {product?.name}
            </Text>
            <Text className="text-xl font-bold mt-1">{displayPrice}</Text>
          </View>
        </View>
        <View className="mt-4 px-5">
          {product?.sellerProductVariants.map((variant) => (
            <View key={variant.id} className="mb-3">
              <Text className="font-semibold">{variant.name}</Text>
              <View className="flex-row flex-wrap gap-2 mt-2">
                {variant.sellerProductVariantsOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedOptions[variant.name!] === option.name
                        ? "text-white border-[#8D021F]"
                        : "border-zinc-200"
                    }`}
                    onPress={() =>
                      handleSelectOption(variant.name!, option.name)
                    }
                  >
                    {option.image ? (
                      <>
                        <CachedImage
                          uri={option.image}
                          className="w-16 h-16 rounded-md"
                        />
                        <Text className="text-center line-clamp-1 w-16">
                          {option.name}
                        </Text>
                      </>
                    ) : (
                      <Text>{option.name}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        {/* Quantity Selector */}
        <View className="mt-4 px-5 flex-row items-center gap-3">
          <Text className="font-semibold">Qty</Text>
          <View className="border border-zinc-200 rounded-lg flex-row gap-3">
            <TouchableOpacity onPress={handleDecrement} className="px-4 py-2">
              <Text className="text-lg">-</Text>
            </TouchableOpacity>
            <Text className="px-4 py-2 text-lg">{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} className="px-4 py-2">
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="absolute -bottom-2 left-0 right-0 bg-white py-1 px-4 flex-row justify-between items-center border-gray-300">
        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={addItemToCart}
          className="bg-[#8D021F] w-full px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold text-center">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VariantAction;
