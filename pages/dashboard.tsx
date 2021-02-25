import useSWR from 'swr';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
	const { data } = useSWR('/api/sites', fetcher);

	if (!data) {
		return (
			<DashboardShell>
				<SiteTableSkeleton />
			</DashboardShell>
		);
	}

	console.log(data);

	return (
		<DashboardShell>
			{data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
		</DashboardShell>
	);
};

export default Dashboard;
