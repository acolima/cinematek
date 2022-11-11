import { Box, Typography } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

function SearchIcon() {
	return (
		<Box sx={styles.searchIconBox}>
			<SearchOutlined fontSize="large" sx={styles.searchIcon} />
			<Typography sx={styles.text}>Type the name of the movie</Typography>
		</Box>
	);
}

const styles = {
	searchIconBox: {
		paddingTop: "100px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		opacity: "0.7"
	},
	searchIcon: {
		fontSize: "5em"
	},
	text: {
		fontFamily: "Poppins",
		fontSize: "16px"
	}
};

export default SearchIcon;
