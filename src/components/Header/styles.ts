import styled from "@emotion/styled";
import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";

const Container = styled(Box)({
	boxSizing: "border-box",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	position: "fixed",
	zIndex: 1,
	padding: 0,
	background: "#0c174b",
	width: "90%",
	height: "70px",
	"@media (max-width: 600px)": {
		width: "100%"
	}
});

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
