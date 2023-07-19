import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Avatar, Box, Chip, Tooltip } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Favorite, Loader, Watch } from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { IPRoviders, IUserMovie, TMDBMovieResult } from "../../utils/models";
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
	Providers,
	Runtime,
	Title,
	styles
} from "./styles";

function Movie() {
	const [movie, setMovie] = useState<TMDBMovieResult | null>(null);
	const [userMovie, setUserMovie] = useState<IUserMovie | undefined>(undefined);

	const [providers, setProviders] = useState<IPRoviders[]>([]);

	const { auth, signOut } = useAuth();
	const { id } = useParams();

	let navigate = useNavigate();

	let mobile = true;
	let posterWidth = 150;

	useEffect(() => {
		getMovie();
		// eslint-disable-next-line
	}, []);

	async function getMovie() {
		try {
			const { data } = await api.findUserMovie(auth?.token, Number(id));
			setUserMovie(data);

			try {
				const { data: movieData } = await tmdbApi.getMovie(Number(id));
				const { data: movieProviders } = await tmdbApi.getMovieProviders(
					Number(id)
				);

				setMovie(movieData);
				setProviders(movieProviders.results.BR?.flatrate);
			} catch (error) {
				console.log(error);
				errorAlert("External API error. Try again later");
			}
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
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
					backdropUrl={`https://image.tmdb.org/t/p/w400${movie?.backdrop_path}`}
				></BackdropDesktop>
			)}

			<Poster>
				<img
					src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
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

					<Providers>
						{providers?.map((p) => (
							<Tooltip title={p.provider_name} key={p.provider_id}>
								<Avatar
									src={`https://image.tmdb.org/t/p/w400/${p.logo_path}`}
								/>
							</Tooltip>
						))}
					</Providers>

					<Overview>{movie.overview}</Overview>

					<Runtime>Duration: {movie.runtime} minutes</Runtime>

					<Buttons>
						<FavoriteButton>
							<Favorite movie={movie} userMovie={userMovie} />
						</FavoriteButton>
						<Watch movie={movie} userMovie={userMovie} />
					</Buttons>
				</MovieInfo>
			</>
		</Page>
	);
}

export default Movie;
