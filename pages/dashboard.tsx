import useSWR from 'swr';
import { Flex, Heading } from '@chakra-ui/react';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import AddSiteModal from '@/components/AddSiteModal';
import fetcher from '@/utils/fetcher';

export default function Dashboard() {
	const { data } = useSWR('/api/sites', fetcher);

	if (!data) {
		return (
			<DashboardShell>
				<SiteTableSkeleton />
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			{data?.sites.length ? (
				<>
					<Flex justify='space-between' mb='4'>
						<Heading>My Sites</Heading>
						<AddSiteModal>Add Site</AddSiteModal>
					</Flex>
					<SiteTable sites={data.sites} />
				</>
			) : (
				<EmptyState />
			)}
		</DashboardShell>
	);
}
