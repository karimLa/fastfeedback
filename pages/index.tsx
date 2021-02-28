import Head from 'next/head';
import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';

export default function Home() {
	const { user, signinWithGithub } = useAuth();

	return (
		<>
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
							window.location.href = '/dashboard'
						}
					`,
					}}
				/>
				<title>Fast Feedback</title>
			</Head>

			<Flex
				as='main'
				direction='column'
				align='center'
				justify='center'
				h='100vh'
				maxW='500px'
				margin='0 auto'
				p={6}
			>
				<Logo size='64px' mb={4} />
				<Text mb={6} fontSize='lg'>
					<Text as='span' fontWeight='bold' display='inline'>
						Fast Feedback
					</Text>
					{' is being built as part of '}
					<Link
						href='https://react2025.com'
						isExternal
						textDecoration='underline'
					>
						React 2025
					</Link>
					{`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
				</Text>
				{user ? (
					<Button
						as='a'
						mt={4}
						size='lg'
						backgroundColor='gray.900'
						color='white'
						fontWeight='medium'
						href='/dashboard'
						_hover={{ bg: 'gray.700' }}
						_active={{
							bg: 'gray.800',
							transform: 'scale(0.95)',
						}}
					>
						View Dashboard
					</Button>
				) : (
					<Stack>
						<Button
							mt={4}
							size='lg'
							backgroundColor='gray.900'
							color='white'
							fontWeight='medium'
							_hover={{ bg: 'gray.700' }}
							_active={{
								bg: 'gray.800',
								transform: 'scale(0.95)',
							}}
							onClick={(e) => signinWithGithub()}
						>
							Sign In with GitHub
						</Button>
					</Stack>
				)}
			</Flex>
		</>
	);
}
