import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import MenuBar from '../../components/Menu';
import useAuth from '../../hooks/useAuth';
import useMenu from '../../hooks/useMenu';
import api from '../../services/api';
import {
	MovieContainer,
	MovieList,
	Page,
	UserAvatar,
	UserContainer,
} from './styles';

interface MoviesResult {
	id: number;
	favorite: boolean;
	watched: boolean;
	watchlist: boolean;
	movies: Movies;
}

export interface Movies {
	tmdbId: number;
	title: string;
	posterPath: string;
}

export interface ListResult {
	id: number;
	name: string;
	listMovies: {
		movies: {
			tmdbId: number;
			title: string;
			posterPath: string;
		};
	}[];
}

function User() {
	const { showMenu } = useMenu();
	const { auth } = useAuth();

	const [movies, setMovies] = useState<MoviesResult[]>([]);
	const [lists, setLists] = useState<ListResult[]>([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getMovies();
		getList();
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

	async function getList() {
		try {
			const { data } = await api.getLists(auth?.token);
			console.log(data);
			setLists(data);
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
					{lists.length === 0 ? (
						<p>Nenhuma lista criada</p>
					) : (
						<p>
							{lists.length} {lists.length === 1 ? 'lista' : 'listas'}
						</p>
					)}
				</Box>
			</UserContainer>
			<Typography>Favorite</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.favorite === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movies} />
					))}
			</MovieList>
			<Typography>Watched</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.watched === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movies} />
					))}
			</MovieList>
			<Typography>Watchlist</Typography>
			<MovieList>
				{movies
					.filter((movie) => movie.watchlist === true)
					.slice(0, 3)
					.map((m) => (
						<Movie key={m.id} movie={m.movies} />
					))}
			</MovieList>
			<MovieList>
				{lists.map((list) => (
					<List key={list.id} list={list} />
				))}
			</MovieList>
		</Page>
	);
}

interface Props {
	movie: Movies;
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

interface ListProps {
	list: ListResult;
}

function List({ list }: ListProps) {
	const listCover = list.listMovies[0].movies.posterPath;

	return (
		<MovieContainer>
			<img
				alt={list.name}
				width="80"
				src={`https://image.tmdb.org/t/p/w400${listCover}`}
			/>
			<Typography>{list.name}</Typography>
		</MovieContainer>
	);
}

export default User;
