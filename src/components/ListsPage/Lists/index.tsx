import {
	Box,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogTitle,
	Typography
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import Movies from '../Movies'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

import api from '../../../services/api'
import { errorAlert } from '../../../utils/toastifyAlerts'
import { ListResult } from '../../../pages/ListsPage'
import { UserMoviesResult } from '../../../pages/UserPage'

interface ListsProps {
	list: ListResult
	userWatchedMovies: UserMoviesResult[]
	reloadLists: boolean
	setReloadLists: React.Dispatch<React.SetStateAction<boolean>>
	setLists: React.Dispatch<React.SetStateAction<ListResult[]>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Lists({
	list,
	userWatchedMovies,
	reloadLists,
	setReloadLists,
	setLists,
	setLoading
}: ListsProps) {
	const listCover = list.listMovies[0].movies.posterPath
	const [showDialog, setShowDialog] = useState(false)
	const [open, setOpen] = useState(false)
	const { auth, signOut } = useAuth()

	let navigate = useNavigate()

	async function handleDeleteList() {
		try {
			await api.deleteList(auth?.token, list.id)
			setLoading(true)
			setLists([])
			setReloadLists(!reloadLists)
		} catch {
			signOut()
			errorAlert('Session expired. Please, log in again')
			navigate('/')
		}
	}

	return (
		<Box sx={styles.container}>
			<Box sx={styles.listHeader} onClick={() => setOpen(!open)}>
				<img
					alt={list.name}
					width='80'
					src={`https://image.tmdb.org/t/p/w400${listCover}`}
				/>
				<Typography sx={styles.listName}>{list.name}</Typography>
				{open ? <ExpandLess /> : <ExpandMore />}
			</Box>

			<Collapse in={open}>
				{list.listMovies?.map((movie) => (
					<Movies
						key={movie.movies.tmdbId}
						movieData={movie}
						userWatchedMovies={userWatchedMovies}
					/>
				))}

				<Button sx={styles.deleteButton} onClick={() => setShowDialog(true)}>
					Delete list
				</Button>

				<Dialog open={showDialog}>
					<DialogTitle fontSize={'16px'}>Are you sure?</DialogTitle>
					<DialogActions>
						<Button
							sx={styles.dialogButton}
							onClick={() => setShowDialog(false)}
						>
							No, I'm not
						</Button>
						<Button sx={styles.dialogButton} onClick={handleDeleteList}>
							Yes, I am
						</Button>
					</DialogActions>
				</Dialog>
			</Collapse>
		</Box>
	)
}

const styles = {
	container: {
		width: '90%',
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		color: '#282D47',
		padding: '15px'
	},
	listHeader: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		cursor: 'pointer'
	},
	listName: {
		flex: '1',
		fontFamily: 'Poppins',
		fontSize: '18px'
	},
	deleteButton: {
		width: '100%',
		fontFamily: 'Poppins',
		fontSize: '14px'
	},
	dialogButton: { fontSize: '0.9em' }
}

export default Lists
