import Constants, { ExecutionEnvironment } from "expo-constants";
import * as FileSystem from "expo-file-system";

const isExpoGo =
  Constants?.executionEnvironment === ExecutionEnvironment.StoreClient;

async function shareImage(imageUri: string, type?: string, social?: string) {
  try {
    // Download the image to a local file (required for expo-sharing)
    const fileUri = `${FileSystem.cacheDirectory}shared-image.jpg`;
    const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);

    if (isExpoGo) {
      const Sharing = require("expo-sharing");
      return Sharing.shareAsync(uri);
    }

    const RNShare = require("react-native-share").default;

    return RNShare.shareSingle({
      social: social ?? (RNShare?.Social?.INSTAGRAM as any),
      url: uri, // Now using local file URI
      type: type ?? "image/*",
    });
  } catch (error) {
    console.error("Error sharing image:", error);
    throw error;
  }
}

export { shareImage };
