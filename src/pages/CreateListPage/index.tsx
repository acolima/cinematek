import {
	Box,
	Button,
	ButtonGroup,
	Container,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import AddedMovies from "../../components/AddedMovies";
import SearchedMoviesResult from "../../components/SearchedMovies";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import api from "../../services/api";
import { tmdbApi } from "../../services/tmdbApi";
import styles from "./styles";
import { MoviesResult } from "../SearchPage";
import { errorAlert, successAlert } from "../../utils/toastifyAlerts";

function CreateList() {
	const [movieName, setMovieName] = useState("");
	const [listName, setListName] = useState("");
	const [movies, setMovies] = useState<MoviesResult[] | null>(null);
	const [addedMovies, setAddedMovies] = useState<MoviesResult[]>([]);

	const [clearSearch, setClearSearch] = useState(false);

	const { auth, signOut } = useAuth();
	let navigate = useNavigate();

	useEffect(() => {
		if (!movieName) {
			setMovies([]);
			setClearSearch(false);
		}
		// eslint-disable-next-line
	}, [clearSearch]);

	async function getMovies(name: string) {
		setMovieName(name);

		try {
			const { data } = await tmdbApi.findMoviesByName(name);
			setMovies(data.results);
		} catch (error) {
			console.log("External API error");
		}
	}

	async function handleNewList() {
		if (!listName) {
			alert("List name can't be empty");
			return;
		}

		const movies = addedMovies.map((movie) => {
			return {
				tmdbId: movie.id,
				title: movie.title,
				posterPath: movie.poster_path
			};
		});

		try {
			await api.createList(auth?.token, {
				name: listName,
				movies: movies
			});
			successAlert("List created!");
			navigate("/lists");
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	function clearInput() {
		setMovieName("");
		setClearSearch(true);
	}

	return (
		<Container sx={styles.page}>
			<Typography sx={styles.pageTitle}>New List</Typography>
			<Box sx={styles.box}>
				<OutlinedInput
					placeholder="List name"
					sx={styles.listNameInput}
					onChange={(e) => setListName(e.target.value)}
					value={listName}
					required={true}
				/>

				<OutlinedInput
					placeholder="Start typing the movie name"
					onChange={(e) => getMovies(e.target.value)}
					value={movieName}
					sx={styles.searchMovieNameInput}
					endAdornment={
						<InputAdornment position="end">
							<IconButton edge="end" onClick={clearInput}>
								<ClearIcon />
							</IconButton>
						</InputAdornment>
					}
				/>

				<Box sx={styles.resultsBox}>
					{movies?.map((movie) => (
						<SearchedMoviesResult
							key={movie.id}
							movie={movie}
							setAddedMovies={setAddedMovies}
							addedMovies={addedMovies}
						/>
					))}
				</Box>

				<Box sx={styles.addedMoviesBox}>
					{addedMovies?.map((movie) => (
						<AddedMovies key={movie.id} movie={movie} />
					))}
				</Box>

				<ButtonGroup sx={styles.buttonsGroup}>
					<Button variant="text" onClick={() => navigate("/lists")}>
						Cancel
					</Button>
					<Button
						disabled={addedMovies.length === 0}
						variant="contained"
						sx={{ backgroundColor: "#0c174b" }}
						onClick={handleNewList}
					>
						Save
					</Button>
				</ButtonGroup>
			</Box>
		</Container>
	);
}

export default CreateList;
