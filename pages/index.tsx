import Head from 'next/head';
import { Button, Heading } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

export default function Home() {
	const { user, signinWithGithub, signout } = useAuth();

	return (
		<>
			<Head>
				<title>Fast Feedback</title>
			</Head>

			<main>
				<Heading fontFamily='body'>Welcome to Fast Feedback</Heading>

				{user && <p>{user.email}</p>}

				{!user ? (
					<Button onClick={signinWithGithub}>Sign in with Github</Button>
				) : (
					<Button onClick={signout}>Sign out</Button>
				)}
			</main>
		</>
	);
}
