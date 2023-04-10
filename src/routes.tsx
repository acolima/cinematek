import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	Main,
	Movie,
	Search,
	SignIn,
	SignUp,
	UserMovies,
	UserPage
} from "./pages/index";

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/movies" element={<Main />} />
				<Route path="/movies/:id" element={<Movie />} />
				<Route path="/user/:category" element={<UserMovies />} />
				<Route path="/search" element={<Search />} />
				<Route path="/user" element={<UserPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default PageRoutes;
