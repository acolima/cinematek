import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
	Box,
	Collapse,
	ImageList,
	ImageListItem,
	ImageListItemBar
} from "@mui/material";

import { Header, Menu } from "../../components";

import { api } from "../../services/api";
import { useAuth, useMenu, useMovies } from "../../hooks";
import { IMovie, UserMovie } from "../../utils/models";
import { errorAlert } from "../../utils/toastifyAlerts";
import styles from "./styles";

function UserPage() {
	const [movies, setMovies] = useState<UserMovie[]>([]);

	const { category } = useParams();

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();
	const { movies: userMovies } = useMovies();

	let navigate = useNavigate();

	useEffect(() => {
		validateToken();
	}, [category]);

	async function validateToken() {
		try {
			await api.validateToken(auth?.token);
			setMovies(userMovies.filter((movie: any) => movie[category!]));
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	return (
		<Box sx={styles.page}>
			<Header page={category!} />

			{showMenu && <Menu />}

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

export default UserPage;

// onClick={() => navigate(`/movies/${movie.tmdbId}`)}
