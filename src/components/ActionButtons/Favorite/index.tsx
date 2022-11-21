import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { api } from "../../../services/api";
import { useAuth, useMovies } from "../../../hooks";
import { TMDBMovieResult } from "../../../utils/models";
import styles from "../styles";

interface Props {
	movie: TMDBMovieResult;
	isFavorite: boolean;
}

function Favorite({ movie, isFavorite }: Props) {
	const [favorite, setFavorite] = useState(isFavorite);

	const { auth } = useAuth();
	const { saveUserMovies } = useMovies();

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

		try {
			const { data } = await api.getAllUserMovies(auth?.token);
			saveUserMovies(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			{favorite ? (
				<Button onClick={handleFavoriteClick}>
					<FavoriteIcon sx={styles.icons} />
				</Button>
			) : (
				<Button onClick={handleFavoriteClick}>
					<FavoriteBorderOutlinedIcon sx={styles.icons} />
				</Button>
			)}
		</>
	);
}

export default Favorite;
