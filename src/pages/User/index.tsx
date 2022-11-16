import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/Menu";
import useAuth from "../../hooks/useAuth";
import useMenu from "../../hooks/useMenu";
import api from "../../services/api";
import { IMovie, IUserMovie } from "../../utils/models";
import {
	MovieContainer,
	MovieList,
	Page,
	UserAvatar,
	UserContainer
} from "./styles";

function User() {
	const { showMenu } = useMenu();
	const { auth } = useAuth();

	const [movies, setMovies] = useState<IUserMovie[]>([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getMovies();
		setLoading(true);
	}, [auth?.token]);

	async function getMovies() {
		try {
			const { data } = await api.getAllUserMovies(auth?.token);
			console.log(data);
			setMovies(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	if (loading) return <h1>loading</h1>;

	return (
		<Page>
			<Header username={auth?.username} />
			{showMenu && <MenuBar />}
			<UserContainer>
				<UserAvatar alt={auth?.username} src={auth?.pictureUrl} />
				<Box>
					{movies.length === 0 ? (
						<p>Nenhum filme adicionado</p>
					) : (
						<p>{movies.length} filmes adicionados</p>
					)}
				</Box>
			</UserContainer>
			<Typography>Favorite</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.favorite === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movie} />
					))}
			</MovieList>
			<Typography>Watched</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.watched === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movie} />
					))}
			</MovieList>
			<Typography>Watchlist</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.watchlist === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movie} />
					))}
			</MovieList>
		</Page>
	);
}

interface Props {
	movie: IMovie;
}

function Movie({ movie }: Props) {
	return (
		<MovieContainer>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
				alt={movie.title}
				width={100}
			/>
			<p>{movie.title}</p>
		</MovieContainer>
	);
}

export default User;
