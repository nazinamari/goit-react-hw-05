import axios from "axios";

const AUTH_TOKEN ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGZiMTQ0YjM0N2M3ZjIxOGMyNzU4NWI1M2QxNjRkNCIsInN1YiI6IjY1ZjMxNjZhZDY0YWMyMDE2NDVmOTdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lNZbZMB_HdUE2T5AfSnk6FUAekH3Nn3PcoASfB6C56k';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.params = {
    language: "en-US",
    time_window: "day",
    include_adult: false,
}

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchDataTrending = async () => {
    const url = 'trending/movie/day';
    const response = await axios.get(url);
    return response.data.results;
};

export const getMovieById = async (movieId) => {
    const url = `/movie/${movieId}?language=en-US`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchCast = async (movieId) => {
    const url = `/movie/${movieId}/credits?language=en-US`;
    const response = await axios.get(url);
    return response.data.cast;
};

export const fetchReviews = async (movieId) => {
    const url = `/movie/${movieId}/reviews`;
    const response = await axios.get(url);
    return response.data.results
};

export const getMoviesSearch = async (movieFilter) => {
    const url = `/search/movie?query=${movieFilter}&include_adult=false&language=en-US&page=1`;
    const response = await axios.get(url);
    return response.data.results;
};