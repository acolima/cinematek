import { useContext } from "react";
import { MoviesContext } from "../contexts/userMoviesContext";

export default function useMovies() {
	const moviesContext = useContext(MoviesContext);

	if (!moviesContext) {
		throw new Error("useMovies must be used inside a MoviesContext Provider");
	}

	return moviesContext;
}
