import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";

const animation = "../../assets/anim1.json";

const Welcome = () => {
  const navigation = useNavigation();

  const handleScreenSwitch = () => {
    navigation.navigate("SignIn");
  };
  return (
    <>
      <View className="flex-1 flex flex-col justify-between bg-purple-700">
        <Text className="text-4xl text-center mt-5 text-white">
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
            className="bg-yellow-400 justify-center p-4 rounded-2xl w-64"
            onPress={() => handleScreenSwitch()}
          >
            <Text className="text-3xl self-center align-middle ml-2">
              Welcome <ArrowLongRightIcon color={"#000"} size={35} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Welcome;
