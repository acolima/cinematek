import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'
import styles from './styles'
import { successAlert } from '../../utils/toastifyAlerts'

function SignUp() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [pictureUrl, setPictureUrl] = useState('')

	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const [passwordLengthError, setPasswordLengthError] = useState(false)
	const [passwordMismatchError, setPasswordMismatchError] = useState(false)
	const [requestError, setRequestError] = useState('')

	let navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setPasswordLengthError(false)
		setPasswordMismatchError(false)
		setLoading(true)
		setDisabled(true)
		setRequestError('')

		if (password.length < 6) {
			setPasswordLengthError(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		if (password !== passwordConfirmation) {
			setPasswordMismatchError(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		try {
			await api.signUp({ username, password, pictureUrl })
			navigate('/')
			successAlert('Account created!')
		} catch (error: Error | any) {
			setRequestError(error.response.data)
			setLoading(false)
			setDisabled(false)
		}
	}

	return (
		<Box sx={styles.page}>
			<Box sx={styles.logoBox}>
				<Typography sx={styles.logo}>CINEMATEK</Typography>
			</Box>

			{requestError && <Alert severity='error'>{requestError}</Alert>}

			<Box component='form' sx={styles.form} onSubmit={handleSubmit}>
				<OutlinedInput
					placeholder='Username'
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					sx={styles.input}
					disabled={disabled}
					required
				/>

				<PasswordInput
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					disabled={disabled}
				/>
				{passwordLengthError && (
					<Alert severity='error'>
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
					<Alert severity='error'>Passwords are different</Alert>
				)}

				<OutlinedInput
					placeholder='URL of profile picture'
					type='url'
					sx={styles.input}
					required
					value={pictureUrl}
					onChange={(e) => setPictureUrl(e.target.value)}
				/>

				<LoadingButton
					variant='outlined'
					type='submit'
					loading={loading}
					sx={styles.loadingButton}
				>
					Sign Up
				</LoadingButton>
				<Button sx={styles.button} size='small' onClick={() => navigate('/')}>
					Already have an account? Log In{' '}
				</Button>
			</Box>
		</Box>
	)
}

interface Props {
	password: string
	setPassword: React.Dispatch<React.SetStateAction<string>>
	showPassword: boolean
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
	disabled: boolean
}

function PasswordInput({
	password,
	setPassword,
	showPassword,
	setShowPassword,
	disabled
}: Props) {
	return (
		<>
			<OutlinedInput
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				sx={styles.input}
				required
				disabled={disabled}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							onClick={() => setShowPassword(!showPassword)}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</>
	)
}

export default SignUp
