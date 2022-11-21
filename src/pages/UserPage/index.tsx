import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import {
	Box,
	IconButton,
	ImageListItem,
	ImageListItemBar
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";

import { Header, Menu } from "../../components";

import { api } from "../../services/api";
import { useAuth, useMenu, useMovies } from "../../hooks";
import { IUserMovie } from "../../utils/models";
import { errorAlert } from "../../utils/toastifyAlerts";
import { Collapse, CollapseHeader, Movies, Page, WatchedMovie } from "./styles";

function UserPage() {
	const [movies, setMovies] = useState<IUserMovie[]>([]);

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
	const favorite = userMovie.favorite;
	const watched = userMovie.watched;
	const watchlist = userMovie.watchlist;

	const modifiedDate = dayjs(userMovie.modifyAt).format("MMMM DD, YYYY");

	const [open, setOpen] = useState(false);

	function handleOpenCollapse() {
		if (!watchlist) setOpen(!open);
	}

	return (
		<Box>
			<ImageListItem onClick={() => handleOpenCollapse()}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie.backdropPath}`}
					alt={movie.title}
				/>
				{!open && (
					<ImageListItemBar
						title={movie.title}
						actionIcon={
							<IconButton
								sx={{ color: "rgba(255, 255, 255, 0.54)" }}
								onClick={() => navigate(`/movies/${movie.tmdbId}`)}
							>
								<InfoIcon />
							</IconButton>
						}
					/>
				)}
			</ImageListItem>

			{!watchlist && (
				<Collapse in={open} timeout={0}>
					<CollapseHeader>
						<p>{movie.title}</p>
						{favorite && <FavoriteIcon />}
					</CollapseHeader>
					{watched && (
						<WatchedMovie>
							<CheckCircleIcon />
							<p>Watched in {modifiedDate}</p>
						</WatchedMovie>
					)}
				</Collapse>
			)}
		</Box>
	);
}

export default UserPage;
