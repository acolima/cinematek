import styled from '@emotion/styled';
import { Avatar, Box } from '@mui/material';

const Page = styled(Box)({
	width: '60%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingBottom: '15px',
	'@media (max-width: 600px)': {
		margin: '0',
		width: '100%',
	},
});

const UserContainer = styled(Box)({
	paddingTop: '100px',
	'@media (max-width: 600px)': {
		paddingTop: '70px',
	},
	display: 'flex',
	alignItems: 'center',
	gap: '15px',
	width: '100%',
});

const UserAvatar = styled(Avatar)({
	width: '76px',
	height: '76px',
	marginLeft: '15px',
});

const MovieList = styled(Box)({
	display: ' flex',
	gap: '10px',
	width: '95%',
	overflow: 'scroll',
	height: '220px',
});

const MovieContainer = styled(Box)({
	backgroundColor: '#282D47',
	width: '140px',
	display: 'flex',
	gap: '5px',
	flexDirection: 'column',
	alignItems: 'center',
	flexShrink: 0,
	padding: '10px',
	textAlign: 'center',
	borderRadius: '5px',
});

export { MovieContainer, MovieList, Page, UserAvatar, UserContainer };
