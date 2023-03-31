import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Chip } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Favorite, Loader, Watch } from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth, useMovies } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBMovieResult } from "../../utils/models";
import {
	ArrowBackButton,
	BackdropDesktop,
	Buttons,
	FavoriteButton,
	Genres,
	MovieInfo,
	Overview,
	Page,
	Poster,
	Runtime,
	Title,
	styles
} from "./styles";

function Movie() {
	const [movie, setMovie] = useState<TMDBMovieResult | null>(null);
	const [favorite, setFavorite] = useState(false);
	const [watched, setWatched] = useState(false);
	const [watchlist, setWatchlist] = useState(false);

	const { auth, signOut } = useAuth();
	const { id } = useParams();
	const { movies } = useMovies();

	let navigate = useNavigate();

	let mobile = true;
	let posterWidth = 150;

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

	if (window.innerWidth > 600) {
		mobile = false;
		posterWidth = window.innerWidth > 900 ? 300 : 200;
	}

	if (!movie) return <Loader />;

	return (
		<Page>
			{mobile &&
				(movie.backdrop_path ? (
					<img
						src={`https://image.tmdb.org/t/p/w400/${movie?.backdrop_path}`}
						alt={movie.title}
						style={styles.backdrop}
					/>
				) : (
					<Box sx={styles.noBackdrop}></Box>
				))}

			{!mobile && (
				<BackdropDesktop
					backdropUrl={`https://image.tmdb.org/t/p/w400/${movie?.backdrop_path}`}
				></BackdropDesktop>
			)}

			<Poster>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
					alt={movie.title}
					width={posterWidth}
				/>
			</Poster>

			<>
				<ArrowBackButton onClick={() => navigate(-1)}>
					<ArrowBackOutlinedIcon sx={styles.icons} />
				</ArrowBackButton>

				<MovieInfo>
					<Title>{movie.title}</Title>

					<Genres>
						{movie.genres.map((genre) => (
							<Chip label={genre.name} color="primary" key={genre.id} />
						))}
					</Genres>

					<Overview>{movie.overview}</Overview>

					<Runtime>Duration: {movie.runtime} minutes</Runtime>

					<Buttons>
						<FavoriteButton>
							<Favorite movie={movie} isFavorite={favorite} />
						</FavoriteButton>
						<Watch movie={movie} wasWatched={watched} inWatchlist={watchlist} />
					</Buttons>
				</MovieInfo>
			</>
		</Page>
	);
}

export default Movie;
