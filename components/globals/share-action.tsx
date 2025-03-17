import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import CachedImage from "@/helpers/image";
import Link from "react-native-vector-icons/AntDesign";
import Ellipsis from "react-native-vector-icons/AntDesign";
import Message from "react-native-vector-icons/MaterialCommunityIcons";
import Facebook from "react-native-vector-icons/MaterialCommunityIcons";
import Messenger from "react-native-vector-icons/MaterialCommunityIcons";
import Instagram from "react-native-vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import { shareImage } from "@/helpers/sharing";

const ShareAction = ({
  image,
  name,
  id,
}: {
  image: string;
  name: string;
  id: string;
}) => {
  // Copy text to clipboard
  const copyToClipboard = async (text: string, message: string) => {
    await Clipboard.setStringAsync(text);
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const productUrl = `https://yourwebsite.com/product/${id}`;

  const onShare = async (socialPlatform?: string) => {
    try {
      if (socialPlatform === "message") {
        // Open default messaging app
        const smsUrl = `sms:?body=Check out this product: ${name} - ${productUrl}`;
        await Linking.openURL(smsUrl);
      } else {
        await shareImage(image, "image/jpeg", socialPlatform);
        if (Platform.OS === "android") {
          ToastAndroid.show("Shared successfully!", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Failed to share", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View>
      <Text className="text-center mt-3 font-semibold text-lg">Share to</Text>
      <View className="flex-row mt-3 px-10 items-center gap-3">
        <CachedImage
          uri={image || "https://via.placeholder.com/200"}
          className="w-20 h-20 rounded-xl"
        />
        <View>
          <Text className="w-60 font-semibold line-clamp-1">{name}</Text>
          <View className="flex-row gap-2 items-center mt-1">
            <Text className="w-40 text-sm line-clamp-1">Item ID: {id}</Text>
            <TouchableOpacity
              className="border rounded-full px-3 py-0.5"
              onPress={() => copyToClipboard(id, "Item ID copied!")}
            >
              <Text className="text-sm">Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row mt-10 px-10 items-center gap-7">
        {/* Message */}
        <TouchableOpacity
          onPress={() => onShare("message")}
          className="items-center justify-center gap-1.5"
        >
          <View className="size-16 rounded-full items-center justify-center bg-[#34d951]">
            <Message name="message" size={25} color="#fff" />
          </View>
          <Text>Message</Text>
        </TouchableOpacity>
        {/* Facebook */}
        <TouchableOpacity
          onPress={() => onShare("facebook")}
          className="items-center justify-center gap-1.5"
        >
          <View className="size-16 rounded-full items-center justify-center bg-[#1477ee]">
            <Facebook name="facebook" size={35} color="#fff" />
          </View>
          <Text>Facebook</Text>
        </TouchableOpacity>
        {/* Instagram */}
        <TouchableOpacity
          onPress={() => onShare("instagram")}
          className="items-center justify-center gap-1.5"
        >
          <View className="size-16 rounded-full items-center justify-center bg-[#cd0f9d]">
            <Instagram name="instagram" size={35} color="#fff" />
          </View>
          <Text>Instagram</Text>
        </TouchableOpacity>
        {/* Messenger */}
        <TouchableOpacity
          onPress={() => onShare("messenger")}
          className="items-center justify-center gap-1.5"
        >
          <View className="size-16 rounded-full items-center justify-center bg-[#5c5bfe]">
            <Messenger name="facebook-messenger" size={35} color="#fff" />
          </View>
          <Text>Messenger</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row mt-10 px-10 items-center gap-7">
        {/* Copy Link Button */}
        <TouchableOpacity
          className="items-center justify-center gap-1.5"
          onPress={() => copyToClipboard(productUrl, "Link copied!")}
        >
          <View className="size-16 rounded-full items-center justify-center bg-zinc-100">
            <Link name="link" size={25} color="#000" />
          </View>
          <Text>Copy Link</Text>
        </TouchableOpacity>

        {/* More Options Button */}
        <TouchableOpacity
          onPress={() => onShare()}
          className="items-center justify-center gap-1.5"
        >
          <View className="size-16 rounded-full items-center justify-center bg-zinc-100">
            <Ellipsis name="ellipsis1" size={25} color="#000" />
          </View>
          <Text>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareAction;
