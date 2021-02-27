import { GetStaticPropsContext } from 'next';

import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import IFeedback from '@/interfaces/feeback';
import Feedback from '@/components/Feedback';

interface Props {
	feedback: IFeedback[];
}

export default function SiteFeedback({ feedback }: Props) {
	return feedback.map((item) => <Feedback key={item.id} feedback={item} />);
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	let siteId = params?.siteId ?? '';

	if (Array.isArray(siteId)) {
		// get last one
		siteId = siteId[siteId.length - 1];
	}

	const feedback = await getAllFeedback(siteId);

	return {
		props: {
			feedback,
		},
	};
}

export async function getStaticPaths() {
	const sites = await getAllSites();
	const paths = sites.map((site) => ({
		params: { siteId: site.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}
