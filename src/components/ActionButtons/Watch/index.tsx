import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { api } from "../../../services/api";
import { useAuth, useMovies } from "../../../hooks";
import { TMDBMovieResult } from "../../../utils/models";
import styles from "../styles";

interface Props {
	movie: TMDBMovieResult;
	wasWatched: boolean;
	inWatchlist: boolean;
}

function Watch({ movie, wasWatched, inWatchlist }: Props) {
	const [watched, setWatched] = useState(wasWatched);
	const [watchlist, setWatchlist] = useState(inWatchlist);

	const { auth } = useAuth();
	const { saveUserMovies } = useMovies();

	useEffect(() => {}, [watched, watchlist]);

	const movieData = {
		tmdbId: movie.id,
		title: movie!.title,
		posterPath: movie!.poster_path,
		backdropPath: movie!.backdrop_path
	};

	async function handleWatchedClick() {
		try {
			if (watchlist) {
				await api.updateAction(auth?.token, "watchlist", false, movieData);
				setWatchlist(false);
			}

			await api.updateAction(auth?.token, "watched", !watched, movieData);
			setWatched(!watched);
		} catch (error) {
			console.log(error);
		}
		updateLocalMovies();
	}

	async function handleWatchlistClick() {
		try {
			await api.updateAction(auth?.token, "watchlist", !watchlist, movieData);
			setWatchlist(!watchlist);
		} catch (error) {
			console.log(error);
		}
		updateLocalMovies();
	}

	async function updateLocalMovies() {
		try {
			const { data } = await api.getAllUserMovies(auth?.token);
			saveUserMovies(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Box sx={styles.buttons}>
			{watched ? (
				<Button onClick={handleWatchedClick}>
					<CheckCircleIcon sx={styles.icons} />
				</Button>
			) : (
				<Button onClick={handleWatchedClick}>
					<CheckCircleOutlineIcon sx={styles.icons} />
				</Button>
			)}

			{watchlist ? (
				<Button disabled={watched} onClick={handleWatchlistClick}>
					<BookmarkAddIcon sx={styles.icons} />
				</Button>
			) : (
				<Button disabled={watched} onClick={handleWatchlistClick}>
					<BookmarkAddOutlinedIcon sx={styles.icons} />
				</Button>
			)}
		</Box>
	);
}

export default Watch;
