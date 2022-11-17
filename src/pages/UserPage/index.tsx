import {
	Box,
	Collapse,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography
} from "@mui/material";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MenuBar from "../../components/Menu";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMenu from "../../hooks/useMenu";

import api from "../../services/api";
import styles from "./styles";
import { IMovie, UserMovie } from "../../utils/models";

function UserPage() {
	const [movies, setMovies] = useState<UserMovie[] | null>(null);
	const [loading, setLoading] = useState(true);

	const { category } = useParams();
	const { showMenu } = useMenu();
	const { auth } = useAuth();

	useEffect(() => {
		getUserMovies();
		setLoading(true);
		setMovies([]);
		// eslint-disable-next-line
	}, [category]);

	async function getUserMovies() {
		try {
			const { data } = await api.getUserMovies(auth?.token, category!);
			setMovies(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Box sx={styles.page}>
			<Header page={category!} />

			{showMenu && <MenuBar />}

			{loading && <Loader />}

			<ImageList
				cols={1}
				sx={{
					paddingTop: "100px",
					"@media (max-width: 600px)": {
						paddingTop: "70px"
					},
					width: "90%",
					margin: "0 auto"
				}}
			>
				{movies?.length === 0 && !loading && <NoMovies />}

				{movies?.map((movie) => (
					<Movie key={movie.id} movie={movie.movie} />
				))}
			</ImageList>
		</Box>
	);
}

interface Props {
	movie: IMovie;
}

function Movie({ movie }: Props) {
	let navigate = useNavigate();

	const [open, setOpen] = useState(false);

	console.log(movie);

	return (
		<Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", marginBottom: "10px" }}>
			<ImageListItem onClick={() => setOpen(!open)}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie.backdropPath}`}
					alt={movie.title}
				/>
				{!open && <ImageListItemBar title={movie.title} />}
			</ImageListItem>

			<Collapse
				in={open}
				timeout={0}
				sx={{ backgroundColor: "", marginTop: "0px" }}
			>
				<p>{movie.title}</p>
			</Collapse>
		</Box>
	);
}

function NoMovies() {
	return (
		<Typography sx={styles.emptyListText}>
			There is no movies in the list yet
		</Typography>
	);
}

export default UserPage;

// onClick={() => navigate(`/movies/${movie.tmdbId}`)}
