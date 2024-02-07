import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
  fetchDynamicMovieCredit,
  fetchDynamicMovieDetails,
  fetchDynamicSimilarMovie,
  posterImage,
} from "../../api/MovieDB";
import Cast from "./Cast";
import Loading from "./Loading";
import MovieList from "./MovieList";

const Movie = (Item) => {
  const navigation = useNavigation();

  const { height, width } = Dimensions.get("window");

  const [heart, setHeart] = useState(false);
  const [cast, setCast] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  const getMoviesDetails = async (id) => {
    const data = await fetchDynamicMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const getMovieCredit = async (id) => {
    const data = await fetchDynamicMovieCredit(id);
    if (data && data?.cast) {
      setCast(data?.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchDynamicSimilarMovie(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  useEffect(() => {
    getMoviesDetails(Item.route.params.id || Item.route.params.item.id);
    getMovieCredit(Item.route.params.id || Item.route.params.item.id);
    getSimilarMovies(Item.route.params.id || Item.route.params.item.id);
  }, [Item]);

  return (
    <ScrollView className="bg-gray-900 pb-7">
      <SafeAreaView className="z-50 absolute w-full flex flex-row justify-between items-center ">
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

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View>
            <Image
              source={{
                uri: posterImage(movie.poster_path),
              }}
              style={{ width, height: height * 0.55 }}
              resizeMode="cover"
            />
            {/* used this for dark show on image */}
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.5)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          <View
            style={{ position: "relative", bottom: 35 }}
            className="flex flex-row justify-center"
          >
            <Text className="text-white text-4xl justify-center">
              {movie.original_title}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-zinc-500 text-lg">
              {movie.status} • {movie?.release_date?.split("-")[0]} •{" "}
              {movie.runtime} min
            </Text>
            <Text className="mx-4 items-center text-zinc-500">
              {movie?.genres?.map((item, index) => {
                const showDot = index + 1 != movie.genres.length;
                return (
                  <Text key={index}>
                    {item.name} {showDot ? " • " : null}
                  </Text>
                );
              })}
            </Text>
          </View>
          <Text className="mx-4 text-justify text-sm text-slate-200 mt-3">
            {movie?.overview}
          </Text>

          <View className="mx-4">
            <Cast Data={cast} />

            <MovieList Title={"Similar Movies"} Data={similarMovies} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Movie;
