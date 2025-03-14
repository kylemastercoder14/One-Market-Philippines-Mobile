import MasonryList from "@react-native-seoul/masonry-list";
import React from "react";
import axios from "axios";
import CategoryCard from "@/components/globals/category-card";
import { Category } from "@/types/category";
import { SafeAreaView } from "react-native";

const CategoryPage = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
	const fetchCategories = async () => {
	  try {
		const response = await axios.get(
		  "https://onemp-api.onrender.com/api/v1/categories"
		);
		setCategories(response.data as Category[]);
	  } catch (error) {
		console.error("Error fetching categories:", error);
	  }
	};
	fetchCategories();
  }, []);

  return (
	<SafeAreaView
	  style={{
		flex: 1,
		paddingVertical: 10,
	  }}
	>
	  <MasonryList
		data={categories}
		contentContainerStyle={{
		  alignSelf: "stretch",
		}}
		keyExtractor={(item) => item.id}
		numColumns={2}
		showsVerticalScrollIndicator={false}
		onEndReachedThreshold={0.1}
		renderItem={({ item }: { item: unknown; i: number }) => (
		  <CategoryCard category={item as Category} />
		)}
		style={{ paddingHorizontal: 6, alignSelf: "stretch" }}
	  />
	</SafeAreaView>
  );
};

export default CategoryPage;
