import { Box, Typography } from "@mui/material";
import { HighlightOff, SearchOutlined } from "@mui/icons-material";

import styled from "@emotion/styled";

interface Props {
	message: string;
}

function SearchPageIcon({ message }: Props) {
	return (
		<Container>
			{message.includes("No results found") ? (
				<NoResults fontSize="large" />
			) : (
				<Search fontSize="large" />
			)}
			<Text>{message}</Text>
		</Container>
	);
}

const Container = styled(Box)({
	paddingTop: "100px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "20px",
	opacity: "0.7"
});

const NoResults = styled(HighlightOff)({
	fontSize: "5em"
});

const Search = styled(SearchOutlined)({
	fontSize: "5em"
});

const Text = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "16px"
});

export default SearchPageIcon;
