import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";

import { useFonts } from "expo-font";
import { auth } from "../../config/config";

const path = "../../assets/SignInAnimation.json";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  let [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../../assets/fonts/Mulish-Medium.ttf"),
    "Raleway-ExtraLight": require("../../assets/fonts/Raleway-ExtraLight.ttf"),
    "Raleway-Medium": require("../../assets/fonts/Raleway-Medium.ttf"),
  });

  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (userName && userEmail && userPassword) {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);

      ToastAndroid.show("User Register Successfully", ToastAndroid.SHORT);

      setTimeout(() => {
        navigation.navigate("Movie");
      }, 3000);
    } else {
      if (
        userName.length == 0 ||
        userEmail.length == 0 ||
        userPassword.length == 0
      ) {
        ToastAndroid.show("Please fill all data correctly", ToastAndroid.SHORT);
      }
    }
  };

  const handleLogIn = () => {
    navigation.navigate("LogIn");
  };
  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View className="flex-1 items-center justify-around py-5 bg-gray-900 h-screen">
          <LottieView
            className="h-60 w-full"
            source={require(path)}
            autoPlay
            loop
          />
          <Text
            className="text-3xl my-8 text-white"
            style={{ fontFamily: "Mulish-Medium" }}
          >
            Register
          </Text>
          <View className="w-3/4">
            <View className="flex flex-row bg-white p-3 items-center mb-2 rounded-xl">
              <View className="mx-1">
                <UserIcon color={"red"} />
              </View>

              <TextInput
                placeholder="User Name"
                value={userName}
                onChangeText={(e) => setUserName(e)}
                className="text-xl w-[250]"
                style={{ fontFamily: "Mulish-Medium" }}
              />
            </View>

            <View className="flex flex-row bg-white p-3 items-center mb-2 rounded-xl">
              <View className="mx-1">
                <AtSymbolIcon color={"red"} />
              </View>
              <TextInput
                placeholder="User Email"
                value={userEmail}
                onChangeText={(e) => setUserEmail(e)}
                className="text-xl w-[250]"
                style={{ fontFamily: "Mulish-Medium" }}
              />
            </View>
            <View className="flex flex-row bg-white p-3 items-center  rounded-xl">
              <LockClosedIcon color={"red"} />

              <TextInput
                placeholder="User Password"
                value={userPassword}
                onChangeText={(e) => setUserPassword(e)}
                className="text-xl mx-3"
                secureTextEntry={togglePassword}
                multiline={false}
                style={{ width: "70%", fontFamily: "Mulish-Medium" }}
                maxLength={16}
              />
              <TouchableOpacity
                onPress={() => setTogglePassword(!togglePassword)}
              >
                {togglePassword ? (
                  <EyeIcon color={"red"} />
                ) : (
                  <EyeSlashIcon color={"red"} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row justify-center items-center my-6">
            <View className="border-b-2 w-1/2 mr-4 border-yellow-400" />
            <Text className="text-white">OR</Text>
            <View className="border-b-2 w-1/2 ml-4 border-yellow-400" />
          </View>

          <View className="flex flex-row space-x-2">
            <TouchableOpacity className="bg-white rounded-lg px-8 py-2">
              <Text className="text-xl">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-lg px-8 py-2">
              <Text className="text-xl">Facebook</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mt-8 bg-yellow-400 p-5 w-48 items-center rounded-xl"
            onPress={handleSignIn}
          >
            <Text className="text-2xl" style={{ fontFamily: "Raleway-Bold" }}>
              SignIn
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center items-center my-6">
            <Text
              className="text-lg text-white"
              style={{ fontFamily: "Raleway-ExtraLight" }}
            >
              or already have an account{" "}
            </Text>
            <TouchableOpacity onPress={handleLogIn}>
              <Text
                className="text-lg text-white"
                style={{ fontFamily: "Raleway-Medium" }}
              >
                LogIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
