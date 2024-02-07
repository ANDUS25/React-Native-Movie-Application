import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const path = "../../assets/Loading.json"

const Loading = () => {
  return (
    <View>
      <LottieView
        className="h-60 w-full"
        source={require(path)}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
