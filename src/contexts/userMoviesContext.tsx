import { createContext, useState } from "react";
import { IUserMovie } from "../utils/models";

interface IMoviesContext {
	movies: IUserMovie[];
	saveUserMovies: (data: any) => void;
}
export const MoviesContext = createContext<IMoviesContext | null>(null);

interface Props {
	children: React.ReactNode;
}

export function MoviesProvider({ children }: Props) {
	const persistedMovies: IUserMovie[] = JSON.parse(
		localStorage.getItem("movies")!
	);
	const [movies, setMovies] = useState<IUserMovie[]>(persistedMovies);

	function saveUserMovies(data: any) {
		setMovies(data);
		localStorage.setItem("movies", JSON.stringify(data));
	}

	return (
		<MoviesContext.Provider
			value={{
				movies,
				saveUserMovies
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
}
