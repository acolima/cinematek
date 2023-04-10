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
import { useAuth } from "../../../hooks";
import { IUserMovie, TMDBMovieResult } from "../../../utils/models";

interface Props {
	movie: TMDBMovieResult;
	userMovie: IUserMovie | undefined;
}

function Watch({ movie, userMovie }: Props) {
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
	}

	async function handleWatchlistClick() {
		try {
			await api.updateAction(auth?.token, "watchlist", !watchlist, movieData);
			setWatchlist(!watchlist);
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
				<IconButton onClick={handleWatchlistClick}>
					<BookmarkAdd fontSize="large" />
				</IconButton>
			) : (
				<IconButton disabled={watched} onClick={handleWatchlistClick}>
					<BookmarkAddOutlined fontSize="large" htmlColor="white" />
				</IconButton>
			)}
		</Buttons>
	);
}

const Buttons = styled(Box)({
	width: "40%",
	display: "flex",
	justifyContent: "space-between"
});

const IconButton = styled(Button)({
	cursor: "pointer",
	color: "#fff"
});

export default Watch;
