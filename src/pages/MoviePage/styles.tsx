const styles = {
	page: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'borderBox',
		width: '60%',
		margin: '0 auto',
		'@media (max-width: 600px)': {
			margin: '0',
			width: '100%'
		}
	},
	movieBackdrop: {
		opacity: '0.6',
		width: '100%',
		height: '200px'
	},
	noBackdrop: {
		width: '100%',
		height: '200px'
	},
	moviePoster: {
		position: 'absolute',
		zIndex: '1',
		top: 25,
		alignSelf: 'center'
	},
	backButton: {
		position: 'absolute',
		top: '10px',
		left: '10px'
	},
	favoriteButton: {
		position: 'absolute',
		top: '10px',
		right: '10px'
	},
	icons: {
		fontSize: '2.5em',
		cursor: 'pointer',
		color: '#fff'
	},
	movieInfoBox: {
		marginTop: '70px',
		display: 'flex',
		flexDirection: 'column',
		gap: '20px'
	},
	movieTitle: {
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontWeight: '500',
		textTransform: 'uppercase',
		textAlign: 'center',
		boxSizing: 'borderBox'
	},
	movieGenres: {
		display: 'flex',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap'
	},
	movieOverview: {
		width: '85%',
		textAlign: 'justify',
		fontFamily: 'Poppins',
		fontSize: '16px',
		boxSizing: 'borderBox',
		margin: '0 auto'
	},
	movieRuntime: {
		width: '85%',
		fontFamily: 'Poppins',
		fontSize: '12px',
		margin: '0 auto'
	}
}

export default styles
