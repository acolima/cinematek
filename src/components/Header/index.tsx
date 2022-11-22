import { useNavigate } from "react-router-dom";

import { IconButton, InputAdornment } from "@mui/material";
import { ArrowBackOutlined, Menu, Search } from "@mui/icons-material";

import useMenu from "../../hooks/useMenu";
import { Button, Container, PageTitle, SearchInput } from "./styles";

interface Props {
	page?: string;
	movieName?: string;
	setMovieName?: React.Dispatch<React.SetStateAction<string>>;
	handleSearch?: () => void;
	username?: string;
}

function Header({
	page,
	movieName,
	setMovieName,
	handleSearch,
	username
}: Props) {
	const { toggleDrawer } = useMenu();

	const mainPage = page === "main";
	const searchPage = page === "search";
	const otherPages = page !== "main" && page !== "search";

	let navigate = useNavigate();

	return (
		<Container>
			{!mainPage && (
				<Button onClick={() => navigate(-1)}>
					<ArrowBackOutlined fontSize="large" />
				</Button>
			)}

			{mainPage && <MainHeader />}

			{searchPage && (
				<SearchHeader
					movieName={movieName}
					setMovieName={setMovieName}
					handleSearch={handleSearch}
				/>
			)}

			{otherPages && <PageTitle>{page || username}</PageTitle>}

			<Button onClick={toggleDrawer}>
				<Menu fontSize="large" />
			</Button>
		</Container>
	);
}

function MainHeader() {
	let navigate = useNavigate();

	return (
		<>
			<Button onClick={() => navigate("/search")}>
				<Search fontSize="large" />
			</Button>
			<PageTitle>CINEMATEK</PageTitle>
		</>
	);
}

interface Props {
	movieName?: string;
	setMovieName?: React.Dispatch<React.SetStateAction<string>>;
	handleSearch?: () => void;
}

function SearchHeader({ movieName, setMovieName, handleSearch }: Props) {
	function handleInputKeyDown(
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		if (e.key === "Enter" && handleSearch) {
			handleSearch()!;
		}
	}

	return (
		<SearchInput
			placeholder="Search for movies"
			value={movieName}
			onChange={(e) => setMovieName!(e.target.value)}
			onKeyDown={(e) => handleInputKeyDown(e)}
			endAdornment={
				<InputAdornment position="end">
					<IconButton onClick={handleSearch} edge="end">
						<Search />
					</IconButton>
				</InputAdornment>
			}
		/>
	);
}

export default Header;
