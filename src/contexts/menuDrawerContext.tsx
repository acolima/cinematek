import { createContext, useState } from 'react'

interface IMenuContext {
	showMenu: boolean
	toggleDrawer: () => void
}
export const MenuContext = createContext<IMenuContext | null>(null)

interface Props {
	children: React.ReactNode
}

export function MenuDrawerProvider({ children }: Props) {
	const [showMenu, setShowMenu] = useState(false)

	function toggleDrawer() {
		setShowMenu(!showMenu)
	}

	return (
		<MenuContext.Provider value={{ showMenu, toggleDrawer }}>
			{children}
		</MenuContext.Provider>
	)
}
