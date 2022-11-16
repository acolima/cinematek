import { Box, Typography } from "@mui/material";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MenuBar from "../../components/Menu";
import MoviesList from "../../components/MoviesList";
import SearchIcon from "../../components/SearchIcon";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMenu from "../../hooks/useMenu";

import api from "../../services/api";
import { errorAlert } from "../../utils/toastifyAlerts";
import { tmdbApi } from "../../services/tmdbApi";
import { TMDBSearchResult } from "../../utils/models";

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
		setLoading(true);
		getMovies();
	}

	return (
		<Box sx={styles.page}>
			<Header
				page="search"
				movieName={movieName}
				setMovieName={setMovieName}
				handleSearch={handleSearch}
			/>
			{showMenu && <MenuBar />}

			{loading ? (
				<Loader />
			) : (
				<Box sx={styles.results}>
					{movies?.length === 0 && (
						<Typography sx={styles.resultsText}>No results found</Typography>
					)}

					{!movies && <SearchIcon />}

					{movies?.length !== 0 && movies && <MoviesList movies={movies} />}
				</Box>
			)}
		</Box>
	);
}

const styles = {
	page: {
		width: "60%",
		margin: "0 auto",
		"@media (max-width: 600px)": {
			margin: "0",
			width: "100%"
		}
	},
	results: {
		paddingTop: "70px"
	},
	resultsText: {
		paddingBottom: "10px",
		fontFamily: "Poppins",
		fontSize: "16px",
		width: "90%",
		margin: "0 auto"
	}
};

export default Search;
