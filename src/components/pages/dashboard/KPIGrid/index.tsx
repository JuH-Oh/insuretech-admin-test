import { KPICard } from '@/components/common';
import type { DashboardStats } from '../types';

interface KPIGridProps {
  stats?: DashboardStats;
  onNavigate: (path: string) => void;
  isLoading?: boolean;
}

const KPIGrid: React.FC<KPIGridProps> = ({ stats, onNavigate, isLoading = false }) => (
  <div className="grid grid-cols-4 gap-4">
    <KPICard
      label="전체 접수"
      value={`${stats?.totalClaims ?? 0}건`}
      description="이번 달"
      variant="total"
      onClick={() => onNavigate('/claims')}
      isLoading={isLoading}
    />
    <KPICard
      label="현장조사 대기"
      value={`${stats?.fieldWaiting ?? 0}건`}
      description="배정 필요"
      variant="type-a"
      onClick={() => onNavigate('/field')}
      isLoading={isLoading}
    />
    <KPICard
      label="보험금 승인 대기"
      value={`${stats?.approveWaiting ?? 0}건`}
      description="결재 필요"
      variant="type-b"
      onClick={() => onNavigate('/approve')}
      isLoading={isLoading}
    />
    <KPICard
      label="이번 달 지급액"
      value={`${((stats?.paidAmount ?? 0) / 10000).toLocaleString()}만원`}
      description="누적 지급"
      variant="type-c"
      onClick={() => onNavigate('/approve')}
      isLoading={isLoading}
    />
  </div>
);

export default KPIGrid;
