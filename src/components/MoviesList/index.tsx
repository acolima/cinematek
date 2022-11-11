import { Box, Typography } from "@mui/material";

import MovieSearchResult from "../MovieSearchResult";
import { MoviesResult } from "../../pages/SearchPage";

interface MoviesListProps {
	movies: MoviesResult[];
}

function MoviesList({ movies }: MoviesListProps) {
	return (
		<>
			<Typography sx={styles.results}>
				Search results({movies?.length})
			</Typography>

			<Box sx={styles.moviesList}>
				{movies?.map((movie) => (
					<MovieSearchResult movie={movie} key={movie.id} />
				))}
			</Box>
		</>
	);
}

const styles = {
	results: {
		paddingBottom: "10px",
		fontFamily: "Poppins",
		fontSize: "16px",
		width: "90%",
		margin: "0 auto"
	},
	moviesList: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		width: "90%",
		margin: "0 auto"
	}
};

export default MoviesList;
