import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  ShoppingCart,
  TextSearch,
  User,
} from "lucide-react-native";

function TabIcon({ focused, Icon, title }: any) {
  return (
    <View
      className={`flex flex-row w-full flex-1 min-w-[100px] min-h-14 mt-4 justify-center items-center overflow-hidden ${
        focused ? "" : ""
      }`}
    >
      <Icon
        size={20}
        color={focused ? "#800020" : "#888"}
        fill={focused ? "#800020" : "#888"}
      />
      {focused && (
        <Text
          className={`text-base ${
            focused ? "text-[#800020]" : "text-white"
          } font-semibold ml-2`}
        >
          {title}
        </Text>
      )}
    </View>
  );
}

const TabLayout = () => {
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
            <TabIcon focused={focused} Icon={ShoppingCart} title="Cart" />
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
