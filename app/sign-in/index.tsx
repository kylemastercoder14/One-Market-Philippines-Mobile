import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { MailIcon } from "lucide-react-native";
import ActionSheetComponent from "@/components/globals/action-sheet";
import EmailForm from "@/components/forms/email-form";

const SignIn = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  return (
	<>
	  <ActionSheetComponent isOpen={showActionsheet} onClose={handleClose}>
		<EmailForm handleClose={handleClose} />
	  </ActionSheetComponent>
	  <SafeAreaView className="bg-white h-full">
		<ScrollView contentContainerClassName="h-full">
		  <View className="relative">
			<Image
			  source={images.onboarding}
			  className="w-full h-[85vh]"
			  resizeMode="cover"
			/>
			<LinearGradient
			  colors={["transparent", "white"]}
			  style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				bottom: 0,
			  }}
			/>
			<View className="px-10 absolute -bottom-24 w-full">
			  <Text className="text-sm text-center text-zinc-400">
				Welcome to 1 Market Philippines
			  </Text>
			  <Text className="text-2xl text-center mt-2 font-bold text-black">
				Where products meet {"\n"}
				<Text className="text-red-800">services effortlessly</Text>
			  </Text>
			  <View className="mt-5 gap-y-2">
				<Button
				  size="lg"
				  variant="solid"
				  className="bg-white border border-zinc-300 shadow-md"
				>
				  <Image
					source={images.google}
					className="size-5"
					resizeMode="cover"
				  />
				  <ButtonText className="text-zinc-400">
					Continue with Google
				  </ButtonText>
				</Button>
				<Button
				  size="lg"
				  variant="solid"
				  className="bg-white border border-zinc-300 shadow-md"
				>
				  <Image
					source={images.facebook}
					className="size-5"
					resizeMode="cover"
				  />
				  <ButtonText className="text-zinc-400">
					Continue with Facebook
				  </ButtonText>
				</Button>
				<Button
				  onPress={() => setShowActionsheet(true)}
				  size="lg"
				  variant="solid"
				  className="bg-white border border-zinc-300 shadow-md"
				>
				  <ButtonIcon
					className="mr-1 text-zinc-400"
					size="md"
					as={MailIcon}
				  />
				  <ButtonText className="text-zinc-400">
					Continue with Email
				  </ButtonText>
				</Button>
			  </View>
			</View>
		  </View>
		</ScrollView>
	  </SafeAreaView>
	</>
  );
};

export default SignIn;
