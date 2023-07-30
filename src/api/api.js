import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "8660c74e6edc4eb13bb0b929fa2e6be9";


const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export const fetchData = (param) => {
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`)
}