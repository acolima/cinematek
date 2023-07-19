export interface IUserData {
	username: string;
	password: string;
}

type Actions = {
	favorite: boolean;
	watched: boolean;
	watchlist: boolean;
};

export interface IMovie {
	tmdbId: number;
	title: string | undefined;
	posterPath: string | undefined;
	backdropPath: string | undefined;
}

type UserMovie = {
	id: number;
	movie: IMovie;
	modifyAt: string;
};

export type IUserMovie = Actions & UserMovie;

export interface TMDBMovieResult {
	id: number;
	title: string;
	overview: string | null;
	poster_path: string | undefined;
	backdrop_path: string | undefined;
	runtime: number | null;
	genres: {
		id: number;
		name: string;
	}[];
}

export interface TMDBMoviesResult {
	id: number;
	title: string;
	backdrop_path: string | undefined;
}

export interface TMDBSearchResult {
	id: number;
	poster_path: string | undefined;
	title: string;
	release_date: string;
	vote_average: number;
}

export interface IUserMovies {
	watched: IMovie[];
	favorite: IMovie[];
	watchlist: IMovie[];
}

export interface IPRoviders {
	logo_path: string;
	provider_id: string;
	provider_name: string;
}
