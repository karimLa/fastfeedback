import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import IFeedback from '@/interfaces/feeback';

interface Props {
	feedback: IFeedback;
}

const Feedback = ({ feedback }: Props) => (
	<Box borderRadius={4} maxWidth='700px' w='full'>
		<Heading size='sm' as='h3' mb={0} color='gray.900' fontWeight='medium'>
			{feedback.author}
		</Heading>
		<Text color='gray.500' mb={4} fontSize='xs'>
			{format(parseISO(feedback.createdAt), 'PPpp')}
		</Text>
		<Text color='gray.800'>{feedback.text}</Text>
		<Divider borderColor='gray.200' backgroundColor='gray.200' mt={8} mb={8} />
	</Box>
);

export default Feedback;
