import { Box, Pagination, styled } from "@mui/material";

const Page = styled(Box)({
	width: "60%",
	margin: "0 auto",
	paddingBottom: "10px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const MoviesContainer = styled(Box)({
	paddingTop: "70px"
});

const StyledPagination = styled(Pagination)({
	marginTop: "15px",
	alignSelf: "center",
	button: {
		color: "#fff"
	}
});

export { MoviesContainer, Page, StyledPagination as Pagination };
