import axios from 'axios';

const TMDB_URL = import.meta.env.VITE_TMDB_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function getTrendingMovies() {
	return axios.get(`${TMDB_URL}/trending/movie/week?api_key=${API_KEY}`);
}

function getMovie(movieId: number) {
	return axios.get(`${TMDB_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

function findMoviesByName(name: string) {
	return axios.get(
		`${TMDB_URL}/search/movie?api_key=${API_KEY}&query=${name}&include_adult=false`
	);
}

export const tmdbApi = {
	findMoviesByName,
	getMovie,
	getTrendingMovies,
};
