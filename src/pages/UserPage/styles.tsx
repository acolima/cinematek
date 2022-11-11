const styles = {
	page: {
		width: '60%',
		margin: '0 auto',
		'@media (max-width: 600px)': {
			margin: '0',
			width: '100%'
		}
	},
	gridContainer: {
		paddingTop: '100px',
		'@media (max-width: 600px)': {
			paddingTop: '70px'
		}
	},
	movieBox: {
		width: '80%',
		height: '250px',
		margin: '0 auto',
		padding: '10px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#282D47',
		marginBottom: '25px',
		borderRadius: '20px',
		cursor: 'pointer'
	},
	moviePoster: {
		width: '100px'
	},
	movieTitle: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		paddingTop: '5px',
		overflow: 'hidden'
	},
	emptyListText: {
		paddingTop: '100px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		opacity: '0.7',
		fontFamily: 'Poppins',
		fontSize: '1.3em'
	}
}

export default styles
