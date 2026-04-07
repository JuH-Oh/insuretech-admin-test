import { Skeleton } from '@/components/common';
import type { DashboardStats } from '../types';

interface TypeDistributionProps {
  stats?: DashboardStats;
  isLoading?: boolean;
}

const TYPE_ITEMS = [
  { key: 'typeACount' as const, label: 'TYPE A (시공사 하자)', color: '#C9252C' },
  { key: 'typeBCount' as const, label: 'TYPE B (면책)', color: '#64748B' },
  { key: 'typeCCount' as const, label: 'TYPE C (보험금 산출)', color: '#00854A' },
];

const TypeDistribution: React.FC<TypeDistributionProps> = ({ stats, isLoading = false }) => (
  <div className="bg-card rounded-card border border-border p-[18px]">
    <div className="text-[11px] font-bold text-secondary uppercase tracking-[0.5px] mb-3">TYPE별 분포</div>
    <div className="space-y-2">
      {TYPE_ITEMS.map((item) => {
        const count = stats?.[item.key] ?? 0;
        return (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-[140px] text-[12px] font-medium truncate">{item.label}</div>
            <div className="flex-1 h-[22px] bg-border-light rounded overflow-hidden">
              {isLoading ? (
                <Skeleton className="h-full w-full rounded" />
              ) : (
                <div
                  className="h-full rounded transition-all"
                  style={{ width: `${Math.max((count / 10) * 100, 8)}%`, backgroundColor: item.color, opacity: 0.8 }}
                />
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-[22px] w-[40px]" />
            ) : (
              <div className="text-[13px] font-bold w-[40px] text-right">{count}건</div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default TypeDistribution;
