import type { Claim } from '@/types/claims';
import type { NotificationItem } from '@/types/documents';
import type { DashboardStats } from './types';
import KPIGrid from './KPIGrid';
import SourceStats from './SourceStats';
import TypeDistribution from './TypeDistribution';
import RecentClaims from './RecentClaims';
import NotificationList from './NotificationList';

interface DashboardViewProps {
  stats?: DashboardStats;
  recentClaims: Claim[];
  notifications: NotificationItem[];
  onNavigate: (path: string) => void;
  isLoading?: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  recentClaims,
  notifications,
  onNavigate,
  isLoading = false,
}) => (
  <>
    <div className='w-full flex flex-col gap-2 mb-4'>
      <h1 className='text-[20px] font-bold tracking-[-0.3px]'>통합 대시보드</h1>
      <p className='text-[13px] text-secondary mt-1'>
        보험사·손해사정사 접수건 현황을 한눈에 파악합니다
      </p>
    </div>

    <div className='w-full flex flex-col gap-4'>
      <KPIGrid stats={stats} onNavigate={onNavigate} isLoading={isLoading} />

      <div className='grid grid-cols-2 gap-4'>
        <SourceStats stats={stats} isLoading={isLoading} />
        <TypeDistribution stats={stats} isLoading={isLoading} />
      </div>

      <NotificationList notifications={notifications} isLoading={isLoading} />

      <RecentClaims
        claims={recentClaims}
        onNavigate={onNavigate}
        isLoading={isLoading}
      />
    </div>
  </>
);

export default DashboardView;
