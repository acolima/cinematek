import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styled from "@emotion/styled";

import { api } from "../../../services/api";
import { useAuth } from "../../../hooks";
import { IUserMovie, TMDBMovieResult } from "../../../utils/models";

interface Props {
	movie: TMDBMovieResult;
	userMovie: IUserMovie | undefined;
}

function Favorite({ movie, userMovie }: Props) {
	const [favorite, setFavorite] = useState(userMovie?.favorite);

	const { auth } = useAuth();

	useEffect(() => {}, [favorite]);

	async function handleFavoriteClick() {
		try {
			await api.updateAction(auth?.token, "favorite", !favorite, {
				tmdbId: movie.id,
				title: movie!.title,
				posterPath: movie!.poster_path,
				backdropPath: movie!.backdrop_path
			});
			setFavorite(!favorite);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			{favorite ? (
				<IconButton onClick={handleFavoriteClick}>
					<FavoriteIcon fontSize="large" />
				</IconButton>
			) : (
				<IconButton onClick={handleFavoriteClick}>
					<FavoriteBorderOutlinedIcon fontSize="large" />
				</IconButton>
			)}
		</>
	);
}

const IconButton = styled(Button)({
	cursor: "pointer",
	color: "#fff"
});

export default Favorite;
