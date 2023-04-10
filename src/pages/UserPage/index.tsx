import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Loader, Menu } from "../../components";

import { api } from "../../services";
import { useAuth, useMenu } from "../../hooks";
import { IMovie, IUserMovies } from "../../utils/models";
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

function UserPage() {
	const [userMovies, setUserMovies] = useState<IUserMovies>();

	const [loading, setLoading] = useState(false);

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();

	let navigate = useNavigate();

	useEffect(() => {
		getMovies();
		setLoading(true);
	}, [auth?.token]);

	async function getMovies() {
		try {
			const { data } = await api.getAllUserMovies(auth?.token);
			setUserMovies(data);
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
			</UserContainer>

			{userMovies?.favorite.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Favorite</Section>
						<span onClick={() => navigate("/user/favorite")}>See all</span>
					</SectionHeader>
					<MovieList>
						{userMovies?.favorite.slice(0, 4).map((m) => (
							<Movie key={m.tmdbId} movie={m} />
						))}
					</MovieList>
				</>
			)}

			{userMovies?.watched.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Watched</Section>
						<span onClick={() => navigate("/user/watched")}>See all</span>
					</SectionHeader>
					<MovieList>
						{userMovies?.watched.slice(0, 4).map((m) => (
							<Movie key={m.tmdbId} movie={m} />
						))}
					</MovieList>
				</>
			)}

			{userMovies?.watchlist.length !== 0 && (
				<>
					<SectionHeader>
						<Section>Watchlist</Section>
						<span onClick={() => navigate("/user/watchlist")}>See all</span>
					</SectionHeader>
					<MovieList>
						{userMovies?.watchlist.slice(0, 4).map((m) => (
							<Movie key={m.tmdbId} movie={m} />
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

export default UserPage;
