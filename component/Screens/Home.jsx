import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import {
  fetchPopularMovies,
  fetchTopRatedMovie,
  fetchTrendingMovies,
  fetchUpComingMovie,
} from "../../api/MovieDB";
import { auth } from "../../config/config";
import { Loading, MovieList, TrendingMovie } from "./";

const HomeScreen = () => {
  const [movieData, setMovieData] = useState();
  const [upComingMovie, setUpComingMovie] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [popularMovies, setPopularMovies] = useState()
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handleLogOut = async () => {
    await signOut(auth);
  };

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setMovieData(data.results);
    }
    setLoading(false);
  };

  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovie();
    if (data && data.results) {
      setUpComingMovie(data.results);
    }
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovie();
    if (data && data.results) {
      setTopRatedMovies(data.results);
    }
    setLoading(false);
  };

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if(data && data.results){
      setPopularMovies(data.results)
    }
  };

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <View className="flex-1 bg-gray-900">
        <View className="mx-4 my-5">
          <View className="flex flex-row justify-between mb-4 ">
            <Bars3CenterLeftIcon color={"#fff"} size={34} />
            <Text className="text-3xl text-white">
              <Text className="text-yellow-300 font-extrabold">M</Text>ovie
            </Text>
            <MagnifyingGlassIcon
              color={"#fff"}
              size={34}
              onPress={() => navigation.navigate("Search")}
            />
          </View>

          {loading ? (
            <Loading />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>{movieData && <TrendingMovie data={movieData} />}</View>

              <MovieList
                Title={"Upcoming"}
                hideSeeAll={true}
                Data={upComingMovie}
              />

              <MovieList
                Title={"Top Rated"}
                hideSeeAll={true}
                Data={topRatedMovies}
              />
              <MovieList
                Title={"Popular"}
                hideSeeAll={true}
                Data={popularMovies}
              />

              <TouchableOpacity onPress={handleLogOut}>
                <Text>LogOut </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
