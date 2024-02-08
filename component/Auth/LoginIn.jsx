import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { signInWithEmailAndPassword } from "firebase/auth";
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
} from "react-native-heroicons/outline";
import { auth } from "../../config/config";

const path = "../../assets/LogInAnimation.json";

const LoginIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  let [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../../assets/fonts/Mulish-Medium.ttf"),
    "Raleway-ExtraLight": require("../../assets/fonts/Raleway-ExtraLight.ttf"),
    "Raleway-Medium": require("../../assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
  });

  const Navigation = useNavigation();

  const handleLogIn = async () => {
    try {
      if (userEmail && userPassword) {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);

        setTimeout(() => {
          ToastAndroid.show("User Login Successfully", ToastAndroid.SHORT);
        }, 3000);
      }
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View className="flex-1 items-center justify-around pt-5 bg-gray-900 h-screen">
          <LottieView
            className="h-80 w-full"
            source={require(path)}
            autoPlay
            loop
          />
          <Text
            className="text-3xl my-8 text-white"
            style={{ fontFamily: "Mulish-Medium" }}
          >
            LogIn
          </Text>
          <View style={{ width: "80%" }}>
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
            <View className="flex flex-row bg-white p-3 items-center rounded-xl">
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
          <TouchableOpacity
            className="my-8 bg-yellow-400 p-5 w-48 items-center rounded-xl"
            onPress={handleLogIn}
          >
            <Text className="text-2xl" style={{ fontFamily: "Raleway-Bold" }}>
              {" "}
              LogIn
            </Text>
          </TouchableOpacity>
          <View className=" flex flex-row flex-1 items-center justify-center">
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Raleway-ExtraLight" }}
            >
              Don't have an account{" "}
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => Navigation.navigate("SignIn")}
            >
              <Text
                className="text-white text-lg self-center "
                style={{ fontFamily: "Raleway-Medium" }}
              >
                signIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginIn;
