import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

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
	flexDirection: "column",
	width: "60%",
	boxSizing: "border-box",
	margin: "0 auto",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const Poster = styled(Box)({
	position: "absolute",
	zIndex: "1",
	top: 25,
	alignSelf: "center"
});

const ArrowBackButton = styled(Button)({
	position: "absolute",
	top: "10px",
	left: "10px"
});

const MovieInfo = styled(Box)({
	marginTop: "70px",
	display: "flex",
	flexDirection: "column",
	gap: "20px"
});

const Title = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "16px",
	fontWeight: "500",
	textTransform: "uppercase",
	textAlign: "center",
	boxSizing: "border-box"
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
	position: "absolute",
	top: "10px",
	right: "10px"
});

export {
	ArrowBackButton,
	FavoriteButton,
	Genres,
	MovieInfo,
	Overview,
	Page,
	Poster,
	Runtime,
	Title
};
