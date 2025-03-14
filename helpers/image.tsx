import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import { ImageProps } from "react-native";

interface CachedImageProps extends ImageProps {
  uri: string;
}

const CachedImage: React.FC<CachedImageProps> = ({ uri, ...props }) => {
  const [cachedSource, setCachedSource] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => resolve(reader.result as string);
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error caching image:", error);
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]);

  return <Animated.Image source={cachedSource ?? { uri }} {...props} />;
};

export default CachedImage;
