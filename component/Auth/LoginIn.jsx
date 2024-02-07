import { useNavigation } from "@react-navigation/native";
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

  const Navigation = useNavigation()

  const handleUserMail = (e) => {
    setUserEmail(e);
    if (!userEmail.includes("@") && !userEmail.includes(".com")) {
      ToastAndroid.show("Please add @ and .com", ToastAndroid.SHORT);
    } else if (userEmail.length == 0) {
      ToastAndroid.show("Input should not be empty.", ToastAndroid.SHORT);
    }
  };

  const handleUserPassword = (e) => {
    setUserPassword(e);
    if (userPassword.length == 1 || userPassword.length <= 8) {
      ToastAndroid.show(
        "Password Length should at least 8 characters",
        ToastAndroid.SHORT
      );
    }
  };

  const handleLogIn = async () => {
    try {
      if (userEmail && userPassword) {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);

        setTimeout(()=>{
          ToastAndroid.show('User Login Successfully',ToastAndroid.SHORT)
        },3000)
      }
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View className="flex-1 items-center justify-around pt-5 bg-purple-700 h-screen">
          <LottieView
            className="h-60 w-full"
            source={require(path)}
            autoPlay
            loop
          />
          <Text className="text-3xl my-8 text-white">LogIn</Text>
          <View>
            <View className="flex flex-row bg-white p-5 w-screen items-center justify-center mb-2 rounded-xl">
              <AtSymbolIcon color={"red"} />
              <TextInput
                placeholder="Please Enter User Email"
                value={userEmail}
                onChangeText={(e) => handleUserMail(e)}
                className="text-xl ml-3"
              />
            </View>
            <View className="flex flex-row bg-white p-5 items-center justify-center rounded-xl">
              <LockClosedIcon color={"red"} />
              <TextInput
                placeholder="Please Enter User Password"
                value={userPassword}
                onChangeText={(e) => handleUserPassword(e)}
                className="text-xl mx-3"
                secureTextEntry={togglePassword}
                multiline={false}
                style={{ width: "70%" }}
                maxLength={16}
              />
              <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
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
            <Text className="text-2xl"> LogIn</Text>
          </TouchableOpacity>
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-lg">
              Don't have an account{" "}
              <TouchableOpacity className="" onPress={()=>Navigation.navigate('SignIn')}>
                <Text className="text-white text-lg self-center ">signIn</Text>
              </TouchableOpacity>{" "}
              here
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginIn;
