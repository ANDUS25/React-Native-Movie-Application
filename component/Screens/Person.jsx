import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  fetchPersonAllDetails,
  fetchPersonAllSimilarMovies,
  posterImage,
} from "../../api/MovieDB";
import MovieList from "./MovieList";

const Person = () => {
  const { params: item } = useRoute();

  const [heart, setHeart] = useState(false);
  const [personMovieList, setPersonMovieList] = useState();
  const [personDetails, setPersonDetails] = useState();

  const navigation = useNavigation();

  const fetchPersonDetails = async (id) => {
    const data = await fetchPersonAllDetails(id);
    if (data) {
      setPersonDetails(data);
    }
  };

  const fetchPersonSimilarMovies = async (id) => {
    const data = await fetchPersonAllSimilarMovies(id);
    if (data && data.cast) {
      setPersonMovieList(data.cast);
    }
  };

  useEffect(() => {
    fetchPersonDetails(item?.id);
    fetchPersonSimilarMovies(item?.id);
  }, []);

  const { height, width } = Dimensions.get("window");
  return (
    <ScrollView className="bg-gray-900 flex-1">
      <View className="mx-4">
        <SafeAreaView className="w-full flex flex-row justify-between items-center ">
          <View className="p-1 bg-yellow-300 rounded-lg mt-2 ml-2">
            <ChevronLeftIcon
              color={"#fff"}
              size={34}
              onPress={() => navigation.goBack()}
              strokeWidth={2.8}
            />
          </View>

          <TouchableOpacity
            onPress={() => setHeart(!heart)}
            className="mr-2 mt-2"
          >
            <HeartIcon size={34} color={heart ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="flex items-center">
          <Image
            source={{
              uri: posterImage(personDetails?.profile_path),
            }}
            style={{
              width: width * 0.7,
              height: height * 0.4,
              borderWidth: 2,
              borderColor: "yellow",
              shadowColor: "#fff",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
            }}
            resizeMode="cover"
            className="my-4 rounded-full"
          />
        </View>
        <View className="mb-4">
          <Text className="text-white text-2xl text-center">
            {personDetails?.name}
          </Text>
          <Text className="text-gray-500 text-lg text-center">
            {personDetails?.place_of_birth}
          </Text>
        </View>
        <View className="w-full bg-gray-500 p-5 rounded-full space-y-1 flex flex-row ">
          <View className="border-r-2 w-1/4 justify-center items-center">
            <Text className="text-white text-lg">Gender</Text>
            <Text className="text-white">
              {personDetails?.gender == 1 ? "Female" : "Male"}
            </Text>
          </View>
          <View className="border-r-2 w-1/4 justify-center items-center">
            <Text className="text-white text-lg">Birthday</Text>
            {personDetails?.birthday ? (
              <Text className="text-white">
                {moment(personDetails?.birthday).format("DD-MM-YYYY")}
              </Text>
            ) : (
              <Text className="text-white">Not Found</Text>
            )}
          </View>
          <View className="border-r-2 w-1/4 justify-center items-center">
            <Text className="text-white text-lg">Know for</Text>
            <Text className="text-white">
              {personDetails?.known_for_department}
            </Text>
          </View>
          <View className=" w-1/4 justify-center items-center">
            <Text className="text-white text-lg">Popularity</Text>
            <Text className="text-white">
              {personDetails?.popularity?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View className="my-4">
          <Text className="text-white text-xl my-2">Biography</Text>

          <Text className="text-white text-lg text-center">
            {personDetails?.biography || "Biography Not found"}
          </Text>
        </View>
        <View>
          <MovieList Data={personMovieList} Title={"Movie"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Person;
