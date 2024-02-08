import axios from "axios";
import { API_KEY } from "@env";

// Base URL's
const apiBaseURL = "https://api.themoviedb.org/3";
const baseImageUrl = "https://image.tmdb.org/t/p/w500";

// URL for unknown person poster.
export const UnknownPersonPoster = "https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg"

// Common Movie fetching functions.
const trendingMovieEndPoint = `${apiBaseURL}/trending/movie/day?api_key=${API_KEY}`;
const upComingMovieEndPoint = `${apiBaseURL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovieEndPoint = `${apiBaseURL}/movie/top_rated?api_key=${API_KEY}`;
const popularMoviesEndPoint = `${apiBaseURL}/movie/popular?api_key=${API_KEY}`


// Person All functions.
const personAllDetails = (id)=>{
  return `${apiBaseURL}/person/${id}?api_key=${API_KEY}`
}
const personSimilarMovies = (id)=>{
  return `${apiBaseURL}/person/${id}/movie_credits?api_key=${API_KEY}`
}

// Search movie 
const searchMovie = `${apiBaseURL}/search/movie?api_key=${API_KEY}`


// Dynamic movie fetching by ID
const dynamicMovieDetails = (id) => {
  return `${apiBaseURL}/movie/${id}?api_key=${API_KEY}`;
};

const dynamicMovieCredit = (id) => {
  return `${apiBaseURL}/movie/${id}/credits?api_key=${API_KEY}`;
};

const dynamicSimilarMovie = (id) => {
  return `${apiBaseURL}/movie/${id}/similar?api_key=${API_KEY}`;
};




// Image fetching function. 
export const posterImage = (baseUrl) => {
  return `${baseImageUrl}${baseUrl}`;
};



// all in one movie fetching function.
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.log(e);
    return {};
  }
};



// Movies fetching functions.
export const fetchTrendingMovies = () => {
  return apiCall(trendingMovieEndPoint);
};

export const fetchUpComingMovie = () => {
  return apiCall(upComingMovieEndPoint);
};

export const fetchTopRatedMovie = () => {
  return apiCall(topRatedMovieEndPoint);
};

export const fetchPopularMovies = () =>{
  return apiCall(popularMoviesEndPoint)
}


// Dynamic movies fetching function.
export const fetchDynamicMovieDetails = (id) => {
  return apiCall(dynamicMovieDetails(id));
};

export const fetchDynamicMovieCredit = (id) => {
  return apiCall(dynamicMovieCredit(id));
};

export const fetchDynamicSimilarMovie = (id) => {
  return apiCall(dynamicSimilarMovie(id));
};



// function for person movies and it's details.

export const fetchPersonAllDetails = (id)=>{
  return apiCall(personAllDetails(id))
}

export const fetchPersonAllSimilarMovies = (id)=>{
  return apiCall(personSimilarMovies(id))
}


// function for search movie based on input text
export const fetchSearchMovies = (params)=>{
  return apiCall(searchMovie,params)
}