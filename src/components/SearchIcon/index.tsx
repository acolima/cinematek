import { Box, Typography } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";

function SearchIcon() {
	return (
		<Container>
			<Icon fontSize="large" />
			<Text>Type the name of the movie</Text>
		</Container>
	);
}

const Container = styled(Box)({
	paddingTop: "100px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	opacity: "0.7"
});

const Icon = styled(SearchOutlined)({
	fontSize: "5em"
});

const Text = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "16px"
});

export default SearchIcon;
