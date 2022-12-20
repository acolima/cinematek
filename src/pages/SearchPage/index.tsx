import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Header,
	Loader,
	Menu,
	MoviesList,
	SearchPageIcon
} from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth, useMenu } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBSearchResult } from "../../utils/models";
import { MoviesContainer, Page } from "./styles";

function Search() {
	const [movieName, setMovieName] = useState("");
	const [movies, setMovies] = useState<TMDBSearchResult[] | null>(null);

	const [loading, setLoading] = useState(false);

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();

	let navigate = useNavigate();

	async function getMovies() {
		try {
			await api.validateToken(auth?.token);

			try {
				const { data } = await tmdbApi.findMoviesByName(movieName);
				setMovies(data.results);
			} catch (error) {
				errorAlert("External API error. Try again later");
			}
			setLoading(false);
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	function handleSearch() {
		if (movieName) {
			setLoading(true);
			getMovies();
		}
	}

	return (
		<Page>
			<Header
				page="search"
				movieName={movieName}
				setMovieName={setMovieName}
				handleSearch={handleSearch}
			/>

			{showMenu && <Menu />}

			{loading ? (
				<Loader />
			) : (
				<MoviesContainer>
					{movies?.length === 0 && (
						<SearchPageIcon message={"No results found"} />
					)}

					{!movies && <SearchPageIcon message={"Type the name of the movie"} />}

					{movies?.length !== 0 && movies && <MoviesList movies={movies} />}
				</MoviesContainer>
			)}
		</Page>
	);
}

export default Search;
