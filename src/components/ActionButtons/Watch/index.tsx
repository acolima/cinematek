import { Button, List } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

import api from "../../../services/api";
import styles from "../styles";
import { IUserMovieActions, TMDBMovieResult } from "../../../utils/models";

interface Props {
	userMovie: IUserMovieActions | null;
	movie: TMDBMovieResult;
}

function WatchButtons({ userMovie, movie }: Props) {
	const [watched, setWatched] = useState(userMovie?.watched);
	const [watchlist, setWatchlist] = useState(userMovie?.watchlist);

	const { auth } = useAuth();

	useEffect(() => {}, [watched, watchlist]);

	const movieData = {
		tmdbId: movie.id,
		title: movie!.title,
		posterPath: movie!.poster_path,
		backdropPath: movie!.backdrop_path
	};

	async function handleWatchedClick() {
		if (watchlist) {
			await api.updateAction(auth?.token, "watchlist", false, movieData);
			setWatchlist(false);
		}

		await api.updateAction(auth?.token, "watched", !watched, movieData);
		setWatched(!watched);
	}

	async function handleWatchlistClick() {
		await api.updateAction(auth?.token, "watchlist", !watchlist, movieData);
		setWatchlist(!watchlist);
	}

	return (
		<List sx={styles.list}>
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
		</List>
	);
}

export default WatchButtons;
