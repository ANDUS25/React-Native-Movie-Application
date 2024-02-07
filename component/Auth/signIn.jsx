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

import {auth} from "../../config/config"

const path = "../../assets/SignInAnimation.json";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

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

  const handleEmail = (e) => {
    setUserEmail(e);
    if (!userEmail.includes("@") && !userEmail.includes(".com")) {
      ToastAndroid.show("Email should include @ and .com", ToastAndroid.SHORT);
    }
  };

  const handlePassword = (e) => {
    if (userPassword.length <= 8 || userPassword.length == 1) {
      ToastAndroid.show(
        "Password should contain more than 8 character",
        ToastAndroid.SHORT
      );
    }
    setUserPassword(e);
  };

  const handleLogIn =() =>{
    navigation.navigate('LogIn')
  }
  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View className="flex-1 items-center justify-around py-5 bg-purple-700 h-screen">
          <LottieView
            className="h-60 w-full"
            source={require(path)}
            autoPlay
            loop
          />
          <Text className="text-3xl my-8 text-white">Register</Text>
          <View>
            <View className="flex flex-row bg-white p-5 w-screen items-center justify-center mb-2 rounded-xl">
              <UserIcon color={"red"} />

              <TextInput
                placeholder="Please Enter User Name"
                value={userName}
                onChangeText={(e) => setUserName(e)}
                className="text-xl ml-3"
              />
            </View>

            <View className="flex flex-row bg-white p-5 w-screen items-center justify-center mb-2 rounded-xl">
              <AtSymbolIcon color={"red"} />
              <TextInput
                placeholder="Please Enter User Email"
                value={userEmail}
                onChangeText={(e) => handleEmail(e)}
                className="text-xl ml-3"
              />
            </View>
            <View className="flex flex-row bg-white p-5 items-center justify-center rounded-xl">
              <LockClosedIcon color={"red"} />

              <TextInput
                placeholder="Please Enter User Password"
                value={userPassword}
                onChangeText={(e) => handlePassword(e)}
                className="text-xl mx-3"
                secureTextEntry={togglePassword}
                multiline={false}
                style={{ width: "70%" }}
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

          <View className="flex flex-row justify-center items-center my-5">
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
            <Text className="text-2xl"> SignIn</Text>
          </TouchableOpacity>
          <Text className='mt-4 text-lg flex justify-center text-white'>
            or already have an account{" "}
            <TouchableOpacity className='mt-2 ' onPress={handleLogIn}>
              <Text className='text-lg text-white'>LogIn</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
