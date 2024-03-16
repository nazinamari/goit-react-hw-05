import axios from "axios";

const AUTH_TOKEN ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGZiMTQ0YjM0N2M3ZjIxOGMyNzU4NWI1M2QxNjRkNCIsInN1YiI6IjY1ZjMxNjZhZDY0YWMyMDE2NDVmOTdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lNZbZMB_HdUE2T5AfSnk6FUAekH3Nn3PcoASfB6C56k';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.params = {
    language: "en-US",
    time_window: "day",
}

export const fetchData = async () => {
    const url = 'trending/movie/day?';
    const response = await axios.get(url);
    return response.data;
};

export const getMoviesSearch = async (searchFilm) => { 
    const url = `/search/movie?query=${searchFilm}&include_adult=false&language=en-US&page=1`; 
    const response = await axios.get(url);
    return response.data.results;
};