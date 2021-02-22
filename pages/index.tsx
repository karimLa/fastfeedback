import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
	const { user, signinWithGithub, signout } = useAuth();

	return (
		<div className={styles.container}>
			<Head>
				<title>Fast Feedback</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Fast Feedback</h1>

				{user && <p>{user.email}</p>}

				{!user ? (
					<button onClick={signinWithGithub}>Sign in with Github</button>
				) : (
					<button onClick={signout}>Sign out</button>
				)}
			</main>
		</div>
	);
}
