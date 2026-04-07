import { useClaimsQuery } from '@/hooks/useClaimsQuery';
import TypeAView from '@/components/pages/type-a';

export default function TypeAPage() {
  const { data, isLoading } = useClaimsQuery({ type: 'A' });
  return <TypeAView claims={(data ?? []).filter((c) => c.type === 'A')} isLoading={isLoading} />;
}
