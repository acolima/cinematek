import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { api } from "../../services/api";
import { useAuth } from "../../hooks";
import {
	Credits,
	Form,
	Input,
	LoadingButton,
	Logo,
	LogoContainer,
	Page
} from "../SignUpPage/styles";
import tmdbLogo from "../../assets/tmdb.svg";

function SignIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const [passwordLengthError, setPasswordLengthError] = useState(false);
	const [requestError, setRequestError] = useState("");

	const { signIn } = useAuth();
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("auth")) navigate("/movies");
	}, [navigate]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setPasswordLengthError(false);
		setLoading(true);
		setDisabled(true);
		setRequestError("");

		if (password.length < 6) {
			setPasswordLengthError(true);
			setLoading(false);
			setDisabled(false);
			return;
		}

		try {
			const { data } = await api.signIn({ username, password });
			signIn(data);
			navigate("/movies");
		} catch (error: Error | any) {
			setRequestError(error.response.data);
			setLoading(false);
			setDisabled(false);
		}
	}

	return (
		<Page>
			<LogoContainer>
				<Logo>CINEMATEK</Logo>
			</LogoContainer>

			<Form component="form" onSubmit={handleSubmit}>
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					disabled={disabled}
					required
				/>

				<Input
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type={showPassword ? "text" : "password"}
					disabled={disabled}
					required
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
				{passwordLengthError && (
					<Alert severity="error">
						Password must be at least 6 caracters long
					</Alert>
				)}

				{requestError && <Alert severity="error">{requestError}</Alert>}

				<LoadingButton variant="outlined" type="submit" loading={loading}>
					Log In
				</LoadingButton>

				<Button
					sx={{ color: "#fff" }}
					size="small"
					onClick={() => navigate("/sign-up")}
				>
					First time? Create an account
				</Button>
			</Form>

			<Credits
				href="https://www.themoviedb.org/?language=pt-BR"
				target="_blank"
			>
				<Typography sx={{ fontSize: "12px" }}>
					All the data are provided by The Movie Database
				</Typography>
				<img src={tmdbLogo} alt="TMBD Logo" width="60" />
			</Credits>
		</Page>
	);
}

export default SignIn;
