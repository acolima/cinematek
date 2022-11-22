import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";

const Container = styled(Box)({
	width: "250px"
});

const UserAvatar = styled(Avatar)({
	margin: "5px 0 0 15px"
});

const Username = styled(Typography)({
	fontWeight: "500",
	fontSize: "16px",
	color: "#0c174b",
	padding: "0 15px",
	wordBreak: "break-word",
	cursor: "pointer"
});

export { Container, UserAvatar as Avatar, Username };
