import { View, Text } from "react-native";
import React from "react";
import { Search } from "lucide-react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonIcon } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <View className="flex-row items-center mt-5 bg-white rounded-full px-2 py-1">
      <Input className="flex-1 border-0">
        <InputField placeholder="Search..." />
      </Input>
      <Button size="lg" className="rounded-full">
        <ButtonIcon as={Search} />
      </Button>
    </View>
  );
};

export default SearchBar;
