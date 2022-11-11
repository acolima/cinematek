import { useContext } from 'react'
import { MenuContext } from '../contexts/menuDrawerContext'

export default function useMenu() {
	const menuContext = useContext(MenuContext)

	if (!menuContext) {
		throw new Error('useAuth must be used inside a AuthContext Provider')
	}

	return menuContext
}
