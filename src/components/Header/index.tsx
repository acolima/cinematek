import {
	Box,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography,
} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Menu, Search, SearchOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import useMenu from '../../hooks/useMenu';

import styles from './styles';

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
	username,
}: Props) {
	const { toggleDrawer } = useMenu();

	let navigate = useNavigate();

	function handleInputKeyDown(
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		if (e.key === 'Enter' && handleSearch) {
			handleSearch()!;
		}
	}

	if (page === 'search') {
		return (
			<Box sx={styles.header}>
				<ArrowBackOutlinedIcon sx={styles.icons} onClick={() => navigate(-1)} />
				<OutlinedInput
					sx={styles.searchBar}
					placeholder="Search for movies"
					value={movieName}
					onChange={(e) => setMovieName!(e.target.value)}
					onKeyDown={(e) => handleInputKeyDown(e)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleSearch} edge="end">
								<SearchOutlined />
							</IconButton>
						</InputAdornment>
					}
				/>
				<Menu sx={styles.icons} onClick={toggleDrawer} />
			</Box>
		);
	}

	if (page === 'main')
		return (
			<Box sx={styles.headerMain}>
				<Search sx={styles.icons} onClick={() => navigate('/search')} />
				<Typography sx={styles.logo}>CINEMATEK</Typography>
				<Menu sx={styles.icons} onClick={toggleDrawer} />
			</Box>
		);

	return (
		<Box sx={styles.header}>
			<ArrowBackOutlinedIcon
				sx={styles.icons}
				onClick={() => navigate('/movies')}
			/>
			<Typography sx={styles.logo}>{page || username}</Typography>
			<Menu sx={styles.icons} onClick={toggleDrawer} />
		</Box>
	);
}

export default Header;
