import dayjs from "dayjs";

import { Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { useState } from "react";

import { MoviesResult } from "../../pages/SearchPage";

interface SearchResultProps {
	movie: MoviesResult;
	addedMovies: MoviesResult[];
	setAddedMovies: React.Dispatch<React.SetStateAction<MoviesResult[]>>;
}

function SearchedMoviesResult({
	movie,
	addedMovies,
	setAddedMovies
}: SearchResultProps) {
	const [addMovie, setAddMovie] = useState(true);

	function handleAddMovie(movie: MoviesResult) {
		const movies = [...addedMovies];
		movies.push(movie);
		setAddedMovies([...movies]);

		setAddMovie(false);
	}

	function handleRemoveMovie(movie: MoviesResult) {
		let movies = [...addedMovies];
		movies = movies.filter((m) => movie !== m);
		setAddedMovies([...movies]);

		setAddMovie(true);
	}

	return (
		<Box sx={styles.searchResultBox}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
				alt={movie.title}
				style={styles.moviePoster}
			/>
			<Box sx={{ flex: 1 }}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>
				<Typography sx={styles.movieReleaseDate}>
					Release date: {dayjs(movie.release_date).format("DD/MM/YYYY")}
				</Typography>
			</Box>

			{addMovie ? (
				<IconButton onClick={() => handleAddMovie(movie)}>
					<AddCircleIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => handleRemoveMovie(movie)}>
					<RemoveCircleIcon />
				</IconButton>
			)}
		</Box>
	);
}

const styles = {
	searchResultBox: {
		marginBottom: "3px",
		paddingRight: "5px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: "10px",
		border: "1px solid #0c174b",
		borderRadius: "15px"
	},
	moviePoster: {
		width: "40px",
		borderRadius: "15px 0 0 15px"
	},
	movieTitle: {
		fontFamily: "Poppins",
		fontSize: "16px",
		fontWeight: "bold",
		color: "#0c174b"
	},
	movieReleaseDate: {
		fontFamily: "Poppins",
		fontSize: "12px",
		color: "#0c174b"
	}
};

export default SearchedMoviesResult;
