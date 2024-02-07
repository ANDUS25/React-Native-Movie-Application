import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { UnknownPersonPoster, posterImage } from "../../api/MovieDB";

const Cast = ({ Data }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text className="text-white text-2xl my-4">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="my-2"
      >
        {Data?.map((item, index) => {
          return (
            <TouchableOpacity
              className="flex flex-col mx-2"
              key={index}
              onPress={() => navigation.navigate("Person", item)}
            >
              <Image
                source={{
                  uri: posterImage(item?.profile_path) || UnknownPersonPoster,
                }}
                style={{ width: 100, height: 100 }}
                className="rounded-full "
                resizeMode="cover"
              />
              <View className="mt-2">
                <Text className="text-slate-400">
                  {item.character.length >= 12
                    ? `${item.character.slice(0, 12)}...`
                    : item.character}
                </Text>
                <Text className="text-slate-400">
                  {item.name.length >= 12
                    ? `${item.name.slice(0, 12)}...`
                    : item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;
