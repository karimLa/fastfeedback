import { Flex, Link } from '@chakra-ui/react';

interface Props {
	siteId: string;
}

export default function FeedbackLink({ siteId }: Props) {
	return (
		<Flex justifyContent='space-between' mb={8} width='full' mt={1}>
			<Link
				fontWeight='bold'
				fontSize='sm'
				href={`/p/${siteId}`}
				target='_parent'
			>
				Leave a comment →
			</Link>
			<Link fontSize='xs' color='blackAlpha.500' href='/'>
				Powered by Fast Feedback
			</Link>
		</Flex>
	);
}
