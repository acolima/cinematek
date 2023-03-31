import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

interface Props {
	backdropUrl?: string;
}

export const styles = {
	backdrop: {
		opacity: "0.6",
		width: "100%",
		height: "200px"
	},
	noBackdrop: {
		width: "100%",
		height: "200px"
	},
	icons: {
		fontSize: "2.5em",
		cursor: "pointer",
		color: "#fff"
	}
};

const Page = styled(Box)({
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	width: "70%",
	height: "100vh",
	boxSizing: "border-box",
	margin: "0 auto",
	zIndex: 1,
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%",
		height: "100%",
		flexDirection: "column"
	},
	"@media (max-width: 900px)": {
		width: "100%"
	}
});

const Poster = styled(Box)({
	width: "300px",
	display: "flex",
	marginLeft: "60px",
	"@media (max-width: 600px)": {
		width: "200px",
		position: "absolute",
		zIndex: "1",
		top: 25,
		justifyContent: "center",
		marginLeft: 0
	}
});

const ArrowBackButton = styled(Button)({
	position: "absolute",
	top: "10px",
	left: "10px"
});

const MovieInfo = styled(Box)({
	margin: "10px",
	padding: "10px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	background: "rgb(0, 0, 0, 0.5)",
	"@media (max-width: 600px)": {
		background: "none",
		marginTop: "70px",
		padding: 0
	}
});

const Title = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "32px",
	fontWeight: "500",
	textTransform: "uppercase",
	textAlign: "center",
	boxSizing: "border-box",
	"@media (max-width: 600px)": {
		fontSize: "16px"
	}
});

const Genres = styled(Box)({
	display: "flex",
	justifyContent: "space-evenly",
	flexWrap: "wrap"
});

const Overview = styled(Typography)({
	width: "85%",
	textAlign: "justify",
	fontFamily: "Poppins",
	fontSize: "16px",
	boxSizing: "border-box",
	margin: "0 auto"
});

const Runtime = styled(Typography)({
	width: "85%",
	fontFamily: "Poppins",
	fontSize: "12px",
	margin: "0 auto"
});

const FavoriteButton = styled(Box)({
	"@media (max-width: 600px)": {
		position: "absolute",
		top: "10px",
		right: "10px"
	}
});

const Buttons = styled(Box)({
	display: "flex",
	justifyContent: "space-around"
});

const BackdropDesktop = styled(Box)<Props>(({ backdropUrl }) => ({
	width: "100%",
	height: "100%",
	position: "absolute",
	zIndex: -1,

	background: `url(${backdropUrl})`,
	backgroundSize: "cover",
	opacity: "0.6"
}));

export {
	ArrowBackButton,
	BackdropDesktop,
	Buttons,
	FavoriteButton,
	Genres,
	MovieInfo,
	Overview,
	Page,
	Poster,
	Runtime,
	Title
};
