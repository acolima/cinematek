import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { Header, Loader, Menu } from "../../components";

import { api } from "../../services";
import { useAuth, useMenu, useMovies } from "../../hooks";
import { IMovie, IUserMovie } from "../../utils/models";
import { errorAlert } from "../../utils/toastifyAlerts";
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
	const [loading, setLoading] = useState(false);
	const [favoriteMovies, setFavoriteMovies] = useState<IUserMovie[]>([]);
	const [watchedMovies, setWatchedMovies] = useState<IUserMovie[]>([]);
	const [watchlistMovies, setWatchlistMovies] = useState<IUserMovie[]>([]);

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();
	const { movies } = useMovies();

	let navigate = useNavigate();

	useEffect(() => {
		getMovies();
		setLoading(true);
	}, [auth?.token]);

	async function getMovies() {
		try {
			await api.validateToken(auth?.token);

			setFavoriteMovies(movies.filter((movie: any) => movie.favorite));
			setWatchedMovies(movies.filter((movie: any) => movie.watched));
			setWatchlistMovies(movies.filter((movie: any) => movie.watchlist));

			setLoading(false);
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	if (loading)
		return (
			<Page>
				<Header username={auth?.username} />
				<Loader />
			</Page>
		);

	return (
		<Page>
			<Header username={auth?.username} />
			{showMenu && <Menu />}
			<UserContainer>
				<UserAvatar alt={auth?.username} src={auth?.pictureUrl} />
				<Box>
					{movies?.length === 0 ? (
						<p>No added movies</p>
					) : (
						<p>{movies?.length} added movies</p>
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
