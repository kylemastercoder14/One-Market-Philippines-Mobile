import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { BikeIcon, History, User, Wallet } from "lucide-react-native";

function TabIcon({ focused, Icon, title, noFill }: any) {
  return (
    <View
      className={`flex flex-row w-full flex-1 min-w-[100px] min-h-14 mt-4 justify-center items-center overflow-hidden`}
    >
      <Icon
        size={20}
        color={focused ? "#800020" : "#888"}
        {...(!noFill && { fill: focused ? "#800020" : "#888" })}
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
          title: "Deliveries",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={BikeIcon} title="Deliveries" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "Histories",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              noFill={true}
              Icon={History}
              title="Histories"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          title: "Wallet",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={Wallet}
              title="Wallet"
            />
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
