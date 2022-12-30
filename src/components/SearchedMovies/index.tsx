import dayjs from "dayjs";

import { TMDBSearchResult } from "../../utils/models";
import {
	Button,
	MovieContainer,
	MovieInfos,
	ReleaseDate,
	Results,
	Title
} from "./styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Rating } from "@mui/material";

interface MoviesListProps {
	movies: TMDBSearchResult[];
}

function SearchedMovies({ movies }: MoviesListProps) {
	useEffect(() => {}, [movies]);
	return (
		<Results>
			{movies?.map((movie) => (
				<Movies movie={movie} key={movie.id} />
			))}
		</Results>
	);
}

interface Props {
	movie: TMDBSearchResult;
}

function Movies({ movie }: Props) {
	let navigate = useNavigate();

	return (
		<>
			<MovieContainer>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
					alt={movie?.title}
					width={100}
					style={{ borderRadius: "20px 0 0 20px" }}
				/>
				<MovieInfos>
					<Title>{movie.title}</Title>
					<ReleaseDate>
						Release date: {dayjs(movie.release_date).format("DD/MM/YYYY")}
					</ReleaseDate>
					<Rating readOnly value={movie.vote_average / 2} />

					<Button onClick={() => navigate(`/movies/${movie.id}`)}>
						See movie
					</Button>
				</MovieInfos>
			</MovieContainer>
		</>
	);
}

export default SearchedMovies;
