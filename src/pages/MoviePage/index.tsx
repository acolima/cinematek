import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Chip, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { FavoriteButton, Loader, WatchButtons } from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth, useMovies } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBMovieResult } from "../../utils/models";
import styles from "./styles";

function Movie() {
	const [movie, setMovie] = useState<TMDBMovieResult | null>(null);
	const [favorite, setFavorite] = useState(false);
	const [watched, setWatched] = useState(false);
	const [watchlist, setWatchlist] = useState(false);

	const { auth, signOut } = useAuth();
	const { id } = useParams();
	const { movies } = useMovies();

	let navigate = useNavigate();

	useEffect(() => {
		getMovie();
		// eslint-disable-next-line
	}, []);

	async function getMovie() {
		try {
			await api.validateToken(auth?.token);
			moviesStatus();
			try {
				const { data } = await tmdbApi.getMovie(Number(id));
				setMovie(data);
			} catch (error) {
				errorAlert("External API error. Try again later");
			}
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	function moviesStatus() {
		const isFavorite = movies.find(
			(m) => m.movie.tmdbId === Number(id) && m.favorite
		);
		setFavorite(isFavorite ? true : false);

		const wasWatched = movies.find(
			(m) => m.movie.tmdbId === Number(id) && m.watched
		);
		setWatched(wasWatched ? true : false);

		const inWatchlist = movies.find(
			(m) => m.movie.tmdbId === Number(id) && m.watchlist
		);
		setWatchlist(inWatchlist ? true : false);
	}

	if (!movie) return <Loader />;

	return (
		<Box sx={styles.page}>
			{movie.backdrop_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.backdrop_path}`}
					alt={movie.title}
					style={styles.movieBackdrop}
				/>
			) : (
				<Box sx={styles.noBackdrop}></Box>
			)}
			<Box sx={styles.moviePoster}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
					alt={movie.title}
					width="150"
				/>
			</Box>

			<Button sx={styles.backButton} onClick={() => navigate(-1)}>
				<ArrowBackOutlinedIcon sx={styles.icons} />
			</Button>

			<FavoriteButton movie={movie} isFavorite={favorite} />

			<Box sx={styles.movieInfoBox}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>

				<Box sx={styles.movieGenres}>
					{movie.genres.map((genre) => (
						<Chip label={genre.name} color="primary" key={genre.id} />
					))}
				</Box>

				<Typography sx={styles.movieOverview}>{movie.overview}</Typography>

				<Typography sx={styles.movieRuntime}>
					Duration: {movie.runtime} minutes
				</Typography>

				<WatchButtons
					movie={movie}
					wasWatched={watched}
					inWatchlist={watchlist}
				/>
			</Box>
		</Box>
	);
}

export default Movie;
