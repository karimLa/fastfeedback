import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';

const Dashboard = () => {
	const { user } = useAuth();

	if (!user) {
		return <p>loading...</p>;
	}

	return (
		<DashboardShell>
			<EmptyState />
		</DashboardShell>
	);
};

export default Dashboard;
