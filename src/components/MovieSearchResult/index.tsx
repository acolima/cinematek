import dayjs from "dayjs";

import { Box, Button, Rating, Typography } from "@mui/material";
import { MoviesResult } from "../../pages/SearchPage";

import styles from "./styles";
import { useNavigate } from "react-router-dom";

interface Props {
	movie: MoviesResult;
}

function MovieSearchResult({ movie }: Props) {
	let navigate = useNavigate();

	return (
		<>
			<Box sx={styles.movieBox}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
					alt={movie?.title}
					style={styles.poster}
				/>
				<Box sx={styles.infos}>
					<Typography sx={styles.movieTitle}>{movie.title}</Typography>
					<Typography sx={styles.movieReleaseDate}>
						Release date: {dayjs(movie.release_date).format("DD/MM/YYYY")}
					</Typography>
					<Rating readOnly value={movie.vote_average / 2} />

					<Button
						sx={styles.button}
						onClick={() => navigate(`/movies/${movie.id}`)}
					>
						See movie
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default MovieSearchResult;
