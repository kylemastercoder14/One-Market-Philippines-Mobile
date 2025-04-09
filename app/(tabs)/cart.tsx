import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/helpers/cart-store";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import CachedImage from "../../helpers/image";
import { Trash } from "lucide-react-native";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      {/* Cart Content - Scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Ensure space for fixed bottom bar
      >
        <Text className="text-center font-semibold text-2xl mt-5">
          Cart ({cartItems.length})
        </Text>
        <View className="flex-1 px-4 py-5 mt-5">
          {cartItems.map((item) => (
            <View
              key={item.id}
              className="gap-3 flex-row items-center justify-between mb-5"
            >
              <View className="flex-row gap-2">
                <Checkbox
                  value=""
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
                <View className="flex-row items-start gap-2">
                  <View className="relative w-[80px] h-[80px]">
                    <CachedImage
                      uri={item.image}
                      className="bg-black/5 w-full h-full"
                      alt={`${item.name} image`}
                    />
                  </View>
                  <View>
                    <Text className="font-semibold w-40 line-clamp-2">
                      {item.name}
                    </Text>
                    <Text className="text-[#800020]">
                      ₱{item.price.toFixed(2)}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <Trash color="#800020" size={20} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ✅ Fixed Bottom Bar */}
      <View className="absolute bottom-0 w-full bg-white p-4 border-t border-gray-300 shadow-md">
        <View className="flex-row justify-between items-center">
          {/* Total Price */}
          <Text className="text-lg font-semibold">
            Total: ₱{totalPrice.toFixed(2)}
          </Text>
          {/* Proceed to Checkout Button */}
          <TouchableOpacity className="bg-[#800020] px-5 py-3 rounded-md">
            <Text className="text-white font-semibold">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
