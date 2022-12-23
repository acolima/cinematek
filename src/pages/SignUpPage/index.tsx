import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { api } from "../../services";
import { successAlert } from "../../utils/toastifyAlerts";
import {
	Form,
	Input,
	LoadingButton,
	Logo,
	LogoContainer,
	Page,
	PictureContainer
} from "./styles";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function SignUp() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [pictureFile, setPictureFile] = useState<File>();
	const [picturePreview, setPicturePreview] = useState<string>("");

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const [passwordLengthError, setPasswordLengthError] = useState(false);
	const [passwordMismatchError, setPasswordMismatchError] = useState(false);
	const [usernameTakenError, setUsernameTakenError] = useState(false);
	const [noPictureError, setNoPictureError] = useState(false);
	const [requestError, setRequestError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	let navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setPasswordLengthError(false);
		setPasswordMismatchError(false);
		setUsernameTakenError(false);
		setNoPictureError(false);
		setRequestError(false);
		setLoading(true);
		setDisabled(true);

		if (!pictureFile) {
			setNoPictureError(true);
			setLoading(false);
			setDisabled(false);
			return;
		}

		if (password.length < 6) {
			setPasswordLengthError(true);
			setLoading(false);
			setDisabled(false);
			return;
		}

		if (password !== passwordConfirmation) {
			setPasswordMismatchError(true);
			setLoading(false);
			setDisabled(false);
			return;
		}

		try {
			await api.signUp({ username, password }, pictureFile!);
			navigate("/");
			successAlert("Account created!");
		} catch (error: Error | any) {
			const errorResponse = error.response;

			if (errorResponse.status === 409) {
				setUsernameTakenError(true);
				setErrorMessage(errorResponse.data);
			} else {
				setRequestError(true);
				setErrorMessage(errorResponse.data);
			}

			setLoading(false);
			setDisabled(false);
			return;
		}
	}

	function uploadPicture(e: React.ChangeEvent<HTMLInputElement> | undefined) {
		const file = e?.target.files![0];
		setPictureFile(file);

		const reader = new FileReader();

		reader.onloadend = () => {
			setPicturePreview(reader.result!.toString());
		};

		reader.readAsDataURL(file!);
	}

	return (
		<Page>
			<LogoContainer>
				<Logo>CINEMATEK</Logo>
			</LogoContainer>

			{requestError && <Alert severity="error">{errorMessage}</Alert>}

			<Form component="form" onSubmit={handleSubmit}>
				<ProfilePicture
					uploadPicture={uploadPicture}
					picturePreview={picturePreview}
				/>
				{noPictureError && (
					<Alert severity="error">
						There is no file for the profile picture
					</Alert>
				)}

				<Input
					placeholder="Username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					disabled={disabled}
					required
				/>
				{usernameTakenError && <Alert severity="error">{errorMessage}</Alert>}

				<PasswordInput
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					disabled={disabled}
				/>
				{passwordLengthError && (
					<Alert severity="error">
						Password must be at least 6 caracters long
					</Alert>
				)}

				<PasswordInput
					password={passwordConfirmation}
					setPassword={setPasswordConfirmation}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					disabled={disabled}
				/>
				{passwordMismatchError && (
					<Alert severity="error">Passwords are different</Alert>
				)}

				<LoadingButton variant="outlined" type="submit" loading={loading}>
					Sign Up
				</LoadingButton>
				<Button
					sx={{ color: "#fff" }}
					size="small"
					onClick={() => navigate("/")}
				>
					Already have an account? Log In
				</Button>
			</Form>
		</Page>
	);
}

interface PasswordInputProps {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	disabled: boolean;
}

function PasswordInput({
	password,
	setPassword,
	showPassword,
	setShowPassword,
	disabled
}: PasswordInputProps) {
	return (
		<>
			<Input
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type={showPassword ? "text" : "password"}
				required
				disabled={disabled}
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
		</>
	);
}

interface ProfilePictureProps {
	uploadPicture: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
	picturePreview: string;
}

function ProfilePicture({
	uploadPicture,
	picturePreview
}: ProfilePictureProps) {
	return (
		<PictureContainer>
			<label htmlFor="picture">
				<AddAPhotoIcon />
			</label>
			<input type="file" id="picture" onChange={(e) => uploadPicture(e)} />

			{picturePreview && (
				<div>
					<img src={picturePreview} alt="preview" />
				</div>
			)}
		</PictureContainer>
	);
}

export default SignUp;
