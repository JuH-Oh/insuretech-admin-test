import { useNavigate } from 'react-router-dom';
import { useDashboardStatsQuery, useDashboardRecentClaimsQuery } from '@/hooks/useDashboardQuery';
import { notifications } from '@/mocks/data/documents';
import DashboardView from '@/components/pages/dashboard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStatsQuery();
  const { data: recentClaims, isLoading: claimsLoading } = useDashboardRecentClaimsQuery();
  const isLoading = statsLoading || claimsLoading;

  return (
    <DashboardView
      stats={stats}
      recentClaims={recentClaims ?? []}
      notifications={notifications}
      onNavigate={navigate}
      isLoading={isLoading}
    />
  );
}
