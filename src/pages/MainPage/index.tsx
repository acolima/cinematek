import {
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography
} from "@mui/material";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Menu from "../../components/Menu";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMenu from "../../hooks/useMenu";

import api from "../../services/api";
import { tmdbApi } from "../../services/tmdbApi";
import styles from "./styles";
import { errorAlert } from "../../utils/toastifyAlerts";
import { TMDBMoviesResult } from "../../utils/models";

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

	if (window.screen.width > 600) columns = 2;

	if (!movies)
		return (
			<Box sx={styles.flex}>
				<Header page="main" />
				<Loader />
			</Box>
		);

	return (
		<>
			<Header page="main" />
			{showMenu && <Menu />}
			<Box sx={styles.page}>
				<Typography sx={styles.title}>Trending</Typography>
				<ImageList cols={columns} sx={styles.imageList}>
					{movies.map((movie) => (
						<ImageListItem
							key={movie.id}
							sx={styles.imageListItem}
							onClick={() => navigate(`/movies/${movie.id}`)}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
								alt={movie.title}
							/>
							<ImageListItemBar title={movie.title} />
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</>
	);
}

export default MainPage;
