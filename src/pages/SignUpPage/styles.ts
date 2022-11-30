import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Box, Link, OutlinedInput, Typography } from "@mui/material";

const Container = styled(Box)({
	justifyContent: "space-around",
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
});

const Page = styled(Box)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center"
});

const LogoContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "215px"
});

const Logo = styled(Typography)({
	fontFamily: "Koulen",
	fontWeight: "700",
	fontSize: "50px",
	lineHeight: "24px",
	color: "#790918"
});

const Form = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "15px",
	width: "400px",
	"@media (max-width:601px)": {
		width: "80%"
	}
});

const Input = styled(OutlinedInput)({
	fontFamily: "Poppins",
	fontWeight: "500",
	fontSize: "16px",
	lineHeight: "24px",
	color: "rgba(0, 0, 0, 1)",
	background: "#C4C4C4",
	borderRadius: "20px"
});

const Button = styled(LoadingButton)({
	background: "#282D47",
	height: "40px",
	borderRadius: "20px",
	border: "0",
	color: "#fff",
	fontFamily: "Poppins",
	"&:hover": {
		opacity: "0.8",
		background: "#282D47"
	}
});

const Credits = styled(Link)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textDecoration: "none",
	color: "#fff"
});

export {
	Button as LoadingButton,
	Container,
	Credits,
	Form,
	Input,
	Logo,
	LogoContainer,
	Page
};
