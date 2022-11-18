import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider, MenuDrawerProvider, MoviesProvider } from "./contexts";
import PageRoutes from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: ["Poppins", "Koulen"].join(",")
	}
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<MenuDrawerProvider>
					<MoviesProvider>
						<ToastContainer />
						<PageRoutes />
					</MoviesProvider>
				</MenuDrawerProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
