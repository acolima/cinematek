import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import {
	Box,
	IconButton,
	ImageListItem,
	ImageListItemBar
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { Header, Menu } from "../../components";

import { api } from "../../services/api";
import { useAuth, useMenu } from "../../hooks";
import { IUserMovie } from "../../utils/models";
import { errorAlert } from "../../utils/toastifyAlerts";
import { Movies, Page } from "./styles";

function UserMovies() {
	const [movies, setMovies] = useState<IUserMovie[]>([]);

	const { category } = useParams();

	const { auth, signOut } = useAuth();
	const { showMenu } = useMenu();

	let navigate = useNavigate();

	useEffect(() => {
		validateToken();
	}, [category]);

	async function validateToken() {
		try {
			const { data } = await api.getUserMovies(auth?.token, category!);
			setMovies(data);
		} catch (error) {
			signOut();
			errorAlert("Session expired. Please, log in again");
			navigate("/");
		}
	}

	return (
		<Page>
			<Header page={category!} />

			{showMenu && <Menu />}

			<Movies cols={1} gap={15}>
				{movies?.map((movie) => (
					<Movie key={movie.id} userMovie={movie} />
				))}
			</Movies>
		</Page>
	);
}

interface Props {
	userMovie: IUserMovie;
}

function Movie({ userMovie }: Props) {
	let navigate = useNavigate();

	const movie = userMovie.movie;
	const watched = userMovie.watched;

	const modifiedDate = dayjs(userMovie.modifyAt).format("MMMM DD, YYYY");

	return (
		<Box>
			<ImageListItem>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie.backdropPath}`}
					alt={movie.title}
				/>

				<ImageListItemBar
					title={movie.title}
					subtitle={watched && `Watched in ${modifiedDate}`}
					actionIcon={
						<IconButton
							sx={{ color: "rgba(255, 255, 255, 0.54)" }}
							onClick={() => navigate(`/movies/${movie.tmdbId}`)}
						>
							<InfoIcon />
						</IconButton>
					}
				/>
			</ImageListItem>
		</Box>
	);
}

export default UserMovies;
