import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

import api from "../../../services/api";
import styles from "../styles";
import { IUserMovieActions, TMDBMovieResult } from "../../../utils/models";

interface Props {
	userMovie: IUserMovieActions | null;
	movie: TMDBMovieResult;
}

function FavoriteButton({ userMovie, movie }: Props) {
	const [favorite, setFavorite] = useState(userMovie?.favorite);

	const { auth } = useAuth();

	useEffect(() => {}, [favorite]);

	async function handleFavoriteClick() {
		await api.updateAction(auth?.token, "favorite", !favorite, {
			tmdbId: movie.id,
			title: movie!.title,
			posterPath: movie!.poster_path,
			backdropPath: movie!.backdrop_path
		});
		setFavorite(!favorite);
	}
	return (
		<>
			{favorite ? (
				<Button sx={styles.favoriteButton} onClick={handleFavoriteClick}>
					<FavoriteIcon sx={styles.icons} />
				</Button>
			) : (
				<Button sx={styles.favoriteButton} onClick={handleFavoriteClick}>
					<FavoriteBorderOutlinedIcon sx={styles.icons} />
				</Button>
			)}
		</>
	);
}

export default FavoriteButton;
