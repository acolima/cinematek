import axios from "axios";
import { IMovie, IUserData } from "../utils/models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseAPI = axios.create({
	baseURL: BASE_URL
});

function createConfig(token: string | undefined) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

async function signUp(body: IUserData, pictureFile: File) {
	const formData = new FormData();

	formData.append("file", pictureFile);
	formData.append("data", JSON.stringify(body));

	await baseAPI.post("/users/register", formData, {
		responseType: "text"
	});
}

function signIn(body: Omit<IUserData, "pictureUrl">) {
	return baseAPI.post("/sign-in", body);
}

function validateToken(token: string | undefined) {
	const config = createConfig(token);

	return baseAPI.post("/token", {}, config);
}

async function findUserMovie(token: string | undefined, id: number) {
	const config = createConfig(token);

	return baseAPI.get(`/users/movies/${id}`, config);
}

function getAllUserMovies(token: string | undefined) {
	const config = createConfig(token);

	return baseAPI.get(`/users/movies`, config);
}

function getUserMovies(token: string | undefined, filter: string) {
	const config = createConfig(token);

	return baseAPI.get(`/users/movies/list/${filter}`, config);
}

function updateAction(
	token: string | undefined,
	action: string,
	status: boolean,
	movieData: IMovie
) {
	const config = createConfig(token);

	return baseAPI.post(`/movies/${action}/${status}`, movieData, config);
}

export const api = {
	findUserMovie,
	getAllUserMovies,
	getUserMovies,
	signIn,
	signUp,
	updateAction,
	validateToken
};
