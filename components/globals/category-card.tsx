import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import React from "react";
import { Category } from "@/types/category";
import { View } from "react-native";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card variant='outline' className="rounded-lg p-0 flex-1" style={{ margin: 4 }}>
      <Image
        source={{
          uri: category.image,
        }}
        className="h-[200px] w-full rounded-t-md"
        resizeMode="cover"
        alt={`${category.name} image`}
      />
      <View className="p-3">
        <Text className="text-sm font-normal text-typography-700">
          {category.slug}
        </Text>
        <Heading size="md" className="mb-2">
          {category.name}
        </Heading>
      </View>
    </Card>
  );
};

export default CategoryCard;
