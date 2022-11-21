import { Box, Collapse, ImageList, styled } from "@mui/material";

const Page = styled(Box)({
	width: "90%",
	margin: "0 auto",
	paddingBottom: "20px",
	"@media (max-width: 600px)": {
		margin: "0",
		width: "100%"
	}
});

const Movies = styled(ImageList)({
	paddingTop: "100px",
	width: "90%",
	margin: "0 auto",
	"@media (max-width: 600px)": {
		paddingTop: "70px"
	}
});

const StyledCollapse = styled(Collapse)({
	backgroundColor: "rgba(0, 0, 0, 0.6)",
	padding: "5px",
	position: "relative"
});

const CollapseHeader = styled(Box)({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	fontSize: "20px",
	padding: "10px 0 20px "
});

const WatchedMovie = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "5px",
	fontSize: "14px"
});

export {
	CollapseHeader,
	Movies,
	Page,
	StyledCollapse as Collapse,
	WatchedMovie
};
