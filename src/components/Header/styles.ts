import styled from "@emotion/styled";
import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";

interface Props {
	main?: boolean;
}

const Container = styled(Box)(({ main }: Props) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-around",
	margin: "0 auto",
	position: "fixed",
	zIndex: 1,
	background: "#0c174b",
	width: main ? "100%" : "60%",
	height: "70px",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%",
		justifyContent: "space-between",
		padding: "10px"
	}
}));

const Button = styled(IconButton)({
	cursor: "pointer",
	color: "#fff"
});

const PageTitle = styled(Typography)({
	fontFamily: "Koulen",
	fontWeight: "700",
	fontSize: "60px",
	color: "#790918",
	"@media (max-width: 600px)": {
		fontSize: "40px"
	}
});

const SearchInput = styled(OutlinedInput)({
	width: "70%",
	height: "40px",
	fontFamily: "Poppins",
	fontWeight: "500",
	fontSize: "14px",
	lineHeight: "24px",
	color: "rgba(0, 0, 0, 1)",
	background: "#C4C4C4",
	borderRadius: "20px"
});

export { Button, Container, PageTitle, SearchInput };
