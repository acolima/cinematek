import { Box, Grid, Typography } from '@mui/material'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import MenuBar from '../../components/Menu'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'

import api from '../../services/api'
import styles from './styles'

interface MovieObject {
	tmdbId: number
	title: string
	posterPath: string
}

export interface UserMoviesResult {
	id: number
	movies: MovieObject
}

function UserPage() {
	const [movies, setMovies] = useState<UserMoviesResult[] | null>(null)
	const [loading, setLoading] = useState(true)

	const { category } = useParams()
	const { showMenu } = useMenu()
	const { auth } = useAuth()

	useEffect(() => {
		getUserMovies()
		setLoading(true)
		setMovies([])
		// eslint-disable-next-line
	}, [category])

	async function getUserMovies() {
		try {
			const { data } = await api.getUserMovies(auth?.token, category!)
			setMovies(data)
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Box sx={styles.page}>
			<Header page={category!} />

			{showMenu && <MenuBar />}

			{loading && <Loader />}

			{movies?.length === 0 && !loading && <NoMovies />}

			<Grid container sx={styles.gridContainer}>
				{movies?.map((movie) => (
					<Grid key={movie.id} item xs={6} md={4}>
						<Movie movie={movie.movies} />
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

interface Props {
	movie: MovieObject
}

function Movie({ movie }: Props) {
	let navigate = useNavigate()

	return (
		<Box
			sx={styles.movieBox}
			onClick={() => navigate(`/movies/${movie.tmdbId}`)}
		>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
				alt={movie.title}
				style={styles.moviePoster}
			/>
			<Typography sx={styles.movieTitle}>{movie.title}</Typography>
		</Box>
	)
}

function NoMovies() {
	return (
		<Typography sx={styles.emptyListText}>
			There is no movies in the list yet
		</Typography>
	)
}

export default UserPage
