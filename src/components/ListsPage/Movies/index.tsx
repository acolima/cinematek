import { Box, Typography } from '@mui/material'
import { Movie } from '../../../pages/ListsPage'

import { useNavigate } from 'react-router-dom'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { UserMoviesResult } from '../../../pages/UserPage'

interface Props {
	movieData: Movie
	userWatchedMovies: UserMoviesResult[]
}

function Movies({ movieData, userWatchedMovies }: Props) {
	const movie = movieData.movies
	const watchedMoviesId = userWatchedMovies.map((movie) => movie.movies.tmdbId)

	let navigate = useNavigate()

	return (
		<Box sx={styles.container}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
				alt={movie.title}
				style={{ width: '50px' }}
			/>
			<Typography
				sx={styles.movieTitle}
				onClick={() => navigate(`/movies/${movie.tmdbId}`)}
			>
				{movie.title}
			</Typography>
			{watchedMoviesId.find((watchedMovie) => watchedMovie === movie.tmdbId) ? (
				<CheckCircleIcon />
			) : (
				<CheckCircleOutlineIcon />
			)}
		</Box>
	)
}

const styles = {
	container: {
		boxSizing: 'border-box',
		margin: '0 auto',
		padding: '10px',
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		justifyContent: 'space-between',
		border: '1px solid #282D47',
		marginTop: '15px',
		borderRadius: '5px'
	},
	movieTitle: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		fontSize: '13px',
		flex: 1,
		cursor: 'pointer'
	}
}

export default Movies
