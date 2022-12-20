import { Box, styled } from "@mui/material";

const Page = styled(Box)({
	width: "60%",
	margin: "0 auto",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const MoviesContainer = styled(Box)({
	paddingTop: "70px"
});

export { MoviesContainer, Page };
