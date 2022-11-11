import { createContext, useState } from 'react'

interface IAuthContext {
	auth: AuthData | null
	signIn: (auth: AuthData) => void
	signOut: () => void
}
export const AuthContext = createContext<IAuthContext | null>(null)

interface Props {
	children: React.ReactNode
}

interface AuthData {
	username: string
	pictureUrl: string
	token: string
}

export function AuthProvider({ children }: Props) {
	const persistedAuth: AuthData = JSON.parse(localStorage.getItem('auth')!)
	const [auth, setAuth] = useState<AuthData | null>(persistedAuth)

	function signIn(auth: AuthData) {
		setAuth(auth)
		localStorage.setItem('auth', JSON.stringify(auth))
	}

	function signOut() {
		localStorage.removeItem('auth')
	}

	return (
		<AuthContext.Provider value={{ auth, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}
