import useSWR from 'swr';
import { Flex, Heading } from '@chakra-ui/react';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import AddSiteModal from '@/components/AddSiteModal';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
	const { user } = useAuth();
	const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

	if (!data) {
		return (
			<DashboardShell>
				<SiteTableSkeleton />
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			{data?.sites?.length ? (
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
