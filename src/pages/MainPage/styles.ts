import styled from "@emotion/styled";
import { Box, ImageList, Typography } from "@mui/material";

const Page = styled(Box)({
	width: "60%",
	margin: "0 auto",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingBottom: "15px",
	position: "relative",
	"@media (max-width: 600px)": {
		width: "100%"
	}
});

const TrendingMovies = styled(ImageList)({
	paddingTop: "70px",
	width: "100%",
	"@media (max-width: 600px)": {
		width: "95%"
	}
});

const PageTitle = styled(Typography)({
	fontFamily: "Poppins",
	fontWeight: "500",
	fontSize: "24px",
	width: "80%",
	textAlign: "left",
	"@media (max-width: 600px)": {
		fontSize: "18px"
	}
});

export { Page, PageTitle, TrendingMovies };
