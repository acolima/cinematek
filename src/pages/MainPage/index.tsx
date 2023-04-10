import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageListItem, ImageListItemBar } from "@mui/material";

import { Header, Loader, Menu } from "../../components";

import { api, tmdbApi } from "../../services";
import { useAuth, useMenu } from "../../hooks";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBMoviesResult } from "../../utils/models";
import { Page, PageTitle, TrendingMovies } from "./styles";

function MainPage() {
	const [movies, setMovies] = useState<TMDBMoviesResult[] | null>(null);

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();

	let navigate = useNavigate();
	let columns = 1;

	useEffect(() => {
		getMovies();
		// eslint-disable-next-line
	}, []);

	async function getMovies() {
		try {
			await api.validateToken(auth?.token);

			try {
				const { data } = await tmdbApi.getTrendingMovies();
				setMovies(data.results);
			} catch (error: any) {
				console.log("External API error");
			}
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	if (window.innerWidth > 600) columns = 2;
	if (window.innerWidth > 900) columns = 4;

	return (
		<Page>
			<Header page="main" />

			{showMenu && <Menu />}

			{!movies && <Loader />}

			{movies && (
				<TrendingMovies cols={columns}>
					<ImageListItem key="Subheader" cols={columns}>
						<PageTitle>Trending</PageTitle>
					</ImageListItem>
					{movies?.map((movie) => (
						<ImageListItem
							key={movie.id}
							sx={{ cursor: "pointer" }}
							onClick={() => navigate(`/movies/${movie.id}`)}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
								alt={movie.title}
							/>
							<ImageListItemBar title={movie.title} />
						</ImageListItem>
					))}
				</TrendingMovies>
			)}
		</Page>
	);
}

export default MainPage;
