import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
	const { user, signinWithGithub, signout } = useAuth();

	console.log(user);

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href='https://nextjs.org'>Next.js!</a>
				</h1>

				<p className={styles.description}>
					{!user ? (
						<button onClick={signinWithGithub}>Sign in with Github</button>
					) : (
						<button onClick={signout}>Sign out</button>
					)}
				</p>
			</main>
		</div>
	);
}
