import { FC } from 'react';
import Link from 'next/link';
import {
	Button,
	Flex,
	Box,
	Link as ChakraLink,
	Avatar,
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';

const DashboardShell: FC = ({ children }) => {
	const { user, signout } = useAuth();

	return (
		<Box backgroundColor='gray.100' h='100vh'>
			<Flex backgroundColor='white' mb={16} w='full'>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					py={4}
					px={8}
					margin='0 auto'
					maxW='1250px'
					w='full'
					h='70px'
				>
					<Flex align='center'>
						<Link href='/' passHref>
							<ChakraLink>
								<Logo name='logo' size='24px' mr={8} />
							</ChakraLink>
						</Link>
						<Link href='/dashboard' passHref>
							<ChakraLink mr={4}>Sites</ChakraLink>
						</Link>
						<Link href='/feedback' passHref>
							<ChakraLink>Feedback</ChakraLink>
						</Link>
					</Flex>
					<Flex justifyContent='center' alignItems='center'>
						{user && (
							<Button variant='ghost' mr={2} onClick={() => signout()}>
								Log Out
							</Button>
						)}
						<Avatar size='sm' src={user?.photoUrl} />
					</Flex>
				</Flex>
			</Flex>
			<Flex margin='0 auto' direction='column' maxW='1250px' px={8}>
				{children}
			</Flex>
		</Box>
	);
};

export default DashboardShell;
