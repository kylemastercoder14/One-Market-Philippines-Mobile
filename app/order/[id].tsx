import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, PlusIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
} from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  // Function to pick an image from the gallery or camera
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // Use lowercase "images"
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the result was not canceled and has assets
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Function to capture an image using the camera
  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the result was not canceled and has assets
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Set the captured image URI
    }
  };

  // Function to handle the completion action
  const handleMarkAsComplete = () => {
    // Add logic to mark the order as complete
    console.log("Order marked as complete!");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-5">
          <View className="relative flex-row items-center h-8">
            {/* Back Button on Left */}
            <Pressable onPress={() => router.back()} className="z-10">
              <ChevronLeft color="#111" />
            </Pressable>

            {/* Centered Title */}
            <Text className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
              Order Details
            </Text>
          </View>
          <View className="mt-3">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Order #: 1 Market Philippines-1744163579657
            </Text>
            <Text>
              Print Midi Dress with Belt - Crew Neck, Short Sleeve, Non-Stretch
              Polyester, Perfect for All Seasons
            </Text>
            <Text>x2</Text>
            <Divider className="my-3" />
            <Text className="font-semibold mb-2">Shipping Details</Text>
            <Text>Kyle Andre Lim</Text>
            <Text>
              Block 111 Lot 4 Ruby Street, Barangay Santa Lucia - +639152479693
            </Text>
            <Divider className="my-3" />
            <View className="flex-row items-center justify-between">
              <Text>Cash on Delivery</Text>
              <Text className="font-semibold text-[#800020]">₱950.00</Text>
            </View>
            {/* Image Picker Button */}
            <View className="mt-5">
              {image ? (
                <>
                  <View className="relative w-32 h-32">
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Pressable
                      onPress={captureImage}
                      className="bg-black/50 w-full absolute bottom-0 right-0 p-1"
                    >
                      <Text className="text-xs text-white text-center">
                        Change
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Pressable
                    onPress={captureImage}
                    className="border border-zinc-300 p-3 w-32 h-32 flex-row items-center justify-center rounded-md"
                  >
                    <PlusIcon color="#d4d4d8" size={24} />
                  </Pressable>
                  <Text className="text-zinc-500 mt-2">Upload Image</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed button at the bottom */}
      <View className="absolute bottom-10 left-0 right-0 px-5">
        <Pressable
          onPress={handleMarkAsComplete}
          style={{
            backgroundColor: "#800020",
            paddingVertical: 15,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Mark as Complete
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Page;
