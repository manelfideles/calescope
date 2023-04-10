import { createContext, useContext, useEffect, useState } from 'react';
import { useClient } from 'react-supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@chakra-ui/react';
import { indexOf } from 'lodash';

interface AuthProviderProps {
	children: React.ReactNode
}

type AuthState = {
	session?: Session | null,
	user?: User | null,
	isLoggedIn: boolean,
}

interface AuthContextInterface {
	isLoading: boolean,
	authState: AuthState,
	signUp: (input: any) => void,
	signIn: (input: any) => void,
	signOut: () => void,
	updateUser: (data: any) => void,
}

const initialAuthState = {
	authState: { session: null, user: null, isLoggedIn: false, isLoading: false },
	isLoading: false,
	signUp: async () => null,
	signIn: async () => null,
	signOut: async () => null,
	updateUser: async () => null,
}

const sbUrl = import.meta.env.VITE_SUPABASE_URL
const sbTokenName = 'sb-' + sbUrl.substring(indexOf(sbUrl, '/') + 2, indexOf(sbUrl, '.')) + '-auth-token'

export const AuthContext = createContext<AuthContextInterface>(initialAuthState)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context)
		throw Error('useAuth must be used within AuthProvider')
	return context
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
	const supabase = useClient();
	const toast = useToast({
		position: 'bottom-right',
		duration: 5000,
		isClosable: true,
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [authState, setAuthState] = useState<AuthState>({
		session: localStorage.getItem(sbTokenName)! ? JSON.parse(localStorage.getItem(sbTokenName)!) : null,
		user: localStorage.getItem(sbTokenName)! ? JSON.parse(localStorage.getItem(sbTokenName)!).user : null,
		isLoggedIn: localStorage.getItem(sbTokenName) !== '' ?? false,
	})

	useEffect(() => {
		if (!authState.isLoggedIn) localStorage.setItem(sbTokenName, '');
	}, [authState.isLoggedIn])

	const signUp = async (input: any) => {
		const { email, password, firstName, lastName } = input;
		setIsLoading(true);
		const { data: { session, user }, error } = await supabase
			.auth
			.signUp({
				email, password,
				options: { data: { firstName, lastName } },
			})
		if (error) toast({ status: 'error', title: error.message });
		setAuthState({ session, user, isLoggedIn: true })
		setIsLoading(false);
	}

	const signIn = async (input: any) => {
		const { email, password } = input;
		setIsLoading(true);
		const { data: { session, user }, error } = await supabase
			.auth
			.signInWithPassword({ email, password })
		if (error) {
			toast({ status: 'error', title: error.message });
			setAuthState({ session: null, user: null, isLoggedIn: false });
		}
		else setAuthState({ session, user, isLoggedIn: true });
		setIsLoading(false);
	}

	const signOut = async () => {
		setIsLoading(true);
		const { error } = await supabase.auth.signOut()
		if (error) toast({ status: 'error', title: error.message });
		else setAuthState({ session: null, user: null, isLoggedIn: false });
		setIsLoading(false);
	}

	const updateUser = async (userData: any) => {
		setIsLoading(true);
		/* fazer cenas aqui */
		setIsLoading(false);
	}

	return (
		<AuthContext.Provider value={{
			authState,
			isLoading,
			signUp,
			signIn,
			signOut,
			updateUser,
		}}>
			{children}
		</AuthContext.Provider>
	)
}