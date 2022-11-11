const styles = {
	page: {
		width: '60%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '10px',
		margin: '0 auto',
		'@media (max-width: 600px)': {
			margin: '0',
			width: '100%'
		}
	},
	lists: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '10px',
		margin: '0 auto',
		paddingTop: '100px',
		'@media (max-width: 600px)': {
			paddingTop: '70px',
			margin: '0',
			width: '100%'
		}
	},
	iconButton: {
		alignSelf: 'flex-end',
		marginRight: '15px'
	},
	icons: {
		fontSize: '1.5em',
		color: '#fff'
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
