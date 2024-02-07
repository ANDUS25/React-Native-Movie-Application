import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchMovies, posterImage } from "../../api/MovieDB";
import Loading from "./Loading";
import LottieView from "lottie-react-native";

const path = "../../assets/Sorry.json";

const Search = () => {
  const [movieResult, setMovieResult] = useState([ ]);
  const { height, width } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();

  const searchInputMovie = (e) => {
    if (e && e.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: e,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) {
          setMovieResult(data.results);
        }
      });
    } else {
      setMovieResult([]);
    }
  };

  const MovieName = "Animal Park";
  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="m-4 ">
        <View className="bg-slate-400 flex flex-row rounded-3xl justify-between items-center">
          <TextInput
            onChangeText={(e) => searchInputMovie(e)}
            placeholder="Please Enter Your Movie Name"
            className=" p-3 text-white "
          />
          <TouchableOpacity
            className="rounded-full bg-gray-500 p-1 mr-2"
            onPress={() => navigation.goBack()}
          >
            <XMarkIcon size={34} color={"#000"} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loading />
        ) : movieResult.length > 0 ? (
          <View>
            <Text className="text-white text-lg my-4">{`Result(${movieResult.length})`}</Text>

            <View className="flex-row flex-wrap justify-between">
              {movieResult.map((item, index) => {
                return (
                  <TouchableOpacity key={index} className="bg-gray-800 p-2 m-1 rounded-2xl" onPress={()=>navigation.navigate("Movie", item)}>
                    <Image
                      source={{
                        uri: posterImage(item.poster_path),
                      }}
                      style={{ width: width * 0.4, height: height * 0.3 }}
                      resizeMode="center"
                    />
                    <Text className="text-white text-lg my-4">
                      {item?.original_title?.length > 15
                        ? `${item?.original_title?.slice(0,15)}...`
                        : item?.original_title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          
          </View>
        ) : (
          <View>
            <LottieView
              className="h-60 w-full"
              source={require(path)}
              autoPlay
              loop
            />
            <Text className="text-white text-2xl my-4 text-center">
              Sorry !!! No Result Found
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Search;
