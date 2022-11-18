import axios from "axios";
import { IMovie, INewList, IUserData } from "../utils/models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseAPI = axios.create({
	baseURL: BASE_URL
});

function createConfig(token: string | undefined) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

async function signUp(body: IUserData) {
	await baseAPI.post("/users/register", body);
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

function getLists(token: string | undefined) {
	const config = createConfig(token);
	return baseAPI.get("/users/lists", config);
}

function createList(token: string | undefined, list: INewList) {
	const config = createConfig(token);
	return baseAPI.post("/users/lists/create", list, config);
}

function deleteList(token: string | undefined, listId: number) {
	const config = createConfig(token);
	return baseAPI.delete(`/users/lists/${listId}/delete`, config);
}

export const api = {
	createList,
	deleteList,
	findUserMovie,
	getAllUserMovies,
	getLists,
	getUserMovies,
	signIn,
	signUp,
	updateAction,
	validateToken
};
