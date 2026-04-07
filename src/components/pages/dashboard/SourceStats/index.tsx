import { Skeleton } from '@/components/common';
import type { DashboardStats } from '../types';

interface SourceStatsProps {
  stats?: DashboardStats;
  isLoading?: boolean;
}

const SourceStats: React.FC<SourceStatsProps> = ({ stats, isLoading = false }) => (
  <div className="bg-card rounded-card border border-border p-[18px]">
    <div className="text-[11px] font-bold text-secondary uppercase tracking-[0.5px] mb-3">소스별 접수 현황</div>
    <div className="flex gap-6">
      <div className="flex-1 text-center py-3 bg-[#F0F9FF] rounded-block">
        {isLoading ? (
          <Skeleton className="h-[36px] w-[48px] mx-auto" />
        ) : (
          <div className="text-[24px] font-bold text-[#0061AF]">{stats?.residentCount ?? 0}</div>
        )}
        <div className="text-[11px] text-secondary mt-1">🏠 입주민 접수</div>
      </div>
      <div className="flex-1 text-center py-3 bg-[#FFF7ED] rounded-block">
        {isLoading ? (
          <Skeleton className="h-[36px] w-[48px] mx-auto" />
        ) : (
          <div className="text-[24px] font-bold text-amber">{stats?.officeCount ?? 0}</div>
        )}
        <div className="text-[11px] text-secondary mt-1">🏢 관리사무소 접수</div>
      </div>
    </div>
  </div>
);

export default SourceStats;
