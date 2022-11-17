import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	Section,
	SectionHeader,
	UserAvatar,
	UserContainer
} from "./styles";

function User() {
	const { showMenu } = useMenu();
	const { auth } = useAuth();

	const [movies, setMovies] = useState<IUserMovie[]>([]);
	const [favoriteMovies, setFavoriteMovies] = useState<IUserMovie[]>([]);
	const [watchedMovies, setWatchedMovies] = useState<IUserMovie[]>([]);
	const [watchlistMovies, setWatchlistMovies] = useState<IUserMovie[]>([]);

	const [loading, setLoading] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		getMovies();
		setLoading(true);
	}, [auth?.token]);

	async function getMovies() {
		try {
			const { data } = await api.getAllUserMovies(auth?.token);
			console.log(data);
			setFavoriteMovies(data.filter((movie: any) => movie.favorite));
			setWatchedMovies(data.filter((movie: any) => movie.watched));
			setWatchlistMovies(data.filter((movie: any) => movie.watchlist));
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
						<p>No added movies</p>
					) : (
						<p>{movies.length} added movies</p>
					)}
				</Box>
			</UserContainer>

			{favoriteMovies.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Favorite</Section>
						<span onClick={() => navigate("/user/favorite")}>See all</span>
					</SectionHeader>
					<MovieList>
						{favoriteMovies.slice(0, 4).map((m) => (
							<Movie key={m.id} movie={m.movie} />
						))}
					</MovieList>
				</>
			)}

			{watchedMovies.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Watched</Section>
						<span onClick={() => navigate("/user/watched")}>See all</span>
					</SectionHeader>
					<MovieList>
						{watchedMovies.slice(0, 4).map((m) => (
							<Movie key={m.id} movie={m.movie} />
						))}
					</MovieList>
				</>
			)}

			{watchlistMovies.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Watchlist</Section>
						<span onClick={() => navigate("/user/watchlist")}>See all</span>
					</SectionHeader>
					<MovieList>
						{watchlistMovies.slice(0, 4).map((m) => (
							<Movie key={m.id} movie={m.movie} />
						))}
					</MovieList>
				</>
			)}
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
