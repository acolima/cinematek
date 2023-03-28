import { Box, ImageList, styled } from "@mui/material";

const Page = styled(Box)({
	width: "60%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	margin: "0 auto",
	paddingBottom: "20px",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const Movies = styled(ImageList)({
	paddingTop: "100px",
	width: "90%",
	margin: "0 auto",
	"@media (max-width: 600px)": {
		paddingTop: "70px"
	}
});

export { Movies, Page };
