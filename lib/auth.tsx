import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createUser } from '@/lib/db';
import firebase from '@/lib/firebase';
import IUser from '@/interfaces/user';

interface Context {
	user: IUser | null;
	loading: boolean;
	signinWithGithub: () => Promise<void>;
	signout: () => Promise<void>;
}

async function formatUser(user: firebase.User): Promise<IUser> {
	const { token } = await user.getIdTokenResult();
	const formattedUser: IUser = {
		uid: user.uid,
		email: user.email!,
		username: user.displayName!,
		photoUrl: user.photoURL!,
		token, // @ts-ignore
		provider: user.providerData[0].providerId,
	};

	return formattedUser;
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
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);

	const handlUser = async (rawUser: firebase.User | null) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			await createUser(user);

			setUser(user);
			setLoading(false);
		} else {
			setLoading(false);
			setUser(null);
		}
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handlUser);

		return () => unsubscribe();
	}, []);

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
					.then(() => setUser(null)),
		}),
		[user, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
