import { View, Text, Image, Alert } from "react-native";
import React from "react";
import images from "@/constants/images";
import { AlertCircleIcon, LockKeyhole } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "expo-router";

const EmailForm = ({ handleClose }: { handleClose: () => void }) => {
  const router = useRouter();
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async () => {
    if (inputValue.trim() === "") {
      setIsInvalid(true);
      return;
    }

    setLoading(true);
    try {
      // const response = await axios.post(`${process.env.API_URL}/categories`, {
      //   email: inputValue,
      // });
      // Handle successful response
      // if (response.status === 200) {

      //   console.log("Token:", response.data.token);
      // }
      Alert.alert("Success", "Login successful!");
      if (inputValue === "kyleandrelim17@gmail.com") {
        router.push("/rider");
      } else {
        router.push("/");
      }
      handleClose();
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", "Invalid email or server issue.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="h-[70vh] py-4 flex flex-col w-full items-center justify-between">
      <View className="w-full flex flex-col items-center">
        <Image
          source={images.logo}
          className="size-14 flex items-center justify-center mx-auto"
          resizeMode="contain"
        />
        <View>
          <Text className="text-2xl font-bold mt-2">1 Market</Text>
          <Text className="text-red-700">Philippines</Text>
        </View>
        <View className="gap-2 flex flex-row items-center mt-3">
          <LockKeyhole size={18} color="green" />
          <Text className="text-green-700">All data is encrypted</Text>
        </View>
        <View className="w-full mt-10">
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>
                Email Address <Text className="text-red-700">*</Text>
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                type="text"
                placeholder="Please enter your email address"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Email address is required
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button className="w-full mt-4" size="md" onPress={handleLogin}>
            <ButtonText>Continue</ButtonText>
          </Button>
          <Button variant="link" className="mt-1">
            <ButtonText className="text-zinc-500">
              Trouble signing in?
            </ButtonText>
          </Button>
        </View>
      </View>
      <View className="items-center justify-center flex flex-row">
        <Text className="text-center">
          By continuing, you agree to our{" "}
          <Button variant="link" className="mt-6">
            <ButtonText className="pt-[17px] text-red-700 underline">
              Terms of Use
            </ButtonText>
          </Button>{" "}
          and{" "}
          <Button variant="link">
            <ButtonText className="text-red-700 underline">
              Privacy Policy
            </ButtonText>
          </Button>
        </Text>
      </View>
    </View>
  );
};

export default EmailForm;
