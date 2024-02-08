import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";

const animation = "../../assets/anim1.json";

const Welcome = () => {
  const navigation = useNavigation();

  const handleScreenSwitch = () => {
    navigation.navigate("SignIn");
  };

  let [fontsLoaded] = useFonts({
    "Mulish-ExtraBoldItalic": require("../../assets/fonts/Mulish-ExtraBoldItalic.ttf"),
    "Mulish-Medium": require("../../assets/fonts/Mulish-Medium.ttf"),
  });

  return (
    <>
      <StatusBar hidden />
      <View className="flex-1 flex flex-col justify-around bg-gray-900">
        <Text
          className="text-5xl text-center mt-5 text-white"
          style={{ fontFamily: "Mulish-ExtraBoldItalic" }}
        >
          Let's Get Started !!!
        </Text>

        <LottieView
          className="h-1/2"
          source={require(animation)}
          autoPlay
          loop
        />

        <View className="items-center my-5">
          <TouchableOpacity
            className="bg-yellow-400 justify-center p-4 rounded-2xl w-64
            flex flex-row"
            onPress={() => handleScreenSwitch()}
          >
            <Text className="text-3xl align-middle ml-2" style={{fontFamily:"Mulish-Medium"}}>
              Welcome
            </Text>
            <ArrowLongRightIcon color={"#000"} size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Welcome;
