import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";

const Page = styled(Box)({
	width: "60%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	margin: "0 auto",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const UserContainer = styled(Box)({
	paddingTop: "100px",
	"@media (max-width: 600px)": {
		paddingTop: "70px"
	},
	display: "flex",
	alignItems: "center",
	gap: "15px",
	width: "100%"
});

const UserAvatar = styled(Avatar)({
	width: "76px",
	height: "76px",
	marginLeft: "15px"
});

const MovieList = styled(Box)({
	display: " flex",
	gap: "10px",
	width: "95%",
	overflow: "scroll",
	height: "220px",
	marginBottom: "25px",
	"::-webkit-scrollbar": {
		display: "none"
	}
});

const MovieContainer = styled(Box)({
	backgroundColor: "#282D47",
	width: "140px",
	display: "flex",
	gap: "5px",
	flexDirection: "column",
	alignItems: "center",
	flexShrink: 0,
	padding: "10px",
	textAlign: "center",
	borderRadius: "5px",
	overflow: "hidden"
});

const SectionHeader = styled(Box)({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0 10px"
});

const Section = styled(Typography)({
	color: "#790918",
	fontSize: "32px",
	fontFamily: "Koulen",
	alignSelf: "flex-start"
});

export {
	MovieContainer,
	MovieList,
	Page,
	Section,
	SectionHeader,
	UserAvatar,
	UserContainer
};
