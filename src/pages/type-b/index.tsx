import { useClaimsQuery } from '@/hooks/useClaimsQuery';
import TypeBView from '@/components/pages/type-b';

export default function TypeBPage() {
  const { data, isLoading } = useClaimsQuery({ type: 'B' });
  const claims = (data ?? []).filter((c) => c.type === 'B');
  const exemptionReasonCounts = claims.reduce(
    (acc, c) => {
      const reason = c.exemptionReason || '기타';
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  return <TypeBView claims={claims} exemptionReasonCounts={exemptionReasonCounts} isLoading={isLoading} />;
}
