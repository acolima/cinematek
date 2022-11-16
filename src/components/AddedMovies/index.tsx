import dayjs from "dayjs";

import { Box, Typography } from "@mui/material";

import { TMDBSearchResult } from "../../utils/models";

interface AddedMoviesProps {
	movie: TMDBSearchResult;
}

function AddedMovies({ movie }: AddedMoviesProps) {
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

export default AddedMovies;
