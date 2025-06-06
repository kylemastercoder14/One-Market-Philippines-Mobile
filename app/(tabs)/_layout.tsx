import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  ShoppingCart,
  TextSearch,
  User,
} from "lucide-react-native";
import { useSelector } from 'react-redux';
import { RootState } from '@/helpers/cart-store';

function TabIcon({ focused, Icon, title }: any) {
  return (
    <View
      className={`flex flex-row w-full flex-1 min-w-[100px] min-h-14 mt-4 justify-center items-center overflow-hidden`}
    >
      <Icon
        size={20}
        color={focused ? "#800020" : "#888"}
        fill={focused ? "#800020" : "#888"}
      />
      {focused && (
        <Text className="text-base text-[#800020] font-semibold ml-2">
          {title}
        </Text>
      )}
    </View>
  );
}

const TabLayout = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.cart.length);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={LayoutDashboard} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={TextSearch} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View className="relative">
              <TabIcon focused={focused} Icon={ShoppingCart} title="Cart" />
              {/* Show badge only if cart is active */}
              {focused && (
                <View
                  style={{ width: 20, height: 20 }}
                  className="absolute top-4 right-0 bg-[#800020] rounded-full flex-row justify-center items-center"
                >
                  <Text className="text-white text-[8px]">{cartTotal}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "You",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={User} title="You" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
