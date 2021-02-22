import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import firebase from './firebase';

export interface IUser {
	username: string;
	email: string;
}

interface Context {
	user: IUser | undefined;
	loading: boolean;
	signinWithGithub: () => Promise<void>;
	signout: () => Promise<void>;
}

const AuthContext = createContext<Context | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}

	return context;
}

const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setLoading(false);
			} else {
				setUser(undefined);
			}
		});

		return () => unsubscribe();
	});

	const value = useMemo(
		() => ({
			user,
			loading,
			signinWithGithub: () =>
				firebase
					.auth()
					.signInWithPopup(new firebase.auth.GithubAuthProvider())
					.then((res) => setUser(res.user)),
			signout: () =>
				firebase
					.auth()
					.signOut()
					.then(() => setUser(undefined)),
		}),
		[user, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
