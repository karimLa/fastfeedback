import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

const Dashboard = () => {
	const { user } = useAuth();

	if (!user) {
		return <SiteTableSkeleton />;
	}

	return (
		<DashboardShell>
			<EmptyState />
		</DashboardShell>
	);
};

export default Dashboard;
