import { Box, Button, Chip, Typography } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import FavoriteButton from '../../components/ActionButtons/Favorite';
import Loader from '../../components/Loader';
import WatchButtons from '../../components/ActionButtons/Watch';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import api from '../../services/api';
import styles from './styles';
import { errorAlert } from '../../utils/toastifyAlerts';
import { tmdbApi } from '../../services/tmdbApi';
import { IUserMovieActions, TMDBMovieResult } from '../../utils/models';

function Movie() {
	const [movie, setMovie] = useState<TMDBMovieResult | null>(null);
	const [userMovie, setUserMovie] = useState<IUserMovieActions | null>(null);

	const { auth, signOut } = useAuth();
	const { id } = useParams();

	let navigate = useNavigate();

	useEffect(() => {
		getMovie();
		// eslint-disable-next-line
	}, []);

	async function getMovie() {
		try {
			const { data } = await api.findUserMovie(auth?.token, Number(id));
			setUserMovie(data);

			try {
				const { data } = await tmdbApi.getMovie(Number(id));
				setMovie(data);
			} catch (error) {
				errorAlert('External API error. Try again later');
			}
		} catch (error) {
			signOut();
			errorAlert('Session expired. Please, log in again');
			navigate('/');
		}
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

			<FavoriteButton movie={movie} userMovie={userMovie} />

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

				<WatchButtons movie={movie} userMovie={userMovie} />
			</Box>
		</Box>
	);
}

export default Movie;
