const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logoBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '215px'
	},
	logo: {
		fontFamily: 'Koulen',
		fontWeight: '700',
		fontSize: '50px',
		lineHeight: '24px',
		color: '#790918'
	},
	login: {
		justifyContent: 'space-around',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',
		width: '400px',
		'@media (max-width:601px)': { width: '80%' }
	},
	input: {
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)',
		background: '#C4C4C4',
		borderRadius: '20px'
	},
	loadingButton: {
		background: '#282D47',
		height: '40px',
		borderRadius: '20px',
		border: '0',
		color: '#fff',
		fontFamily: 'Poppins',
		'&:hover': { opacity: '0.8', background: '#282D47' }
	},
	button: {
		color: '#fff',
		fontFamily: 'Poppins'
	},
	creditsBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textDecoration: 'none'
	},
	credits: {
		fontFamily: 'Poppins',
		fontSize: '12px',
		color: '#fff'
	}
}

export default styles
