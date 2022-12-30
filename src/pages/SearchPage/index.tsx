import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Header,
	Loader,
	Menu,
	SearchedMovies,
	SearchPageIcon
} from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth, useMenu } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBSearchResult } from "../../utils/models";
import { MoviesContainer, Page, Pagination } from "./styles";

function Search() {
	const [movieName, setMovieName] = useState("");
	const [movies, setMovies] = useState<TMDBSearchResult[] | null>(null);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [currentPage, setcurrentPage] = useState(1);

	const [loading, setLoading] = useState(false);

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();

	let navigate = useNavigate();

	async function getMovies(page: number) {
		setLoading(true);
		try {
			await api.validateToken(auth?.token);
			try {
				const { data } = await tmdbApi.findMoviesByName(movieName, page);
				setNumberOfPages(data.total_pages);
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
		setcurrentPage(1);
		if (movieName) {
			getMovies(1);
		}
	}

	const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setcurrentPage(value);
		getMovies(value);
		window.scrollTo(0, 0);
	};

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
				<>
					<MoviesContainer>
						{movies?.length === 0 && (
							<SearchPageIcon message={"No results found"} />
						)}

						{!movies && (
							<SearchPageIcon message={"Type the name of the movie"} />
						)}

						{movies?.length !== 0 && movies && (
							<SearchedMovies movies={movies} />
						)}
					</MoviesContainer>

					{movies && movies?.length !== 0 && (
						<Pagination
							count={numberOfPages}
							page={currentPage}
							onChange={changePage}
						/>
					)}
				</>
			)}
		</Page>
	);
}

export default Search;
