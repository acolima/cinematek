import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext';
import { MenuDrawerProvider } from './contexts/menuDrawerContext';
import PageRoutes from './routes';

function App() {
	return (
		<AuthProvider>
			<MenuDrawerProvider>
				<ToastContainer />
				<PageRoutes />
			</MenuDrawerProvider>
		</AuthProvider>
	);
}

export default App;
