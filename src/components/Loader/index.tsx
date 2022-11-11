import { TailSpin } from "react-loader-spinner";
import { Container } from "@mui/material";
import styles from "./styles";

function Loader() {
	return (
		<Container sx={styles.container}>
			<TailSpin color="#790918" height="90" width="90" />
		</Container>
	);
}

export default Loader;
