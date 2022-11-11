const styles = {
	movieBox: {
		backgroundColor: "#282D47",
		borderRadius: "20px",
		display: "flex",
		gap: "10px",
		justifyContent: "space-between",
		width: "100%"
	},
	infos: {
		flexGrow: "1",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	},
	movieTitle: {
		fontFamily: "Poppins",
		fontSize: "16px",
		fontWeight: "bold"
	},
	movieReleaseDate: {
		fontFamily: "Poppins",
		fontSize: "12px"
	},
	button: {
		color: "#fff",
		cursor: "pointer",
		"&:hover": { textDecoration: "underline" }
	},
	poster: {
		width: "100px",
		borderRadius: "20px 0 0 20px"
	}
};

export default styles;
