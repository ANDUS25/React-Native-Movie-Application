import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { posterImage } from "../../api/MovieDB";

const TrendingMovie = ({ data }) => {

  const { width } = Dimensions.get("window");
  
  const Navigation = useNavigation();
  
  const handleClick = (Item) => {
    Navigation.navigate("Movie", Item);
  };

  return (
    <View>
      <Carousel
        data={data}
        renderItem={(item) => (
          <MovieCard Item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemHeight={500}
        itemWidth={width * 0.6}
        sliderStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ Item, handleClick }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <View>
      <TouchableOpacity onPress={() => handleClick(Item)}>
        <Image
          source={{
            uri: posterImage(Item?.item?.poster_path),
          }}
          className="rounded-3xl"
          style={{
            width: width * 0.6,
            height: height * 0.4,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrendingMovie;
