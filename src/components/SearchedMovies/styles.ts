import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

const Results = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	width: "90%",
	margin: "0 auto"
});

const MovieContainer = styled(Box)({
	backgroundColor: "#282D47",
	borderRadius: "20px",
	display: "flex",
	gap: "10px",
	justifyContent: "space-between",
	width: "100%"
});

const MovieInfos = styled(Box)({
	flexGrow: "1",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around"
});

const Title = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "16px",
	fontWeight: "bold"
});

const ReleaseDate = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "12px"
});

const StyledButton = styled(Button)({
	color: "#fff",
	cursor: "pointer",
	"&:hover": { textDecoration: "underline" }
});

export {
	MovieContainer,
	MovieInfos,
	ReleaseDate,
	Results,
	StyledButton as Button,
	Title
};
