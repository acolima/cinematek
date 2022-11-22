import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import {
	BookmarkAdd,
	BookmarkAddOutlined,
	CheckCircle,
	CheckCircleOutline
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { api } from "../../../services/api";
import { useAuth, useMovies } from "../../../hooks";
import { TMDBMovieResult } from "../../../utils/models";

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
		<Buttons>
			{watched ? (
				<IconButton onClick={handleWatchedClick}>
					<CheckCircle fontSize="large" />
				</IconButton>
			) : (
				<IconButton onClick={handleWatchedClick}>
					<CheckCircleOutline fontSize="large" />
				</IconButton>
			)}

			{watchlist ? (
				<IconButton disabled={watched} onClick={handleWatchlistClick}>
					<BookmarkAdd fontSize="large" />
				</IconButton>
			) : (
				<IconButton disabled={watched} onClick={handleWatchlistClick}>
					<BookmarkAddOutlined fontSize="large" />
				</IconButton>
			)}
		</Buttons>
	);
}

const Buttons = styled(Box)({
	display: "flex",
	justifyContent: "space-evenly"
});

const IconButton = styled(Button)({
	cursor: "pointer",
	color: "#fff"
});

export default Watch;
