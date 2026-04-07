import { useNavigate } from 'react-router-dom';
import { useClaimsQuery } from '@/hooks/useClaimsQuery';
import { estimationItems } from '@/mocks/data/estimation';
import TypeCView from '@/components/pages/type-c';

export default function TypeCPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useClaimsQuery({ type: 'C' });
  return (
    <TypeCView
      claims={(data ?? []).filter((c) => c.type === 'C')}
      estimationItems={estimationItems}
      onNavigate={navigate}
      isLoading={isLoading}
    />
  );
}
