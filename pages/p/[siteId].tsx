import { FormEvent, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';

import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import IFeedback from '@/interfaces/feeback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

interface Props {
	feedback: IFeedback[] | null;
}

export default function SiteFeedback({ feedback }: Props) {
	const { user } = useAuth();
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [AllFeedback, setAllFeedback] = useState(feedback || []);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newFeedback: IFeedback = {
			author: user?.username!,
			authorId: user?.uid!,
			siteId: router.query.siteId as string,
			text: inputRef.current?.value ?? '',
			createdAt: new Date().toISOString(),
			provider: user?.provider!,
			status: 'pending',
		};

		setAllFeedback([newFeedback, ...AllFeedback]);
		createFeedback(newFeedback);
	};

	return (
		<Flex direction='column' w='full' maxW='700px' m='0 auto'>
			{/* @ts-ignore */}
			<Box as='form' onSubmit={onSubmit}>
				<FormControl my='8'>
					<FormLabel htmlFor='comment'>Comment</FormLabel>
					<Input ref={inputRef} type='text' id='comment' />
					<Button type='submit' mt='2' fontWeight='medium'>
						Add Comment
					</Button>
				</FormControl>
			</Box>
			{AllFeedback.map((item) => (
				<Feedback key={item.id} feedback={item} />
			))}
		</Flex>
	);
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	let siteId = params?.siteId ?? '';

	if (Array.isArray(siteId)) {
		// get last one
		siteId = siteId[siteId.length - 1];
	}

	const { feedback } = await getAllFeedback(siteId);

	return {
		props: {
			feedback,
		},
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { sites } = await getAllSites();
	let paths: any = [];

	if (sites) {
		paths = sites.map((site) => ({
			params: { siteId: site.id!.toString() },
		}));
	} else {
		paths = null;
	}

	return {
		paths,
		fallback: false,
	};
};
