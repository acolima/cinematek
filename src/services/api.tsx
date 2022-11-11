import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_URL = import.meta.env.VITE_TMDB_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function createConfig(token: string | undefined) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

interface UserData {
	username: string;
	password: string;
	pictureUrl: string;
}

interface MovieData {
	tmdbId: number;
	title: string | undefined;
	posterPath: string | undefined;
}

interface NewList {
	name: string;
	movies: MovieData[];
}

function signUp(body: UserData) {
	return axios.post(`${BASE_URL}/users/register`, body);
}

function signIn(body: Omit<UserData, 'pictureUrl'>) {
	return axios.post(`${BASE_URL}/sign-in`, body);
}

function validateToken(token: string | undefined) {
	const config = createConfig(token);

	return axios.post(`${BASE_URL}/token`, {}, config);
}

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

function findUserMovie(token: string | undefined, id: number) {
	const config = createConfig(token);

	return axios.get(`${BASE_URL}/users/movies/${id}`, config);
}

function getUserMovies(token: string | undefined, filter: string) {
	const config = createConfig(token);

	return axios.get(`${BASE_URL}/users/movies/list/${filter}`, config);
}

function updateAction(
	token: string | undefined,
	action: string,
	status: boolean,
	movieData: MovieData
) {
	const config = createConfig(token);

	return axios.post(
		`${BASE_URL}/movies/${action}/${status}`,
		movieData,
		config
	);
}

function getLists(token: string | undefined) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/users/lists`, config);
}

function createList(token: string | undefined, list: NewList) {
	const config = createConfig(token);
	return axios.post(`${BASE_URL}/users/lists/create`, list, config);
}

function deleteList(token: string | undefined, listId: number) {
	const config = createConfig(token);
	return axios.delete(`${BASE_URL}/users/lists/${listId}/delete`, config);
}

const api = {
	createList,
	deleteList,
	findMoviesByName,
	findUserMovie,
	getLists,
	getMovie,
	getTrendingMovies,
	getUserMovies,
	signIn,
	signUp,
	updateAction,
	validateToken,
};

export default api;
