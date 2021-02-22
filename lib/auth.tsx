import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createUser } from './db';
import firebase from './firebase';

export interface IUser {
	uid: string;
	username: string;
	email: string;
	photoUrl: string;
}

interface Context {
	user: IUser | undefined;
	loading: boolean;
	signinWithGithub: () => Promise<void>;
	signout: () => Promise<void>;
}

function formatUser(user: firebase.User): IUser {
	return {
		uid: user.uid,
		email: user.email,
		username: user.displayName,
		photoUrl: user.photoURL,
	};
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
	const [user, setUser] = useState<IUser | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	const handlUser = async (rawUser: firebase.User | undefined) => {
		if (rawUser) {
			const user = formatUser(rawUser);
			await createUser(user.uid, user);

			setUser(user);
			setLoading(false);
		} else {
			setLoading(false);
			setUser(undefined);
		}
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handlUser);

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
					.then((res) => handlUser(res.user)),
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
