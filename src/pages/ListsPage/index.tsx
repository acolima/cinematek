import { Box, IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Header from '../../components/Header'
import Lists from '../../components/ListsPage/Lists'
import Loader from '../../components/Loader'
import MenuBar from '../../components/Menu'
import useMenu from '../../hooks/useMenu'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import api from '../../services/api'
import styles from './styles'
import { errorAlert } from '../../utils/toastifyAlerts'
import { UserMoviesResult } from '../UserPage'

export interface Movie {
	movies: {
		tmdbId: number
		title: string
		posterPath: string
	}
}

export interface ListResult {
	id: number
	name: string
	listMovies: Movie[]
}

function ListPage() {
	const [lists, setLists] = useState<ListResult[]>([])
	const [userWatchedMovies, setUserWatchedMovies] = useState<
		UserMoviesResult[]
	>([])

	const [loading, setLoading] = useState(true)
	const [reloadLists, setReloadLists] = useState(false)

	const { auth, signOut } = useAuth()
	const { showMenu } = useMenu()

	let navigate = useNavigate()

	useEffect(() => {
		api
			.getLists(auth?.token)
			.then((response) => {
				setLists(response.data)
				setLoading(false)
			})
			.catch(() => {
				signOut()
				errorAlert('Session expired. Please, log in again')
				navigate('/')
			})

		api
			.getUserMovies(auth?.token, 'watched')
			.then((response) => {
				setUserWatchedMovies(response.data)
			})
			.catch(() => {
				signOut()
				errorAlert('Session expired. Please, log in again')
				navigate('/')
			})

		// eslint-disable-next-line
	}, [auth, reloadLists])

	return (
		<Box sx={styles.page}>
			<Header page='Lists' />

			{showMenu && <MenuBar />}

			<Box sx={styles.lists}>
				<IconButton
					sx={styles.iconButton}
					onClick={() => navigate('/create-list')}
				>
					<AddCircleIcon sx={styles.icons} />
				</IconButton>

				{loading && <Loader />}

				{lists?.length === 0 && !loading && <NoLists />}

				{lists.map((list) => (
					<Lists
						key={list.id}
						list={list}
						userWatchedMovies={userWatchedMovies}
						reloadLists={reloadLists}
						setReloadLists={setReloadLists}
						setLoading={setLoading}
						setLists={setLists}
					/>
				))}
			</Box>
		</Box>
	)
}

function NoLists() {
	return (
		<Typography sx={styles.emptyListText}>Create your first list!</Typography>
	)
}

export default ListPage
