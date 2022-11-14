import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
	CreateList,
	ListPage,
	Main,
	Movie,
	Search,
	SignIn,
	SignUp,
	User,
	UserPage,
} from './pages/index';

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/movies" element={<Main />} />
				<Route path="/movies/:id" element={<Movie />} />
				<Route path="/movies/user/:category" element={<UserPage />} />
				<Route path="/search" element={<Search />} />
				<Route path="/lists" element={<ListPage />} />
				<Route path="/create-list" element={<CreateList />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default PageRoutes;
