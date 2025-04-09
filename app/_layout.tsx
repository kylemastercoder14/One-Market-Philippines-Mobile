import "@/global.css";
import React, { useEffect } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider/";
import { Stack } from "expo-router";
import { ActivityIndicator, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { Provider } from "react-redux";
import { store, persistor } from "@/helpers/cart-store";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  useEffect(() => {
    const hideNavigationBar = async () => {
      try {
        // Hide system navigation bar
        await NavigationBar.setVisibilityAsync("hidden");

        // Set behavior correctly
        await NavigationBar.setBehaviorAsync("inset-swipe");
      } catch (error) {
        console.error("Error hiding navigation bar:", error);
      }
    };

    hideNavigationBar();

    return () => {
      // Restore default behavior when component unmounts
      NavigationBar.setVisibilityAsync("visible");
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <GluestackUIProvider>
          <StatusBar />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="rider" options={{ headerShown: false }} />
            <Stack.Screen
              name="products/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="store/[id]" options={{ headerShown: false }} />
            <Stack.Screen
              name="sign-in/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="categories/[slug]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="categories/[slug]/[subSlug]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="order/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
