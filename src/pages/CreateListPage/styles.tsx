const styles = {
	page: {
		width: '60%',
		margin: '0 auto',
		'@media (max-width: 600px)': {
			margin: '0',
			width: '100%'
		}
	},
	box: {
		backgroundColor: '#fff',
		width: '100%',
		height: '90vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '6px',
		padding: '8px 0'
	},
	listNameInput: {
		width: '90%',
		height: '40px',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)'
	},
	pageTitle: {
		padding: '20px 0 10px 0',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '24px',
		width: '80%',
		textAlign: 'left',
		'@media (max-width: 600px)': {
			fontSize: '18px'
		}
	},
	searchMovieNameInput: {
		width: '90%',
		height: '40px',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)',
		background: '#C4C4C4',
		borderRadius: '20px'
	},
	resultsBox: {
		width: '90%',
		flex: 1,
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		}
	},
	buttonsGroup: {
		width: '90%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	addedMoviesBox: {
		width: '90%',
		flex: 1,
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		},
		backgroundColor: '#c4c4c4'
	}
}

export default styles
