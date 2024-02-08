import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { posterImage } from "../../api/MovieDB";

const MovieList = ({ Title, Data, hideSeeAll }) => {
  const { height, width } = Dimensions.get("window");

  let [fontsLoaded] = useFonts({
    "Mulish-Italic": require("../../assets/fonts/Mulish-Italic.ttf"),
    "Raleway-Light": require("../../assets/fonts/Raleway-Light.ttf"),
  });

  const navigation = useNavigation();

  return (
    <View className="bg-gray-900 mb-9">
      <View className="flex flex-row my-6 items-center justify-between">
        <Text
          className="text-2xl text-white"
          style={{ fontFamily: "Mulish-SemiBold" }}
        >
          {Title}
        </Text>
        <TouchableOpacity>
          {hideSeeAll && (
            <Text
              className="text-lg text-white"
              style={{ fontFamily: "Mulish-Italic" }}
            >
              See all
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Data &&
          fontsLoaded &&
          Data.map((Item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Movie", Item)}
                className="mx-3"
                key={index}
              >
                <Image
                  source={{
                    uri: posterImage(Item.poster_path) || UnknownPersonPoster,
                  }}
                  className="rounded-3xl"
                  style={{
                    width: width * 0.35,
                    height: height * 0.25,
                  }}
                />
                <Text
                  className="mt-3 text-lg text-white"
                  style={{ fontFamily: "Raleway-Light" }}
                >
                  {Item.original_title.length > 15
                    ? `${Item.original_title.slice(0, 15)}...`
                    : Item.original_title}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
