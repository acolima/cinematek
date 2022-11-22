import { TailSpin } from "react-loader-spinner";

import { Container } from "@mui/material";
import styled from "@emotion/styled";

function Loader() {
	return (
		<LoaderContainer>
			<TailSpin color="#790918" height="90" width="90" />
		</LoaderContainer>
	);
}

const LoaderContainer = styled(Container)({
	height: "80vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
});

export default Loader;
